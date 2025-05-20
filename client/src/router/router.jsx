import {createBrowserRouter} from "react-router-dom";
import { Navigate } from 'react-router-dom';

import Home from "../pages/user/home/Home";
import Contact from "../pages/user/Contact";
import About from "../pages/user/About";

import Login from "../pages/shared/Login";
import { UserLayout } from "../layout/UserLayout";
import { Signup } from "../pages/shared/Signup";
import { AdminLayout } from "../layout/AdminLayout";
import { ErrorPage } from "../pages/shared/ErrorPage";


import { Profile } from "../pages/user/Profile";
import { Cart } from "../pages/user/Cart";
import Search from "../pages/user/Search";
import Dashboard from "../pages/admin/Dashboard";
import { ManageSellers } from "../pages/admin/ManageSellers";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageOrders from "../pages/admin/ManageOrders";
import { ManageProducts } from "../pages/admin/ManageProducts";
import SellerLayout from "../layout/SellerLayout";
import SellerLogin from "../components/Seller/SellerLogin";
import { ProtectedRoute } from "./ProtectedRoute";
import SellerSignup from "../components/Seller/SellerSignup";
import ProtectedRouteSeller from "./SellerProtected";
import SellerDashboard from "../pages/seller/SellerDashboard";
import ManageProduct from "../pages/seller/ManageProduct";
import { Shop } from "../pages/user/Shop";
import AdminHome from "../pages/admin/Admindisplay";
import OrderDetails from "../pages/user/OrderDetails";

import { CheckoutForm } from "../pages/user/Checkout";
import { MakePayment } from "../pages/user/MakePayment";
import { PaymentSuccess } from "../pages/user/PaymentSuccess";
import { ProductDetails } from "../pages/user/ProductDetails";









const data = {};
export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "Shop",
        element: <Shop/>,
      },
      {
        path: "productdetails/:productId",
        element: <ProductDetails />,
      },
      {
        path: "Contact",
        element: <Contact />,
      },
      {
        path: "About",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        element: <ProtectedRoute />,
        path: "user",
        children: [
          {
            path: "whishlist",
            // element: <h1>Wishlist</h1>,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "search",
            element: <Search />,
          },
          {
            path: "orders",
            element: <OrderDetails/>,
          },
          {
            path: "payment/success",
            element: <PaymentSuccess/>
          },
           {
            path: "checkout",
            element: <CheckoutForm/>,
          },
          {
            path: "make-payment",
            element: <MakePayment/>,
          },

        ],
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage role="admin" />,
    children: [
      {
        index: true, 
        element: <Navigate to="home" />,
      },
      {
        path: "login",
        element: <Login role="admin" />,
      },
      {
        path: "signup",
        element: <Signup role="admin" />,
      },
      {
        path: "home",
        element: <AdminHome />,
      },


      {
        path: "dashboard",
        element: <Dashboard />, // Admin dashboard
      },
      {
        path: "products",
        element: <ManageProducts />, // Admin manage products
      },
      {
        path: "users",
        element: <ManageUsers />, // Admin manage users
      },
      {
        path: "orders",
        element: <ManageOrders />, // Admin manage orders
      },
      {
        path: "sellers",
        element: <ManageSellers />, // Admin manage seller
      },
    ],
  },
  {
    path: "seller",
    element: <SellerLayout />,
    errorElement: <ErrorPage role="seller" />,
    children: [
      {
        path: "login",
        element: <SellerLogin role="seller" />,
      },
      {
        path: "signup",
        element: <SellerSignup role="seller" />,
      },
      {
        element: <ProtectedRouteSeller/>, // 👈 wrap protected routes here
        children: [
          {
            path: "dashboard",
            element: <SellerDashboard/>,
          },
         {
            path: "products",
            element: < ManageProduct/>,
          },
          // Add more protected seller routes as needed
        ],
      },
    ],
  },
]);

export default router;

