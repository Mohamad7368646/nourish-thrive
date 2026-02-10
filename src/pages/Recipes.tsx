import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Search, Clock, Flame, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { useLanguage } from '@/i18n/LanguageContext';
import { useLocalizedRecipe } from '@/hooks/useLocalizedRecipe';

interface Recipe {
  id: string;
  title: string;
  title_en: string | null;
  slug: string;
  description: string | null;
  description_en: string | null;
  image_url: string | null;
  prep_time: number | null;
  cook_time: number | null;
  servings: number | null;
  difficulty: string | null;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  tags: string[] | null;
}

const diets = ['All Diets', 'Vegan', 'Vegetarian', 'Keto', 'Low-Carb', 'High-Protein', 'Gluten-Free'];

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('All Diets');
  const { t } = useLanguage();
  const { getTitle, getDescription } = useLocalizedRecipe();

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('id, title, title_en, slug, description, description_en, image_url, prep_time, cook_time, servings, difficulty, calories, protein, carbs, fat, tags')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setRecipes(data);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const title = getTitle(recipe);
    const desc = getDescription(recipe);
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (desc && desc.toLowerCase().includes(searchQuery.toLowerCase()));
    const normalize = (s: string) => s.toLowerCase().replace(/[-\s]/g, '');
    const matchesDiet = selectedDiet === 'All Diets' || 
      (recipe.tags && recipe.tags.some(tag => 
        normalize(tag).includes(normalize(selectedDiet))
      ));
    return matchesSearch && matchesDiet;
  });

  const formatTime = (prepTime: number | null, cookTime: number | null) => {
    const total = (prepTime || 0) + (cookTime || 0);
    if (total >= 60) {
      const hours = Math.floor(total / 60);
      const mins = total % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${total} ${t.common.min}`;
  };

  const getDifficultyLabel = (difficulty: string | null) => {
    switch (difficulty) {
      case 'easy': return t.common.easy;
      case 'medium': return t.common.medium;
      case 'hard': return t.common.hard;
      default: return t.common.easy;
    }
  };

  const getDietLabel = (diet: string) => {
    if (diet === 'All Diets') return t.common.allDiets;
    return diet;
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Healthy Recipes | Healthy Life Hub',
    description: 'Discover delicious and nutritious recipes for every meal with full nutritional information.',
    url: 'https://healthylifehub.com/recipes',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: recipes.length,
      itemListElement: recipes.slice(0, 10).map((recipe, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://healthylifehub.com/recipes/${recipe.slug}`,
        name: recipe.title,
      })),
    },
  };

  return (
    <Layout>
      <Helmet>
        <title>{t.recipesPage.title} | Healthy Life Hub</title>
        <meta name="description" content={t.recipesPage.subtitle} />
        <link rel="canonical" href="https://healthylifehub.com/recipes" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://healthylifehub.com/recipes" />
        <meta property="og:title" content={`${t.recipesPage.title} | Healthy Life Hub`} />
        <meta property="og:description" content={t.recipesPage.subtitle} />
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>
      
      <BreadcrumbSchema
        items={[
          { name: t.nav.home, url: '/' },
          { name: t.nav.recipes, url: '/recipes' },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent/50 to-background py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.recipesPage.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t.recipesPage.subtitle}
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t.recipesPage.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-12 pe-4 py-6 text-base rounded-xl border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-sm z-40">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <ChefHat className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {diets.map((diet) => (
              <Button
                key={diet}
                variant={selectedDiet === diet ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedDiet(diet)}
                className="flex-shrink-0"
              >
                {getDietLabel(diet)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              {t.common.showingCount} <span className="font-medium text-foreground">{filteredRecipes.length}</span> {t.common.recipes}
            </p>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <div className="grid grid-cols-4 gap-2 pt-3">
                      {[1, 2, 3, 4].map((j) => (
                        <Skeleton key={j} className="h-10 w-full" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredRecipes.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.map((recipe) => (
                <Link key={recipe.id} to={`/recipes/${recipe.slug}`} className="group">
                  <Card className="overflow-hidden card-hover h-full border-border">
                    <div className="relative overflow-hidden">
                      <img
                        src={recipe.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80'}
                        alt={getTitle(recipe)}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 end-3 bg-card/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs font-medium text-foreground">
                          {formatTime(recipe.prep_time, recipe.cook_time)}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <div className="flex gap-1.5 flex-wrap">
                          {recipe.tags?.slice(0, 2).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {getDifficultyLabel(recipe.difficulty)}
                      </Badge>
                      <h3 className="font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {getTitle(recipe)}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {getDescription(recipe)}
                      </p>
                      
                      {/* Nutritional Info */}
                      <div className="grid grid-cols-4 gap-2 pt-3 border-t border-border">
                        <div className="text-center">
                          <Flame className="w-4 h-4 mx-auto text-orange-500 mb-1" />
                          <p className="text-xs font-medium text-foreground">{recipe.calories || 0}</p>
                          <p className="text-[10px] text-muted-foreground">{t.common.cal}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-foreground">{recipe.protein || 0}g</p>
                          <p className="text-[10px] text-muted-foreground">{t.common.protein}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-foreground">{recipe.carbs || 0}g</p>
                          <p className="text-[10px] text-muted-foreground">{t.common.carbs}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-foreground">{recipe.fat || 0}g</p>
                          <p className="text-[10px] text-muted-foreground">{t.common.fat}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t.recipesPage.noRecipes}</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Recipes;
