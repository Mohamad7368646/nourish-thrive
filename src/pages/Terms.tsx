import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Healthy Life Hub</title>
        <meta name="description" content="Read Healthy Life Hub's terms of service. Understand the rules and guidelines for using our health and nutrition website." />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Terms of <span className="text-primary">Service</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: January 1, 2026
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using Healthy Life Hub ("Site"), you accept and agree to be 
                    bound by these Terms of Service. If you do not agree to these terms, please 
                    do not use our Site.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    2. Use of the Site
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You agree to use the Site only for lawful purposes and in a way that does not 
                    infringe the rights of, restrict, or inhibit anyone else's use of the Site. 
                    Prohibited behavior includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Harassing or causing distress to any person</li>
                    <li>Transmitting obscene or offensive content</li>
                    <li>Disrupting the normal flow of the Site</li>
                    <li>Attempting to gain unauthorized access to any systems</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    3. Medical Disclaimer
                  </h2>
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
                    <p className="text-foreground leading-relaxed mb-4">
                      <strong>IMPORTANT:</strong> The content on Healthy Life Hub is for informational 
                      and educational purposes only. It is not intended to be a substitute for 
                      professional medical advice, diagnosis, or treatment.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Always seek the advice of your physician or other qualified health provider 
                      with any questions you may have regarding a medical condition. Never disregard 
                      professional medical advice or delay in seeking it because of something you 
                      have read on this Site.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    4. Health Calculators and Tools
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our health calculators (BMI, calorie, body fat, water intake) provide estimates 
                    based on general formulas. Results are for informational purposes only and should 
                    not be used as a basis for medical decisions. For accurate health assessments, 
                    please consult with a healthcare professional.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    5. Intellectual Property
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    All content on this Site, including but not limited to text, graphics, logos, 
                    images, and software, is the property of Healthy Life Hub and is protected by 
                    copyright and other intellectual property laws.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    You may not reproduce, distribute, modify, or create derivative works from any 
                    content without our prior written permission.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    6. User-Generated Content
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you submit any content to our Site (such as comments or feedback), you grant 
                    us a non-exclusive, royalty-free, perpetual license to use, reproduce, and 
                    distribute that content. You are responsible for ensuring that any content you 
                    submit does not violate any third-party rights.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    7. Third-Party Links
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our Site may contain links to third-party websites. These links are provided 
                    for your convenience only. We have no control over the content of these sites 
                    and are not responsible for their content or privacy practices.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    8. Advertising
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our Site displays advertisements through third-party advertising networks. 
                    We are not responsible for the content of these advertisements. The presence 
                    of an advertisement does not constitute an endorsement of the advertised 
                    product or service.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    9. Limitation of Liability
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To the fullest extent permitted by law, Healthy Life Hub shall not be liable 
                    for any indirect, incidental, special, consequential, or punitive damages 
                    arising out of or related to your use of the Site or any content therein.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    10. Indemnification
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    You agree to indemnify and hold harmless Healthy Life Hub from any claims, 
                    damages, or expenses arising from your use of the Site or violation of these 
                    Terms of Service.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    11. Changes to Terms
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify these Terms of Service at any time. Changes 
                    will be effective immediately upon posting to the Site. Your continued use 
                    of the Site after any changes constitutes acceptance of the new terms.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    12. Governing Law
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms of Service shall be governed by and construed in accordance with 
                    applicable laws, without regard to conflict of law principles.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    13. Contact Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For questions about these Terms of Service, please contact us at:
                  </p>
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
