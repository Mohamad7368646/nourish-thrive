import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export function useVisitTracker() {
  const location = useLocation();

  useEffect(() => {
    const trackVisit = async () => {
      // Don't track admin pages
      if (location.pathname.startsWith('/admin') || location.pathname === '/auth') {
        return;
      }

      // Generate or get visitor ID from localStorage
      let visitorId = localStorage.getItem('visitor_id');
      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem('visitor_id', visitorId);
      }

      await supabase.from('site_visits').insert({
        page_path: location.pathname,
        visitor_id: visitorId,
        user_agent: navigator.userAgent,
      });
    };

    trackVisit();
  }, [location.pathname]);
}
