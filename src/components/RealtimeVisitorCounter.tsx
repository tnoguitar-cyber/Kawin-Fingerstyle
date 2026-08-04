import React, { useState, useEffect } from 'react';
import { Eye, TrendingUp } from 'lucide-react';

export const RealtimeVisitorCounter: React.FC = () => {
  const [totalViews, setTotalViews] = useState<number>(() => {
    const saved = localStorage.getItem('kawin_real_total_views_v3');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [todayViews, setTodayViews] = useState<number>(() => {
    const saved = localStorage.getItem('kawin_real_today_views_v3');
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
            setTotalViews(data.totalViews);
            localStorage.setItem('kawin_real_total_views_v3', String(data.totalViews));
          }
          if (typeof data.todayViews === 'number') {
            setTodayViews(data.todayViews);
            localStorage.setItem('kawin_real_today_views_v3', String(data.todayViews));
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
            setTotalViews(data.totalViews);
            localStorage.setItem('kawin_real_total_views_v3', String(data.totalViews));
          }
          if (typeof data.todayViews === 'number') {
            setTodayViews(data.todayViews);
            localStorage.setItem('kawin_real_today_views_v3', String(data.todayViews));
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
    <div className="w-full bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-xl py-2 px-3 sm:px-4 text-white shadow-sm my-1">
      <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs">
        
        {/* Left Side: Realtime Online Badge */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-400 text-[11px] font-medium">ออนไลน์ขณะนี้:</span>
          <span className="font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded text-[11px] border border-emerald-500/20">
            {activeUsers} คน
          </span>
        </div>

        {/* Right Side: Total & Today Stats */}
        <div className="flex items-center gap-3.5 text-[11px]">
          {/* Today Views */}
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-slate-400">วันนี้:</span>
            <span className="font-semibold text-amber-300 font-mono">
              {todayViews.toLocaleString('th-TH')}
            </span>
          </div>

          <span className="text-slate-700">|</span>

          {/* Total Views */}
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="text-slate-400">เข้าชมทั้งหมด:</span>
            <span className="font-semibold text-sky-300 font-mono">
              {totalViews.toLocaleString('th-TH')}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
