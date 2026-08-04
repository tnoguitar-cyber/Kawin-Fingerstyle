import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

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
  totalViews: 1356,
  todayViews: 42,
  yesterdayViews: 38,
  lastUpdatedDate: getThailandDateStr(),
};

let isStatsDirty = false;

// Ensure data directory and file exist
function loadStats() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STATS_FILE)) {
      const fileData = fs.readFileSync(STATS_FILE, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (typeof parsed.totalViews === 'number') {
        stats.totalViews = Math.max(parsed.totalViews, 1356);
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
    } else {
      saveStatsNow();
    }
  } catch (err) {
    console.error('Error loading stats.json:', err);
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
    console.error('Error saving stats.json:', err);
  }
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
    scheduleSaveStats();
  }
}

// Initialize stats from disk
loadStats();

// API Routes
app.get('/api/stats', (req, res) => {
  checkDateRollover();
  res.json({
    totalViews: stats.totalViews,
    todayViews: stats.todayViews,
    yesterdayViews: stats.yesterdayViews,
    activeUsers: Math.max(1, activeSessions.size),
    lastUpdatedDate: stats.lastUpdatedDate,
  });
});

app.post('/api/stats/hit', (req, res) => {
  const { sessionId, isNewSession } = req.body || {};
  checkDateRollover();

  if (sessionId) {
    activeSessions.set(sessionId, Date.now());
  }

  if (isNewSession) {
    stats.totalViews += 1;
    stats.todayViews += 1;
    scheduleSaveStats();
  }

  res.json({
    totalViews: stats.totalViews,
    todayViews: stats.todayViews,
    yesterdayViews: stats.yesterdayViews,
    activeUsers: Math.max(1, activeSessions.size),
    lastUpdatedDate: stats.lastUpdatedDate,
  });
});

app.post('/api/stats/ping', (req, res) => {
  const { sessionId } = req.body || {};
  if (sessionId) {
    activeSessions.set(sessionId, Date.now());
  }

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
