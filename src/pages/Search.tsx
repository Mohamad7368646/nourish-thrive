import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Filter, FileText, UtensilsCrossed, X, Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
}

interface Recipe {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  tags: string[] | null;
  calories: number | null;
  difficulty: string | null;
  prep_time: number | null;
  cook_time: number | null;
}

const recipeTags = ['Keto', 'Vegan', 'Low-Carb', 'High-Protein', 'Gluten-Free', 'Vegetarian'];
const difficultyOptions = ['easy', 'medium'];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [contentType, setContentType] = useState(searchParams.get('type') || 'all');
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags')?.split(',').filter(Boolean) || []
  );
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const performSearch = async () => {
    setLoading(true);
    try {
      const searchTerm = query ? `%${query}%` : '%';

      // Fetch articles if needed
      if (contentType === 'all' || contentType === 'articles') {
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
      } else {
        setArticles([]);
      }

      // Fetch recipes if needed
      if (contentType === 'all' || contentType === 'recipes') {
        let recipeQuery = supabase
          .from('recipes')
          .select('id, title, slug, description, image_url, tags, calories, difficulty, prep_time, cook_time')
          .eq('published', true);

        if (query) {
          recipeQuery = recipeQuery.or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`);
        }

        if (difficulty !== 'all') {
          recipeQuery = recipeQuery.eq('difficulty', difficulty);
        }

        if (selectedTags.length > 0) {
          recipeQuery = recipeQuery.overlaps('tags', selectedTags);
        }

        if (sortBy === 'newest') {
          recipeQuery = recipeQuery.order('created_at', { ascending: false });
        } else if (sortBy === 'calories') {
          recipeQuery = recipeQuery.order('calories', { ascending: true });
        } else {
          recipeQuery = recipeQuery.order('title', { ascending: true });
        }

        const { data } = await recipeQuery.limit(20);
        setRecipes(data || []);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performSearch();
    
    // Update URL params
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (contentType !== 'all') params.set('type', contentType);
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
    if (difficulty !== 'all') params.set('difficulty', difficulty);
    if (sortBy !== 'newest') params.set('sort', sortBy);
    setSearchParams(params, { replace: true });
  }, [query, contentType, selectedTags, difficulty, sortBy]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setContentType('all');
    setSelectedTags([]);
    setDifficulty('all');
    setSortBy('newest');
  };

  const hasActiveFilters = contentType !== 'all' || selectedTags.length > 0 || difficulty !== 'all';
  const totalResults = articles.length + recipes.length;

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Content Type */}
      <div>
        <Label className="text-sm font-medium mb-3 block">نوع المحتوى</Label>
        <Select value={contentType} onValueChange={setContentType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            <SelectItem value="articles">مقالات فقط</SelectItem>
            <SelectItem value="recipes">وصفات فقط</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Recipe Tags */}
      {(contentType === 'all' || contentType === 'recipes') && (
        <div>
          <Label className="text-sm font-medium mb-3 block">تصنيفات الوصفات</Label>
          <div className="flex flex-wrap gap-2">
            {recipeTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Difficulty */}
      {(contentType === 'all' || contentType === 'recipes') && (
        <div>
          <Label className="text-sm font-medium mb-3 block">مستوى الصعوبة</Label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="easy">سهل</SelectItem>
              <SelectItem value="medium">متوسط</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Sort By */}
      <div>
        <Label className="text-sm font-medium mb-3 block">ترتيب حسب</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">الأحدث</SelectItem>
            <SelectItem value="alphabetical">أبجدياً</SelectItem>
            {(contentType === 'all' || contentType === 'recipes') && (
              <SelectItem value="calories">السعرات (الأقل أولاً)</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          <X className="w-4 h-4 mr-2" />
          مسح الفلاتر
        </Button>
      )}
    </div>
  );

  return (
    <Layout>
      <Helmet>
        <title>البحث المتقدم - Healthy Life Hub</title>
        <meta name="description" content="ابحث في مكتبتنا الواسعة من المقالات الصحية والوصفات المغذية" />
      </Helmet>

      <div className="container-custom py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            البحث المتقدم
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ابحث في المقالات والوصفات الصحية واستخدم الفلاتر للوصول لما تريد
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="ابحث عن مقالات أو وصفات..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filters */}
          <div className="lg:hidden">
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full gap-2">
                  <Filter className="w-4 h-4" />
                  الفلاتر
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedTags.length + (contentType !== 'all' ? 1 : 0) + (difficulty !== 'all' ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>فلاتر البحث</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  الفلاتر
                </h3>
                <FiltersContent />
              </CardContent>
            </Card>
          </aside>

          {/* Results */}
          <main className="flex-1">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {loading ? 'جاري البحث...' : `${totalResults} نتيجة`}
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            ) : totalResults === 0 ? (
              <div className="text-center py-16">
                <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">لا توجد نتائج</h3>
                <p className="text-muted-foreground">
                  جرب كلمات بحث مختلفة أو قم بتغيير الفلاتر
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Articles */}
                {articles.length > 0 && (
                  <div>
                    <h2 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      المقالات ({articles.length})
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {articles.map((article) => (
                        <Link key={article.id} to={`/articles/${article.slug}`}>
                          <Card className="group overflow-hidden h-full hover:shadow-lg transition-shadow">
                            <div className="flex h-full">
                              {article.image_url && (
                                <img
                                  src={article.image_url}
                                  alt={article.title}
                                  className="w-24 h-full object-cover flex-shrink-0"
                                />
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

                {/* Recipes */}
                {recipes.length > 0 && (
                  <div>
                    <h2 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
                      <UtensilsCrossed className="w-5 h-5 text-primary" />
                      الوصفات ({recipes.length})
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {recipes.map((recipe) => (
                        <Link key={recipe.id} to={`/recipes/${recipe.slug}`}>
                          <Card className="group overflow-hidden h-full hover:shadow-lg transition-shadow">
                            {recipe.image_url && (
                              <div className="relative h-36 overflow-hidden">
                                <img
                                  src={recipe.image_url}
                                  alt={recipe.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {recipe.difficulty && (
                                  <Badge className="absolute top-2 right-2" variant="secondary">
                                    {recipe.difficulty === 'easy' ? 'سهل' : 'متوسط'}
                                  </Badge>
                                )}
                              </div>
                            )}
                            <CardContent className="p-4">
                              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-2">
                                {recipe.title}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                {recipe.calories && <span>{recipe.calories} سعرة</span>}
                                {recipe.prep_time && recipe.cook_time && (
                                  <span>{recipe.prep_time + recipe.cook_time} دقيقة</span>
                                )}
                              </div>
                              {recipe.tags && (
                                <div className="flex flex-wrap gap-1">
                                  {recipe.tags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
