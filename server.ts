import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Firebase Client SDK on Server
const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
let appletConfig: Record<string, string> = {};
if (fs.existsSync(configPath)) {
  try {
    appletConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    console.log('Successfully loaded Firebase configuration from firebase-applet-config.json:', {
      projectId: appletConfig.projectId,
      firestoreDatabaseId: appletConfig.firestoreDatabaseId
    });
  } catch (err) {
    console.error('Error reading firebase-applet-config.json:', err);
  }
}

let fApp: any = null;
let db: any = null;
let isFirestoreDisabled = true;

const hasFirebaseKey = !!(appletConfig.apiKey || process.env.FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY);

if (hasFirebaseKey) {
  try {
    const firebaseConfig = {
      apiKey: appletConfig.apiKey || process.env.FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY || '',
      authDomain: appletConfig.authDomain || process.env.FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN || '',
      projectId: appletConfig.projectId || process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || 'ai-studio-kawinfingerstyle',
      storageBucket: appletConfig.storageBucket || process.env.FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: appletConfig.messagingSenderId || process.env.FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: appletConfig.appId || process.env.FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID || '',
    };
    fApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const dbId = appletConfig.firestoreDatabaseId || process.env.FIREBASE_DATABASE_ID || process.env.VITE_FIREBASE_DATABASE_ID || 'ai-studio-kawinfingerstyle-e699da0a-2da0-46dc-ae5c-4d9708c2502f';
    db = dbId && dbId !== '(default)' ? getFirestore(fApp, dbId) : getFirestore(fApp);
    isFirestoreDisabled = false;
  } catch (err) {
    console.warn('Failed to initialize Firebase on server, disabling Firestore stats:', err);
  }
}

// Path for local persistent stats JSON storage
const DATA_DIR = path.join(process.cwd(), 'data');
const STATS_FILE = path.join(DATA_DIR, 'stats.json');

// Helper for Thailand timezone date string (YYYY-MM-DD)
function getThailandDateStr(): string {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
}

interface StatsData {
  totalViews: number;
  todayViews: number;
  yesterdayViews: number;
  lastUpdatedDate: string;
}

let stats: StatsData = {
  totalViews: 55,
  todayViews: 0,
  yesterdayViews: 0,
  lastUpdatedDate: getThailandDateStr(),
};

let isStatsDirty = false;

// Load local backup first
function loadLocalStats() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STATS_FILE)) {
      const fileData = fs.readFileSync(STATS_FILE, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (typeof parsed.totalViews === 'number') {
        stats.totalViews = Math.max(parsed.totalViews, 55);
      }
      if (typeof parsed.todayViews === 'number') {
        stats.todayViews = Math.max(parsed.todayViews, 0);
      }
      if (typeof parsed.yesterdayViews === 'number') {
        stats.yesterdayViews = Math.max(parsed.yesterdayViews, 0);
      }
      if (typeof parsed.lastUpdatedDate === 'string') {
        stats.lastUpdatedDate = parsed.lastUpdatedDate;
      }
    }
  } catch (err) {
    console.error('Error loading stats.json:', err);
  }
}

const COUNTER_PROJECT = 'kawinfingerstyle_site_v6_stats';
let counterApiDisabledUntil = 0;

function isCounterApiAvailable(): boolean {
  return Date.now() > counterApiDisabledUntil;
}

function disableCounterApiTemporarily(reason?: string) {
  if (isCounterApiAvailable()) {
    console.info(`Counter API temporarily paused (10 mins local mode)${reason ? `: ${reason}` : ''}`);
  }
  counterApiDisabledUntil = Date.now() + 10 * 60 * 1000; // Pause for 10 minutes
}

// Helper to fetch/increment from counterapi.dev
async function fetchCounterValue(name: string, defaultVal: number): Promise<number> {
  if (!isCounterApiAvailable()) return defaultVal;
  try {
    const res = await fetch(`https://api.counterapi.dev/v1/projects/${COUNTER_PROJECT}/counters/${name}`);
    if (res.status === 404) {
      // Counter doesn't exist yet, initialize it
      await fetch(`https://api.counterapi.dev/v1/projects/${COUNTER_PROJECT}/counters/${name}/set?value=${defaultVal}`).catch(() => {});
      return defaultVal;
    }
    if (!res.ok) {
      disableCounterApiTemporarily(`Status ${res.status}`);
      return defaultVal;
    }
    const data = await res.json();
    const count = typeof data.count === 'number' ? data.count : (typeof data.value === 'number' ? data.value : defaultVal);
    return count;
  } catch (err) {
    disableCounterApiTemporarily(String(err));
    return defaultVal;
  }
}

