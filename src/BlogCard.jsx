import { Link } from "react-router";

const BlogCard = ({ blog, handleDelete }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md border-l-4 border-pink-600">
      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>

      <div className="text-gray-600 mb-4">
        {blog.content.length > 150
          ? `${blog.content.substring(0, 150)}...`
          : blog.content}
      </div>

      <div className="text-sm text-gray-500 mb-4">
        Date:{" "}
        {blog.date
          ? new Date(blog.date).toLocaleDateString()
          : "No date specified"}
      </div>

      <div className="flex space-x-3">
        <Link
          to={`/update/${blog.id}`} 
          className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
        >
          Edit
        </Link>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this blog?")) {
              handleDelete(blog.id);
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
