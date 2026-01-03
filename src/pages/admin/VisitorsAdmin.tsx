import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2, TrendingUp, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface DailyVisits {
  date: string;
  count: number;
}

interface Visit {
  id: string;
  page_path: string;
  visited_at: string;
  user_agent: string | null;
}

export default function VisitorsAdmin() {
  const [recentVisits, setRecentVisits] = useState<Visit[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyVisits[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalVisits, setTotalVisits] = useState(0);
  const [todayVisits, setTodayVisits] = useState(0);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchVisits = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const [recentRes, totalRes, todayRes] = await Promise.all([
        supabase
          .from('site_visits')
          .select('*')
          .order('visited_at', { ascending: false })
          .limit(50),
        supabase
          .from('site_visits')
          .select('id', { count: 'exact', head: true }),
        supabase
          .from('site_visits')
          .select('id', { count: 'exact', head: true })
          .gte('visited_at', today.toISOString()),
      ]);

      if (recentRes.data) {
        setRecentVisits(recentRes.data);
        
        // Calculate daily stats from recent visits
        const dailyMap = new Map<string, number>();
        recentRes.data.forEach((visit) => {
          const date = new Date(visit.visited_at).toLocaleDateString('ar-SA');
          dailyMap.set(date, (dailyMap.get(date) || 0) + 1);
        });
        
        const stats: DailyVisits[] = [];
        dailyMap.forEach((count, date) => {
          stats.push({ date, count });
        });
        setDailyStats(stats.slice(0, 7));
      }

      setTotalVisits(totalRes.count || 0);
      setTodayVisits(todayRes.count || 0);
      setLoading(false);
    };

    fetchVisits();
  }, []);

  const getBrowserFromUA = (ua: string | null) => {
    if (!ua) return 'غير معروف';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'آخر';
  };

  if (!isAdmin) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">ليس لديك صلاحية للوصول إلى هذه الصفحة</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-8">إحصائيات الزوار</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              زيارات اليوم
            </CardTitle>
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{todayVisits}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              إجمالي الزيارات
            </CardTitle>
            <div className="p-2 rounded-lg bg-secondary/10">
              <TrendingUp className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalVisits}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              الصفحات المختلفة
            </CardTitle>
            <div className="p-2 rounded-lg bg-health-blue/10">
              <MapPin className="h-5 w-5 text-health-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {new Set(recentVisits.map((v) => v.page_path)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Stats */}
      {dailyStats.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>الزيارات اليومية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-4 h-40">
              {dailyStats.map((stat, i) => {
                const maxCount = Math.max(...dailyStats.map((s) => s.count));
                const height = (stat.count / maxCount) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-primary rounded-t transition-all duration-300"
                      style={{ height: `${height}%`, minHeight: '4px' }}
                    />
                    <span className="text-xs text-muted-foreground">{stat.count}</span>
                    <span className="text-xs text-muted-foreground truncate max-w-full">
                      {stat.date}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Visits Table */}
      <Card>
        <CardHeader>
          <CardTitle>آخر الزيارات</CardTitle>
        </CardHeader>
        <CardContent>
          {recentVisits.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">لا توجد زيارات بعد</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الصفحة</TableHead>
                  <TableHead>المتصفح</TableHead>
                  <TableHead>التاريخ والوقت</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentVisits.map((visit) => (
                  <TableRow key={visit.id}>
                    <TableCell className="font-mono text-sm" dir="ltr">
                      {visit.page_path}
                    </TableCell>
                    <TableCell>{getBrowserFromUA(visit.user_agent)}</TableCell>
                    <TableCell>
                      {new Date(visit.visited_at).toLocaleString('ar-SA')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
