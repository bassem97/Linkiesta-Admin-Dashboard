import {useEffect, useLayoutEffect, useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import {getCustomerById} from "../../utils/Redux/reducers/AuthorizationReducers";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout({user}) {
  const [open, setOpen] = useState(false);
  const authenticatedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();



  useEffect(() => {
    if(!authenticatedUser) navigate('/login', {replace: true})
  }, [localStorage.getItem("user")]);




  return (
    <RootStyle>
      <DashboardNavbar   onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar  isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
