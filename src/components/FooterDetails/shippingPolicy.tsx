const ShippingPolicy = () => {
  return (
    <div className="px-2 md:px-5 md:pt-5">
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 text-center">Shipping & Handling Policy</h2>
      
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Shipping Time</h3>
      <p className="text-[13px] md:text-md text-gray-700 leading-relaxed mb-4">
        Orders are usually processed and shipped within **1 business day**.
      </p>

      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Shipping Charges</h3>
      <p className="text-[13px] md:text-md text-gray-700 leading-relaxed mb-4">
        We offer **free shipping** on prepaid orders. For domestic COD orders, a fee of **Rs. 100** applies.
      </p>

      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Tracking</h3>
      <p className="text-[13px] md:text-md text-gray-700 leading-relaxed mb-4">
        You will receive tracking details via **WhatsApp** and **Email**.
      </p>

      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Returns</h3>
      <p className="text-[13px] md:text-md text-gray-700 leading-relaxed mb-4">
        We offer a **7-day return policy** for all unused and unworn items. This policy does not apply to sunglasses, boxers, trunks, all accessories, and flat store items. The Bear House reserves the right to inspect returned items before processing refunds.
      </p>
      
      <ul className="list-disc pl-6 mb-6 text-[13px] md:text-md text-gray-700">
        <li>If you purchased a Bear House product from a source other than our website or app, the return policies of that source shall apply.</li>
        <li>Any shipping charges paid at the time of order are non-refundable in case of returns.</li>
        <li>In case of missing items in return orders, we reserve the right to deduct the paid amount of the missing product from the refund.</li>
        <li>Refunds will be processed once we receive the returned item at our warehouse.</li>
        <li>You can also request an exchange under the same conditions as returns. Exchanges will be shipped only after we have picked up the initial return.</li>
      </ul>

      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Return Process</h3>
      <p className="text-[13px] md:text-md text-gray-700 leading-relaxed mb-4">
        You can initiate a return request from our website or app. Alternatively, contact our Customer Support team for assistance. Please ensure you are available for reverse pick-up; if you miss the call, the delivery partner may cancel the pick-up at their discretion.
      </p>

      <p className="text-[13px] md:text-md text-gray-700 leading-relaxed mb-4">
        While most pin codes are serviceable for both delivery and returns, some may only support delivery. In such cases, we may ask you to use an alternative courier service.
      </p>

      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Missing Items</h3>
      <p className="text-[13px] md:text-md text-gray-700 leading-relaxed mb-4">
        If you receive an empty parcel or a missing product, please contact customer support within **48 hours** of delivery. An unpacking video will be required for further processing.
      </p>

      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Need Assistance?</h3>
      <p className="text-[13px] md:text-md text-gray-700 leading-relaxed mb-4">
        For any questions regarding our shipping and handling policy, feel free to reach out to our customer support team through our website or app.
      </p>
    </div>
  );
};

export default ShippingPolicy;
