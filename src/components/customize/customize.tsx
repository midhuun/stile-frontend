import { motion } from "framer-motion"; 
import { Link } from "react-router-dom";
import './customizeForm.css';
import { clients } from "./clients";
const customizationOptions:any = [
    {
      title: 'Color Options',
      description: `
        Choose from a wide range of colors to make your product truly yours. 
        Whether you prefer bold and vibrant shades or subtle pastels, we have 
        something for everyone.
      `,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-blue-5H00"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 9V7a4 4 0 10-8 0v2M5 12h14m-4 10H9a4 4 0 01-4-4V9m16 3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Size Selection',
      description: `
        Select the size that fits you best. We offer a variety of sizes to accommodate 
        different preferences and body types.
      `,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 20l-5.447-2.724A2 2 0 012 15.382V6.618a2 2 0 01.553-1.382L9 2m6 18l5.447-2.724A2 2 0 0022 15.382V6.618a2 2 0 00-.553-1.382L15 2m-6 0v18m6-18v18"
          />
        </svg>
      ),
    },
    {
      title: 'Personalized Engraving',
      description: `
        Add a personal touch with custom engraving options. Whether it's a name, 
        special date, or a meaningful quote, we have you covered.
      `,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 9V7a4 4 0 10-8 0v2m5 7h-6m6 4H9a4 4 0 01-4-4V9a4 4 0 014-4h6a4 4 0 014 4v7a4 4 0 01-4 4z"
          />
        </svg>
      ),
    },
    {
      title: 'Material Choices',
      description: `
        Select from high-quality materials that enhance the durability and aesthetics 
        of your product. From eco-friendly options to luxurious finishes.
      `,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      ),
    },
    {
      title: 'Add-Ons & Accessories',
      description: `
        Explore our range of add-ons and accessories to complement your product. 
        From additional features to stylish accessories.
      `,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-purple-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
    },
  ];
const CustomizeOrder = () => {
  return (
    <div className="container mx-auto p-6 space-y-16">
    <div className="relative">
  {/* Background Image */}
  <img
    className="w-full h-[80vh] object-cover"
    src="https://i.ibb.co/25BVx3M/customize.jpg"
    alt="Customize your style"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>

  {/* Content Container */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
    {/* SVG Design */}
    <div className="absolute top-8 left-4">
    </div>

    {/* Main Heading */}
    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
      Custom Apparel Maker
    </h1>
    
    {/* Subtext */}
    <p className="text-lg md:text-2xl mb-6 max-w-2xl drop-shadow-sm">
    If you're looking for customized products with a low minimum order quantity (MOQ), please click the link below to explore your options and start your order!
    </p>
    
    {/* Call to Action */}
   <Link to='/customize/quote'> <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg text-lg transition duration-300">
      Start Customizing
    </button>
    </Link>
  </div>
</div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Customize Your Order
        </h1>
        <p className="mb-8 text-lg text-center text-gray-600">
          Tailor your product to fit your style and needs! Explore our customization options below.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {customizationOptions.map((option:any, index:number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-center mb-4">
              {option?.icon}
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-center">{option?.title}</h2>
            <p className="text-gray-700 text-base text-center">{option?.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Add image between sections */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full flex justify-center"
      >
      
      </motion.div>
      <div className=" py-8 overflow-hidden">
      <h2 className=" text-lg md:text-3xl font-bold mb-6 text-center">Our Trusted Partners</h2>
      <div className="relative p-2 overflow-hidden">
        <div className="flex gap-5 md:gap-6 animate-scroll">
          {[clients,...clients,...clients,...clients,...clients].map((client:any, index:number) => (
            <div
              key={index}
              className="flex-shrink-0 h-20 w-20 md:w-40 md:h-40 bg-white shadow-md rounded-full flex items-center justify-center"
            >
              <img 
                src={client.logo}
                alt={client.name}
                className=" rounded-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Make It Truly Yours</h2>
        <p className="text-lg text-gray-600 mb-8">
          With endless customization possibilities, your product will reflect your unique style.
          Add colors, engravings, and more to create something that feels personal and special.
        </p>
        <Link to='/customize/quote'>
        <button className="bg-blue-500 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
          Customize Now
        </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default CustomizeOrder;
