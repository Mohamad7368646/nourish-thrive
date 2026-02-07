import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/i18n/LanguageContext';

const Privacy = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t.privacyPage.title} {t.privacyPage.titleHighlight} | Healthy Life Hub</title>
        <meta name="description" content="Read Healthy Life Hub's privacy policy." />
      </Helmet>
      <Layout>
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.privacyPage.title} <span className="text-primary">{t.privacyPage.titleHighlight}</span>
            </h1>
            <p className="text-lg text-muted-foreground">{t.privacyPage.lastUpdated}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Welcome to Healthy Life Hub ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website healthylifehub.com (the "Site").
                  </p>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">We collect information that you voluntarily provide to us when you:</p>
                  <ul className="list-disc ps-6 space-y-2 text-muted-foreground">
                    <li>Fill out our contact form</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Use our health calculators and tools</li>
                    <li>Leave comments on our articles</li>
                  </ul>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">3. Data Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement appropriate technical and organizational security measures to protect your personal information.
                  </p>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">4. Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">If you have any questions about this Privacy Policy, please contact us at:</p>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-foreground font-medium">Healthy Life Hub</p>
                    <p className="text-muted-foreground">Email: privacy@healthylifehub.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Privacy;
