import React, { useState, useEffect } from 'react';
import { Eye, TrendingUp, Users, Radio } from 'lucide-react';

export const RealtimeVisitorCounter: React.FC = () => {
  const [totalViews, setTotalViews] = useState<number>(() => {
    const saved = localStorage.getItem('kawin_real_total_views_v2');
    return saved ? parseInt(saved, 10) : 3580;
  });

  const [todayViews, setTodayViews] = useState<number>(() => {
    const saved = localStorage.getItem('kawin_real_today_views_v2');
    return saved ? parseInt(saved, 10) : 42;
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
            setTotalViews(data.totalViews);
            localStorage.setItem('kawin_real_total_views_v2', String(data.totalViews));
          }
          if (typeof data.todayViews === 'number') {
            setTodayViews(data.todayViews);
            localStorage.setItem('kawin_real_today_views_v2', String(data.todayViews));
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

    // Heartbeat to keep active online status synced
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
          if (typeof data.activeUsers === 'number') {
            setActiveUsers(data.activeUsers);
          }
          setIsConnected(true);
        }
      } catch (err) {
        // Silent catch for ping
      }
    };

    const pingInterval = setInterval(sendPing, 10000);

    // Periodic sync of global stats every 5 seconds
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        if (res.ok) {
          const data = await res.json();
          if (typeof data.totalViews === 'number') {
            setTotalViews(data.totalViews);
            localStorage.setItem('kawin_real_total_views_v2', String(data.totalViews));
          }
          if (typeof data.todayViews === 'number') {
            setTodayViews(data.todayViews);
            localStorage.setItem('kawin_real_today_views_v2', String(data.todayViews));
          }
          if (typeof data.activeUsers === 'number') {
            setActiveUsers(data.activeUsers);
          }
          setIsConnected(true);
        }
      } catch (err) {
        // Keep current state on fetch error
      }
    };

    const pollInterval = setInterval(fetchStats, 5000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        sendPing();
        fetchStats();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(pingInterval);
      clearInterval(pollInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-md border-y border-amber-500/20 py-3.5 px-4 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Left Side: Realtime Online Badge */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              ขณะนี้มีผู้ใช้งานออนไลน์:
            </span>
            <span className="text-sm font-extrabold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              {activeUsers} คน
            </span>
          </div>
        </div>

        {/* Right Side: Total & Today Stats */}
        <div className="flex items-center gap-6 text-xs sm:text-sm">
          {/* Today Views */}
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400 font-medium">เข้าชมวันนี้:</span>
            <span className="font-bold text-amber-300 font-mono text-base">
              {todayViews.toLocaleString('th-TH')}
            </span>
          </div>

          {/* Total Views */}
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            <Eye className="w-4 h-4 text-sky-400" />
            <span className="text-slate-400 font-medium">ยอดเข้าชมทั้งหมด:</span>
            <span className="font-bold text-sky-300 font-mono text-base">
              {totalViews.toLocaleString('th-TH')}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
