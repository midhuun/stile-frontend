import { useEffect } from 'react';
import SEO from '../seo/SEO';
import './about.css';
const About = () => {
    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    el.classList.add('visible');
                } else {
                    el.classList.remove('visible');
                }
            });
        };
        handleScroll(); 
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="max-w-7xl  mx-auto px-4 py-2 md:py-8 overflow-x-hidden">
            <SEO
              title="About Stile Sagio | Premium T-Shirts & Apparel Manufacturer - TVT Textiles"
              description="Learn about Stile Sagio by TVT Textiles – premium t-shirt manufacturer in Tirupur. Quality cotton, sustainable apparel, custom printing. 20+ styles including polo t-shirts, joggers, hoodies."
              keywords={[
                'stile sagio',
                'tvt textiles',
                't-shirt manufacturer',
                'premium cotton t-shirts',
                'tirupur textile industry',
                'custom t-shirt printing',
                'sustainable apparel',
                'cotton loop knit',
                'interlock fabric',
                'polyester fabrics',
                'activewear manufacturer',
                'hoodies manufacturer',
                'joggers manufacturer',
                'polo t-shirts',
                'oversized t-shirts',
                'track pants',
                '4-way stretch',
                'wicking technology',
                'apparel manufacturer india',
                'textile manufacturer tirupur'
              ]}
              canonical={typeof window !== 'undefined' ? `${window.location.origin}/contact` : undefined}
              image="/logo.png"
              type="website"
              structuredData={[
                {
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "Stile Sagio",
                  "alternateName": "TVT Textiles",
                  "url": "https://stilesagio.com",
                  "logo": "https://stilesagio.com/logo.png",
                  "description": "Premium t-shirt and apparel manufacturer based in Tirupur, India",
                  "foundingDate": "2020",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Tirupur",
                    "addressRegion": "Tamil Nadu",
                    "addressCountry": "IN"
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
                      "name": "About",
                      "item": "https://stilesagio.com/contact"
                    }
                  ]
                }
              ]}
            />
            <h1 className="md:text-4xl text-xl font-bold mb-6 fade-in">About Us</h1>
            <p className="mb-4 text-[13px] md:text-lg fade-in">
                Welcome to <strong>STILE SAGIO</strong>, our premium brand dedicated to providing high-quality fashion that combines style, comfort, and sustainability. Located in the heart of Tirupur, a city renowned for its exceptional cotton production, we are proud to offer a diverse range of garments tailored to meet the needs of our clients. Our collection includes over 20 unique styles, from cotton vests to French terry joggers and hoodies.
            </p>

            {/* Our Commitment Section */}
            <section className="mt-8 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 fade-in">
                <iframe
                
                src="https://www.youtube.com/embed/W1s35CWimk8?autoplay=1&mute=1&loop=1&playlist=W1s35CWimk8"
                className="rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                width="100%"
                height="315"
                title="YouTube Video">
                </iframe>
                </div>
                <div className="md:w-1/2 md:pl-8 fade-in">
                    <h2 className="text-lg md:text-2xl font-semibold my-4">Our Commitment</h2>
                    <p className="mb-4 text-[13px] md:text-lg">
                        At STILE SAGIO, we understand that every client has unique requirements. Our commitment is to customize products based on market standards while maintaining competitive pricing. We can produce garments in various compositions, including both cotton and polyester, ensuring that we meet your specific needs.
                    </p>
                </div>
            </section>

            {/* Quality Fabrics Section */}
            <section className="mt-8 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 fade-in">
                <iframe
                src="https://www.youtube.com/embed/2verejyO7Do?autoplay=1&mute=1&loop=1&playlist=2verejyO7Do"
                className="rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                width="100%"
                height="315"
                title="YouTube Video">
                </iframe>
                </div>
                <div className="md:w-1/2 md:pl-8 fade-in">
                    <h2 className="text-lg md:text-2xl font-semibold my-4">Quality Fabrics</h2>
                    <ul className="list-disc pl-5 mb-4 text-[13px] md:text-lg">
                        <li><strong>Cotton Loop Knit and Interlock:</strong> Available from 220 GSM to 350 GSM in 15+ shades, ideal for joggers, shorts, cord sets, hoodies, sweatshirts, and oversized t-shirts.</li>
                        <li><strong>Knitted Polyester Fabrics:</strong> Produced with wicking technology for breathability and comfort.</li>
                    </ul>
                </div>
            </section>

            {/* Versatile Activewear Section */}
            <section className="mt-8 flex flex-col md:flex-row  items-center">
                <div className="md:w-1/2 fade-in">
                    <img src="https://i.ibb.co/FmBLmf6/about.jpg" alt="Versatile Activewear" className="rounded-lg w-full object-cover object-top h-[300px]" />
                </div>
                <div className="md:w-1/2 md:pl-8 fade-in">
                    <h2 className="text-lg md:text-2xl font-semibold my-4">Versatile Activewear</h2>
                    <p className="mb-4 text-[13px] md:text-lg">
                        Are you an active individual who enjoys working out or traveling? Our <strong>4-way stretch track pants</strong> are designed for ultimate flexibility—perfect for yoga, casual office wear, or lounging at home.
                    </p>
                </div>
            </section>

            {/* Custom Printing Options Section */}
            <section className="mt-8 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 fade-in">
                    <img src="https://www.xtees.com/uploads/products/images/primary/custom-men-oversized-round-neck-t-shirt_1700869753.jpg" alt="Custom Printing Options" className="rounded-lg h-[300px] w-full object-contain object-top" />
                </div>
                <div className="md:w-1/2 md:pl-8 fade-in">
                    <h2 className="text-lg md:text-2xl font-semibold my-4">Custom Printing Options</h2>
                    <p className="mb-4 text-[13px] md:text-lg">Our printing team specializes in various techniques tailored to your needs:</p>
                    <ul className="list-disc text-[13px] md:text-lg pl-5 mb-4">
                        <li>HD Printing</li>
                        <li>Foam Printing</li>
                        <li>Flock Printing</li>
                        <li>Non-PVC Plastisol Prints</li>
                    </ul>
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="md:mt-8 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 fade-in">
                    <img src="https://images.websitebuilderexpert.com/wp-content/uploads/2023/02/13045442/Contact-Us-Page-Examples.jpg" alt="Contact Us"  className="rounded-lg h-[300px] w-full object-cover" />
                </div>
                <div className="md:w-1/2 md:pl-8 fade-in">
                    <h2 className="text-lg md:text-2xl font-semibold my-4">Contact Us</h2>
                    <p className='text-[13px] md:text-lg'>
                        We invite you to reach out with your requirements. At STILE SAGIO, we are excited about the opportunity to collaborate with you and deliver exceptional products that exceed your expectations. Together, we can achieve great business success.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;
