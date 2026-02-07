import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, UtensilsCrossed, Loader2, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/i18n/LanguageContext';

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  description?: string;
  image_url?: string;
  type: 'article' | 'recipe';
  tags?: string[];
  calories?: number;
  difficulty?: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const { data: suggestions } = useQuery({
    queryKey: ['search-suggestions'],
    queryFn: async () => {
      const [articlesRes, recipesRes] = await Promise.all([
        supabase.from('articles').select('id, title, slug, image_url').eq('published', true).order('created_at', { ascending: false }).limit(4),
        supabase.from('recipes').select('id, title, slug, image_url, tags').eq('published', true).order('created_at', { ascending: false }).limit(4),
      ]);
      return { recentArticles: articlesRes.data || [], recentRecipes: recipesRes.data || [] };
    },
    enabled: open,
  });

  const popularTags = useMemo(() => {
    if (!suggestions?.recentRecipes) return [];
    const tagCounts: Record<string, number> = {};
    suggestions.recentRecipes.forEach(recipe => {
      recipe.tags?.forEach(tag => { tagCounts[tag] = (tagCounts[tag] || 0) + 1; });
    });
    return Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([tag]) => tag);
  }, [suggestions]);

  const autocompleteSuggestions = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const allTitles = [
      ...(suggestions?.recentArticles?.map(a => ({ title: a.title, type: 'article' as const, slug: a.slug })) || []),
      ...(suggestions?.recentRecipes?.map(r => ({ title: r.title, type: 'recipe' as const, slug: r.slug })) || []),
    ];
    return allTitles.filter(item => item.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  }, [query, suggestions]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const searchTimeout = setTimeout(async () => {
      setLoading(true);
      try {
        const searchTerm = `%${query}%`;
        const { data: articles } = await supabase.from('articles').select('id, title, slug, excerpt, image_url').eq('published', true).or(`title.ilike.${searchTerm},excerpt.ilike.${searchTerm}`).limit(5);
        const { data: recipes } = await supabase.from('recipes').select('id, title, slug, description, image_url, tags, calories, difficulty').eq('published', true).or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`).limit(5);
        const articleResults: SearchResult[] = (articles || []).map(a => ({ ...a, type: 'article' as const }));
        const recipeResults: SearchResult[] = (recipes || []).map(r => ({ ...r, type: 'recipe' as const }));
        setResults([...articleResults, ...recipeResults]);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(searchTimeout);
  }, [query]);

  const filteredResults = results.filter(result => activeTab === 'all' || result.type === activeTab);

  const handleResultClick = (result: SearchResult) => {
    navigate(result.type === 'article' ? `/articles/${result.slug}` : `/recipes/${result.slug}`);
    onOpenChange(false);
    setQuery('');
  };

  const handleSuggestionClick = (slug: string, type: 'article' | 'recipe') => {
    navigate(type === 'article' ? `/articles/${slug}` : `/recipes/${slug}`);
    onOpenChange(false);
    setQuery('');
  };

  const handleTagClick = (tag: string) => {
    navigate(`/search?tag=${encodeURIComponent(tag)}`);
    onOpenChange(false);
    setQuery('');
  };

  const articleCount = results.filter(r => r.type === 'article').length;
  const recipeCount = results.filter(r => r.type === 'recipe').length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">{t.searchDialog.title}</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder={t.searchDialog.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="ps-10 pe-10 py-6 text-lg"
            autoFocus
          />
          {query && (
            <Button variant="ghost" size="icon" className="absolute end-2 top-1/2 -translate-y-1/2" onClick={() => setQuery('')}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {query && autocompleteSuggestions.length > 0 && !loading && results.length === 0 && (
          <div className="border rounded-lg p-2 bg-muted/30">
            <p className="text-xs text-muted-foreground px-2 mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {t.searchDialog.suggestions}
            </p>
            <div className="space-y-1">
              {autocompleteSuggestions.map((item) => (
                <button
                  key={`${item.type}-${item.slug}`}
                  onClick={() => handleSuggestionClick(item.slug, item.type)}
                  className="w-full flex items-center gap-2 p-2 rounded hover:bg-accent transition-colors text-sm"
                >
                  {item.type === 'article' ? <FileText className="w-4 h-4 text-muted-foreground" /> : <UtensilsCrossed className="w-4 h-4 text-muted-foreground" />}
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {query && results.length > 0 && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" className="gap-2">
                {t.searchDialog.all}
                <Badge variant="secondary" className="text-xs">{results.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="article" className="gap-2">
                <FileText className="w-4 h-4" />
                {t.searchDialog.articles}
                <Badge variant="secondary" className="text-xs">{articleCount}</Badge>
              </TabsTrigger>
              <TabsTrigger value="recipe" className="gap-2">
                <UtensilsCrossed className="w-4 h-4" />
                {t.searchDialog.recipes}
                <Badge variant="secondary" className="text-xs">{recipeCount}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="flex-1 overflow-y-auto mt-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : filteredResults.length > 0 ? (
                <div className="space-y-2">
                  {filteredResults.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => handleResultClick(result)}
                      className="w-full flex items-start gap-4 p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      {result.image_url && (
                        <img src={result.image_url} alt={result.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0 text-start">
                        <div className="flex items-center gap-2 mb-1">
                          {result.type === 'article' ? <FileText className="w-4 h-4 text-primary flex-shrink-0" /> : <UtensilsCrossed className="w-4 h-4 text-primary flex-shrink-0" />}
                          <span className="font-medium text-foreground truncate">{result.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{result.excerpt || result.description}</p>
                        {result.type === 'recipe' && result.tags && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {result.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>{t.searchDialog.noResultsFor} "{query}"</p>
                  <p className="text-sm mt-1">{t.searchDialog.tryDifferent}</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}

        {query && loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {!query && (
          <div className="space-y-6 py-4 overflow-y-auto">
            {popularTags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  {t.searchDialog.popularTags}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Button key={tag} variant="outline" size="sm" onClick={() => handleTagClick(tag)} className="rounded-full">{tag}</Button>
                  ))}
                </div>
              </div>
            )}

            {suggestions?.recentArticles && suggestions.recentArticles.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  {t.searchDialog.recentArticles}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {suggestions.recentArticles.map((article) => (
                    <button key={article.id} onClick={() => handleSuggestionClick(article.slug, 'article')} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors">
                      {article.image_url && <img src={article.image_url} alt={article.title} className="w-10 h-10 rounded object-cover flex-shrink-0" />}
                      <span className="text-sm text-foreground line-clamp-2 flex-1 text-start">{article.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {suggestions?.recentRecipes && suggestions.recentRecipes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-primary" />
                  {t.searchDialog.recentRecipes}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {suggestions.recentRecipes.map((recipe) => (
                    <button key={recipe.id} onClick={() => handleSuggestionClick(recipe.slug, 'recipe')} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors">
                      {recipe.image_url && <img src={recipe.image_url} alt={recipe.title} className="w-10 h-10 rounded object-cover flex-shrink-0" />}
                      <span className="text-sm text-foreground line-clamp-2 flex-1 text-start">{recipe.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!suggestions?.recentArticles?.length && !suggestions?.recentRecipes?.length && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg">{t.searchDialog.startTyping}</p>
                <p className="text-sm mt-2">{t.searchDialog.searchHealthContent}</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
