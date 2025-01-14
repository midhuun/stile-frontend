const ShippingPolicy = () => {
  return (
    <div className="px-2 md:px-5">
      <h2 className="text-lg pt-5 md:text-2xl font-bold text-gray-800 mb-4 text-center">Shipping Policy</h2>
      
      <p className="text-[13px] md:text-lg text-gray-700 leading-relaxed mb-6 text-center">
        All orders are processed within 2 to 3 business days after receiving your order confirmation email. You will receive another notification when your order has shipped.
      </p>

      <p className="text-[13px] md:text-lg text-gray-700 leading-relaxed mb-6 text-center">
        We will bring it to your notice in case of potential delays due to a high volume of orders or postal service problems that are outside of our control.
      </p>

      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Domestic Shipping Rates</h3>
      <p className="text-[13px] md:text-lg text-gray-700 leading-relaxed mb-4">
        All Over India - Get free shipping on a minimum spend of ₹999 when shipped inside Tamil Nadu or ₹1499 when shipped to the rest of India.
      </p>

      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">How do I check the status of my order?</h3>
      <p className="text-[13px] md:text-lg text-gray-700 leading-relaxed mb-4">
        When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 24 hours for the tracking information to become available.
      </p>

      <p className="text-[13px] md:text-lg text-gray-700 leading-relaxed mb-4">
        If you haven’t received your order within 7 days of receiving your shipping confirmation email, please reach out to us on WhatsApp (Click on the WhatsApp icon you see on the screen) with your name, email, and order number, and we will look into it for you.
      </p>

      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Refunds, Returns, and Exchanges</h3>
      <p className="text-[13px] md:text-lg text-gray-700 leading-relaxed mb-4">
        We do not accept cancellations or refunds. In case any client does not receive the right product or receives a damaged product, we provide an exchange.
      </p>

      <p className="text-[13px] md:text-lg text-gray-700 leading-relaxed mb-4">
        For further information, please check our Cancellation/Exchange/Refund Policy page.
      </p>
    </div>
  );
};

export default ShippingPolicy;
