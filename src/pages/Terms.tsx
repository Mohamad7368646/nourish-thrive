import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/i18n/LanguageContext';

const Terms = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t.termsPage.title} {t.termsPage.titleHighlight} | Healthy Life Hub</title>
        <meta name="description" content="Read Healthy Life Hub's terms of service." />
        <link rel="canonical" href="https://healthylifehub.com/terms" />
      </Helmet>
      <Layout>
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.termsPage.title} <span className="text-primary">{t.termsPage.titleHighlight}</span>
            </h1>
            <p className="text-lg text-muted-foreground">{t.termsPage.lastUpdated}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using Healthy Life Hub ("Site"), you accept and agree to be bound by these Terms of Service.
                  </p>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">2. Medical Disclaimer</h2>
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
                    <p className="text-foreground leading-relaxed mb-4">
                      <strong>IMPORTANT:</strong> The content on Healthy Life Hub is for informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">3. Contact Information</h2>
                  <p className="text-muted-foreground leading-relaxed">For questions about these Terms of Service, please contact us at:</p>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-foreground font-medium">Healthy Life Hub</p>
                    <p className="text-muted-foreground">Email: legal@healthylifehub.com</p>
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

export default Terms;
