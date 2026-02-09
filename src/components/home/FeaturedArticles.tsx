import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/i18n/LanguageContext';
import { useLocalizedArticle } from '@/hooks/useLocalizedArticle';

const FeaturedArticles = () => {
  const { t, language } = useLanguage();
  const { getTitle, getExcerpt } = useLocalizedArticle();

  const { data: articles, isLoading } = useQuery({
    queryKey: ['featured-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, title_en, slug, excerpt, excerpt_en, image_url, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t.home.latestArticles}
            </h2>
            <p className="text-muted-foreground">{t.home.latestArticlesSubtitle}</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex gap-2">
            <Link to="/articles">
              {t.common.viewAll} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-hidden border-border">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-5">
                  <Skeleton className="h-3 w-20 mb-2" />
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-1" />
                </CardContent>
              </Card>
            ))
          ) : articles && articles.length > 0 ? (
            articles.map((article, index) => (
              <Link key={article.id} to={`/articles/${article.slug}`} className="group">
                <Card className="overflow-hidden card-hover border-border h-full" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image_url || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80'}
                      alt={article.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 start-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        {t.common.article}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <p className="text-xs text-muted-foreground mb-2">
                      {new Date(article.created_at).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                    </p>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {getTitle(article)}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {getExcerpt(article) || (language === 'ar' ? 'اكتشف المزيد من المعلومات الصحية المفيدة...' : 'Discover more useful health information...')}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground">{t.common.noArticlesAvailable}</p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/articles">{t.common.exploreAllArticles}</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline">
            <Link to="/articles">{t.home.viewAllArticles}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
