import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { PiPhoneCall } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#070b2a] text-white py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-md md:text-xl font-bold mb-4">Stile Sagio</h2>
          <p className="text-xs md:text-sm">
            Redefining fashion with premium quality and unique styles. Your go-to destination for modern and stylish clothing.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm md:text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-xs md:text-sm">
            <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
            <li><Link to="/contact" className="hover:text-gray-400">About Us</Link></li>
            <li><Link to="/track" className="hover:text-gray-400">Track Order</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-sm md:text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-xs md:text-sm">
            <li><Link to="/returns" className="hover:text-gray-400">Returns & Exchanges</Link></li>
            <li><Link to="/shipping" className="hover:text-gray-400">Shipping Policy</Link></li>
            <li><Link to="/terms" className="hover:text-gray-400">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link></li>
           
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-sm md:text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-xs md:text-sm">TVT Textiles  <br />
           No:65 ,6th Street , Padmini Gardens , Kangeyam Road
           <br />
            Tirupur -641604 </p>
          <p className="text-xs md:text-sm">Email: support@stilesagio.com</p>
          <p  className="text-xs md:text-sm">Phone: +91 8220856333</p>
          <div className="flex space-x-4 mt-4">
            <a href="https://www.facebook.com/share/18bLtJETLq" className="p-2 bg-blue-500 rounded-full hover:bg-gray-500">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/stilesagio" className="p-2 bg-red-500 rounded-full hover:bg-gray-500">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/@Stilesagio" className="p-2 bg-white text-red-500 rounded-full hover:bg-gray-500">
              <FaYoutube />
            </a>
            <a href="https://maps.app.goo.gl/gsi1unahDiVUFr6z9" className="p-2 bg-white text-blue-600 rounded-full hover:bg-gray-500">
              <MdLocationPin />
            </a>
            <a href="tel:+918220856333" className="p-2 bg-white text-blue-600 rounded-full hover:bg-gray-500">
            <PiPhoneCall />

            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        <p>© {new Date().getFullYear()} Stile Sagio. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
