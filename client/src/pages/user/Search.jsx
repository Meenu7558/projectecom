import React, { useState, useEffect } from "react";
import { ShopCards } from "../../components/user/Cards";
import { axiosInstance } from "../../config/axioInstance";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all products initially
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/product/getproducts");

      setResults(response.data.data); // ✅ Matches your backend response
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await axiosInstance.get(`/search?query=${encodeURIComponent(query)}`);
      setResults(response.data.data);
    } catch (err) {
      setError("Search failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-white dark:bg-gray-900">
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          value={query}
          placeholder="Search products..."
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={onKeyPress}
          className="input input-bordered w-full"
        />
        <button
          onClick={handleSearch}
          className="btn mt-4 bg-pink-600 hover:bg-pink-800 text-white w-full"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center text-gray-700 dark:text-gray-200">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && results.length === 0 && query.trim() !== "" && (
        <p className="text-center text-gray-600 dark:text-gray-300">No results found</p>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {results.map((product) => (
          <ShopCards key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Search;
