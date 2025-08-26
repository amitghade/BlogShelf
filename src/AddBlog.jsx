import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const blog = {
      title,
      content,
      date,
    };

    try {
      await axios.post(
        "https://6880ebc5f1dcae717b63f996.mockapi.io/users",
        blog
      );
      setTitle("");
      setContent("");
      setDate("");
      navigate("/blogs");
    } catch (err) {
      setError("Failed to add blog. Please try again.");
      console.error("Error adding blog:", err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add a New Blog</h2>

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
            placeholder="Enter blog title"
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
            placeholder="Write your blog content here..."
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-400"
        >
          {isPending ? "Adding Blog..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
