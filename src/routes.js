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

// ----------------------------------------------------------------------

export default function Router() {
    const [authenticatedUser, setAuthenticatedUser] = useState(localStorage.getItem("user") || null);
    const location = useLocation();


    useEffect(() => {
        const getUser = async () => {
            if (authenticatedUser) {
                const userId = JSON.parse(authenticatedUser).id
                const {data} = await getCustomerById(userId)
                setAuthenticatedUser(data);
            }
        };
        setTimeout(() => {
            getUser();
        }, 1);
    }, [location]);


    return useRoutes([
        {
            path: '/dashboard',
            element: !authenticatedUser ? <Navigate to="/login"/> : <DashboardLayout user={authenticatedUser}/>,
            children: [
                {path: 'app', element: <DashboardApp user={authenticatedUser}/>},
                {path: 'users', element: <Users/>},
                {path: 'products', element: <Products/>},
                {path: 'blog', element: <Blog/>},
                {path: 'clubs', element: <Blog/>},
                {path: 'orders', element: <Blog/>},
            ],
        },

        {
            path: 'login', element: authenticatedUser ? <Navigate to="/dashboard/app"/> : <Login/>,
            // path: 'login', element: localStorage.getItem("authenticatedUser")? <Navigate to="/dashboard/app" /> : <Login />  ,
        },
        {
            path: 'register', element: authenticatedUser ? <Navigate to="/dashboard/app"/> : <Register/>,
        },
        {
            path: 'resetEmail', element: authenticatedUser ? <Navigate to="/dashboard/app"/> : <EmailReset/>,
        },
        {
            path: 'changePassword/:token',
            element: authenticatedUser ? <Navigate to="/dashboard/app"/> : <EmailReset/>,
        },
        {
            path: '/',
            element: <LogoOnlyLayout/>,
            children: [
                {path: '/', element: authenticatedUser ? <Navigate to="/dashboard/app"/> : <Login/>},
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
