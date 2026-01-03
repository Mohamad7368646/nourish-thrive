import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Users, Eye } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    articles: 0,
    todayVisits: 0,
    totalVisits: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [articlesRes, todayVisitsRes, totalVisitsRes] = await Promise.all([
        supabase.from('articles').select('id', { count: 'exact', head: true }),
        supabase
          .from('site_visits')
          .select('id', { count: 'exact', head: true })
          .gte('visited_at', today.toISOString()),
        supabase.from('site_visits').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        articles: articlesRes.count || 0,
        todayVisits: todayVisitsRes.count || 0,
        totalVisits: totalVisitsRes.count || 0,
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'إجمالي المقالات',
      value: stats.articles,
      icon: FileText,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      title: 'زيارات اليوم',
      value: stats.todayVisits,
      icon: Users,
      color: 'text-secondary',
      bg: 'bg-secondary/10',
    },
    {
      title: 'إجمالي الزيارات',
      value: stats.totalVisits,
      icon: Eye,
      color: 'text-health-blue',
      bg: 'bg-health-blue/10',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-8">مرحباً بك في لوحة التحكم</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
