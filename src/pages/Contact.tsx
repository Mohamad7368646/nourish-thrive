import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useLanguage } from '@/i18n/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  const contactSchema = z.object({
    name: z.string().trim().min(1, t.contactPage.yourName).max(100),
    email: z.string().trim().email().max(255),
    subject: z.string().trim().min(1).max(200),
    message: z.string().trim().min(10).max(2000),
  });

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(error => {
        if (error.path[0]) fieldErrors[error.path[0] as string] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: t.common.messageSent, description: t.common.messageSentDesc });
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>{t.contactPage.title} {t.contactPage.titleHighlight} | Healthy Life Hub</title>
        <meta name="description" content={t.contactPage.subtitle} />
      </Helmet>
      <Layout>
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.contactPage.title} <span className="text-primary">{t.contactPage.titleHighlight}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.contactPage.subtitle}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <div className="space-y-6">
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground mb-1">{t.contactPage.emailUs}</h3>
                        <p className="text-muted-foreground text-sm">{t.contactPage.emailDesc}</p>
                        <p className="text-primary font-medium mt-2">contact@healthylifehub.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground mb-1">{t.contactPage.feedback}</h3>
                        <p className="text-muted-foreground text-sm">{t.contactPage.feedbackDesc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{t.contactPage.responseTime}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t.contactPage.responseTimeDesc}</p>
                </div>
              </div>

              <div className="lg:col-span-2">
                <Card className="border-none shadow-xl">
                  <CardHeader>
                    <CardTitle className="font-display text-2xl">{t.contactPage.formTitle}</CardTitle>
                    <CardDescription>{t.contactPage.formSubtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t.contactPage.yourName}</Label>
                          <Input id="name" name="name" placeholder={t.contactPage.namePlaceholder} value={formData.name} onChange={handleChange} className={errors.name ? 'border-destructive' : ''} />
                          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t.contactPage.emailAddress}</Label>
                          <Input id="email" name="email" type="email" placeholder={t.contactPage.emailPlaceholder} value={formData.email} onChange={handleChange} className={errors.email ? 'border-destructive' : ''} />
                          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">{t.contactPage.subject}</Label>
                        <Input id="subject" name="subject" placeholder={t.contactPage.subjectPlaceholder} value={formData.subject} onChange={handleChange} className={errors.subject ? 'border-destructive' : ''} />
                        {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">{t.contactPage.message}</Label>
                        <Textarea id="message" name="message" placeholder={t.contactPage.messagePlaceholder} rows={6} value={formData.message} onChange={handleChange} className={errors.message ? 'border-destructive' : ''} />
                        {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                      </div>
                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? t.common.sending : (
                          <>
                            <Send className="w-4 h-4 me-2" />
                            {t.common.sendMessage}
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
