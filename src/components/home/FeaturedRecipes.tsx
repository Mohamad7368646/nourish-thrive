import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedRecipes = () => {
  const { data: recipes, isLoading } = useQuery({
    queryKey: ['featured-recipes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('id, title, slug, image_url, calories, prep_time, cook_time, tags')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(4);
      
      if (error) throw error;
      return data;
    },
  });

  const formatTime = (prepTime: number | null, cookTime: number | null) => {
    const total = (prepTime || 0) + (cookTime || 0);
    if (total === 0) return '15 min';
    return `${total} min`;
  };

  const formatTags = (tags: string[] | null) => {
    if (!tags || tags.length === 0) return ['Healthy'];
    return tags.slice(0, 2);
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Healthy Recipes
            </h2>
            <p className="text-muted-foreground">
              Delicious meals that nourish your body
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex gap-2">
            <Link to="/recipes">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="overflow-hidden border-border">
                <Skeleton className="w-full h-40" />
                <CardContent className="p-4">
                  <Skeleton className="h-5 w-full mb-2" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : recipes && recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <Link 
                key={recipe.id} 
                to={`/recipes/${recipe.slug}`}
                className="group"
              >
                <Card 
                  className="overflow-hidden card-hover border-border h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={recipe.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80'}
                      alt={recipe.title}
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <div className="flex gap-2">
                        {formatTags(recipe.tags).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{recipe.calories || 0} cal</span>
                      <span>{formatTime(recipe.prep_time, recipe.cook_time)}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-4 text-center py-12">
              <p className="text-muted-foreground">لا توجد وصفات متاحة حالياً</p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/recipes">استكشف جميع الوصفات</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline">
            <Link to="/recipes">View All Recipes</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;
