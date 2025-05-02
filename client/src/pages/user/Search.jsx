import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`/api/search?query=${query}`);
      setResults(response.data.data);
    } catch (err) {
      setError("Search failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <input
        type="text"
        value={query}
        placeholder="Search products..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {results.map((product) => (
          <li key={product._id}>
            <strong>{product.name}</strong> - {product.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
