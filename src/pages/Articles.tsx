import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Search, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import Layout from '@/components/layout/Layout';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { useLanguage } from '@/i18n/LanguageContext';
import { useLocalizedArticle } from '@/hooks/useLocalizedArticle';

interface Article {
  id: string;
  title: string;
  title_en: string | null;
  slug: string;
  excerpt: string | null;
  excerpt_en: string | null;
  image_url: string | null;
  created_at: string;
  published: boolean | null;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { t, language } = useLanguage();
  const { getTitle, getExcerpt } = useLocalizedArticle();

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, title_en, slug, excerpt, excerpt_en, image_url, created_at, published')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setArticles(data);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const title = getTitle(article).toLowerCase();
    const excerpt = (getExcerpt(article) || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    return title.includes(query) || excerpt.includes(query);
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getReadTime = (excerpt: string | null) => {
    const words = excerpt ? excerpt.split(' ').length : 0;
    const minutes = Math.max(3, Math.ceil(words / 50));
    return `${minutes} ${t.articlesPage.readTime}`;
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Health Articles | Healthy Life Hub',
    description: 'Browse our collection of evidence-based health and nutrition articles',
    url: 'https://healthylifehub.com/articles',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.slice(0, 10).map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://healthylifehub.com/articles/${article.slug}`,
        name: article.title,
      })),
    },
  };

  return (
    <Layout>
      <Helmet>
        <title>{t.articlesPage.title} | Healthy Life Hub</title>
        <meta name="description" content={t.articlesPage.subtitle} />
        <link rel="canonical" href="https://healthylifehub.com/articles" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://healthylifehub.com/articles" />
        <meta property="og:title" content={`${t.articlesPage.title} | Healthy Life Hub`} />
        <meta property="og:description" content={t.articlesPage.subtitle} />
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>
      
      <BreadcrumbSchema
        items={[
          { name: t.nav.home, url: '/' },
          { name: t.nav.articles, url: '/articles' },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent/50 to-background py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.articlesPage.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t.articlesPage.subtitle}
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t.articlesPage.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-12 pe-4 py-6 text-base rounded-xl border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-5 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link key={article.id} to={`/articles/${article.slug}`} className="group">
                  <Card className="overflow-hidden card-hover h-full border-border">
                    <div className="relative overflow-hidden">
                      <img
                        src={article.image_url || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80'}
                        alt={article.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {getTitle(article)}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {getExcerpt(article)}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getReadTime(article.excerpt)}
                        </span>
                        <span>{formatDate(article.created_at)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t.articlesPage.noArticles}</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Articles;
