import { useCallback, useEffect, useState } from 'react';
import { SubCategory, Product } from '../../types/CategoryType';
import ProductCard from '../product/productCard';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../store/useQuery/QueryProducts';
import SectionHeader from './SectionHeader';
import SEO from '../seo/SEO';

const HomeSub = () => {
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product'],
    queryFn: fetchProducts,
  });

  // Remove duplicate products by name
  const removeDuplicateProducts = useCallback((products: Product[]) => {
    const seenNames = new Set();
    return products.filter((product) => {
      if (!seenNames.has(product.name)) {
        seenNames.add(product.name);
        return true;
      }
      return false;
    });
  }, []);

  // Fetch categories when product data is available
  useEffect(() => {
    if (product && product.subCategories) {
      const processedSubcategories = product.subCategories.map((subcategory: SubCategory) => ({
        ...subcategory,
        products: removeDuplicateProducts(subcategory.products),
      }));
      setSubcategories(processedSubcategories);
    }
  }, [product]); // 👈 Run this effect when `product` updates

  if (isLoading) {
    return (
      <div className="loading-container h-full w-full overflow-x-hidden">
        {/* Story Image Skeleton */}
        <div className="md:w-full hidden md:block md:h-full">
          <div className="w-full h-[400px] animate-pulse bg-gray-200 rounded-lg"></div>
        </div>
        
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="md:mt-5 w-full px-2 md:px-4">
              {/* Section Header Skeleton */}
              <div className="flex justify-between items-end mb-3 md:mb-6">
                <div className="h-8 w-48 animate-pulse bg-gray-200 rounded"></div>
                <div className="h-4 w-16 animate-pulse bg-gray-200 rounded"></div>
              </div>
              
              {/* Products Skeleton */}
              <div className="flex min-h-[350px] rounded-md md:justify-start hide-scroll overflow-x-scroll gap-2 md:gap-4">
                {Array(5)
                  .fill(null)
                  .map((_, prodIndex) => (
                    <div
                      key={prodIndex}
                      className="h-[300px] flex flex-col w-[140px] h-[310px] md:h-[520px] md:w-[300px]"
                    >
                      <div className="h-[250px] md:h-[450px] animate-pulse bg-gray-200 rounded-md"></div>
                      <div className="md:p-2 p-2">
                        <div className="h-5 w-full animate-pulse bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-20 animate-pulse bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (error) return <p>Error loading products</p>;

  return (
    <>
      <SEO
        title="All Products | Premium Men's T-Shirts, Polo T-Shirts & Casual Wear - Stile Sagio"
        description="Browse our complete collection of premium men's t-shirts, polo t-shirts, and casual wear. High-quality cotton, trendy designs, perfect fit. Shop online with free shipping across India."
        keywords={[
          'all products',
          'mens t shirts',
          'polo t shirts',
          'premium t shirts',
          'full sleeve t shirts',
          'casual t shirts',
          'stylish t shirts',
          'cotton t shirts',
          'trendy t shirts',
          'buy t shirts online',
          't shirts for men',
          'custom t shirts',
          'premium quality t shirts',
          'stile sagio',
          'tvt textiles',
          'affordable t shirts',
          'comfortable t shirts',
          'fashion t shirts',
          'online t shirt store',
          't shirt shopping',
          'casual wear',
          'men clothing',
          'apparel collection'
        ]}
        canonical={typeof window !== 'undefined' ? `${window.location.origin}/products/all` : undefined}
        image="/poster.png"
        type="website"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "All Products - Stile Sagio",
            "description": "Complete collection of premium men's t-shirts and casual wear",
            "url": typeof window !== 'undefined' ? `${window.location.origin}/products/all` : 'https://stilesagio.com/products/all'
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://stilesagio.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "All Products",
                "item": "https://stilesagio.com/products/all"
              }
            ]
          }
        ]}
      />
      <div className="md:w-full hidden md:block md:h-full">
        <img
          loading="lazy"
          src="/story.jpg"
          className="w-full h-[400px] object-contain"
          alt="Stile Sagio Story"
        />
      </div>

      <div className="w-full mt-2">
        {subcategories.map((subcategory: SubCategory) => (
          <div 
            key={subcategory._id} 
            className="md:mt-5 w-full px-2 md:px-4"
          >
            <div className="flex justify-between items-end mb-3 md:mb-6">
              <SectionHeader
                title={subcategory.name}
                eyebrow="Collection"
                align="left"
                className="m-0"
              />
              <Link to={`/subcategory/${subcategory.slug}`}>
                <span className="text-xs md:text-sm font-semibold underline underline-offset-4">View all</span>
              </Link>
            </div>
            <div className="flex min-h-[350px] rounded-md md:justify-start hide-scroll overflow-x-scroll gap-2 md:gap-4">
              {subcategory.products.map((product, i) => (
                <div key={i}>
                  <ProductCard product={{ ...product, type: 'home' }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeSub;
