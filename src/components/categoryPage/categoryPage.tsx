import { apiUrl } from '../../utils/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../types/CategoryType';
import ProductCard from '../product/productCard';
import Loading from '../loading/loading';
import SEO from '../seo/SEO';

const CategoryPage = () => {
  const { subcategoryName } = useParams<any>();
  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setisLoading] = useState(false);

  async function getcategories() {
    setisLoading(true);
    const response = await fetch(apiUrl(`/category/${subcategoryName}`));
    const data: any = await response.json();
    setCategory(data?.subcategory?.name);
    setProducts(data?.products);
    setisLoading(false);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    getcategories();
  }, [subcategoryName]);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-12 md:mt-5 md:py-4 pb-2 px-2 md:px-4">
      <SEO
        title={`${category || subcategoryName} | Premium Men's T-Shirts - Buy Online at Stile Sagio`}
        description={`Shop ${category || subcategoryName} from Stile Sagio. Premium cotton t-shirts, trendy designs, perfect fit. Free shipping across India. Best prices on ${category || subcategoryName} t-shirts.`}
        keywords={[
          category || subcategoryName,
          'mens t shirts',
          'polo t shirts',
          'premium t shirts',
          'stylish t shirts',
          'cotton t shirts',
          'trendy t shirts',
          'buy t shirts online',
          't shirts for men',
          'custom t shirts',
          'premium quality t shirts',
          'stile sagio',
          'tvt textiles',
          'online t shirt store',
          't shirt shopping',
          'casual t shirts',
          'fashion t shirts',
          'comfortable t shirts',
          'affordable t shirts'
        ]}
        canonical={typeof window !== 'undefined' ? window.location.href : undefined}
        image="/poster.png"
        type="website"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `${category || subcategoryName} - Stile Sagio`,
            "description": `Premium ${category || subcategoryName} t-shirts by Stile Sagio`,
            "url": typeof window !== 'undefined' ? window.location.href : 'https://stilesagio.com',
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": products.map((product: any, index: number) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": product.name,
                  "url": `https://stilesagio.com/product/${product.slug}`,
                  "image": product.images?.[0],
                  "description": product.description,
                  "brand": { "@type": "Brand", "name": "Stile Sagio" },
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "INR",
                    "price": String(product.discountedPrice ?? product.price),
                    "availability": "https://schema.org/InStock"
                  }
                }
              }))
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": typeof window !== 'undefined' ? window.location.origin : 'https://stilesagio.com'
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": category || subcategoryName,
                "item": typeof window !== 'undefined' ? window.location.href : 'https://stilesagio.com'
              }
            ]
          }
        ]}
      />
      <h1 className="text-sm md:text-xl  font-bold  text-gray-800 mb-4">{category}</h1>
      <div className="flex justify-between sm:justify-start flex-wrap gap-[2px] md:gap-5 ">
        {products?.map((product: any) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
