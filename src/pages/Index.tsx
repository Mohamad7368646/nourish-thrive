import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, Heart, Users, TrendingUp, Leaf, Apple, Dumbbell, BookOpen, Utensils } from 'lucide-react';
import SeasonalRecipesSection from '@/components/home/SeasonalRecipesSection';
import FeaturedArticles from '@/components/home/FeaturedArticles';
import FeaturedRecipes from '@/components/home/FeaturedRecipes';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/i18n/LanguageContext';

const Index = () => {
  const { t, language } = useLanguage();

  const tools = [
    {
      name: t.home.bmiCalc,
      description: t.home.bmiDesc,
      icon: Calculator,
      href: '/tools#bmi',
      color: 'bg-health-green-light text-health-green',
    },
    {
      name: t.home.calorieCalc,
      description: t.home.calorieDesc,
      icon: TrendingUp,
      href: '/tools#calories',
      color: 'bg-health-orange-light text-health-orange',
    },
    {
      name: t.home.waterIntake,
      description: t.home.waterDesc,
      icon: Leaf,
      href: '/tools#water',
      color: 'bg-health-blue-light text-health-blue',
    },
  ];

  const stats = [
    { value: '500+', label: t.home.statsArticles, icon: BookOpen },
    { value: '300+', label: t.home.statsRecipes, icon: Utensils },
    { value: '50K+', label: t.home.statsReaders, icon: Users },
    { value: '98%', label: t.home.statsSatisfaction, icon: Heart },
  ];

  // Home page structured data
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Healthy Life Hub - Your Complete Guide to Nutrition & Wellness',
    description: 'Discover evidence-based nutrition advice, healthy recipes, and wellness tools. Start your journey to a healthier lifestyle.',
    url: 'https://healthylifehub.com',
    mainEntity: {
      '@type': 'HealthTopicContent',
      about: {
        '@type': 'MedicalCondition',
        name: 'Nutrition and Wellness',
      },
    },
    specialty: ['Nutrition', 'Healthy Eating', 'Fitness', 'Wellness'],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Healthy Life Hub',
    description: 'A comprehensive collection of health articles, nutritious recipes, and wellness tools',
    url: 'https://healthylifehub.com',
    hasPart: [
      { '@type': 'WebPageElement', name: 'Health Articles', url: 'https://healthylifehub.com/articles' },
      { '@type': 'WebPageElement', name: 'Healthy Recipes', url: 'https://healthylifehub.com/recipes' },
      { '@type': 'WebPageElement', name: 'Health Tools', url: 'https://healthylifehub.com/tools' },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <title>Healthy Life Hub | {language === 'ar' ? 'دليلك الشامل للتغذية والحياة الصحية' : 'Your Complete Guide to Nutrition & Wellness'}</title>
        <meta name="description" content={t.home.subtitle} />
        <link rel="canonical" href="https://healthylifehub.com" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://healthylifehub.com" />
        <meta property="og:title" content="Healthy Life Hub" />
        <meta property="og:description" content={t.home.subtitle} />
        <meta property="og:image" content="https://healthylifehub.com/og-image.png" />
        <meta property="og:locale" content={language === 'ar' ? 'ar_SA' : 'en_US'} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(homeSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
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
                  <span>{t.home.badge}</span>
                </div>
                
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  {t.home.title}{' '}
                  <span className="text-primary">{t.home.titleHighlight}</span>
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                  {t.home.subtitle}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all">
                    <Link to="/articles">
                      {t.home.exploreArticles}
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/recipes">{t.home.browseRecipes}</Link>
                  </Button>
                </div>
              </div>
              
              {/* Hero Image Grid */}
              <div className="relative hidden lg:block">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-lg animate-float">
                      <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&q=80" alt="Healthy salad bowl" className="w-full h-48 object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                      <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" alt="Yoga and wellness" className="w-full h-32 object-cover" loading="lazy" />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="rounded-2xl overflow-hidden shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                      <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80" alt="Fresh fruits and vegetables" className="w-full h-32 object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
                      <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" alt="Healthy meal prep" className="w-full h-48 object-cover" loading="lazy" />
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -start-4 bg-card rounded-xl shadow-xl p-4 border border-border animate-scale-in">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Apple className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{t.home.recipesCount}</p>
                      <p className="text-xs text-muted-foreground">{t.home.recipesLabel}</p>
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
              <div key={stat.label} className="text-center" style={{ animationDelay: `${index * 0.1}s` }}>
                <stat.icon className="w-8 h-8 mx-auto mb-2 opacity-80" aria-hidden="true" />
                <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                <p className="text-sm opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedArticles />

      {/* Tools Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <header className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t.home.toolsTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.home.toolsSubtitle}
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Link key={tool.name} to={tool.href} className="group" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card className="h-full card-hover border-border group-hover:border-primary/50">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-2xl ${tool.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <tool.icon className="w-8 h-8" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild>
              <Link to="/tools" className="gap-2">
                {t.home.exploreAllTools} <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <SeasonalRecipesSection />
      <FeaturedRecipes />

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 start-10">
            <Leaf className="w-32 h-32 animate-float" aria-hidden="true" />
          </div>
          <div className="absolute bottom-10 end-10">
            <Dumbbell className="w-24 h-24 animate-float" style={{ animationDelay: '1s' }} aria-hidden="true" />
          </div>
        </div>
        
        <div className="container-custom relative text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            {t.home.ctaTitle}
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            {t.home.ctaSubtitle}
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto" aria-label="Newsletter subscription">
            <label htmlFor="email-subscribe" className="sr-only">Email</label>
            <input
              id="email-subscribe"
              type="email"
              placeholder={t.common.enterEmail}
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              required
            />
            <Button type="submit" className="bg-white text-primary hover:bg-white/90 font-semibold">
              {t.common.subscribe}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
