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

export const RealtimeVisitorCounter: React.FC = () => {
  const [totalViews, setTotalViews] = useState<number>(1);
  const [todayViews, setTodayViews] = useState<number>(1);
  const [activeUsers, setActiveUsers] = useState<number>(1);

  useEffect(() => {
    // 1. Subscribe to real-time site stats in Firebase Firestore
    const statsDocRef = doc(db, 'site_stats', 'global');

    const unsubscribeStats = onSnapshot(statsDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const todayStr = new Date().toISOString().split('T')[0];
        
        if (data.lastUpdatedDate === todayStr) {
          setTodayViews(data.todayViews || 1);
        } else {
          // If Firestore date is older than today, today's count is effectively 0 until a visit occurs today
          setTodayViews(0);
        }
        setTotalViews(data.totalViews || 1);
      }
    }, (error) => {
      console.warn("Firestore site_stats listener warning:", error);
    });

    // 2. Register pageview in Firestore (once per browser session)
    const recordPageView = async () => {
      const SESSION_KEY = 'kawin_firebase_session_visited_v1';
      if (!sessionStorage.getItem(SESSION_KEY)) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        const todayStr = new Date().toISOString().split('T')[0];

        try {
          await runTransaction(db, async (transaction) => {
            const statsDoc = await transaction.get(statsDocRef);

            if (!statsDoc.exists()) {
              transaction.set(statsDocRef, {
                totalViews: 1,
                todayViews: 1,
                lastUpdatedDate: todayStr
              });
            } else {
              const data = statsDoc.data();
              const isSameDay = data.lastUpdatedDate === todayStr;

              const newTotal = (data.totalViews || 0) + 1;
              const newToday = isSameDay ? (data.todayViews || 0) + 1 : 1;

              transaction.update(statsDocRef, {
                totalViews: newTotal,
                todayViews: newToday,
                lastUpdatedDate: todayStr
              });
            }
          });
        } catch (err) {
          console.warn("Error updating Firebase pageview:", err);
        }
      }
    };

    recordPageView();

    // 3. Real-time Active Presence in Firebase Firestore
    let sessionId = sessionStorage.getItem('kawin_firebase_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      sessionStorage.setItem('kawin_firebase_session_id', sessionId);
    }

    const presenceDocRef = doc(db, 'active_presence', sessionId);

    // Heartbeat to update lastSeen timestamp (Optimized: only when tab is visible, every 30s)
    const updatePresence = async () => {
      if (document.visibilityState === 'hidden') return;
      try {
        await setDoc(presenceDocRef, {
          sessionId,
          lastSeen: Date.now()
        });
      } catch (e) {
        // silent catch
      }
    };

    updatePresence();
    const heartbeatInterval = setInterval(updatePresence, 30000);

    // Pause/Resume heartbeat when user changes tab focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updatePresence();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Listen to all active sessions in the last 65 seconds
    const presenceColRef = collection(db, 'active_presence');
    const unsubscribePresence = onSnapshot(presenceColRef, (snapshot) => {
      const now = Date.now();
      let activeCount = 0;

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.lastSeen && (now - data.lastSeen) < 65000) {
          activeCount += 1;
        }
      });

      setActiveUsers(Math.max(1, activeCount));
    }, (error) => {
      // silent catch
    });

    // Cleanup on unload or unmount
    const handleUnload = async () => {
      try {
        await deleteDoc(presenceDocRef);
      } catch (e) {
        // ignore on unload
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(heartbeatInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      unsubscribeStats();
      unsubscribePresence();
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
