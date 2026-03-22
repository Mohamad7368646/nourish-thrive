import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, Loader2, Clock, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/i18n/LanguageContext';
import { useLocalizedArticle } from '@/hooks/useLocalizedArticle';

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  image_url?: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { getTitle: getArticleTitle } = useLocalizedArticle();

  const { data: suggestions } = useQuery({
    queryKey: ['search-suggestions'],
    queryFn: async () => {
      const { data } = await supabase.from('articles').select('id, title, title_en, slug, image_url').eq('published', true).order('created_at', { ascending: false }).limit(6);
      return { recentArticles: data || [] };
    },
    enabled: open,
  });

  const autocompleteSuggestions = (() => {
    if (!query.trim() || query.length < 2) return [];
    const allTitles = suggestions?.recentArticles?.map(a => ({ title: getArticleTitle(a), slug: a.slug })) || [];
    return allTitles.filter(item => item.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  })();

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const searchTimeout = setTimeout(async () => {
      setLoading(true);
      try {
        const searchTerm = `%${query}%`;
        const { data: articles } = await supabase.from('articles').select('id, title, title_en, slug, excerpt, excerpt_en, image_url').eq('published', true).or(`title.ilike.${searchTerm},excerpt.ilike.${searchTerm},title_en.ilike.${searchTerm},excerpt_en.ilike.${searchTerm}`).limit(10);
        setResults((articles || []).map(a => ({ ...a })));
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleResultClick = (slug: string) => {
    navigate(`/articles/${slug}`);
    onOpenChange(false);
    setQuery('');
  };

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
                <button key={item.slug} onClick={() => handleResultClick(item.slug)} className="w-full flex items-center gap-2 p-2 rounded hover:bg-accent transition-colors text-sm">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {query && results.length > 0 && !loading && (
          <div className="flex-1 overflow-y-auto mt-4 space-y-2">
            {results.map((result) => (
              <button key={result.id} onClick={() => handleResultClick(result.slug)} className="w-full flex items-start gap-4 p-3 rounded-lg hover:bg-accent transition-colors">
                {result.image_url && (
                  <img src={result.image_url} alt={result.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0 text-start">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-medium text-foreground truncate">{result.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{result.excerpt}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {query && loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {query && !loading && results.length === 0 && autocompleteSuggestions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>{t.searchDialog.noResultsFor} "{query}"</p>
            <p className="text-sm mt-1">{t.searchDialog.tryDifferent}</p>
          </div>
        )}

        {!query && (
          <div className="space-y-6 py-4 overflow-y-auto">
            {suggestions?.recentArticles && suggestions.recentArticles.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  {t.searchDialog.recentArticles}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {suggestions.recentArticles.map((article) => (
                    <button key={article.id} onClick={() => handleResultClick(article.slug)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors">
                      {article.image_url && <img src={article.image_url} alt={article.title} className="w-10 h-10 rounded object-cover flex-shrink-0" />}
                      <span className="text-sm text-foreground line-clamp-2 flex-1 text-start">{getArticleTitle(article)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!suggestions?.recentArticles?.length && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg">{t.searchDialog.startTyping}</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
