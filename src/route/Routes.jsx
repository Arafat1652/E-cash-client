import {
    createBrowserRouter,
  } from "react-router-dom";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import Profile from "../Pages/Dashboard/Common/Profile";
import SendMoney from "../Pages/Dashboard/User/SendMoney";
import CashOut from "../Pages/Dashboard/User/CashOut";
import CashIn from "../Pages/Dashboard/Agent/CashIn";
import Transaction from "../Pages/Dashboard/Common/Transaction";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout/>,
      children: [
        {
          index: true,
          element: <Profile/>
        },
        {
          path:'sendmoney',
          element: <SendMoney/>,
        },
        {
          path:'cashout',
          element: <CashOut/>
        },
        {
          path:'cashin',
          element: <CashIn/>
        },
        {
          path:'transaction',
          element: <Transaction/>
        }
      ]
    }
  ]);

  export default router