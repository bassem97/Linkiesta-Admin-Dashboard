import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import {useState} from "react";
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

// ----------------------------------------------------------------------

export default function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'users', element: <Users /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'clubs', element: <Blog /> },
        { path: 'orders', element: <Blog /> },
      ],
    },
    {
      path: 'login',
      element:isAuthenticated ?  <Navigate replace to="/dashboard/app"/> : <Login />,
    },
    {
      path: 'register',
      element: isAuthenticated ? <Navigate replace to="/dashboard/app"/> : <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: isAuthenticated ? <Navigate to="/dashboard/app" /> : <Login /> },
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
