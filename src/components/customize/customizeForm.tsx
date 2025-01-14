import  { useEffect, useState } from "react";
import './customizeForm.css';
const CustomizeNowForm = () => {
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    phone: "",
    productType: "",
    quantity: "",
    frontDesign: null,
    backDesign: null,
    message: "",
  });
  useEffect(()=>{
    window.scrollTo(0,0);
  })
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e:any) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData({ ...formData, [name]: file });
  };

  const handleSubmit = () => {
    const whatsappMessage = `
      *Customize Order Request*%0A
      *Name*: ${formData.name}%0A
      *Email*: ${formData.email}%0A
      *Phone*: ${formData.phone}%0A
      *Product Type*: ${formData.productType}%0A
      *Quantity*: ${formData.quantity}%0A
      *Message*: ${formData.message}%0A
      Please check the attached designs.
    `;

    const whatsappURL:any = `https://wa.me/yourwhatsappnumber?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="min-h-screen work-bg flex items-center justify-center p-2 md:p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-3 md:p-6 text-white text-center">
          <h1 className="md:text-4xl text-lg font-bold">Customize Your Order</h1>
          <p className="mt-2 text-md md:text-lg">
            Reach out to us!
          </p>
        </div>
        <form className="md:p-6 p-3 space-y-2 md:space-y-6">
          <div>
            <label className="block text-sm md:text-md font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2 md:p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm md:text-md font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg  p-2 md:p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm md:text-md font-semibold text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData?.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg  p-2 md:p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="block text-sm md:text-md font-semibold text-gray-700 mb-1">
              Product Type
            </label>
            <input
              type="text"
              name="productType"
              value={formData?.productType}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg  p-2 md:p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., T-Shirt, Mug"
            />
          </div>
          <div>
            <label className="block text-sm md:text-md font-semibold text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData?.quantity}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg  p-2 md:p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter quantity"
            />
          </div>
          <div>
            <label className="block text-sm md:text-md font-semibold text-gray-700 mb-1">
              Front Design (Image File)
            </label>
            <input
              type="file"
              name="frontDesign"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg  p-2 md:p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm md:text-md font-semibold text-gray-700 mb-1">
              Back Design (Image File)
            </label>
            <input
              type="file"
              name="backDesign"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg  p-2 md:p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm md:text-md font-semibold text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData?.message}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              
              placeholder="Any additional details or requests"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:opacity-90 transition-opacity duration-300"
          >
            Send Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomizeNowForm;
