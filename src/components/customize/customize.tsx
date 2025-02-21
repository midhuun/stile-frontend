import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./customizeForm.css";
import { clients } from "./clients";

const customizationOptions = [
  {
    title: "Color Options",
    description:
      "Choose from a wide range of colors to make your product truly yours. Whether you prefer bold and vibrant shades or subtle pastels, we have something for everyone.",
    icon: "🎨",
  },
  {
    title: "Size Selection",
    description:
      "Select the size that fits you best. We offer a variety of sizes to accommodate different preferences and body types.",
    icon: "📏",
  },
  {
    title: "Personalized Engraving",
    description:
      "Add a personal touch with custom engraving options. Whether it's a name, special date, or a meaningful quote, we have you covered.",
    icon: "🔡",
  },
  {
    title: "Material Choices",
    description:
      "Select from high-quality materials that enhance the durability and aesthetics of your product. From eco-friendly options to luxurious finishes.",
    icon: "🛠️",
  },
  {
    title: "Add-Ons & Accessories",
    description:
      "Explore our range of add-ons and accessories to complement your product. From additional features to stylish accessories.",
    icon: "➕",
  },
];

const CustomizeOrder = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="relative hidden w-full h-[70vh] md:flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('https://optamarkgraphics.com/wp-content/uploads/2024/06/banner-6.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white px-6">
          <h1 className="md:text-3xl text-lg font-bold mb-4">Custom Apparel Maker</h1>
          <p className="md:text-lg text-sm mb-6 max-w-2xl mx-auto">
            Looking for customized products with a low minimum order quantity (MOQ)? Click below to explore your options and start your order!
          </p>
          <Link to="/customize/quote">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 md:px-8 rounded-lg shadow-lg text-sm md:text-lg transition duration-300">
              Start Customizing
            </button>
          </Link>
        </div>
      </div>
      <div className="py-5 relative">
      <img src="/customizenow.png" alt="" className="object-contain" />
      <Link to="/customize/quote">
            <button className="bg-black absolute hover:text-black bottom-10 tranform left-[50%] translate-x-[-50%]  hover:bg-white text-white font-semibold px-4 py-3 md:px-8 rounded-lg shadow-lg text-sm md:text-lg transition duration-300">
              Start Customizing
            </button>
          </Link>
      </div>
      {/* Customization Options */}
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center my-5 md:my-16">
        <h2 className="md:text-4xl text-xl font-bold text-gray-800 mb-4">Customize Your Order</h2>
        <p className="md:text-lg text-sm text-gray-600 max-w-3xl mx-auto">
          Tailor your product to fit your style and needs! Explore our customization options below.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {customizationOptions.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition duration-300"
          >
            <div className="md:text-5xl text-3xl mb-4">{option.icon}</div>
            <h3 className="md:text-2xl text-lg font-semibold mb-2">{option.title}</h3>
            <p className="text-gray-600 text-sm md:text-md">{option.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Trusted Partners */}
      <div className="py-16 overflow-x-hidden">
        <h2 className="md:text-3xl text-lg font-bold text-center mb-6">Our Trusted Partners</h2>
        <div className="flex gap-5 overflow-x-hidden animate-scroll">
          {[...clients, ...clients, ...clients].map((client:any, index) => (
            <div key={index} className="flex-shrink-0 w-20 h-20 md:w-40 md:h-40 shadow-md rounded-full flex items-center justify-center">
              <img src={client.logo} alt={client.name} className="rounded-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Final Call to Action */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
        <h2 className="md:text-3xl text-lg font-bold text-gray-800 mb-4">Make It Truly Yours</h2>
        <p className="md:text-lg text-sm text-gray-600 mb-8">
          With endless customization possibilities, your product will reflect your unique style. Add colors, engravings, and more to create something special.
        </p>
        <Link to="/customize/quote">
          <button className="text-white bg-black text-sm md:text-md hover:bg-white hover:text-black py-3 md:px-8 px-4 rounded-lg shadow-lg transition duration-300">
            Customize Now
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default CustomizeOrder;
