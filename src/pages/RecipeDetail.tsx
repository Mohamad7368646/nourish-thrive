import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useParams, Link } from 'react-router-dom';
import { Clock, Users, ChefHat, ArrowLeft, Share2, Bookmark, Flame, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Mock recipe data - will be replaced with database content
const mockRecipe = {
  id: '1',
  title: 'Mediterranean Quinoa Bowl with Grilled Chicken',
  slug: 'mediterranean-quinoa-bowl',
  category: 'Main Dish',
  dietType: 'High Protein',
  difficulty: 'Easy',
  prepTime: '15 min',
  cookTime: '25 min',
  servings: 4,
  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=600&fit=crop',
  description: 'A nutritious and colorful quinoa bowl packed with Mediterranean flavors, lean protein, and fresh vegetables. Perfect for meal prep!',
  nutrition: {
    calories: 485,
    protein: 38,
    carbs: 42,
    fat: 18,
    fiber: 8
  },
  ingredients: [
    { amount: '1 cup', item: 'quinoa, rinsed' },
    { amount: '2 cups', item: 'chicken broth (low sodium)' },
    { amount: '1 lb', item: 'chicken breast, boneless skinless' },
    { amount: '2 tbsp', item: 'olive oil, divided' },
    { amount: '1 tsp', item: 'dried oregano' },
    { amount: '1 tsp', item: 'garlic powder' },
    { amount: '1 cup', item: 'cherry tomatoes, halved' },
    { amount: '1', item: 'cucumber, diced' },
    { amount: '1/2 cup', item: 'kalamata olives, pitted' },
    { amount: '1/2 cup', item: 'feta cheese, crumbled' },
    { amount: '1/4 cup', item: 'red onion, thinly sliced' },
    { amount: '2 tbsp', item: 'fresh lemon juice' },
    { amount: '2 tbsp', item: 'fresh parsley, chopped' },
    { amount: 'to taste', item: 'salt and pepper' }
  ],
  instructions: [
    {
      step: 1,
      title: 'Cook the Quinoa',
      description: 'In a medium saucepan, bring chicken broth to a boil. Add quinoa, reduce heat to low, cover, and simmer for 15 minutes until liquid is absorbed. Remove from heat and let stand for 5 minutes. Fluff with a fork.'
    },
    {
      step: 2,
      title: 'Season the Chicken',
      description: 'While quinoa cooks, season chicken breasts with oregano, garlic powder, salt, and pepper on both sides.'
    },
    {
      step: 3,
      title: 'Grill the Chicken',
      description: 'Heat 1 tablespoon olive oil in a grill pan or skillet over medium-high heat. Cook chicken for 6-7 minutes per side until internal temperature reaches 165°F (74°C). Let rest for 5 minutes, then slice.'
    },
    {
      step: 4,
      title: 'Prepare the Vegetables',
      description: 'While chicken rests, combine cherry tomatoes, cucumber, olives, and red onion in a bowl.'
    },
    {
      step: 5,
      title: 'Make the Dressing',
      description: 'Whisk together remaining olive oil, lemon juice, salt, and pepper to create a simple dressing.'
    },
    {
      step: 6,
      title: 'Assemble the Bowls',
      description: 'Divide quinoa among 4 bowls. Top with sliced chicken, vegetable mixture, and crumbled feta. Drizzle with dressing and garnish with fresh parsley. Serve immediately or store for meal prep.'
    }
  ],
  tips: [
    'For meal prep, store components separately and assemble when ready to eat.',
    'Substitute chicken with chickpeas or grilled tofu for a vegetarian version.',
    'Add hummus on the side for extra protein and creaminess.',
    'Use rotisserie chicken for a quicker preparation.'
  ],
  tags: ['Mediterranean', 'High Protein', 'Meal Prep', 'Gluten-Free']
};

const relatedRecipes = [
  {
    id: '2',
    title: 'Greek Salad with Grilled Shrimp',
    slug: 'greek-salad-grilled-shrimp',
    category: 'Salad',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=250&fit=crop',
    calories: 320,
    prepTime: '20 min'
  },
  {
    id: '3',
    title: 'Lemon Herb Salmon with Vegetables',
    slug: 'lemon-herb-salmon',
    category: 'Main Dish',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=250&fit=crop',
    calories: 410,
    prepTime: '30 min'
  },
  {
    id: '4',
    title: 'Avocado Chickpea Buddha Bowl',
    slug: 'avocado-chickpea-bowl',
    category: 'Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop',
    calories: 380,
    prepTime: '15 min'
  }
];

const RecipeDetail = () => {
  const { slug } = useParams();
  
  // In production, fetch recipe by slug from database
  const recipe = mockRecipe;

  return (
    <>
      <Helmet>
        <title>{recipe.title} | Healthy Life Hub Recipes</title>
        <meta name="description" content={recipe.description} />
        <meta property="og:title" content={recipe.title} />
        <meta property="og:description" content={recipe.description} />
        <meta property="og:image" content={recipe.image} />
        <meta property="og:type" content="article" />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]">
          <img
            src={recipe.image}
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
                <Badge>{recipe.category}</Badge>
                <Badge variant="secondary">{recipe.dietType}</Badge>
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground max-w-4xl">
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
                    <p className="font-semibold text-foreground">{recipe.prepTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ChefHat className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs uppercase">Cook Time</p>
                    <p className="font-semibold text-foreground">{recipe.cookTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs uppercase">Servings</p>
                    <p className="font-semibold text-foreground">{recipe.servings} servings</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-sm">{recipe.difficulty}</Badge>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-3 mb-8">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save Recipe
                </Button>
              </div>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {recipe.description}
              </p>

              {/* Nutrition Facts */}
              <Card className="mb-10">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-primary" />
                    Nutrition Facts (per serving)
                  </h2>
                  <div className="grid grid-cols-5 gap-4 text-center">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-primary">{recipe.nutrition.calories}</p>
                      <p className="text-xs text-muted-foreground uppercase">Calories</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{recipe.nutrition.protein}g</p>
                      <p className="text-xs text-muted-foreground uppercase">Protein</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{recipe.nutrition.carbs}g</p>
                      <p className="text-xs text-muted-foreground uppercase">Carbs</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{recipe.nutrition.fat}g</p>
                      <p className="text-xs text-muted-foreground uppercase">Fat</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{recipe.nutrition.fiber}g</p>
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
                      <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <Dumbbell className="w-5 h-5 text-primary" />
                        Ingredients
                      </h2>
                      <ul className="space-y-3">
                        {recipe.ingredients.map((ing, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <input type="checkbox" className="mt-1.5 rounded border-border" />
                            <span className="text-muted-foreground">
                              <span className="font-medium text-foreground">{ing.amount}</span> {ing.item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Instructions */}
                <div className="lg:col-span-2">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Instructions
                  </h2>
                  <div className="space-y-6">
                    {recipe.instructions.map((instruction) => (
                      <div key={instruction.step} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                          {instruction.step}
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-foreground mb-2">
                            {instruction.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {instruction.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tips */}
                  <div className="mt-10 p-6 bg-primary/10 rounded-xl">
                    <h3 className="font-display font-bold text-foreground mb-4">
                      💡 Chef's Tips
                    </h3>
                    <ul className="space-y-2">
                      {recipe.tips.map((tip, index) => (
                        <li key={index} className="text-muted-foreground flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-display font-semibold text-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Recipes */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
              You Might Also <span className="text-primary">Like</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedRecipes.map((related) => (
                <Link key={related.id} to={`/recipes/${related.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2">{related.category}</Badge>
                      <h3 className="font-display font-semibold text-foreground line-clamp-2 mb-2">
                        {related.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Flame className="w-4 h-4" />
                          {related.calories} cal
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {related.prepTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default RecipeDetail;
