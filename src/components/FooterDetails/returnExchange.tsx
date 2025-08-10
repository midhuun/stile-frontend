import SEO from '../seo/SEO';

const ReturnAndExchangePolicy = () => {
  return (
    <div className="max-w-3xl mx-auto pt-12 p-6">
      <SEO
        title="Refund & Cancellation Policy | Stile Sagio"
        description="Learn about Stile Sagio's refund and cancellation policy, including return eligibility and process."
        canonical={typeof window !== 'undefined' ? `${window.location.origin}/returns` : undefined}
        image="/logo.png"
        type="website"
      />
      <h1 className="md:text-3xl text-xl font-bold text-center mb-6">Refund & Cancellation</h1>

      <section className="mb-8">
        <h2 className="md:text-2xl text-lg font-semibold mb-4">Refund Policy</h2>
        <p className="md:text-base text-sm mb-4">
          We have a 7-day return policy, which means you have 7 days after receiving your item to request a return.
        </p>
        <p className="md:text-base text-sm mb-4">
          To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
        </p>
        <p className="md:text-base text-sm mb-4">
          To start a return, contact us at <a href="mailto:support@stilesagio.com" className="text-blue-600">support@stilesagio.com</a>. Returns must be sent to the following address:
        </p>
        <p className="md:text-base text-sm mb-4">
          <strong>TVT TEXTILES,</strong> No.65, 6th Street, Padmin Gardens, Kangeyam Road, Tirupur - 641604
        </p>
        <p className="md:text-base text-sm mb-4">
          We cannot arrange return pickup; returns should be done by you. If your return is accepted, we will either exchange the product or refund the amount. Items sent back to us without first requesting a return will not be accepted.
        </p>
        <p className="md:text-base text-sm mb-4">
          For any questions, feel free to contact us at <a href="mailto:support@stilesagio.com" className="text-blue-600">support@stilesagio.com</a> or WhatsApp us at <a href="tel:+918220856333" className="text-blue-600">+91-8220856333</a> referencing your order ID.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="md:text-2xl text-lg font-semibold mb-4">Damages and Issues</h2>
        <p className="md:text-base text-sm mb-4">
          Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you receive the wrong item. We will evaluate the issue and take appropriate action to resolve it.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="md:text-2xl text-lg font-semibold mb-4">Conditions for Exchange</h2>
        <ul className="list-disc pl-6 md:text-base text-sm mb-4">
          <li>The item must be in its original condition, unworn, and with all tags attached.</li>
          <li>Exchange requests must be initiated within 3-5 days of receiving your order.</li>
          <li>If an alternative size is available, we will facilitate an exchange for the correct size.</li>
          <li>Exchanges are limited to size swaps only; color exchanges are not possible.</li>
          <li>You’ll also need the receipt or proof of purchase.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="md:text-2xl text-lg font-semibold mb-4">Final Decision</h2>
        <p className="md:text-base text-sm mb-4">
          TVT TEXTILES (www.stilesagio.com) reserves the right to make the final decision on all exchange requests. Once approved by management, dispatch details will be sent to you.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="md:text-2xl text-lg font-semibold mb-4">European Union 14-Day Cooling Off Period</h2>
        <p className="md:text-base text-sm mb-4">
          If the merchandise is being shipped into the European Union, you have the right to cancel or return your order within 14 days, for any reason and without justification. As above, the item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="md:text-2xl text-lg font-semibold mb-4">Refunds</h2>
        <p className="md:text-base text-sm mb-4">
          We will notify you once we’ve received and inspected your return, and let you know if the refund was approved. If approved, you’ll be automatically refunded to your original payment method within 10 business days. Please note that processing times by your bank or Credit Card Company may vary.
        </p>
        <p className="md:text-base text-sm mb-4">
          If more than 15 business days have passed since approval of your return, please contact us at <a href="mailto:support@stilesagio.com" className="text-blue-600">Support@stilesagio.com</a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="md:text-2xl text-lg font-semibold mb-4">Legal Disputes</h2>
        <p className="md:text-base text-sm mb-4">
          All legal disputes are subject to the jurisdiction of Tirupur.
        </p>
      </section>
    </div>
  );
};

export default ReturnAndExchangePolicy;

