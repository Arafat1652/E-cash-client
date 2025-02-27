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
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import TransactionDetails from "../Pages/Dashboard/Admin/TransactionDetails";
import AllRequest from "../Pages/Dashboard/Admin/AllRequest";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";

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
      path: '/userTransaction/:mobile',
      element: <TransactionDetails/>,
      loader: ({params})=> fetch(`${import.meta.env.VITE_API_URL}/transaction/${params.mobile}`)
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
      children: [
        {
          index: true,
          element:  <PrivateRoute><Profile/></PrivateRoute> 
        },
        {
          path:'sendmoney',
          element: <PrivateRoute><SendMoney/></PrivateRoute>,
        },
        {
          path:'cashout',
          element: <PrivateRoute><CashOut/></PrivateRoute>
        },
        {
          path:'cashin',
          element: <PrivateRoute><AgentRoute><CashIn/></AgentRoute></PrivateRoute>
        },
        {
          path:'transaction',
          element: <PrivateRoute><AdminRoute><Transaction/></AdminRoute></PrivateRoute>
        },
        {
          path: 'manage-users',
          element: <PrivateRoute><AdminRoute><ManageUsers/></AdminRoute></PrivateRoute>
        },
        {
          path: 'all-request',
          element: <AllRequest/>
        },
        
      ]
    }
  ]);

  export default router