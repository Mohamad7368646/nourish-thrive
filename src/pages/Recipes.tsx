import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Search, Filter, Clock, Flame, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';

interface Recipe {
  id: string;
  title: string;
  slug: string;
  description: string | null;
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

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('id, title, slug, description, image_url, prep_time, cook_time, servings, difficulty, calories, protein, carbs, fat, tags')
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
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (recipe.description && recipe.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDiet = selectedDiet === 'All Diets' || 
      (recipe.tags && recipe.tags.some(tag => 
        tag.toLowerCase().includes(selectedDiet.toLowerCase().replace('-', ''))
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
    return `${total} min`;
  };

  const getDifficultyLabel = (difficulty: string | null) => {
    switch (difficulty) {
      case 'easy': return 'Easy';
      case 'medium': return 'Medium';
      case 'hard': return 'Hard';
      default: return 'Easy';
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Healthy Recipes | HealthyLife Hub</title>
        <meta name="description" content="Discover delicious and nutritious recipes for every meal. From quick breakfasts to healthy dinners, find recipes with full nutritional information." />
        <meta name="keywords" content="healthy recipes, nutritious meals, diet recipes, low calorie, high protein, vegan recipes" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent/50 to-background py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Healthy & Delicious Recipes
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Nutritious meals that taste amazing and support your wellness goals
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-base rounded-xl border-border"
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
                {diet}
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
              Showing <span className="font-medium text-foreground">{filteredRecipes.length}</span> recipes
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
                        alt={recipe.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
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
                        {recipe.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {recipe.description}
                      </p>
                      
                      {/* Nutritional Info */}
                      <div className="grid grid-cols-4 gap-2 pt-3 border-t border-border">
                        <div className="text-center">
                          <Flame className="w-4 h-4 mx-auto text-orange-500 mb-1" />
                          <p className="text-xs font-medium text-foreground">{recipe.calories || 0}</p>
                          <p className="text-[10px] text-muted-foreground">cal</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-foreground">{recipe.protein || 0}g</p>
                          <p className="text-[10px] text-muted-foreground">protein</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-foreground">{recipe.carbs || 0}g</p>
                          <p className="text-[10px] text-muted-foreground">carbs</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-foreground">{recipe.fat || 0}g</p>
                          <p className="text-[10px] text-muted-foreground">fat</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No recipes found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Recipes;