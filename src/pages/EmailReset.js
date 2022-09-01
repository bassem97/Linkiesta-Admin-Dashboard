import {Link as RouterLink, useLocation} from 'react-router-dom';
// @mui
import {styled} from '@mui/material/styles';
import {Card, Link, Container, Typography} from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import {EmailForm} from "../sections/auth/reset";
import {PasswordForm} from "../sections/auth/resetPassword";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const HeaderStyle = styled('header')(({theme}) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
        alignItems: 'flex-start',
        padding: theme.spacing(7, 5, 0, 7),
    },
}));

const SectionStyle = styled(Card)(({theme}) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({theme}) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function EmailReset() {
    const smUp = useResponsive('up', 'sm');
    const mdUp = useResponsive('up', 'md');
    const location = useLocation();


    return (
        <Page title="Email reset">
            <RootStyle>
                <HeaderStyle>
                    <Logo/>

                    {smUp && (
                        <Typography variant="body2" sx={{mt: {md: -2}}}>
                            Remember your account? {''}
                            <Link variant="subtitle2" component={RouterLink} to="/login">
                                Login
                            </Link>
                        </Typography>
                    )}
                </HeaderStyle>

                {mdUp && (
                    <SectionStyle>
                        <Typography variant="h5" sx={{px: 5, mt: 14, mb: 5}}>
                            Don't worry, happens to the best of us.
                        </Typography>
                        <img src="/static/illustrations/reset password.png" alt="reset"/>
                    </SectionStyle>
                )}

                <Container maxWidth="sm">
                    <ContentStyle>

                        {location.pathname === '/resetEmail' ?
                             <>
                                <Typography variant="h4" gutterBottom>
                                    Type your email address
                                </Typography>

                                <Typography sx={{color: 'text.secondary', mb: 5}}>We'll send you a link to reset your password.</Typography>
                                <EmailForm/>
                            </> :
                            <>
                                <Typography variant="h4" gutterBottom>
                                    Create new Password
                                </Typography>

                                <Typography sx={{color: 'text.secondary', mb: 5}}> type your new password </Typography>
                                <PasswordForm/>
                            </>

                        }

                        {!smUp && (
                            <Typography variant="body2" align="center" sx={{mt: 3}}>
                                Don’t have an account?{' '}
                                <Link variant="subtitle2" component={RouterLink} to="/register">
                                    Get started
                                </Link>
                            </Typography>
                        )}
                    </ContentStyle>
                </Container>
            </RootStyle>
        </Page>
    );
}
