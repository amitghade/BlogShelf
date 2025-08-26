import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import AddBlog from "./AddBlog";
import DisplayShelf from "./DisplayShelf";
import UpdateShelf from "./UpdateShelf";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <AddBlog />,
      },
      {
        path: "blogs",
        element: <DisplayShelf />,
      },
      {
        path: "update/:id",
        element: <UpdateShelf />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
