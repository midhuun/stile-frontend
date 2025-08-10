import { Helmet } from 'react-helmet-async';

type SEOProps = {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'product' | 'profile' | string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
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

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={absoluteImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {/* JSON-LD */}
      {jsonLd && (
        Array.isArray(jsonLd) ? (
          jsonLd.map((schema, idx) => (
            <script key={idx} type="application/ld+json">{JSON.stringify(schema)}</script>
          ))
        ) : (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )
      )}
    </Helmet>
  );
}

