import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Mock article data - will be replaced with database content
const mockArticle = {
  id: '1',
  title: '10 Essential Tips for a Healthier Lifestyle in 2026',
  slug: 'essential-tips-healthier-lifestyle',
  category: 'Wellness',
  author: 'Dr. Sarah Johnson',
  date: 'January 1, 2026',
  readTime: '8 min read',
  image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=600&fit=crop',
  excerpt: 'Discover the top strategies to transform your health and well-being this year with science-backed advice.',
  content: `
    <p>Living a healthy lifestyle doesn't have to be complicated. With the right knowledge and small, consistent changes, you can dramatically improve your overall well-being. In this comprehensive guide, we'll explore ten essential tips that can help you achieve your health goals in 2026.</p>

    <h2>1. Prioritize Sleep Quality</h2>
    <p>Sleep is the foundation of good health. Adults should aim for 7-9 hours of quality sleep each night. Poor sleep has been linked to weight gain, weakened immunity, and increased risk of chronic diseases.</p>
    <ul>
      <li>Maintain a consistent sleep schedule</li>
      <li>Create a dark, cool sleeping environment</li>
      <li>Avoid screens at least one hour before bed</li>
      <li>Limit caffeine intake after 2 PM</li>
    </ul>

    <h2>2. Stay Hydrated Throughout the Day</h2>
    <p>Water is essential for every bodily function. Dehydration can cause fatigue, headaches, and decreased cognitive performance. Aim to drink at least 8 glasses of water daily, more if you're active.</p>

    <h2>3. Eat More Whole Foods</h2>
    <p>Focus on consuming whole, unprocessed foods. These include fruits, vegetables, whole grains, lean proteins, and healthy fats. Whole foods provide essential nutrients that processed foods often lack.</p>

    <h2>4. Move Your Body Daily</h2>
    <p>Regular physical activity is crucial for maintaining a healthy weight, reducing stress, and preventing chronic diseases. You don't need to run marathons – even 30 minutes of moderate exercise daily can make a significant difference.</p>

    <h2>5. Practice Mindfulness</h2>
    <p>Mental health is just as important as physical health. Incorporate mindfulness practices like meditation, deep breathing, or yoga into your daily routine to reduce stress and improve emotional well-being.</p>

    <h2>6. Limit Processed Sugar</h2>
    <p>Excessive sugar consumption is linked to obesity, type 2 diabetes, and heart disease. Read nutrition labels carefully and opt for natural sweeteners when possible.</p>

    <h2>7. Build Strong Social Connections</h2>
    <p>Humans are social beings. Strong relationships and community connections have been shown to improve mental health and even increase longevity.</p>

    <h2>8. Take Regular Breaks from Screens</h2>
    <p>In our digital age, screen time has skyrocketed. Take regular breaks to rest your eyes, stretch your body, and engage with the physical world around you.</p>

    <h2>9. Get Regular Health Check-ups</h2>
    <p>Prevention is better than cure. Regular health screenings can catch potential issues early when they're most treatable. Don't skip your annual check-ups.</p>

    <h2>10. Practice Gratitude</h2>
    <p>Cultivating a grateful mindset has been shown to improve mental health, sleep quality, and overall life satisfaction. Try keeping a gratitude journal or simply reflecting on three things you're thankful for each day.</p>

    <h2>Conclusion</h2>
    <p>Implementing these ten tips doesn't require a complete lifestyle overhaul. Start with one or two changes and gradually incorporate more as they become habits. Remember, the journey to better health is a marathon, not a sprint. Be patient with yourself and celebrate small victories along the way.</p>
  `,
  tags: ['Wellness', 'Lifestyle', 'Health Tips', 'Self-Care']
};

const relatedArticles = [
  {
    id: '2',
    title: 'The Science Behind Intermittent Fasting',
    slug: 'science-intermittent-fasting',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop',
    readTime: '6 min read'
  },
  {
    id: '3',
    title: 'Best Morning Routines for Energy',
    slug: 'morning-routines-energy',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
    readTime: '5 min read'
  },
  {
    id: '4',
    title: 'How to Build a Sustainable Exercise Habit',
    slug: 'sustainable-exercise-habit',
    category: 'Fitness',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=250&fit=crop',
    readTime: '7 min read'
  }
];

const ArticleDetail = () => {
  const { slug } = useParams();
  
  // In production, fetch article by slug from database
  const article = mockArticle;

  return (
    <>
      <Helmet>
        <title>{article.title} | Healthy Life Hub</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
      </Helmet>
      <Layout>
        {/* Hero Image */}
        <section className="relative h-[50vh] min-h-[400px]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Link to="/articles" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
                <ArrowLeft className="w-4 h-4" />
                Back to Articles
              </Link>
              <Badge className="mb-4">{article.category}</Badge>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground max-w-4xl">
                {article.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-3 mb-8">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>

              <Separator className="mb-8" />

              {/* Article Body */}
              <article 
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-ul:text-muted-foreground prose-li:mb-2
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-display font-semibold text-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
              Related <span className="text-primary">Articles</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedArticles.map((related) => (
                <Link key={related.id} to={`/articles/${related.slug}`}>
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
                      <p className="text-sm text-muted-foreground">{related.readTime}</p>
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

export default ArticleDetail;
