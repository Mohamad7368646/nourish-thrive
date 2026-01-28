import { Link } from 'react-router-dom';
import { ArrowRight, Snowflake, Sun, Leaf, Flower2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

const seasons = [
  {
    id: 'winter',
    name: 'شتاء',
    nameEn: 'Winter',
    icon: Snowflake,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    borderColor: 'border-blue-200 dark:border-blue-800',
    description: 'وصفات دافئة ومغذية لأيام الشتاء الباردة',
    tags: ['winter', 'warm', 'soup'],
  },
  {
    id: 'spring',
    name: 'ربيع',
    nameEn: 'Spring',
    icon: Flower2,
    color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
    borderColor: 'border-pink-200 dark:border-pink-800',
    description: 'وصفات منعشة بالخضروات الربيعية الطازجة',
    tags: ['spring', 'fresh', 'salad'],
  },
  {
    id: 'summer',
    name: 'صيف',
    nameEn: 'Summer',
    icon: Sun,
    color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    description: 'وصفات خفيفة ومنعشة لأيام الصيف الحارة',
    tags: ['summer', 'light', 'smoothie'],
  },
  {
    id: 'autumn',
    name: 'خريف',
    nameEn: 'Autumn',
    icon: Leaf,
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    borderColor: 'border-orange-200 dark:border-orange-800',
    description: 'وصفات غنية بنكهات الخريف الدافئة',
    tags: ['autumn', 'pumpkin', 'apple'],
  },
];

const SeasonalRecipesSection = () => {
  // Get current season based on month
  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  };

  const currentSeason = getCurrentSeason();

  // Fetch recipes from database
  const { data: recipes, isLoading } = useQuery({
    queryKey: ['seasonal-recipes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('id, title, slug, image_url, prep_time, cook_time, tags, difficulty')
        .eq('published', true)
        .limit(12);
      
      if (error) throw error;
      return data;
    },
  });

  // Group recipes by season (2 per season)
  const getRecipesForSeason = (seasonId: string) => {
    if (!recipes) return [];
    
    // Distribute recipes evenly across seasons
    const seasonIndex = seasons.findIndex(s => s.id === seasonId);
    const startIndex = seasonIndex * 2;
    return recipes.slice(startIndex, startIndex + 2);
  };

  const formatTime = (prepTime: number | null, cookTime: number | null) => {
    const total = (prepTime || 0) + (cookTime || 0);
    if (total === 0) return '15 دقيقة';
    return `${total} دقيقة`;
  };

  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            وصفات موسمية
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            استمتع بأفضل الوصفات المناسبة لكل فصل من فصول السنة
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasons.map((season) => {
            const SeasonIcon = season.icon;
            const isCurrentSeason = season.id === currentSeason;
            const seasonRecipes = getRecipesForSeason(season.id);

            return (
              <Card
                key={season.id}
                className={`group overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  isCurrentSeason ? `ring-2 ring-primary ${season.borderColor}` : 'border-border'
                }`}
              >
                <CardContent className="p-0">
                  {/* Season Header */}
                  <div className={`p-4 ${season.color} flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      <SeasonIcon className="w-5 h-5" />
                      <span className="font-serif font-semibold">{season.name}</span>
                    </div>
                    {isCurrentSeason && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                        الموسم الحالي
                      </span>
                    )}
                  </div>

                  {/* Season Description */}
                  <p className="text-sm text-muted-foreground p-4 pb-2">
                    {season.description}
                  </p>

                  {/* Recipe Previews */}
                  <div className="p-4 pt-2 space-y-3">
                    {isLoading ? (
                      <>
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-12 h-12 rounded-lg" />
                          <div className="flex-1">
                            <Skeleton className="h-4 w-full mb-1" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-12 h-12 rounded-lg" />
                          <div className="flex-1">
                            <Skeleton className="h-4 w-full mb-1" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>
                      </>
                    ) : seasonRecipes.length > 0 ? (
                      seasonRecipes.map((recipe) => (
                        <Link
                          key={recipe.id}
                          to={`/recipes/${recipe.slug}`}
                          className="flex items-center gap-3 group/recipe cursor-pointer"
                        >
                          <img
                            src={recipe.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'}
                            alt={recipe.title}
                            className="w-12 h-12 rounded-lg object-cover transition-transform group-hover/recipe:scale-105"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate group-hover/recipe:text-primary transition-colors">
                              {recipe.title}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {formatTime(recipe.prep_time, recipe.cook_time)}
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-2">
                        لا توجد وصفات متاحة
                      </p>
                    )}
                  </div>

                  {/* View All Link */}
                  <div className="px-4 pb-4">
                    <Link
                      to={`/recipes`}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      عرض جميع وصفات {season.name}
                      <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/recipes" className="gap-2">
              استكشف جميع الوصفات
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SeasonalRecipesSection;
