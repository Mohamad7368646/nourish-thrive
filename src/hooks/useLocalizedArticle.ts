import { useLanguage } from '@/i18n/LanguageContext';

export function useLocalizedArticle() {
  const { language } = useLanguage();

  const getTitle = (article: { title: string; title_en?: string | null }) => {
    if (language === 'en' && article.title_en) return article.title_en;
    return article.title;
  };

  const getExcerpt = (article: { excerpt?: string | null; excerpt_en?: string | null }) => {
    if (language === 'en' && article.excerpt_en) return article.excerpt_en;
    return article.excerpt;
  };

  const getContent = (article: { content?: string | null; content_en?: string | null }) => {
    if (language === 'en' && article.content_en) return article.content_en;
    return article.content;
  };

  return { getTitle, getExcerpt, getContent };
}
