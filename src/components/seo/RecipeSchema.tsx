import { Helmet } from 'react-helmet-async';

interface RecipeSchemaProps {
  title: string;
  description: string;
  image: string;
  url: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  calories?: number;
  ingredients: string[];
  instructions: string[];
  keywords?: string[];
  difficulty?: string;
  publishedTime?: string;
}

const RecipeSchema = ({
  title,
  description,
  image,
  url,
  prepTime,
  cookTime,
  servings,
  calories,
  ingredients,
  instructions,
  keywords = [],
  difficulty = 'Easy',
  publishedTime,
}: RecipeSchemaProps) => {
  const siteUrl = 'https://healthylifehub.com';
  
  // Convert minutes to ISO 8601 duration
  const toDuration = (minutes: number) => `PT${minutes}M`;
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: title,
    description: description,
    image: {
      '@type': 'ImageObject',
      url: image,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Organization',
      name: 'Healthy Life Hub',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Healthy Life Hub',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    datePublished: publishedTime || new Date().toISOString(),
    prepTime: toDuration(prepTime),
    cookTime: toDuration(cookTime),
    totalTime: toDuration(prepTime + cookTime),
    recipeYield: `${servings} servings`,
    recipeCategory: 'Healthy',
    recipeCuisine: 'International',
    keywords: keywords.join(', '),
    recipeIngredient: ingredients,
    recipeInstructions: instructions.map((instruction, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: instruction,
    })),
    nutrition: calories ? {
      '@type': 'NutritionInformation',
      calories: `${calories} calories`,
    } : undefined,
    suitableForDiet: keywords.includes('Keto') 
      ? 'https://schema.org/LowCarbohydrateDiet'
      : keywords.includes('Vegan')
      ? 'https://schema.org/VeganDiet'
      : undefined,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default RecipeSchema;
