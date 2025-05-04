import React from "react";

const AdminHome= () => {
  return (
    <div className="bg-gradient-to-br from-pink-100 via-pink-300 to-pink-500 min-h-screen p-8">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Welcome, Admin!</h1>
        <p className="text-lg text-gray-700 mb-6">
          This is your admin dashboard homepage. From here you can manage products, view analytics, handle orders, and more.
        </p>
      </div>
    </div>
  );
};

export default AdminHome;
