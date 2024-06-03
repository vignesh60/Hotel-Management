import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import RoomDetails from "./pages/RoomDetails";
import AddRoom from "./pages/AddRoom";
import FetchRoom from "./pages/FetchRoom";
import DashBoard from "./pages/DashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Home /> },
    {path: "/roomdetails/:id", element:<RoomDetails />},
    {path: "/signin", element:<Home />},
    {path: "/signup", element:<Home />},
    {path: "/addroom", element:<AddRoom />},
    {path: "/fetchroom", element:<FetchRoom />},
    {path: "/dashboard", element:<DashBoard />},
  ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
