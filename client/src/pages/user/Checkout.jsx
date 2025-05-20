
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


export const CheckoutForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartData = location.state?.cartData;

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  const fieldLabels = {
    name: "Full Name",
    address: "Address",
    city: "City",
    postalCode: "Postal Code",
    phone: "Phone Number",
  };

  useEffect(() => {
    if (!cartData) {
      navigate("/user/cart");
    }
  }, [cartData, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    if (Object.values(formData).some(value => !value.trim())) {
      alert("Please fill in all fields");
      return;
    }
    navigate('/user/make-payment', { state: { cartData, formData } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleContinue();
  };

  return (
    <div className="max-w-xl mx-auto my-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-pink-600 dark:text-pink-400">Checkout Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((field) => (
          <input
            key={field}
            type={field === 'phone' ? 'tel' : 'text'}
            name={field}
            placeholder={fieldLabels[field]}
            value={formData[field]}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        ))}
        <button
          type="submit"
          className="btn w-full bg-pink-600 text-white hover:bg-pink-700"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};
