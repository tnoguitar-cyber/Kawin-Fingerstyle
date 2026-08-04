import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

export const RealtimeVisitorCounter: React.FC = () => {
  const [totalViews, setTotalViews] = useState<number>(() => {
    const saved = localStorage.getItem('kawin_real_total_views_v4');
    const parsed = saved ? parseInt(saved, 10) : 1356;
    return isNaN(parsed) || parsed < 1356 ? 1356 : parsed;
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

    // Register visit hit with backend server
    const sendHit = async () => {
      try {
        const res = await fetch('/api/stats/hit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, isNewSession }),
        });
        if (res.ok) {
          const data = await res.json();
          if (typeof data.totalViews === 'number') {
            const finalCount = Math.max(data.totalViews, 1356);
            setTotalViews(finalCount);
            localStorage.setItem('kawin_real_total_views_v4', String(finalCount));
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
          setIsConnected(true);
        }
      } catch (err) {
        console.warn('Backend stats hit failed, using cached baseline', err);
        setIsConnected(false);
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
          if (typeof data.totalViews === 'number') {
            const finalCount = Math.max(data.totalViews, 1356);
            setTotalViews(finalCount);
            localStorage.setItem('kawin_real_total_views_v4', String(finalCount));
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
          setIsConnected(true);
        }
      } catch (err) {
        // Silent catch for network hiccups
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
