import { useLanguage } from '@/i18n/LanguageContext';

export function useLocalizedRecipe() {
  const { language } = useLanguage();

  const getTitle = (recipe: { title: string; title_en?: string | null }) => {
    if (language === 'en' && recipe.title_en) return recipe.title_en;
    return recipe.title;
  };

  const getDescription = (recipe: { description?: string | null; description_en?: string | null }) => {
    if (language === 'en' && recipe.description_en) return recipe.description_en;
    return recipe.description;
  };

  return { getTitle, getDescription };
}
