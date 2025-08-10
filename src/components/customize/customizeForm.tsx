import { useState } from 'react';
import './customizeForm.css';

const productTypes = ['T‑Shirt', 'Hoodie', 'Polo', 'Sweatshirt', 'Cap', 'Jersey', 'Other'];

const CustomizeNowForm = () => {
  const [formData, setFormData] = useState<any>({
    name: '',
    email: '',
    phone: '',
    productType: '',
    quantity: '',
    frontDesign: null,
    backDesign: null,
    message: '',
  });
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData({ ...formData, [name]: file });
  };

  const validate = () => {
    const next: any = {};
    if (!formData.name.trim()) next.name = 'Please enter your name';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Enter a valid email';
    if (!/^\d{10}$/.test(String(formData.phone || '').replace(/\D/g, ''))) next.phone = 'Enter 10‑digit phone';
    if (!formData.productType) next.productType = 'Select a product type';
    if (!formData.quantity || Number(formData.quantity) <= 0) next.quantity = 'Enter a valid quantity';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const whatsappMessage = `*Customize Order Request*%0A*Name*: ${formData.name}%0A*Email*: ${formData.email}%0A*Phone*: ${formData.phone}%0A*Product Type*: ${formData.productType}%0A*Quantity*: ${formData.quantity}%0A*Message*: ${formData.message || '-'}%0A`;
    const whatsappURL: any = `https://wa.me/+918220856333?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, '_blank');
  };

  const FieldError = ({ msg }: { msg?: string }) => (msg ? <p className="text-xs text-rose-600 mt-1">{msg}</p> : null);

  return (
    <div className="min-h-screen mt-[30px] work-bg px-3 md:px-6 py-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left: form */}
        <div className="md:col-span-3 bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-5 text-white">
            <h1 className="text-xl md:text-2xl font-bold">Customize your order</h1>
            <p className="text-sm text-indigo-100 mt-1">Share a few details and we’ll get back with a mockup and quick quote.</p>
          </div>
          <form className="p-4 md:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input name="name" value={formData.name} onChange={handleInputChange} className={`mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-200 ${errors.name ? 'border-rose-400' : 'border-gray-200'}`} placeholder="Your name" />
                <FieldError msg={errors.name} />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-200 ${errors.email ? 'border-rose-400' : 'border-gray-200'}`} placeholder="you@example.com" />
                <FieldError msg={errors.email} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input inputMode="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={`mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-200 ${errors.phone ? 'border-rose-400' : 'border-gray-200'}`} placeholder="10‑digit number" />
                <FieldError msg={errors.phone} />
              </div>
              <div>
                <label className="block text-sm font-medium">Quantity</label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} className={`mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-200 ${errors.quantity ? 'border-rose-400' : 'border-gray-200'}`} placeholder="e.g., 25" />
                <FieldError msg={errors.quantity} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Product type</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {productTypes.map((pt) => (
                  <button type="button" key={pt} onClick={() => setFormData({ ...formData, productType: pt })} className={`px-3 py-1.5 rounded-full text-sm border ${formData.productType === pt ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200'}`}>
                    {pt}
                  </button>
                ))}
              </div>
              <FieldError msg={errors.productType} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Front design (image)</label>
                <input type="file" name="frontDesign" accept="image/*" onChange={handleFileChange} className="mt-1 w-full rounded-lg border px-3 py-2 border-gray-200" />
                {formData.frontDesign && <p className="text-xs text-gray-500 mt-1">{formData.frontDesign.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">Back design (image)</label>
                <input type="file" name="backDesign" accept="image/*" onChange={handleFileChange} className="mt-1 w-full rounded-lg border px-3 py-2 border-gray-200" />
                {formData.backDesign && <p className="text-xs text-gray-500 mt-1">{formData.backDesign.name}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Notes</label>
              <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} className="mt-1 w-full rounded-lg border px-3 py-2 border-gray-200 focus:ring-2 focus:ring-indigo-200" placeholder="Share sizes, colors, or links to your artwork" />
            </div>

            <button type="button" onClick={handleSubmit} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:brightness-95">Send on WhatsApp</button>
          </form>
        </div>

        {/* Right: info pane */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border p-5">
            <h3 className="font-semibold">What happens next?</h3>
            <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>We review your details and share a quick mockup.</li>
              <li>Confirm the design and pricing.</li>
              <li>Production starts, then doorstep delivery.</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border p-5">
            <h3 className="font-semibold">Tips for faster quotes</h3>
            <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Mention sizes and color preferences.</li>
              <li>Attach clear artwork (PNG/SVG preferred).</li>
              <li>Share your deadline if any.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeNowForm;
