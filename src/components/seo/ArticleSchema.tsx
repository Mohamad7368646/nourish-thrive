import { Helmet } from 'react-helmet-async';

interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  url: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

const ArticleSchema = ({
  title,
  description,
  image,
  url,
  publishedTime,
  modifiedTime,
  author = 'Healthy Life Hub',
  section = 'Health',
}: ArticleSchemaProps) => {
  const siteUrl = 'https://healthylifehub.com';
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}${url}`,
    },
    headline: title,
    description: description,
    image: {
      '@type': 'ImageObject',
      url: image,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Organization',
      name: author,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Healthy Life Hub',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
        width: 200,
        height: 60,
      },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    articleSection: section,
    inLanguage: 'ar',
    isAccessibleForFree: true,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default ArticleSchema;
