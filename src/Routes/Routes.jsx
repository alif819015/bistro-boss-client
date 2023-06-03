import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Secret from "../Pages/Shared/secret/secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import MyCard from "../Pages/Dashboard/MyCart/MyCart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItem from "../Pages/Dashboard/AddItem/AddItem";
import AdminRouter from "./AdminRoute";
import ManegeItem from "../Pages/Dashboard/ManegeItem/ManegeItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: 'menu',
          element: <Menu></Menu>
        },
        {
          path: 'order/:category',
          element: <Order></Order>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signUp',
          element: <SignUp></SignUp>
        },
        {
          path: 'secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>
        },
      ]
    },

    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path: 'userHome',
          element: <UserHome></UserHome>
        },
        {
          path: 'myCart',
          element: <MyCard></MyCard>
        },
        {
          path: 'payment',
          element: <Payment></Payment>
        },
        // admin user
        {
          path: 'adminHome',
          element: <AdminRouter><AdminHome></AdminHome></AdminRouter>
        },
        {
          path: 'allUser',
          element: <AdminRouter><AllUsers></AllUsers></AdminRouter>
        },
        {
          path: 'addItem',
          element: <AdminRouter><AddItem></AddItem></AdminRouter>
        },
        {
          path: 'manageItem',
          element: <AdminRouter><ManegeItem></ManegeItem></AdminRouter>
        },
      ]
    }
  ]);