import { Suspense, lazy } from 'react';
import './home.css';
import Loading from '../loading/loading';
import Carousel from './carousel';
import Categories from './categoryslide';
import SEO from '../seo/SEO';
const HomeSub = lazy(() => import('./homeSub'));
const VideoGallery = lazy(() => import('./videoGallery'));

const Home = () => {
  return (
    <>
      <SEO
        title="Stile Sagio | Premium Men's T-Shirts, Polo T-Shirts & Casual Wear - Buy Online India"
        description="Shop premium men's t-shirts, polo t-shirts, and casual wear from Stile Sagio. High-quality cotton, perfect fit, trendy designs. Free shipping across India. Best prices on polo t-shirts, full sleeve t-shirts, and custom t-shirts."
        keywords={[
          "men's t-shirts",
          "polo t-shirts",
          "premium t-shirts",
          "full sleeve t-shirts",
          "casual t-shirts",
          "stylish t-shirts",
          "cotton t-shirts",
          "trendy t-shirts",
          "buy t-shirts online",
          "t-shirts for men",
          "polo shirts",
          "custom t-shirts",
          "premium quality t-shirts",
          "Stile Sagio",
          "TVT Textiles",
          "affordable t-shirts",
          "comfortable t-shirts",
          "fashion t-shirts",
          "online t-shirt store",
          "t-shirt shopping"
        ]}
        canonical={typeof window !== 'undefined' ? `${window.location.origin}/` : 'https://stilesagio.com'}
        image="/poster.png"
        type="website"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Stile Sagio",
            "url": "https://stilesagio.com",
            "logo": "https://stilesagio.com/logo.png",
            "description": "Premium men's t-shirts and casual wear by TVT Textiles",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN",
              "addressRegion": "India"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": "English"
            },
            "sameAs": [
              "https://www.facebook.com/stilesagio",
              "https://www.instagram.com/stilesagio",
              "https://twitter.com/stilesagio"
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Stile Sagio",
            "url": "https://stilesagio.com",
            "description": "Premium men's t-shirts, polo t-shirts, and casual wear",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://stilesagio.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "Stile Sagio",
            "description": "Premium men's t-shirts and casual wear store",
            "url": "https://stilesagio.com",
            "telephone": "+91-XXXXXXXXXX",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            },
            "priceRange": "₹₹",
            "currenciesAccepted": "INR",
            "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Net Banking"
          }
        ]}
      />
      <VideoGallery />
      <Carousel />
      <Suspense fallback={<Loading />}>
        <Categories />
        <HomeSub />
      </Suspense>
    </>
  );
};

export default Home;
