import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Heart, Target, Users, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { useLanguage } from '@/i18n/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const values = [
    { icon: Heart, title: t.aboutPage.healthFirst, description: t.aboutPage.healthFirstDesc },
    { icon: Target, title: t.aboutPage.evidenceBased, description: t.aboutPage.evidenceBasedDesc },
    { icon: Users, title: t.aboutPage.community, description: t.aboutPage.communityDesc },
    { icon: Award, title: t.aboutPage.qualityContent, description: t.aboutPage.qualityContentDesc },
  ];

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Healthy Life Hub',
    description: 'Learn about Healthy Life Hub\'s mission to provide evidence-based health and nutrition information.',
    url: 'https://healthylifehub.com/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'Healthy Life Hub',
      url: 'https://healthylifehub.com',
      foundingDate: '2024',
      areaServed: 'Worldwide',
    },
  };

  return (
    <>
      <Helmet>
        <title>{t.aboutPage.title} {t.aboutPage.titleHighlight} | Healthy Life Hub</title>
        <meta name="description" content={t.aboutPage.subtitle} />
        <link rel="canonical" href="https://healthylifehub.com/about" />
        <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
      </Helmet>
      
      <BreadcrumbSchema items={[{ name: t.nav.home, url: '/' }, { name: t.nav.about, url: '/about' }]} />
      
      <Layout>
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t.aboutPage.title} <span className="text-primary">{t.aboutPage.titleHighlight}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t.aboutPage.subtitle}
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                    {t.aboutPage.missionTitle} <span className="text-primary">{t.aboutPage.missionHighlight}</span>
                  </h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{t.aboutPage.missionP1}</p>
                  <p className="text-muted-foreground leading-relaxed">{t.aboutPage.missionP2}</p>
                </div>
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 text-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-2xl font-display font-bold text-foreground mb-2">{t.aboutPage.quote}</p>
                  <p className="text-muted-foreground">{t.aboutPage.quoteAuthor}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                {t.aboutPage.valuesTitle} <span className="text-primary">{t.aboutPage.valuesHighlight}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.aboutPage.valuesSubtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
                {t.aboutPage.offerTitle} <span className="text-primary">{t.aboutPage.offerHighlight}</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{t.aboutPage.expertArticles}</h3>
                  <p className="text-muted-foreground text-sm">{t.aboutPage.expertArticlesDesc}</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🥗</div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{t.aboutPage.healthyRecipes}</h3>
                  <p className="text-muted-foreground text-sm">{t.aboutPage.healthyRecipesDesc}</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🧮</div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{t.aboutPage.healthTools}</h3>
                  <p className="text-muted-foreground text-sm">{t.aboutPage.healthToolsDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">{t.aboutPage.ctaTitle}</h2>
            <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8">{t.aboutPage.ctaSubtitle}</p>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
