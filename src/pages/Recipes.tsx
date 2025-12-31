import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Search, Filter, Clock, Flame, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Smoothies', 'Desserts'];
const diets = ['All Diets', 'Keto', 'Vegan', 'Vegetarian', 'Low Carb', 'High Protein', 'Gluten Free'];

const recipes = [
  {
    id: 1,
    title: 'Mediterranean Quinoa Power Bowl',
    description: 'A nutritious bowl packed with protein-rich quinoa, fresh vegetables, and a zesty lemon dressing.',
    category: 'Lunch',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
    calories: 420,
    protein: 18,
    carbs: 52,
    fat: 16,
    time: '25 min',
    difficulty: 'Easy',
    tags: ['High Protein', 'Vegan'],
  },
  {
    id: 2,
    title: 'Grilled Salmon with Avocado Salsa',
    description: 'Perfectly grilled salmon topped with fresh avocado salsa for a healthy omega-3 rich meal.',
    category: 'Dinner',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80',
    calories: 380,
    protein: 35,
    carbs: 12,
    fat: 22,
    time: '20 min',
    difficulty: 'Medium',
    tags: ['Keto', 'High Protein'],
  },
  {
    id: 3,
    title: 'Green Detox Smoothie',
    description: 'A refreshing blend of spinach, banana, and ginger to kickstart your morning.',
    category: 'Smoothies',
    image: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=600&q=80',
    calories: 180,
    protein: 5,
    carbs: 35,
    fat: 3,
    time: '5 min',
    difficulty: 'Easy',
    tags: ['Vegan', 'Low Calorie'],
  },
  {
    id: 4,
    title: 'Overnight Oats with Mixed Berries',
    description: 'Creamy overnight oats topped with fresh berries and a drizzle of honey.',
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    calories: 310,
    protein: 12,
    carbs: 48,
    fat: 8,
    time: '10 min',
    difficulty: 'Easy',
    tags: ['Fiber Rich', 'Vegetarian'],
  },
  {
    id: 5,
    title: 'Chicken Avocado Caesar Salad',
    description: 'Classic Caesar salad with grilled chicken, creamy avocado, and homemade dressing.',
    category: 'Lunch',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&q=80',
    calories: 450,
    protein: 38,
    carbs: 15,
    fat: 28,
    time: '15 min',
    difficulty: 'Easy',
    tags: ['High Protein', 'Low Carb'],
  },
  {
    id: 6,
    title: 'Zucchini Noodles with Pesto',
    description: 'Light and healthy zucchini noodles tossed in fresh basil pesto sauce.',
    category: 'Dinner',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    calories: 280,
    protein: 8,
    carbs: 18,
    fat: 20,
    time: '20 min',
    difficulty: 'Easy',
    tags: ['Keto', 'Gluten Free'],
  },
  {
    id: 7,
    title: 'Protein Energy Balls',
    description: 'No-bake protein balls made with oats, peanut butter, and dark chocolate chips.',
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80',
    calories: 150,
    protein: 6,
    carbs: 18,
    fat: 7,
    time: '15 min',
    difficulty: 'Easy',
    tags: ['High Protein', 'No Bake'],
  },
  {
    id: 8,
    title: 'Chia Seed Pudding',
    description: 'Creamy coconut chia pudding topped with fresh mango and toasted coconut.',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?w=600&q=80',
    calories: 220,
    protein: 6,
    carbs: 28,
    fat: 10,
    time: '5 min + overnight',
    difficulty: 'Easy',
    tags: ['Vegan', 'Gluten Free'],
  },
];

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDiet, setSelectedDiet] = useState('All Diets');

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    const matchesDiet = selectedDiet === 'All Diets' || recipe.tags.some(tag => 
      tag.toLowerCase().includes(selectedDiet.toLowerCase().replace(' ', ''))
    );
    return matchesSearch && matchesCategory && matchesDiet;
  });

  return (
    <>
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
          <div className="space-y-3">
            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="flex-shrink-0"
                >
                  {category}
                </Button>
              ))}
            </div>
            
            {/* Diet Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <ChefHat className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              {diets.map((diet) => (
                <Button
                  key={diet}
                  variant={selectedDiet === diet ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedDiet(diet)}
                  className="flex-shrink-0"
                >
                  {diet}
                </Button>
              ))}
            </div>
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

          {filteredRecipes.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.map((recipe) => (
                <Link key={recipe.id} to={`/recipes/${recipe.id}`} className="group">
                  <Card className="overflow-hidden card-hover h-full border-border">
                    <div className="relative overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs font-medium text-foreground">{recipe.time}</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <div className="flex gap-1.5 flex-wrap">
                          {recipe.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {recipe.category}
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
                          <Flame className="w-4 h-4 mx-auto text-health-orange mb-1" />
                          <p className="text-xs font-medium text-foreground">{recipe.calories}</p>
                          <p className="text-[10px] text-muted-foreground">cal</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-foreground">{recipe.protein}g</p>
                          <p className="text-[10px] text-muted-foreground">protein</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-foreground">{recipe.carbs}g</p>
                          <p className="text-[10px] text-muted-foreground">carbs</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-foreground">{recipe.fat}g</p>
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
    </>
  );
};

export default Recipes;
