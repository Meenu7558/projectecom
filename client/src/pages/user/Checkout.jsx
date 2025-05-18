
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


export const CheckoutForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartData = location.state?.cartData;

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    // Simple validation
    if (Object.values(formData).some(value => !value)) {
      alert("Please fill in all fields");
      return;
    }

    // Navigate to payment page with both form and cart data
    navigate('/user/make-payment', { state: { cartData, formData } });
  };


  return (
    <div className="max-w-xl mx-auto my-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-pink-600 dark:text-pink-400">Checkout Form</h2>
      <div className="space-y-4">
        {['fullName', 'address', 'city', 'postalCode', 'phone'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace(/([A-Z])/g, ' $1')}
            value={formData[field]}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        ))}
        <button
          className="btn w-full bg-pink-600 text-white hover:bg-pink-700"
          onClick={handleContinue}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};
