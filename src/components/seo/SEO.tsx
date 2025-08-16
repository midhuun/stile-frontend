import { Helmet } from 'react-helmet-async';

type SEOProps = {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'product' | 'profile' | string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  noindex?: boolean;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
};

function toAbsoluteUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('http')) return url;
  const origin = typeof window !== 'undefined' && window.location?.origin
    ? window.location.origin
    : 'https://stilesagio.com';
  return `${origin}${url.startsWith('/') ? '' : '/'}${url}`;
}

export default function SEO(props: SEOProps) {
  const {
    title,
    description,
    keywords,
    canonical,
    image,
    type = 'website',
    jsonLd,
    noindex = false,
    structuredData,
  } = props;

  const absoluteImage = toAbsoluteUrl(image) || 'https://stilesagio.com/poster.png';
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : 'https://stilesagio.com');
  const keywordsContent = keywords?.join(', ');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywordsContent && <meta name="keywords" content={keywordsContent} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Crawling & Indexing */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Language & Region */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      
      {/* Author & Publisher */}
      <meta name="author" content="Stile Sagio" />
      <meta name="publisher" content="TVT Textiles" />
      
      {/* Open Graph - Enhanced */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Stile Sagio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter - Enhanced */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:site" content="@stilesagio" />
      <meta name="twitter:creator" content="@stilesagio" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#4F46E5" />
      <meta name="msapplication-TileColor" content="#4F46E5" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Stile Sagio" />
      
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        Array.isArray(jsonLd) ? (
          jsonLd.map((schema, idx) => (
            <script key={idx} type="application/ld+json">{JSON.stringify(schema)}</script>
          ))
        ) : (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )
      )}
      
      {/* Additional Structured Data */}
      {structuredData && (
        Array.isArray(structuredData) ? (
          structuredData.map((schema, idx) => (
            <script key={`structured-${idx}`} type="application/ld+json">{JSON.stringify(schema)}</script>
          ))
        ) : (
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        )
      )}
    </Helmet>
  );
}

