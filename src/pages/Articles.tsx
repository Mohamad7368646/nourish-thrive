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

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  created_at: string;
  published: boolean | null;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, slug, excerpt, image_url, created_at, published')
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
    return article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getReadTime = (excerpt: string | null) => {
    const words = excerpt ? excerpt.split(' ').length : 0;
    const minutes = Math.max(3, Math.ceil(words / 50));
    return `${minutes} دقائق قراءة`;
  };

  // Collection page schema
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'المقالات الصحية | Healthy Life Hub',
    description: 'تصفح مجموعتنا من المقالات الصحية والتغذوية المبنية على الأدلة العلمية',
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
        <title>المقالات الصحية | Healthy Life Hub - دليلك للحياة الصحية</title>
        <meta name="title" content="المقالات الصحية | Healthy Life Hub - دليلك للحياة الصحية" />
        <meta name="description" content="تصفح مجموعتنا من المقالات الصحية والتغذوية المبنية على الأدلة العلمية. نصائح طبية، حميات غذائية، ولياقة بدنية." />
        <meta name="keywords" content="مقالات صحية, نصائح تغذية, حياة صحية, صحة, تغذية, حمية غذائية, لياقة بدنية, نصائح طبية" />
        <link rel="canonical" href="https://healthylifehub.com/articles" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://healthylifehub.com/articles" />
        <meta property="og:title" content="المقالات الصحية | Healthy Life Hub" />
        <meta property="og:description" content="تصفح مجموعتنا من المقالات الصحية والتغذوية المبنية على الأدلة العلمية." />
        <meta property="og:image" content="https://healthylifehub.com/og-articles.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="المقالات الصحية | Healthy Life Hub" />
        <meta name="twitter:description" content="تصفح مجموعتنا من المقالات الصحية والتغذوية المبنية على الأدلة العلمية." />
        
        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>
      
      <BreadcrumbSchema
        items={[
          { name: 'الرئيسية', url: '/' },
          { name: 'المقالات', url: '/articles' },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent/50 to-background py-12 md:py-16" dir="rtl">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              المقالات الصحية
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              معلومات موثوقة لمساعدتك على اتخاذ قرارات صحية أفضل
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="ابحث في المقالات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 pl-4 py-6 text-base rounded-xl border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding" dir="rtl">
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
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {article.excerpt}
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
              <p className="text-muted-foreground">لا توجد مقالات تطابق البحث.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Articles;
