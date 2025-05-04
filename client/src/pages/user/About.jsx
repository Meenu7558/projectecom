import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6 py-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-6 text-center">
          About Pretty Pink
        </h1>
        <p className="text-lg mb-5 leading-relaxed">
          At <span className="font-semibold text-pink-500 dark:text-pink-300">Glow & Grace</span>, we celebrate beauty in all its forms. Our mission is to empower individuals to feel confident, radiant, and beautiful—inside and out. We bring together a thoughtfully curated selection of makeup, skincare, and self-care essentials that align with modern beauty values: cruelty-free, high-quality, and effective.
        </p>
        <p className="text-lg mb-5 leading-relaxed">
          Whether you're a makeup enthusiast, skincare junkie, or just starting your beauty journey, our platform offers everything you need—from trusted global brands to indie favorites. We believe beauty should be accessible and inclusive, so we offer a wide range of products for all skin types, tones, and preferences.
        </p>
        <p className="text-lg mb-5 leading-relaxed">
          We're not just a store—we're a community. Through personalized recommendations, honest reviews, and educational content, we strive to make your shopping experience enjoyable and empowering. Our fast shipping, secure checkout, and dedicated support team are here to make sure you feel valued every step of the way.
        </p>
        <p className="text-lg leading-relaxed">
          Thank you for choosing <span className="font-semibold text-pink-500 dark:text-pink-300">Pretty Pink</span>. We're honored to be a part of your self-care story. 💖
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
