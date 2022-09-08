import {Navigate, useLocation, useRoutes} from 'react-router-dom';

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
import NewArticle from "./pages/NewArticle";

// ----------------------------------------------------------------------

export default function Router() {
    const authenticatedUser = JSON.parse(localStorage.getItem("user")) || null;


    return useRoutes([
        {
            path: '/dashboard',
            element: <DashboardLayout authenticatedUser={authenticatedUser}/>,
            children: [
                {path: 'app', element: <DashboardApp/>},
                {path: 'users', element: <Users/>},
                {path: 'products', element: <Products/>},
                {path: 'blog', element: <Blog/>,},
                {path: 'blog/article', element: <NewArticle authenticatedUser={authenticatedUser} />,},
                {path: 'clubs', element: <Blog/>},
                {path: 'orders', element: <Blog/>},
            ],
        },

        {
            path: 'login', element: authenticatedUser ? <Navigate to="/dashboard/app"/> : <Login/>,
        },
        {
            path: 'register', element: authenticatedUser ? <Navigate to="/dashboard/app"/> : <Register/>,
        },
        {
            path: 'resetEmail', element: authenticatedUser ? <Navigate to="/dashboard/app"/> : <EmailReset/>,
        },
        {
            path: 'changePassword/:token', element: authenticatedUser ? <Navigate to="/dashboard/app"/> : <EmailReset/>,
        },
        {
            path: '/',
            element: <LogoOnlyLayout/>,
            children: [
                {path: '/', element: authenticatedUser ? <Navigate to="/dashboard/app"/> : <Navigate to="/login"/>},
                {path: '404', element: <NotFound/>},
                {path: '*', element: <Navigate to="/404"/>},
            ],
        },
        {
            path: '*',
            element: <Navigate to="/404" replace/>,
        },
    ]);
}
