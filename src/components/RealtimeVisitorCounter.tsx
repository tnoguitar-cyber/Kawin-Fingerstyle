import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

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

let isClientFirestoreDisabled = false;

export const RealtimeVisitorCounter: React.FC = () => {
  const [totalViews, setTotalViews] = useState<number>(() => {
    const saved = localStorage.getItem('kawin_real_total_views_v5');
    const parsed = saved ? parseInt(saved, 10) : 55;
    return isNaN(parsed) || parsed < 55 ? 55 : parsed;
  });

  const [todayViews, setTodayViews] = useState<number>(() => {
    const saved = localStorage.getItem('kawin_real_today_views_v3');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [yesterdayViews, setYesterdayViews] = useState<number>(() => {
    const saved = localStorage.getItem('kawin_real_yesterday_views_v3');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [activeUsers, setActiveUsers] = useState<number>(1);
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    // Generate or retrieve persistent session ID for current browser tab/session
    let sessionId = sessionStorage.getItem('kawin_visitor_session_id');
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      sessionStorage.setItem('kawin_visitor_session_id', sessionId);
    }

    const hasRecordedHit = sessionStorage.getItem('kawin_api_session_hit_v1');
    const isNewSession = !hasRecordedHit;

    if (isNewSession) {
      sessionStorage.setItem('kawin_api_session_hit_v1', 'true');
    }

    const applyStatsData = (data: { totalViews?: number; todayViews?: number; yesterdayViews?: number; activeUsers?: number }) => {
      if (typeof data.totalViews === 'number') {
        const finalCount = Math.max(data.totalViews, 55);
        setTotalViews(finalCount);
        localStorage.setItem('kawin_real_total_views_v5', String(finalCount));
      }
      if (typeof data.todayViews === 'number') {
        setTodayViews(data.todayViews);
        localStorage.setItem('kawin_real_today_views_v3', String(data.todayViews));
      }
      if (typeof data.yesterdayViews === 'number') {
        setYesterdayViews(data.yesterdayViews);
        localStorage.setItem('kawin_real_yesterday_views_v3', String(data.yesterdayViews));
      }
      if (typeof data.activeUsers === 'number') {
        setActiveUsers(data.activeUsers);
      }
    };

    // Tier 1: Local Backend Express API (Runs in AI Studio Sandbox Container)
    const tryBackendStats = async () => {
      const res = await fetch('/api/stats/hit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, isNewSession }),
      });
      if (!res.ok) throw new Error('Backend responded with error');
      const data = await res.json();
      applyStatsData(data);
      setIsConnected(true);
    };

    // Tier 2: Direct Client-Side Firestore (Runs on Vercel with Firestore API variables configured)
    const tryFirestoreStats = async () => {
      if (isClientFirestoreDisabled) {
        throw new Error('Firestore is disabled on the client');
      }
      const apiKey = (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_FIREBASE_API_KEY;
      if (!db || !apiKey) {
        throw new Error('Firestore is not configured with client VITE_FIREBASE_API_KEY');
      }
      try {
        const docRef = doc(db, 'site_stats', 'global');
        const docSnap = await getDoc(docRef);
        const todayStr = getThailandDateStr();
        
        let currentTotal = 55;
        let currentToday = 0;
        let currentYesterday = 0;
        let lastDate = todayStr;

        if (docSnap.exists()) {
          const data = docSnap.data();
          currentTotal = typeof data.totalViews === 'number' ? Math.max(data.totalViews, 55) : 55;
          currentToday = typeof data.todayViews === 'number' ? Math.max(data.todayViews, 0) : 0;
          currentYesterday = typeof data.yesterdayViews === 'number' ? Math.max(data.yesterdayViews, 0) : 0;
          lastDate = typeof data.lastUpdatedDate === 'string' ? data.lastUpdatedDate : todayStr;
        }

        if (isNewSession) {
          if (lastDate !== todayStr) {
            currentYesterday = currentToday;
            currentToday = 1;
            currentTotal += 1;
            lastDate = todayStr;
          } else {
            currentToday += 1;
            currentTotal += 1;
          }

          await setDoc(docRef, {
            totalViews: currentTotal,
            todayViews: currentToday,
            yesterdayViews: currentYesterday,
            lastUpdatedDate: lastDate
          }, { merge: true });
        }

        applyStatsData({
          totalViews: currentTotal,
          todayViews: currentToday,
          yesterdayViews: currentYesterday,
          activeUsers: 1,
        });
        setIsConnected(true);
      } catch (err) {
        console.warn('Firestore failed. Disabling direct firestore queries in this session.', err);
        isClientFirestoreDisabled = true;
        throw err;
      }
    };

    // Tier 3: Zero-Setup Public counterapi.dev (Runs on Vercel with no configuration at all)
    const tryPublicCounterStats = async () => {
      const url = isNewSession
        ? 'https://api.counterapi.dev/v1/projects/kawinfingerstyle_site_v6_stats/counters/total_views/up'
        : 'https://api.counterapi.dev/v1/projects/kawinfingerstyle_site_v6_stats/counters/total_views';
        
      const res = await fetch(url);
      if (!res.ok) throw new Error('Public Counter API responded with error');
      const data = await res.json();
      
      const rawVal = typeof data.count === 'number' ? data.count : (typeof data.value === 'number' ? data.value : undefined);
      const val = typeof rawVal === 'number' ? Math.max(rawVal, 55) : 55;
      
      let todayVal = Math.max(1, Math.round(val * 0.12));
      let yesterdayVal = Math.max(1, Math.round(val * 0.1));
      try {
        const tRes = await fetch('https://api.counterapi.dev/v1/projects/kawinfingerstyle_site_v6_stats/counters/today_views');
        if (tRes.ok) {
          const tData = await tRes.json();
          const tCount = typeof tData.count === 'number' ? tData.count : tData.value;
          if (typeof tCount === 'number') todayVal = tCount;
        }
        const yRes = await fetch('https://api.counterapi.dev/v1/projects/kawinfingerstyle_site_v6_stats/counters/yesterday_views');
        if (yRes.ok) {
          const yData = await yRes.json();
          const yCount = typeof yData.count === 'number' ? yData.count : yData.value;
          if (typeof yCount === 'number') yesterdayVal = yCount;
        }
      } catch (e) {
        // ignore and fallback to percentage
      }
      
      applyStatsData({
        totalViews: val,
        todayViews: todayVal,
        yesterdayViews: yesterdayVal,
        activeUsers: 1,
      });
      setIsConnected(true);
    };

    // Tier 4: Client-Side Simulation (Always works as a fallback)
    const runLocalSimulation = () => {
      const savedTotal = localStorage.getItem('kawin_real_total_views_v5');
      let currentTotal = savedTotal ? parseInt(savedTotal, 10) : 55;
      if (isNaN(currentTotal) || currentTotal < 55) currentTotal = 55;

      if (isNewSession) {
        currentTotal += 1;
        localStorage.setItem('kawin_real_total_views_v5', String(currentTotal));
      }

      applyStatsData({
        totalViews: currentTotal,
        todayViews: Math.max(1, Math.round(currentTotal * 0.1)),
        yesterdayViews: Math.max(1, Math.round(currentTotal * 0.08)),
        activeUsers: 1,
      });
      setIsConnected(false);
    };

    // Master statistics sequence loop
    const sendHit = async () => {
      try {
        await tryBackendStats();
      } catch (errBackend) {
        console.warn('Tier 1 Express backend failed, trying Tier 2 Firestore...', errBackend);
        try {
          await tryFirestoreStats();
        } catch (errFirestore) {
          console.warn('Tier 2 Firestore failed, trying Tier 3 Public Counter...', errFirestore);
          try {
            await tryPublicCounterStats();
          } catch (errPublic) {
            console.error('Tier 3 Public Counter failed, falling back to local simulation', errPublic);
            runLocalSimulation();
          }
        }
      }
    };

    sendHit();

    // Heartbeat ping (every 30 seconds) to maintain active online status & update stats
    const sendPing = async () => {
      if (document.visibilityState === 'hidden') return;
      try {
        const res = await fetch('/api/stats/ping', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
        if (res.ok) {
          const data = await res.json();
          applyStatsData(data);
          setIsConnected(true);
        }
      } catch (err) {
        // Fallback to firestore/counter check for sync if backend not accessible
        try {
          await tryFirestoreStats();
        } catch (errF) {
          try {
            await tryPublicCounterStats();
          } catch (errC) {
            // No action needed for local simulation in ping
          }
        }
      }
    };

    // Low-frequency heartbeat every 30 seconds
    const pingInterval = setInterval(sendPing, 30000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        sendPing();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(pingInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-center py-2.5 px-4 text-xs sm:text-sm text-slate-300">
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4 text-amber-500 shrink-0" />
        <span className="font-normal text-slate-300">ผู้เข้าชมเว็บไซต์ทั้งหมด:</span>
        <span className="font-bold text-amber-400 font-mono text-sm sm:text-base">
          {totalViews.toLocaleString('th-TH')}
        </span>
        <span className="font-normal text-slate-300">ครั้ง</span>
      </div>
    </div>
  );
};
