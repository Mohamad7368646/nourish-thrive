import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, FileText, Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
}

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const performSearch = async () => {
    setLoading(true);
    try {
      const searchTerm = query ? `%${query}%` : '%';
      let articleQuery = supabase
        .from('articles')
        .select('id, title, slug, excerpt, image_url')
        .eq('published', true);

      if (query) {
        articleQuery = articleQuery.or(`title.ilike.${searchTerm},excerpt.ilike.${searchTerm}`);
      }

      if (sortBy === 'newest') {
        articleQuery = articleQuery.order('created_at', { ascending: false });
      } else {
        articleQuery = articleQuery.order('title', { ascending: true });
      }

      const { data } = await articleQuery.limit(20);
      setArticles(data || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performSearch();
  }, [sortBy]);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (query) params.q = query;
    if (sortBy !== 'newest') params.sort = sortBy;
    setSearchParams(params, { replace: true });
  }, [query, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  return (
    <Layout>
      <Helmet>
        <title>البحث | Healthy Life Hub</title>
        <meta name="description" content="ابحث في مقالات الصحة والتغذية" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container-custom py-8">
          <div className="max-w-2xl mx-auto mb-8">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-6 text-center">البحث في المقالات</h1>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث عن مقال..."
                  className="ps-10"
                />
              </div>
              <Button type="submit">بحث</Button>
            </form>
            <div className="flex justify-end mt-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">الأحدث</SelectItem>
                  <SelectItem value="alpha">أبجدي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <main>
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">لا توجد نتائج</p>
              </div>
            ) : (
              <div>
                <h2 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  المقالات ({articles.length})
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {articles.map((article) => (
                    <Link key={article.id} to={`/articles/${article.slug}`}>
                      <Card className="group overflow-hidden h-full hover:shadow-lg transition-shadow">
                        <div className="flex flex-col h-full">
                          {article.image_url && (
                            <div className="relative h-36 overflow-hidden">
                              <img
                                src={article.image_url}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <CardContent className="p-4 flex-1">
                            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                              {article.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {article.excerpt}
                            </p>
                          </CardContent>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
