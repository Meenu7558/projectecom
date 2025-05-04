import React from "react";

const products = [
  {
    _id: "6811fed346548e79049e166d",
    name: "Maybelline New York Eyeliner",
    price: 398,
    description: "Intense color payoff and long-lasting wear.",
    image: {
      url: "https://res.cloudinary.com/dw4wfppju/image/upload/v1746009812/ljxkl4y4ytswzdvcurqa.webp",
    },
  },
  {
    _id: "6811fd3846548e79049e1661",
    name: "MARS Ultra Pigmented Creamy Matte Lipstick",
    price: 189,
    description: "Creamy matte, glides effortlessly, vibrant shades.",
    image: {
      url: "https://res.cloudinary.com/dw4wfppju/image/upload/v1746009401/w0ibynabxtbovoolffok.webp",
    },
  },
  {
    _id: "6811ed5646548e79049e162a",
    name: "Good Vibes De-Tan Glow Face Mask",
    price: 370,
    description: "Removes tan, smoothens skin, radiant glow.",
    image: {
      url: "https://res.cloudinary.com/dw4wfppju/image/upload/v1746005335/znd3tihmaebupbr39ttd.webp",
    },
  },
  {
    _id: "6811e45f46548e79049e1621",
    name: "Faces Canada Matte Compact",
    price: 428,
    description: "Lightweight, hides imperfections, oil-controlling.",
    image: {
      url: "https://res.cloudinary.com/dw4wfppju/image/upload/v1746003039/aiteeydz5mqo8j4ddcj7.webp",
    },
  },
  {
    _id: "6811f54946548e79049e1658",
    name: "Good Vibes Beetroot Lip Balm",
    price: 150,
    description: "Natural tint, moisturizes lips.",
    image: {
      url: "https://res.cloudinary.com/dw4wfppju/image/upload/v1746007370/vbrrt31c6jlf3lqugjqe.webp",
    },
  },
];

const FeaturedProducts = () => {
  return (
    <section className="bg-pink-50 dark:bg-gray-900 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-300 mb-8">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={product.image.url}
              alt={product.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {product.name}
              </h3>
              <p className="text-pink-600 font-bold mt-2">₹{product.price}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {product.description}
              </p>
              <button className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg">
                40%offer
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
