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

const firebaseConfig = {
  apiKey: appletConfig.apiKey || process.env.FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY || '',
  authDomain: appletConfig.authDomain || process.env.FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: appletConfig.projectId || process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || 'ai-studio-kawinfingerstyle',
  storageBucket: appletConfig.storageBucket || process.env.FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: appletConfig.messagingSenderId || process.env.FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: appletConfig.appId || process.env.FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID || '',
};

const fApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const dbId = appletConfig.firestoreDatabaseId || process.env.FIREBASE_DATABASE_ID || process.env.VITE_FIREBASE_DATABASE_ID || 'ai-studio-kawinfingerstyle-e699da0a-2da0-46dc-ae5c-4d9708c2502f';
const db = dbId && dbId !== '(default)' ? getFirestore(fApp, dbId) : getFirestore(fApp);

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

// Ensure data directory and file exist, sync with Firestore
async function loadStats() {
  loadLocalStats();
  try {
    const docRef = doc(db, 'site_stats', 'global');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (typeof data.totalViews === 'number') {
        stats.totalViews = Math.max(data.totalViews, stats.totalViews, 55);
      }
      if (typeof data.todayViews === 'number') {
        stats.todayViews = Math.max(data.todayViews, stats.todayViews, 0);
      }
      if (typeof data.yesterdayViews === 'number') {
        stats.yesterdayViews = Math.max(data.yesterdayViews, stats.yesterdayViews, 0);
      }
      if (typeof data.lastUpdatedDate === 'string') {
        stats.lastUpdatedDate = data.lastUpdatedDate;
      }
      console.log('Successfully initialized stats from Firestore:', stats);
    } else {
      console.log('No Firestore global stats doc found. Seeding with default/local stats...');
      await saveStatsToFirestore();
    }
  } catch (err) {
    console.error('Error connecting or syncing with Firestore on start:', err);
  }
}

// Save to Firestore helper
async function saveStatsToFirestore() {
  try {
    const docRef = doc(db, 'site_stats', 'global');
    await setDoc(docRef, {
      totalViews: stats.totalViews,
      todayViews: stats.todayViews,
      yesterdayViews: stats.yesterdayViews,
      lastUpdatedDate: stats.lastUpdatedDate,
    }, { merge: true });
  } catch (err) {
    console.error('Error saving stats to Firestore:', err);
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
  // Asynchronously save to Firestore database to persist data immediately across containers
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

// Sync and pull latest stats from Firestore to avoid stale/divergent values
async function pullLatestStats() {
  try {
    const docRef = doc(db, 'site_stats', 'global');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (typeof data.totalViews === 'number') {
        stats.totalViews = Math.max(data.totalViews, stats.totalViews, 55);
      }
      if (typeof data.todayViews === 'number') {
        stats.todayViews = Math.max(data.todayViews, stats.todayViews, 0);
      }
      if (typeof data.yesterdayViews === 'number') {
        stats.yesterdayViews = Math.max(data.yesterdayViews, stats.yesterdayViews, 0);
      }
      if (typeof data.lastUpdatedDate === 'string') {
        stats.lastUpdatedDate = data.lastUpdatedDate;
      }
    }
  } catch (err) {
    console.error('Error pulling latest stats from Firestore:', err);
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
    stats.totalViews += 1;
    stats.todayViews += 1;
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
