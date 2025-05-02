import React from 'react';

const Carrousel = () => {
  return (
    <div className="w-full bg-pink-50 dark:bg-gray-900 py-6">
      <div className="carousel rounded-box max-w-6xl mx-auto shadow-lg">
        <div className="carousel-item px-2">
          <img
            src="https://res.cloudinary.com/dw4wfppju/image/upload/v1746026155/category3_kvslly.jpg"
            alt="Category 3"
            className="rounded-xl w-72 h-48 object-cover"
          />
        </div>
        <div className="carousel-item px-2">
          <img
            src="https://res.cloudinary.com/dw4wfppju/image/upload/v1746028778/category1_sa0z6n.jpg"
            alt="Category 1"
            className="rounded-xl w-72 h-48 object-cover"
          />
        </div>
        <div className="carousel-item px-2">
          <img
            src="https://res.cloudinary.com/dw4wfppju/image/upload/v1746028810/category2_i8bnpe.avif"
            alt="Category 2"
            className="rounded-xl w-72 h-48 object-cover"
          />
        </div>
        <div className="carousel-item px-2">
          <img
            src="https://res.cloudinary.com/dw4wfppju/image/upload/v1746028879/header2_fiskrq.webp"
            alt="Category 2 Repeat"
            className="rounded-xl w-72 h-48 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Carrousel;
