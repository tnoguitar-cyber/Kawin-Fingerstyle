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
  lastUpdatedDate: string;
}

// Initial default stats baseline
let stats: StatsData = {
  totalViews: 3580, // Realistic initial baseline for Kawin Fingerstyle
  todayViews: 42,
  lastUpdatedDate: getThailandDateStr(),
};

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
        stats.totalViews = parsed.totalViews;
      }
      if (typeof parsed.todayViews === 'number') {
        stats.todayViews = parsed.todayViews;
      }
      if (typeof parsed.lastUpdatedDate === 'string') {
        stats.lastUpdatedDate = parsed.lastUpdatedDate;
      }
    } else {
      saveStats();
    }
  } catch (err) {
    console.error('Error loading stats.json:', err);
  }
}

function saveStats() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving stats.json:', err);
  }
}

// Active sessions tracking (sessionId -> lastSeen timestamp in ms)
const activeSessions = new Map<string, number>();

function cleanStaleSessions() {
  const now = Date.now();
  for (const [sessionId, lastSeen] of activeSessions.entries()) {
    if (now - lastSeen > 30000) { // 30 seconds threshold
      activeSessions.delete(sessionId);
    }
  }
}

function checkDateRollover() {
  const todayStr = getThailandDateStr();
  if (stats.lastUpdatedDate !== todayStr) {
    stats.todayViews = 0;
    stats.lastUpdatedDate = todayStr;
    saveStats();
  }
}

// Initialize stats from disk
loadStats();

// API Routes
app.get('/api/stats', (req, res) => {
  cleanStaleSessions();
  checkDateRollover();
  res.json({
    totalViews: stats.totalViews,
    todayViews: stats.todayViews,
    activeUsers: Math.max(1, activeSessions.size),
    lastUpdatedDate: stats.lastUpdatedDate,
  });
});

app.post('/api/stats/hit', (req, res) => {
  const { sessionId, isNewSession } = req.body || {};
  cleanStaleSessions();
  checkDateRollover();

  if (sessionId) {
    activeSessions.set(sessionId, Date.now());
  }

  if (isNewSession) {
    stats.totalViews += 1;
    stats.todayViews += 1;
    saveStats();
  }

  res.json({
    totalViews: stats.totalViews,
    todayViews: stats.todayViews,
    activeUsers: Math.max(1, activeSessions.size),
    lastUpdatedDate: stats.lastUpdatedDate,
  });
});

app.post('/api/stats/ping', (req, res) => {
  const { sessionId } = req.body || {};
  if (sessionId) {
    activeSessions.set(sessionId, Date.now());
  }
  cleanStaleSessions();

  res.json({
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
