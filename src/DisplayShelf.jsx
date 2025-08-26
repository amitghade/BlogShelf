import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import BlogCard from "./BlogCard";

const DisplayShelf = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://6880ebc5f1dcae717b63f996.mockapi.io/users"
        );
        console.log(response);
        setBlogs(response.data);
      } catch (err) {
        setError("Failed to load blogs. Please try again later.");
        console.error("Error fetching blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://6880ebc5f1dcae717b63f996.mockapi.io/users/${id}`
      );
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (err) {
      setError("Failed to delete blog. Please try again.");
      console.error("Error deleting blog:", err);
    }
  };

  if (isLoading) return <div className="text-center">Loading blogs...</div>;
  if (error)
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );

  return (
    <div>
      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No blogs found yet.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            Create Your First Blog
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} handleDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayShelf;
