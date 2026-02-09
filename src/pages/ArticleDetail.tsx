import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import ArticleSchema from '@/components/seo/ArticleSchema';
import { ShareButtons } from '@/components/share/ShareButtons';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { useLanguage } from '@/i18n/LanguageContext';
import { useLocalizedArticle } from '@/hooks/useLocalizedArticle';

interface Article {
  id: string;
  title: string;
  title_en: string | null;
  slug: string;
  content: string | null;
  content_en: string | null;
  excerpt: string | null;
  excerpt_en: string | null;
  image_url: string | null;
  created_at: string;
  updated_at?: string;
}

interface RelatedArticle {
  id: string;
  title: string;
  title_en: string | null;
  slug: string;
  excerpt: string | null;
  excerpt_en: string | null;
  image_url: string | null;
  created_at: string;
}

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();
  const { getTitle, getExcerpt, getContent } = useLocalizedArticle();

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error || !data) {
        setLoading(false);
        return;
      }

      setArticle(data);

      // Fetch related articles
      const { data: related } = await supabase
        .from('articles')
        .select('id, title, title_en, slug, excerpt, excerpt_en, image_url, created_at')
        .eq('published', true)
        .neq('id', data.id)
        .limit(3);

      if (related) {
        setRelatedArticles(related);
      }

      setLoading(false);
    };

    fetchArticle();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateISO = (dateString: string) => {
    return new Date(dateString).toISOString();
  };

  const getReadTime = (content: string | null) => {
    if (!content) return language === 'ar' ? '3 دقائق' : '3 min read';
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.max(3, Math.ceil(words / 200));
    return language === 'ar' ? `${minutes} دقائق قراءة` : `${minutes} min read`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <Helmet>
          <title>{language === 'ar' ? 'المقال غير موجود' : 'Article Not Found'} | Healthy Life Hub</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-serif font-bold mb-4">{language === 'ar' ? 'المقال غير موجود' : 'Article Not Found'}</h1>
          <Link to="/articles">
            <Button>{language === 'ar' ? 'العودة للمقالات' : 'Back to Articles'}</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const articleImage = article.image_url || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=630&fit=crop';
  const articleUrl = `/articles/${article.slug}`;

  return (
    <>
      <Helmet>
        <title>{getTitle(article)} | Healthy Life Hub</title>
        <meta name="title" content={`${getTitle(article)} | Healthy Life Hub`} />
        <meta name="description" content={getExcerpt(article) || ''} />
        <meta name="keywords" content={language === 'ar' ? 'صحة, تغذية, مقالات صحية, نصائح طبية, حياة صحية' : 'health, nutrition, healthy articles, medical tips, healthy life'} />
        <link rel="canonical" href={`https://healthylifehub.com${articleUrl}`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://healthylifehub.com${articleUrl}`} />
        <meta property="og:title" content={getTitle(article)} />
        <meta property="og:description" content={getExcerpt(article) || ''} />
        <meta property="og:image" content={articleImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={getTitle(article)} />
        <meta property="article:published_time" content={formatDateISO(article.created_at)} />
        <meta property="article:modified_time" content={formatDateISO(article.updated_at || article.created_at)} />
        <meta property="article:author" content="Healthy Life Hub" />
        <meta property="article:section" content="Health" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://healthylifehub.com${articleUrl}`} />
        <meta name="twitter:title" content={getTitle(article)} />
        <meta name="twitter:description" content={getExcerpt(article) || ''} />
        <meta name="twitter:image" content={articleImage} />
        <meta name="twitter:label1" content="Reading time" />
        <meta name="twitter:data1" content={getReadTime(getContent(article))} />
      </Helmet>
      
      {/* Structured Data */}
      <ArticleSchema
        title={getTitle(article)}
        description={getExcerpt(article) || ''}
        image={articleImage}
        url={articleUrl}
        publishedTime={formatDateISO(article.created_at)}
        modifiedTime={formatDateISO(article.updated_at || article.created_at)}
        section="Health"
      />
      
      <BreadcrumbSchema
        items={[
          { name: language === 'ar' ? 'الرئيسية' : 'Home', url: '/' },
          { name: language === 'ar' ? 'المقالات' : 'Articles', url: '/articles' },
          { name: getTitle(article), url: articleUrl },
        ]}
      />
      
      <Layout>
        {/* Hero Image */}
        <section className="relative h-[50vh] min-h-[400px]">
          <img
            src={articleImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <nav aria-label="Breadcrumb" className="mb-4">
                <Link to="/articles" className="inline-flex items-center gap-2 text-primary hover:underline">
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                  {language === 'ar' ? 'العودة للمقالات' : 'Back to Articles'}
                </Link>
              </nav>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground max-w-4xl">
                {getTitle(article)}
              </h1>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <time dateTime={formatDateISO(article.created_at)}>{formatDate(article.created_at)}</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>{getReadTime(getContent(article))}</span>
                </div>
              </div>

              {/* Share Buttons */}
              <ShareButtons 
                title={getTitle(article)} 
                description={getExcerpt(article) || ''} 
                className="mb-8"
              />

              <Separator className="mb-8" />

              {/* Excerpt */}
              {getExcerpt(article) && (
                <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium">
                  {getExcerpt(article)}
                </p>
              )}

              {/* Article Body */}
              <div 
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:font-serif prose-headings:font-bold prose-headings:text-foreground
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:text-muted-foreground prose-ul:my-4
                  prose-ol:text-muted-foreground prose-ol:my-4
                  prose-li:mb-2
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground"
                dangerouslySetInnerHTML={{ __html: getContent(article) || '' }}
              />
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <aside className="py-16 bg-muted/30" aria-labelledby="related-articles-heading">
            <div className="container mx-auto px-4">
              <h2 id="related-articles-heading" className="font-serif text-2xl font-bold text-foreground mb-8 text-center">
                {language === 'ar' ? <>مقالات <span className="text-primary">ذات صلة</span></> : <><span className="text-primary">Related</span> Articles</>}
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {relatedArticles.map((related) => (
                  <Link key={related.id} to={`/articles/${related.slug}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={related.image_url || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop'}
                          alt={getTitle(related)}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-serif font-semibold text-foreground line-clamp-2 mb-2">
                          {getTitle(related)}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {getExcerpt(related)}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        )}
      </Layout>
    </>
  );
};

export default ArticleDetail;
