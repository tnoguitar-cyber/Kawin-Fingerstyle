import React, { useState, useEffect } from 'react';
import { Users, Eye, TrendingUp } from 'lucide-react';

export const RealtimeVisitorCounter: React.FC = () => {
  const [totalViews, setTotalViews] = useState<number>(1);
  const [todayViews, setTodayViews] = useState<number>(1);
  const [activeUsers, setActiveUsers] = useState<number>(1);

  useEffect(() => {
    // 1. Real Pageviews Counter starting clean for fresh site launch
    const STORAGE_KEY_TOTAL = 'kawin_real_views_total_v3';
    const STORAGE_KEY_TODAY = 'kawin_real_views_today_v3';
    const STORAGE_KEY_DATE = 'kawin_real_views_date_v3';

    const todayStr = new Date().toISOString().split('T')[0];
    const savedDate = localStorage.getItem(STORAGE_KEY_DATE);

    let currentTotal = 0;
    let currentToday = 0;

    const savedTotal = localStorage.getItem(STORAGE_KEY_TOTAL);
    if (savedTotal) {
      currentTotal = parseInt(savedTotal, 10);
    }

    if (savedDate === todayStr) {
      const savedToday = localStorage.getItem(STORAGE_KEY_TODAY);
      if (savedToday) {
        currentToday = parseInt(savedToday, 10);
      }
    } else {
      // New day: reset today views
      currentToday = 0;
      localStorage.setItem(STORAGE_KEY_DATE, todayStr);
    }

    // Increment count for current session if not counted yet
    const SESSION_VISITED = 'kawin_session_counted_v3';
    if (!sessionStorage.getItem(SESSION_VISITED)) {
      currentTotal += 1;
      currentToday += 1;
      sessionStorage.setItem(SESSION_VISITED, 'true');
      localStorage.setItem(STORAGE_KEY_TOTAL, currentTotal.toString());
      localStorage.setItem(STORAGE_KEY_TODAY, currentToday.toString());
      localStorage.setItem(STORAGE_KEY_DATE, todayStr);
    } else {
      // If already visited in this session, ensure at least 1
      if (currentTotal === 0) currentTotal = 1;
      if (currentToday === 0) currentToday = 1;
    }

    setTotalViews(currentTotal);
    setTodayViews(currentToday);

    // 2. Real Active Tabs/Sessions tracking via BroadcastChannel
    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel('kawin_visitor_presence');
      const myTabId = Math.random().toString(36).substring(2, 9);
      const activeTabs = new Set<string>([myTabId]);

      const pingOthers = () => {
        channel.postMessage({ type: 'PING', tabId: myTabId });
      };

      channel.onmessage = (event) => {
        const { type, tabId } = event.data || {};
        if (type === 'PING') {
          if (tabId && tabId !== myTabId) {
            activeTabs.add(tabId);
            setActiveUsers(activeTabs.size);
            // Respond back so sender knows we are online
            channel.postMessage({ type: 'PONG', tabId: myTabId });
          }
        } else if (type === 'PONG') {
          if (tabId && tabId !== myTabId) {
            activeTabs.add(tabId);
            setActiveUsers(activeTabs.size);
          }
        } else if (type === 'BYE') {
          if (tabId) {
            activeTabs.delete(tabId);
            setActiveUsers(Math.max(1, activeTabs.size));
          }
        }
      };

      // Announce presence
      pingOthers();
      const pingInterval = setInterval(pingOthers, 4000);

      const handleUnload = () => {
        channel.postMessage({ type: 'BYE', tabId: myTabId });
        channel.close();
      };

      window.addEventListener('beforeunload', handleUnload);

      return () => {
        clearInterval(pingInterval);
        handleUnload();
        window.removeEventListener('beforeunload', handleUnload);
      };
    } else {
      setActiveUsers(1);
    }
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
