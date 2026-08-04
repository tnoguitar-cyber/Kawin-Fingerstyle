import React, { useState, useEffect } from 'react';
import { Users, Eye, TrendingUp } from 'lucide-react';
import { 
  doc, 
  collection, 
  onSnapshot, 
  runTransaction, 
  setDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// Helper to get consistent date string in Asia/Bangkok (Thailand) timezone (YYYY-MM-DD)
const getThailandDateStr = (): string => {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date());
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
};

export const RealtimeVisitorCounter: React.FC = () => {
  const [totalViews, setTotalViews] = useState<number>(() => {
    const saved = localStorage.getItem('kawin_real_total_views_v1');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [todayViews, setTodayViews] = useState<number>(() => {
    const savedDate = localStorage.getItem('kawin_real_today_date_v1');
    const savedViews = localStorage.getItem('kawin_real_today_views_v1');
    const todayStr = getThailandDateStr();
    if (savedDate === todayStr && savedViews) {
      return parseInt(savedViews, 10);
    }
    return 1;
  });

  const [activeUsers, setActiveUsers] = useState<number>(1);

  useEffect(() => {
    const todayStr = getThailandDateStr();

    // Clean up legacy cached keys if present
    localStorage.removeItem('kawin_total_views');
    localStorage.removeItem('kawin_today_views');
    localStorage.removeItem('kawin_today_date');

    // 1. Subscribe to real-time site stats in Firebase Firestore (Global live views)
    const statsDocRef = doc(db, 'site_stats', 'global');

    const unsubscribeStats = onSnapshot(statsDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const currentTodayStr = getThailandDateStr();
        const isSameDay = data.lastUpdatedDate === currentTodayStr;

        if (typeof data.totalViews === 'number') {
          setTotalViews(data.totalViews);
          localStorage.setItem('kawin_real_total_views_v1', String(data.totalViews));
        }

        const currentToday = (isSameDay && typeof data.todayViews === 'number') ? data.todayViews : 0;
        setTodayViews(currentToday);
        localStorage.setItem('kawin_real_today_views_v1', String(currentToday));
        localStorage.setItem('kawin_real_today_date_v1', currentTodayStr);
      }
    }, (err) => {
      console.warn("Realtime stats listener warning:", err);
    });

    // 2. Register real pageview in Firestore (once per browser session)
    const recordPageView = async () => {
      const SESSION_FB_KEY = 'kawin_real_session_v1';
      if (!sessionStorage.getItem(SESSION_FB_KEY)) {
        sessionStorage.setItem(SESSION_FB_KEY, 'true');

        try {
          await runTransaction(db, async (transaction) => {
            const statsDoc = await transaction.get(statsDocRef);
            const currentTodayStr = getThailandDateStr();

            if (!statsDoc.exists()) {
              transaction.set(statsDocRef, {
                totalViews: 1,
                todayViews: 1,
                lastUpdatedDate: currentTodayStr
              });
            } else {
              const data = statsDoc.data();
              const isSameDay = data.lastUpdatedDate === currentTodayStr;

              const rawTotal = typeof data.totalViews === 'number' ? data.totalViews : 0;
              const rawToday = (isSameDay && typeof data.todayViews === 'number') ? data.todayViews : 0;

              const newTotal = rawTotal + 1;
              const newToday = rawToday + 1;

              transaction.set(statsDocRef, {
                totalViews: newTotal,
                todayViews: newToday,
                lastUpdatedDate: currentTodayStr
              }, { merge: true });
            }
          });
        } catch (err) {
          console.warn("Transaction pageview warning:", err);
        }
      }
    };

    recordPageView();

    // 3. Real-time Global Active Presence in Firebase Firestore
    let sessionId = sessionStorage.getItem('kawin_firebase_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      sessionStorage.setItem('kawin_firebase_session_id', sessionId);
    }

    const presenceDocRef = doc(db, 'active_presence', sessionId);

    // Send presence heartbeat every 10 seconds
    const updatePresence = async () => {
      if (document.visibilityState === 'hidden') return;
      try {
        await setDoc(presenceDocRef, {
          sessionId,
          lastSeen: Date.now()
        });
      } catch (e) {}
    };

    updatePresence();
    const heartbeatInterval = setInterval(updatePresence, 10000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updatePresence();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Listen to active online sessions globally in the last 30 seconds
    const presenceColRef = collection(db, 'active_presence');
    const unsubscribePresence = onSnapshot(presenceColRef, (snapshot) => {
      const now = Date.now();
      let activeCount = 0;

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.lastSeen && (now - data.lastSeen) < 30000) {
          activeCount += 1;
        } else if (data.lastSeen && (now - data.lastSeen) > 90000) {
          // Clean up stale session documents older than 90 seconds
          deleteDoc(doc(db, 'active_presence', docSnap.id)).catch(() => {});
        }
      });

      setActiveUsers(Math.max(1, activeCount));
    }, (err) => {
      console.warn("Presence listener error:", err);
    });

    const handleUnload = async () => {
      try {
        await deleteDoc(presenceDocRef);
      } catch (e) {}
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(heartbeatInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (unsubscribeStats) unsubscribeStats();
      if (unsubscribePresence) unsubscribePresence();
      handleUnload();
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return (
    <div className="flex items-center justify-center py-2">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-full text-[11px] text-slate-400 font-medium shadow-inner">
        
        {/* Active Online Indicator */}
        <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold pr-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Users className="w-3 h-3" />
          <span>ออนไลน์ {activeUsers} คน</span>
        </span>

        <span className="text-slate-700">|</span>

        {/* Today Views */}
        <span className="inline-flex items-center gap-1 text-slate-300">
          <TrendingUp className="w-3 h-3 text-amber-400" />
          <span>วันนี้ <strong className="text-white font-mono">{todayViews.toLocaleString()}</strong></span>
        </span>

        <span className="text-slate-700">|</span>

        {/* Total Views */}
        <span className="inline-flex items-center gap-1 text-slate-300">
          <Eye className="w-3 h-3 text-blue-400" />
          <span>รวม <strong className="text-white font-mono">{totalViews.toLocaleString()}</strong></span>
        </span>

      </div>
    </div>
  );
};

