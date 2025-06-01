import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../../config/axioInstance";
import { useEffect } from "react";



const ReviewForm = () => {
  const { id } = useParams(); // product ID from URL
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0 || comment.trim() === "") {
      setError("Please provide both rating and comment.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axiosInstance.post(`/review/add/${id}`, {
        rating,
        comment,
      });

      setSuccess("Review submitted successfully!");
      setError("");
      setRating(0);
      setComment("");

      // Optionally navigate after a short delay
      setTimeout(() => {
        navigate(`/productdetails/${id}`);
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to submit review. Try again."
      );
      setSuccess("");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-900 p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Write a Review
      </h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-500 mb-3">{success}</p>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-gray-700 dark:text-gray-200">
          Rating:
        </label>
        <div className="flex space-x-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-2xl ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <label className="block mb-2 text-gray-700 dark:text-gray-200">
          Comment:
        </label>
        <textarea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your experience..."
          className="w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:text-white"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