async function setCounterValue(name: string, value: number): Promise<void> {
  if (!isCounterApiAvailable()) return;
  try {
    const res = await fetch(`https://api.counterapi.dev/v1/projects/${COUNTER_PROJECT}/counters/${name}/set?value=${value}`);
    if (!res.ok) {
      disableCounterApiTemporarily(`Status ${res.status}`);
    }
  } catch (err) {
    disableCounterApiTemporarily(String(err));
  }
}

async function incrementCounterValue(name: string, defaultVal: number): Promise<number> {
  if (!isCounterApiAvailable()) return defaultVal + 1;
  try {
    const res = await fetch(`https://api.counterapi.dev/v1/projects/${COUNTER_PROJECT}/counters/${name}/up`);
    if (res.status === 404) {
      // Initialize if not exists, then increment
      await fetch(`https://api.counterapi.dev/v1/projects/${COUNTER_PROJECT}/counters/${name}/set?value=${defaultVal + 1}`).catch(() => {});
      return defaultVal + 1;
    }
    if (!res.ok) {
      disableCounterApiTemporarily(`Status ${res.status}`);
      return defaultVal + 1;
    }
    const data = await res.json();
    return typeof data.count === 'number' ? data.count : (typeof data.value === 'number' ? data.value : defaultVal + 1);
  } catch (err) {
    disableCounterApiTemporarily(String(err));
    return defaultVal + 1;
  }
}

// Ensure data directory and file exist, sync with global Counter API
async function loadStats() {
  loadLocalStats();
  
  try {
    const todayStr = getThailandDateStr();
    const todayNum = parseInt(todayStr.replace(/-/g, ''), 10);

    const dbLastDateNum = await fetchCounterValue('last_updated_date', todayNum);
    const dbTotal = await fetchCounterValue('total_views', stats.totalViews);
    const dbToday = await fetchCounterValue('today_views', stats.todayViews);
    const dbYesterday = await fetchCounterValue('yesterday_views', stats.yesterdayViews);

    stats.totalViews = Math.max(dbTotal, stats.totalViews, 55);

    // Roll date parsing
    const dbLastDateStr = String(dbLastDateNum).slice(0, 4) + '-' + String(dbLastDateNum).slice(4, 6) + '-' + String(dbLastDateNum).slice(6, 8);

    if (dbLastDateNum !== todayNum) {
      // Date rollover!
      stats.yesterdayViews = dbToday;
      stats.todayViews = 0;
      stats.lastUpdatedDate = todayStr;

      await setCounterValue('yesterday_views', dbToday);
      await setCounterValue('today_views', 0);
      await setCounterValue('last_updated_date', todayNum);
    } else {
      stats.todayViews = dbToday;
      stats.yesterdayViews = dbYesterday;
      stats.lastUpdatedDate = dbLastDateStr;
    }

    console.log('Successfully initialized stats from global Counter API:', stats);
    saveStatsNow(); // update local backup
  } catch (err) {
    console.error('Failed to sync stats with global Counter API on start, running with local:', err);
  }
}

// Save to Firestore helper (kept as optional client/server logging fallback)
async function saveStatsToFirestore() {
  if (isFirestoreDisabled) return;
  try {
    const docRef = doc(db, 'site_stats', 'global');
    await setDoc(docRef, {
      totalViews: stats.totalViews,
      todayViews: stats.todayViews,
      yesterdayViews: stats.yesterdayViews,
      lastUpdatedDate: stats.lastUpdatedDate,
    }, { merge: true });
  } catch (err: any) {
    console.error('Error saving stats to Firestore:', err.message || err);
    isFirestoreDisabled = true;
  }
}

function saveStatsNow() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2), 'utf-8');
    isStatsDirty = false;
  } catch (err) {
    console.error('Error saving stats.json backup:', err);
  }
  saveStatsToFirestore();
}

function scheduleSaveStats() {
  isStatsDirty = true;
}

// Periodically write dirty stats to disk every 10 seconds (non-blocking)
setInterval(() => {
  if (isStatsDirty) {
    saveStatsNow();
  }
}, 10000);

