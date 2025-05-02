import React from 'react';
import HeroImg from '/src/assets/header1.avif';

const Hero = () => {
  return (
    <div className="hero min-h-screen bg-gradient-to-r from-pink-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse gap-10 lg:gap-20">
        <img
          src={HeroImg}
          alt="Glow & Grace hero"
          className="max-w-sm w-full rounded-3xl shadow-2xl border border-pink-100 dark:border-pink-400"
        />
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-extrabold text-pink-600 dark:text-pink-400 leading-tight mb-4">
            Shop the Best, Love the Rest
          </h1>
          <p className="py-4 text-lg text-gray-700 dark:text-gray-300">
            Discover the secret to flawless beauty with our premium collection of makeup, skincare, haircare,
            and beauty appliances. From nourishing skincare to trendsetting makeup, we bring you the best
            for a radiant look. Elevate your beauty routine with products that make you feel confident every day!
          </p>
          <button className="btn bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full mt-4">
            EXPLORE NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

