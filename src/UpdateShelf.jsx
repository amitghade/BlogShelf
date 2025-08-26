import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

const UpdateShelf = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://6880ebc5f1dcae717b63f996.mockapi.io/users/${id}`
        );
        setTitle(response.data.title);
        setContent(response.data.content);
        setDate(response.data.date || "");
      } catch (err) {
        setError("Failed to load blog. Please try again.");
        console.error("Error fetching blog:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const updatedBlog = {
      title,
      content,
      date,
    };

    try {
      await axios.put(
        `https://6880ebc5f1dcae717b63f996.mockapi.io/users/${id}`,
        updatedBlog
      );
      navigate("/blogs");
    } catch (err) {
      setError("Failed to update blog. Please try again.");
      console.error("Error updating blog:", err);
    } finally {
      setIsPending(false);
    }
  };

  if (isLoading) return <div className="text-center">Loading blog...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Update Blog</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Blog Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Blog Date</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Blog Content</label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isPending}
            className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-400"
          >
            {isPending ? "Updating..." : "Update Blog"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/blogs")}
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateShelf;
