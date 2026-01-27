import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, UtensilsCrossed, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';

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

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTimeout = setTimeout(async () => {
      setLoading(true);
      try {
        const searchTerm = `%${query}%`;
        
        // Search articles
        const { data: articles } = await supabase
          .from('articles')
          .select('id, title, slug, excerpt, image_url')
          .eq('published', true)
          .or(`title.ilike.${searchTerm},excerpt.ilike.${searchTerm}`)
          .limit(5);

        // Search recipes
        const { data: recipes } = await supabase
          .from('recipes')
          .select('id, title, slug, description, image_url, tags, calories, difficulty')
          .eq('published', true)
          .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
          .limit(5);

        const articleResults: SearchResult[] = (articles || []).map(a => ({
          ...a,
          type: 'article' as const,
        }));

        const recipeResults: SearchResult[] = (recipes || []).map(r => ({
          ...r,
          type: 'recipe' as const,
        }));

        setResults([...articleResults, ...recipeResults]);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const filteredResults = results.filter(result => {
    if (activeTab === 'all') return true;
    return result.type === activeTab;
  });

  const handleResultClick = (result: SearchResult) => {
    const path = result.type === 'article' 
      ? `/articles/${result.slug}` 
      : `/recipes/${result.slug}`;
    navigate(path);
    onOpenChange(false);
    setQuery('');
  };

  const articleCount = results.filter(r => r.type === 'article').length;
  const recipeCount = results.filter(r => r.type === 'recipe').length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">البحث المتقدم</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="ابحث في المقالات والوصفات..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10 py-6 text-lg"
            autoFocus
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setQuery('')}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {query && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" className="gap-2">
                الكل
                <Badge variant="secondary" className="text-xs">
                  {results.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="article" className="gap-2">
                <FileText className="w-4 h-4" />
                مقالات
                <Badge variant="secondary" className="text-xs">
                  {articleCount}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="recipe" className="gap-2">
                <UtensilsCrossed className="w-4 h-4" />
                وصفات
                <Badge variant="secondary" className="text-xs">
                  {recipeCount}
                </Badge>
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
                      className="w-full flex items-start gap-4 p-3 rounded-lg hover:bg-accent transition-colors text-right"
                    >
                      {result.image_url && (
                        <img
                          src={result.image_url}
                          alt={result.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {result.type === 'article' ? (
                            <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                          ) : (
                            <UtensilsCrossed className="w-4 h-4 text-primary flex-shrink-0" />
                          )}
                          <span className="font-medium text-foreground truncate">
                            {result.title}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {result.excerpt || result.description}
                        </p>
                        {result.type === 'recipe' && result.tags && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {result.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
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
                  <p>لا توجد نتائج لـ "{query}"</p>
                  <p className="text-sm mt-1">جرب كلمات بحث مختلفة</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}

        {!query && (
          <div className="text-center py-8 text-muted-foreground">
            <Search className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">ابدأ الكتابة للبحث</p>
            <p className="text-sm mt-2">ابحث في المقالات والوصفات الصحية</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
