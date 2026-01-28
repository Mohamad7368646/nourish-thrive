import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, Heart, Users, TrendingUp, Leaf, Apple, Dumbbell, BookOpen, Utensils } from 'lucide-react';
import SeasonalRecipesSection from '@/components/home/SeasonalRecipesSection';
import FeaturedArticles from '@/components/home/FeaturedArticles';
import FeaturedRecipes from '@/components/home/FeaturedRecipes';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';


// Tools data
const tools = [
  {
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index',
    icon: Calculator,
    href: '/tools#bmi',
    color: 'bg-health-green-light text-health-green',
  },
  {
    name: 'Calorie Calculator',
    description: 'Find your daily calorie needs',
    icon: TrendingUp,
    href: '/tools#calories',
    color: 'bg-health-orange-light text-health-orange',
  },
  {
    name: 'Water Intake',
    description: 'Calculate daily water requirements',
    icon: Leaf,
    href: '/tools#water',
    color: 'bg-health-blue-light text-health-blue',
  },
];

// Stats data
const stats = [
  { value: '500+', label: 'Articles', icon: BookOpen },
  { value: '300+', label: 'Recipes', icon: Utensils },
  { value: '50K+', label: 'Readers', icon: Users },
  { value: '98%', label: 'Satisfaction', icon: Heart },
];

const Index = () => {
  return (
    <>
      <Helmet>
        <title>HealthyLife Hub - Your Complete Guide to Nutrition & Wellness</title>
        <meta name="description" content="Discover evidence-based nutrition advice, healthy recipes, and wellness tools. Start your journey to a healthier lifestyle with expert guidance." />
        <meta name="keywords" content="nutrition, healthy eating, recipes, wellness, diet, weight loss, fitness, health tips" />
        <link rel="canonical" href="https://healthylifehub.com" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/50 to-background">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2322c55e%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        
        <div className="container-custom relative">
          <div className="py-16 md:py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Leaf className="w-4 h-4" />
                  <span>Your Wellness Journey Starts Here</span>
                </div>
                
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Eat Well, Live Well,{' '}
                  <span className="text-primary">Be Well</span>
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Discover evidence-based nutrition advice, delicious healthy recipes, 
                  and powerful wellness tools to transform your health journey.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all">
                    <Link to="/articles">
                      Explore Articles
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/recipes">Browse Recipes</Link>
                  </Button>
                </div>
              </div>
              
              {/* Hero Image Grid */}
              <div className="relative hidden lg:block">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-lg animate-float">
                      <img 
                        src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&q=80" 
                        alt="Healthy salad bowl"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                      <img 
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" 
                        alt="Yoga and wellness"
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="rounded-2xl overflow-hidden shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                      <img 
                        src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80" 
                        alt="Fresh fruits and vegetables"
                        className="w-full h-32 object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
                      <img 
                        src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" 
                        alt="Nutritious meal prep"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Floating Stats Card */}
                <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-xl p-4 border border-border animate-scale-in">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Apple className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">1000+ Recipes</p>
                      <p className="text-xs text-muted-foreground">Healthy & Delicious</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                <p className="text-sm opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <FeaturedArticles />

      {/* Tools Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              Health Calculators & Tools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Free interactive tools to help you track and improve your health metrics
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Link
                key={tool.name}
                to={tool.href}
                className="group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full card-hover border-border group-hover:border-primary/50">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-2xl ${tool.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <tool.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild>
              <Link to="/tools" className="gap-2">
                Explore All Tools <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Seasonal Recipes Section */}
      <SeasonalRecipesSection />

      {/* Featured Recipes Section */}
      <FeaturedRecipes />

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10">
            <Leaf className="w-32 h-32 animate-float" />
          </div>
          <div className="absolute bottom-10 right-10">
            <Dumbbell className="w-24 h-24 animate-float" style={{ animationDelay: '1s' }} />
          </div>
        </div>
        
        <div className="container-custom relative text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Health?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of readers who receive weekly health tips, recipes, 
            and expert nutrition advice directly in their inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <Button className="bg-white text-primary hover:bg-white/90 font-semibold">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
