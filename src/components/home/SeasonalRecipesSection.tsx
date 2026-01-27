import { Link } from 'react-router-dom';
import { ArrowRight, Snowflake, Sun, Leaf, Flower2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const seasons = [
  {
    id: 'winter',
    name: 'شتاء',
    nameEn: 'Winter',
    icon: Snowflake,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    borderColor: 'border-blue-200 dark:border-blue-800',
    description: 'وصفات دافئة ومغذية لأيام الشتاء الباردة',
    recipes: [
      {
        title: 'شوربة العدس الدافئة',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80',
        time: '30 دقيقة',
      },
      {
        title: 'يخنة الخضار الشتوية',
        image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400&q=80',
        time: '45 دقيقة',
      },
    ],
  },
  {
    id: 'spring',
    name: 'ربيع',
    nameEn: 'Spring',
    icon: Flower2,
    color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
    borderColor: 'border-pink-200 dark:border-pink-800',
    description: 'وصفات منعشة بالخضروات الربيعية الطازجة',
    recipes: [
      {
        title: 'سلطة الربيع الخضراء',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
        time: '15 دقيقة',
      },
      {
        title: 'باستا البازلاء والنعناع',
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=80',
        time: '25 دقيقة',
      },
    ],
  },
  {
    id: 'summer',
    name: 'صيف',
    nameEn: 'Summer',
    icon: Sun,
    color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    description: 'وصفات خفيفة ومنعشة لأيام الصيف الحارة',
    recipes: [
      {
        title: 'سموذي الفواكه الاستوائية',
        image: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&q=80',
        time: '5 دقائق',
      },
      {
        title: 'سلطة البطيخ والفيتا',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
        time: '10 دقائق',
      },
    ],
  },
  {
    id: 'autumn',
    name: 'خريف',
    nameEn: 'Autumn',
    icon: Leaf,
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    borderColor: 'border-orange-200 dark:border-orange-800',
    description: 'وصفات غنية بنكهات الخريف الدافئة',
    recipes: [
      {
        title: 'شوربة اليقطين المحمص',
        image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&q=80',
        time: '35 دقيقة',
      },
      {
        title: 'فطيرة التفاح الصحية',
        image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=400&q=80',
        time: '50 دقيقة',
      },
    ],
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
                    {season.recipes.map((recipe, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 group/recipe cursor-pointer"
                      >
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-12 h-12 rounded-lg object-cover transition-transform group-hover/recipe:scale-105"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate group-hover/recipe:text-primary transition-colors">
                            {recipe.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{recipe.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* View All Link */}
                  <div className="px-4 pb-4">
                    <Link
                      to={`/recipes?season=${season.id}`}
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
