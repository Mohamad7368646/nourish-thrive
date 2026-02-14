import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/i18n/LanguageContext';

const Cookies = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <>
      <Helmet>
        <title>{isEn ? 'Cookie Policy | Healthy Life Hub' : 'سياسة ملفات تعريف الارتباط | Healthy Life Hub'}</title>
        <meta name="description" content={isEn ? "Learn about how Healthy Life Hub uses cookies." : "تعرف على كيفية استخدام Healthy Life Hub لملفات تعريف الارتباط."} />
        <link rel="canonical" href="https://healthylifehub.com/cookies" />
      </Helmet>
      <Layout>
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isEn ? 'Cookie' : 'سياسة ملفات'}{' '}
              <span className="text-primary">{isEn ? 'Policy' : 'تعريف الارتباط'}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {isEn ? 'Last updated: February 2026' : 'آخر تحديث: فبراير 2026'}
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    {isEn ? '1. What Are Cookies?' : '1. ما هي ملفات تعريف الارتباط (الكوكيز)؟'}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {isEn
                      ? 'Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.'
                      : 'ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم وضعها على جهازك عند زيارة موقعنا الإلكتروني. تساعدنا في تقديم تجربة أفضل لك من خلال تذكر تفضيلاتك وفهم كيفية استخدامك لموقعنا.'}
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    {isEn ? '2. Types of Cookies We Use' : '2. أنواع ملفات تعريف الارتباط التي نستخدمها'}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                        {isEn ? 'Essential Cookies' : 'ملفات تعريف الارتباط الأساسية'}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {isEn
                          ? 'These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot disable these cookies.'
                          : 'هذه الملفات ضرورية لعمل الموقع بشكل صحيح. تمكّن الوظائف الأساسية مثل الأمان وإدارة الشبكة وإمكانية الوصول. لا يمكنك تعطيل هذه الملفات.'}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                        {isEn ? 'Analytics Cookies' : 'ملفات تعريف الارتباط التحليلية'}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {isEn
                          ? 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and content.'
                          : 'تساعدنا هذه الملفات في فهم كيفية تفاعل الزوار مع موقعنا من خلال جمع المعلومات والإبلاغ عنها بشكل مجهول. يساعدنا ذلك في تحسين موقعنا ومحتوانا.'}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                        {isEn ? 'Advertising Cookies' : 'ملفات تعريف الارتباط الإعلانية'}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {isEn
                          ? 'We use Google AdSense to display advertisements on our website. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google Ads Settings.'
                          : 'نستخدم Google AdSense لعرض الإعلانات على موقعنا. قد تستخدم Google ملفات تعريف الارتباط لعرض إعلانات بناءً على زياراتك السابقة لموقعنا أو مواقع أخرى. يمكنك إلغاء الاشتراك في الإعلانات المخصصة من خلال زيارة إعدادات إعلانات Google.'}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                        {isEn ? 'Preference Cookies' : 'ملفات تعريف الارتباط التفضيلية'}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {isEn
                          ? 'These cookies allow our website to remember choices you make (such as your preferred language or theme) and provide enhanced, more personalized features.'
                          : 'تسمح هذه الملفات لموقعنا بتذكر الخيارات التي تقوم بها (مثل لغتك المفضلة أو المظهر) وتوفير ميزات محسنة وأكثر تخصيصاً.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    {isEn ? '3. Third-Party Cookies' : '3. ملفات تعريف الارتباط الخاصة بالجهات الخارجية'}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {isEn
                      ? 'Some cookies are placed by third-party services that appear on our pages. We use the following third-party services:'
                      : 'يتم وضع بعض ملفات تعريف الارتباط بواسطة خدمات الجهات الخارجية التي تظهر على صفحاتنا. نستخدم خدمات الجهات الخارجية التالية:'}
                  </p>
                  <ul className="list-disc ps-6 space-y-2 text-muted-foreground">
                    <li>{isEn ? 'Google AdSense - for displaying relevant advertisements' : 'Google AdSense - لعرض الإعلانات ذات الصلة'}</li>
                    <li>{isEn ? 'Google Analytics - for website usage analysis' : 'Google Analytics - لتحليل استخدام الموقع'}</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    {isEn ? '4. Managing Cookies' : '4. إدارة ملفات تعريف الارتباط'}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {isEn
                      ? 'Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or to alert you when cookies are being sent. Please note that disabling cookies may affect the functionality of our website.'
                      : 'تسمح لك معظم متصفحات الويب بالتحكم في ملفات تعريف الارتباط من خلال إعداداتها. يمكنك ضبط متصفحك لرفض ملفات تعريف الارتباط أو لتنبيهك عند إرسالها. يرجى ملاحظة أن تعطيل ملفات تعريف الارتباط قد يؤثر على وظائف موقعنا.'}
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    {isEn ? '5. Updates to This Policy' : '5. تحديثات هذه السياسة'}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {isEn
                      ? 'We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this page periodically.'
                      : 'قد نقوم بتحديث سياسة ملفات تعريف الارتباط هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو لأسباب تشغيلية أو قانونية أو تنظيمية أخرى. نشجعك على مراجعة هذه الصفحة بشكل دوري.'}
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    {isEn ? '6. Contact Us' : '6. اتصل بنا'}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {isEn
                      ? 'If you have any questions about our use of cookies, please contact us at:'
                      : 'إذا كان لديك أي أسئلة حول استخدامنا لملفات تعريف الارتباط، يرجى الاتصال بنا على:'}
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

export default Cookies;
