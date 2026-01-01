import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Healthy Life Hub</title>
        <meta name="description" content="Read Healthy Life Hub's privacy policy. Learn how we collect, use, and protect your personal information." />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: January 1, 2026
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    1. Introduction
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Welcome to Healthy Life Hub ("we," "our," or "us"). We are committed to protecting 
                    your personal information and your right to privacy. This Privacy Policy explains 
                    how we collect, use, disclose, and safeguard your information when you visit our 
                    website healthylifehub.com (the "Site").
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    2. Information We Collect
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We collect information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Fill out our contact form</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Use our health calculators and tools</li>
                    <li>Leave comments on our articles</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    The personal information we collect may include your name, email address, and any 
                    other information you choose to provide.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    3. Automatically Collected Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    When you visit our Site, we automatically collect certain information about your 
                    device, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>IP address</li>
                    <li>Pages visited and time spent</li>
                    <li>Referring website</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    4. Cookies and Tracking Technologies
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use cookies and similar tracking technologies to collect and track information 
                    about your browsing activities. Types of cookies we use include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our Site</li>
                    <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements to you</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    You can control cookies through your browser settings. However, disabling cookies 
                    may affect the functionality of our Site.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    5. How We Use Your Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Provide and maintain our Site</li>
                    <li>Respond to your inquiries and comments</li>
                    <li>Send you newsletters and promotional materials (with your consent)</li>
                    <li>Analyze usage patterns to improve our content and user experience</li>
                    <li>Display personalized advertisements through third-party advertising partners</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    6. Third-Party Advertising
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use Google AdSense and other third-party advertising networks to display 
                    advertisements on our Site. These third parties may use cookies and similar 
                    technologies to collect information about your visits to this and other websites 
                    to provide relevant advertisements. For more information about Google's data 
                    practices, please visit Google's Privacy & Terms page.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    7. Data Security
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement appropriate technical and organizational security measures to protect 
                    your personal information. However, no method of transmission over the Internet or 
                    electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    8. Your Rights
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Depending on your location, you may have the following rights regarding your 
                    personal information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Right to access your personal data</li>
                    <li>Right to rectification of inaccurate data</li>
                    <li>Right to erasure ("right to be forgotten")</li>
                    <li>Right to restrict processing</li>
                    <li>Right to data portability</li>
                    <li>Right to object to processing</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    9. Children's Privacy
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our Site is not intended for children under 13 years of age. We do not knowingly 
                    collect personal information from children under 13. If you are a parent or 
                    guardian and believe your child has provided us with personal information, 
                    please contact us.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    10. Changes to This Policy
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any 
                    changes by posting the new Privacy Policy on this page and updating the "Last 
                    updated" date.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    11. Contact Us
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy or our data practices, 
                    please contact us at:
                  </p>
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