// Active sessions tracking (sessionId -> lastSeen timestamp in ms)
const activeSessions = new Map<string, number>();

// Server-authoritative tracking of processed session IDs for the current day
const processedSessions = new Set<string>();

// Background interval to clean sessions older than 60 seconds
setInterval(() => {
  const now = Date.now();
  for (const [sessionId, lastSeen] of activeSessions.entries()) {
    if (now - lastSeen > 60000) {
      activeSessions.delete(sessionId);
    }
  }
}, 20000);

function checkDateRollover() {
  const todayStr = getThailandDateStr();
  if (stats.lastUpdatedDate !== todayStr) {
    stats.yesterdayViews = stats.todayViews;
    stats.todayViews = 0;
    stats.lastUpdatedDate = todayStr;
    processedSessions.clear(); // Clear seen sessions on date rollover
    saveStatsNow();
  }
}

// Sync and pull latest stats from global Counter API to avoid stale/divergent values
async function pullLatestStats() {
  try {
    const todayStr = getThailandDateStr();
    const todayNum = parseInt(todayStr.replace(/-/g, ''), 10);

    const dbLastDateNum = await fetchCounterValue('last_updated_date', todayNum);
    const dbTotal = await fetchCounterValue('total_views', stats.totalViews);
    const dbToday = await fetchCounterValue('today_views', stats.todayViews);
    const dbYesterday = await fetchCounterValue('yesterday_views', stats.yesterdayViews);

    stats.totalViews = Math.max(dbTotal, stats.totalViews, 55);

    const dbLastDateStr = String(dbLastDateNum).slice(0, 4) + '-' + String(dbLastDateNum).slice(4, 6) + '-' + String(dbLastDateNum).slice(6, 8);

    if (dbLastDateNum !== todayNum) {
      stats.yesterdayViews = dbToday;
      stats.todayViews = 0;
      stats.lastUpdatedDate = todayStr;

      await setCounterValue('yesterday_views', dbToday);
      await setCounterValue('today_views', 0);
      await setCounterValue('last_updated_date', todayNum);
    } else {
      stats.todayViews = dbToday;
      stats.yesterdayViews = dbYesterday;
      stats.lastUpdatedDate = dbLastDateStr;
    }
  } catch (err) {
    console.warn('Failed to pull latest stats from global Counter API:', err);
  }
}

// Initialize stats
loadStats();

// API Routes
app.get('/api/stats', async (req, res) => {
  await pullLatestStats();
  checkDateRollover();
  res.json({
    totalViews: stats.totalViews,
    todayViews: stats.todayViews,
    yesterdayViews: stats.yesterdayViews,
    activeUsers: Math.max(1, activeSessions.size),
    lastUpdatedDate: stats.lastUpdatedDate,
  });
});

app.post('/api/stats/hit', async (req, res) => {
  const { sessionId, isNewSession } = req.body || {};
  await pullLatestStats();
  checkDateRollover();

  let shouldIncrement = false;

  if (sessionId) {
    activeSessions.set(sessionId, Date.now());
    if (!processedSessions.has(sessionId)) {
      processedSessions.add(sessionId);
      shouldIncrement = true;
    }
  } else if (isNewSession) {
    shouldIncrement = true;
  }

  if (shouldIncrement) {
    const newTotal = await incrementCounterValue('total_views', stats.totalViews);
    const newToday = await incrementCounterValue('today_views', stats.todayViews);
    stats.totalViews = Math.max(newTotal, stats.totalViews + 1, 55);
    stats.todayViews = Math.max(newToday, stats.todayViews + 1, 0);
    saveStatsNow(); // Save instantly to prevent data loss upon container recycle
  }

  res.json({
    totalViews: stats.totalViews,
    todayViews: stats.todayViews,
    yesterdayViews: stats.yesterdayViews,
    activeUsers: Math.max(1, activeSessions.size),
    lastUpdatedDate: stats.lastUpdatedDate,
  });
});

app.post('/api/stats/ping', async (req, res) => {
  const { sessionId } = req.body || {};
  if (sessionId) {
    activeSessions.set(sessionId, Date.now());
  }

  await pullLatestStats();
  checkDateRollover();

  res.json({
    totalViews: stats.totalViews,
    todayViews: stats.todayViews,
    yesterdayViews: stats.yesterdayViews,
    activeUsers: Math.max(1, activeSessions.size),
  });
});

// Vite middleware & Static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
