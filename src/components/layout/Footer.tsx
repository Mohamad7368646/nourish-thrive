import { Link } from 'react-router-dom';
import { Leaf, Mail } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = {
    explore: [
      { name: t.nav.articles, href: '/articles' },
      { name: t.footer.healthTools, href: '/tools' },
    ],
    company: [
      { name: t.footer.aboutUs, href: '/about' },
    ],
    legal: [
      { name: t.footer.privacyPolicy, href: '/privacy' },
      { name: t.footer.termsOfService, href: '/terms' },
      { name: t.footer.cookiePolicy, href: '/cookies' },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-bold text-foreground">
                Healthy<span className="text-primary">Life</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              {t.footer.description}
            </p>
            
            {/* Newsletter */}
            <div className="flex gap-2 max-w-sm">
              <div className="relative flex-1">
                <Mail className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder={t.common.enterEmail}
                  className="w-full ps-10 pe-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <button className="px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                {t.common.subscribe}
              </button>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">{t.footer.explore}</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">{t.footer.company}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">{t.footer.legal}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex items-center justify-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} HealthyLife Hub. {t.footer.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
