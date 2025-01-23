const ShippingPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto pt-12 p-6">
      <h1 className="md:text-3xl text-xl font-bold text-center mb-6">Shipping & Delivery</h1>

      <section className="mb-8">
        <h2 className="md:text-2xl text-lg font-semibold mb-4">Shipping Methods</h2>
        <p className="md:text-base text-sm mb-4">
          We usually ship with private couriers through Shiprocket, ST Couriers, Professional Courier, DTDC, etc. For other states, we use Blue Dart, Speed Post, Ekart, Ecomm Express, and Delhivery.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="md:text-2xl text-lg font-semibold mb-4">Dispatch Time</h2>
        <p className="md:text-base text-sm mb-4">
          Dispatch time is typically within 48-72 hours.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="md:text-2xl text-lg font-semibold mb-4">Delivery Time</h2>
        <p className="md:text-base text-sm mb-4">
          Delivery time within India is typically 4-7* business days, while international deliveries take around 7-12* business days.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="md:text-2xl text-lg font-semibold mb-4">Note</h2>
        <p className="md:text-base text-sm mb-4">
          *Note: At times, delivery may take longer due to changes in delivery routes or other unforeseen circumstances.
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

export default ShippingPolicy;
