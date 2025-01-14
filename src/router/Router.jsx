import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";

import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../shared/Secret";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../pages/Dashboard/addItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/manageItems/ManageItems";
import UpdateItem from "../pages/manageItems/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import UserHome from "../pages/UserHome/UserHome";
import AdminHome from "../pages/AdminHome/AdminHome";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path:"/menu",
          element:<Menu></Menu>
        },
        {
          path:"/order/:category",
          element:<Order></Order>
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/signUp",
          element:<SignUp></SignUp>
        },
        {
          path:"/secret",
          element:<PrivateRoute><Secret></Secret></PrivateRoute>
        }
      ]
    },
    {
      path:"/dashboard",
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        // normal users routes
        {
          path:'userHome',
          element:<UserHome></UserHome>
        },
        {
          path:"cart",
          element:<Cart></Cart>
        },
        {
          path:"payment",
          element:<Payment></Payment>
        },
        {
          path:"paymentHistory",
          element:<PaymentHistory></PaymentHistory>
        },

        // admin only routes
        {
          path:"adminHome",
          element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path:"/dashboard/addItems",
          element:<AdminRoute><AddItems></AddItems></AdminRoute>
        },
        {
          path:"/dashboard/manageItems",
          element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
        },
        {
          path:"/dashboard/updateItem/:id",
          element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          loader:({params})=> fetch(`https://bistro-boss-server-blush-mu.vercel.app/menu/${params.id}`)
        },
        {
          path:"/dashboard/users",
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        
      ]
    }
  ]);