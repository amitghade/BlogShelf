import { Link, useLocation } from "react-router";

const Header = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-600">BlogShelf</h1>
        <div className="space-x-4">
          <Link
            to="/"
            className={`px-3 py-2 rounded ${
              location.pathname === "/"
                ? "bg-pink-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Add Blog
          </Link>
          <Link
            to="/blogs"
            className={`px-3 py-2 rounded ${
              location.pathname === "/blogs"
                ? "bg-pink-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            View Blogs
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
