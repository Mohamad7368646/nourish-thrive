import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Search, Filter, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categories = ['All', 'Nutrition', 'Weight Loss', 'Fitness', 'Mental Health', 'Lifestyle'];

const articles = [
  {
    id: 1,
    title: '10 Superfoods to Boost Your Immune System Naturally',
    excerpt: 'Discover the most powerful immune-boosting foods backed by science that can help protect your health and keep you feeling energized.',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80',
    readTime: '5 min read',
    date: 'Dec 28, 2024',
    featured: true,
  },
  {
    id: 2,
    title: 'The Complete Guide to Intermittent Fasting for Beginners',
    excerpt: 'Learn everything about intermittent fasting, including different methods, benefits, potential risks, and how to get started safely.',
    category: 'Weight Loss',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&q=80',
    readTime: '8 min read',
    date: 'Dec 25, 2024',
    featured: true,
  },
  {
    id: 3,
    title: 'Morning Routines of the World\'s Healthiest People',
    excerpt: 'Start your day right with these science-backed morning habits for optimal physical and mental health.',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    readTime: '6 min read',
    date: 'Dec 22, 2024',
    featured: false,
  },
  {
    id: 4,
    title: 'Understanding Macronutrients: Proteins, Carbs, and Fats',
    excerpt: 'A comprehensive breakdown of the three main macronutrients and how to balance them for optimal nutrition.',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
    readTime: '10 min read',
    date: 'Dec 20, 2024',
    featured: false,
  },
  {
    id: 5,
    title: 'The Science of Sleep: How Rest Affects Your Health',
    excerpt: 'Explore the vital connection between quality sleep and your physical health, mental clarity, and overall well-being.',
    category: 'Mental Health',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80',
    readTime: '7 min read',
    date: 'Dec 18, 2024',
    featured: false,
  },
  {
    id: 6,
    title: 'Home Workout Routines: No Equipment Needed',
    excerpt: 'Effective full-body workout routines you can do at home without any equipment, perfect for busy schedules.',
    category: 'Fitness',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    readTime: '5 min read',
    date: 'Dec 15, 2024',
    featured: false,
  },
  {
    id: 7,
    title: 'Gut Health: The Foundation of Your Immune System',
    excerpt: 'Learn how your gut microbiome influences your immune system and discover foods that support digestive health.',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&q=80',
    readTime: '9 min read',
    date: 'Dec 12, 2024',
    featured: false,
  },
  {
    id: 8,
    title: 'Mindful Eating: A Path to Better Nutrition',
    excerpt: 'Transform your relationship with food through mindful eating practices that promote better digestion and satisfaction.',
    category: 'Mental Health',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    readTime: '6 min read',
    date: 'Dec 10, 2024',
    featured: false,
  },
];

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured);

  return (
    <>
      <Helmet>
        <title>Health & Nutrition Articles | HealthyLife Hub</title>
        <meta name="description" content="Browse our collection of evidence-based health and nutrition articles. Learn about diet, fitness, mental health, and lifestyle tips from experts." />
        <meta name="keywords" content="health articles, nutrition tips, diet advice, wellness blog, healthy living" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent/50 to-background py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Health & Nutrition Articles
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Evidence-based insights to help you make informed decisions about your health
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-base rounded-xl border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-sm z-40">
        <div className="container-custom py-4">
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
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredArticles.map((article) => (
                  <Link key={article.id} to={`/articles/${article.id}`} className="group">
                    <Card className="overflow-hidden card-hover h-full border-border">
                      <div className="grid md:grid-cols-2 h-full">
                        <div className="relative overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-48 md:h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <Badge className="absolute top-4 left-4 bg-primary">
                            Featured
                          </Badge>
                        </div>
                        <CardContent className="p-6 flex flex-col justify-center">
                          <Badge variant="outline" className="w-fit mb-3">
                            {article.category}
                          </Badge>
                          <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {article.readTime}
                            </span>
                            <span>{article.date}</span>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Articles */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
            </h2>
            
            {regularArticles.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularArticles.map((article) => (
                  <Link key={article.id} to={`/articles/${article.id}`} className="group">
                    <Card className="overflow-hidden card-hover h-full border-border">
                      <div className="relative overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-5">
                        <Badge variant="outline" className="mb-3">
                          {article.category}
                        </Badge>
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                          <span className="flex items-center gap-1 text-primary group-hover:underline">
                            Read More <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Articles;
