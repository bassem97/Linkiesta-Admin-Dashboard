import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import {useEffect, useLayoutEffect, useState} from "react";
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import Users from './pages/Users';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import EmailReset from "./pages/EmailReset";
import {getCustomerById} from "./utils/Redux/reducers/AuthorizationReducers";

// ----------------------------------------------------------------------

export default function Router() {
  const [user, setUser] = useState()


  useEffect(() => {
    const getUser = async () => {
        const userId = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).id
      console.log(userId)
        const {data} = await getCustomerById(userId)
        setUser(data);
    };
    setInterval(() => {
      getUser();
    }, 1);
  }, []);






  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout user={user} />,
      children: [
        { path: 'app', element: <DashboardApp user={user} /> },
        { path: 'users', element: <Users /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'clubs', element: <Blog /> },
        { path: 'orders', element: <Blog /> },
      ],
    },
    {
      path: 'reset', element: <EmailReset />,
    },
    {
      path: 'login', element: <Login />,
    } ,
    {
      path: 'register', element:<Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: user ? <Navigate to="/dashboard/app" /> : <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
