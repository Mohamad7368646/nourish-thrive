import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Heart, Target, Users, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Health First',
      description: 'We believe that good health is the foundation of a happy and fulfilling life. Every piece of content we create is designed to help you make better health decisions.'
    },
    {
      icon: Target,
      title: 'Evidence-Based',
      description: 'Our articles and recommendations are backed by scientific research and expert opinions. We don\'t promote fad diets or unproven health claims.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We\'re building a community of health-conscious individuals who support and inspire each other on their wellness journeys.'
    },
    {
      icon: Award,
      title: 'Quality Content',
      description: 'We take pride in delivering well-researched, accurate, and actionable health information that you can trust and apply in your daily life.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Healthy Life Hub - Your Trusted Health Resource</title>
        <meta name="description" content="Learn about Healthy Life Hub's mission to provide evidence-based health and nutrition information. Discover our values and commitment to your wellness journey." />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="text-primary">Healthy Life Hub</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your trusted companion on the journey to better health and wellness. 
              We're passionate about making healthy living accessible, enjoyable, and sustainable for everyone.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                    Our <span className="text-primary">Mission</span>
                  </h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    At Healthy Life Hub, we believe that everyone deserves access to reliable, 
                    easy-to-understand health information. Our mission is to empower individuals 
                    to take control of their health through education, practical tools, and 
                    delicious healthy recipes.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We cut through the noise of conflicting health advice to bring you 
                    evidence-based information that you can actually use. Whether you're 
                    looking to lose weight, build muscle, improve your nutrition, or simply 
                    live a healthier lifestyle, we're here to guide you every step of the way.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 text-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-2xl font-display font-bold text-foreground mb-2">
                    "Health is not about the weight you lose, but about the life you gain."
                  </p>
                  <p className="text-muted-foreground">— Our Philosophy</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Our <span className="text-primary">Values</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These core values guide everything we do at Healthy Life Hub.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
                What We <span className="text-primary">Offer</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Expert Articles
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    In-depth articles on nutrition, fitness, mental health, and healthy lifestyle tips.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🥗</div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Healthy Recipes
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Delicious, nutritious recipes with detailed nutritional information and easy instructions.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🧮</div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Health Tools
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Free calculators to track your BMI, daily calories, body fat, and hydration needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
              Join Our Health Community
            </h2>
            <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8">
              Start your journey to a healthier life today. Explore our articles, 
              try our recipes, and use our tools to track your progress.
            </p>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
