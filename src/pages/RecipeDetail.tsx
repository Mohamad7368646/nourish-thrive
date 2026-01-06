import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Clock, Users, ChefHat, ArrowLeft, Share2, Flame, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  fiber: number | null;
  ingredients: string[] | null;
  instructions: string[] | null;
  tags: string[] | null;
}

interface RelatedRecipe {
  id: string;
  title: string;
  slug: string;
  image_url: string | null;
  calories: number | null;
  prep_time: number | null;
  cook_time: number | null;
}

const RecipeDetail = () => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [relatedRecipes, setRelatedRecipes] = useState<RelatedRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error || !data) {
        setLoading(false);
        return;
      }

      // Parse JSONB fields
      const parsedRecipe: Recipe = {
        ...data,
        ingredients: data.ingredients as string[] | null,
        instructions: data.instructions as string[] | null,
      };

      setRecipe(parsedRecipe);

      // Fetch related recipes
      const { data: related } = await supabase
        .from('recipes')
        .select('id, title, slug, image_url, calories, prep_time, cook_time')
        .eq('published', true)
        .neq('id', data.id)
        .limit(3);

      if (related) {
        setRelatedRecipes(related);
      }

      setLoading(false);
    };

    fetchRecipe();
  }, [slug]);

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe?.title,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Link copied!' });
    }
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

  if (!recipe) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Recipe not found</h1>
          <Link to="/recipes">
            <Button>Back to Recipes</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{recipe.title} | Healthy Life Hub Recipes</title>
        <meta name="description" content={recipe.description || ''} />
        <meta property="og:title" content={recipe.title} />
        <meta property="og:description" content={recipe.description || ''} />
        <meta property="og:image" content={recipe.image_url || ''} />
        <meta property="og:type" content="article" />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]">
          <img
            src={recipe.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=600&fit=crop'}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Link to="/recipes" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
                <ArrowLeft className="w-4 h-4" />
                Back to Recipes
              </Link>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>{getDifficultyLabel(recipe.difficulty)}</Badge>
                {recipe.tags?.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground max-w-4xl">
                {recipe.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Recipe Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs uppercase">Prep Time</p>
                    <p className="font-semibold text-foreground">{recipe.prep_time || 0} min</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ChefHat className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs uppercase">Cook Time</p>
                    <p className="font-semibold text-foreground">{recipe.cook_time || 0} min</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs uppercase">Servings</p>
                    <p className="font-semibold text-foreground">{recipe.servings || 4} servings</p>
                  </div>
                </div>
              </div>

              {/* Share Button */}
              <div className="flex items-center gap-3 mb-8">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {recipe.description}
              </p>

              {/* Nutrition Facts */}
              <Card className="mb-10">
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-primary" />
                    Nutrition Facts (per serving)
                  </h2>
                  <div className="grid grid-cols-5 gap-4 text-center">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-primary">{recipe.calories || 0}</p>
                      <p className="text-xs text-muted-foreground uppercase">Calories</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{recipe.protein || 0}g</p>
                      <p className="text-xs text-muted-foreground uppercase">Protein</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{recipe.carbs || 0}g</p>
                      <p className="text-xs text-muted-foreground uppercase">Carbs</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{recipe.fat || 0}g</p>
                      <p className="text-xs text-muted-foreground uppercase">Fat</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{recipe.fiber || 0}g</p>
                      <p className="text-xs text-muted-foreground uppercase">Fiber</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-3 gap-10">
                {/* Ingredients */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-24">
                    <CardContent className="p-6">
                      <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                        🛒 Ingredients
                      </h2>
                      <ul className="space-y-3">
                        {recipe.ingredients?.map((ingredient, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <input type="checkbox" className="mt-1.5 rounded border-border" />
                            <span className="text-muted-foreground">{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Instructions */}
                <div className="lg:col-span-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                    Instructions
                  </h2>
                  <div className="space-y-6">
                    {recipe.instructions?.map((instruction, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-muted-foreground leading-relaxed pt-2">
                            {instruction}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags */}
              {recipe.tags && recipe.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border">
                  <h3 className="font-serif font-semibold text-foreground mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Recipes */}
        {relatedRecipes.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-8 text-center">
                You Might Also <span className="text-primary">Like</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {relatedRecipes.map((related) => (
                  <Link key={related.id} to={`/recipes/${related.slug}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={related.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop'}
                          alt={related.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-serif font-semibold text-foreground line-clamp-2 mb-2">
                          {related.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Flame className="w-4 h-4" />
                            {related.calories || 0} cal
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatTime(related.prep_time, related.cook_time)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </Layout>
    </>
  );
};

export default RecipeDetail;