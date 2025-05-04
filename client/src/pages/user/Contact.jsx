import React from 'react';

const ContactUs = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-6 text-center">
          Get in Touch
        </h1>
        <p className="text-lg text-center mb-10">
          Whether you have a question, suggestion, or just want to say hello — we're all ears! 💬
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-pink-500 mb-2">📧 Email</h2>
            <p>support@prettypink.com</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-pink-500 mb-2">📞 Phone</h2>
            <p>+91 98765 43210</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-pink-500 mb-2">🏢 Address</h2>
            <p>
              pretty pink Pvt Ltd<br />
              3rd Floor, Rose Building<br />
              MG Road, Kochi, Kerala – 682001
            </p>
          </div>
        </div>

        <p className="mt-10 text-lg text-center">
          🕘 <span className="font-medium">Support Hours:</span> Monday – Saturday, 9:00 AM to 6:00 PM IST
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
