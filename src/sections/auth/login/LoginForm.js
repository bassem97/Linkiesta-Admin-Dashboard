import * as Yup from 'yup';
import {useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {Link, Stack, IconButton, InputAdornment, TextField, Checkbox} from '@mui/material';
import {Alert, LoadingButton} from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import {FormProvider, RHFTextField, RHFCheckbox} from '../../../components/hook-form';
import {loginUser} from "../../../utils/Redux/actions/AuthAction";
import {useAuthDispatch} from "../../../utils/Context";

// ----------------------------------------------------------------------

export default function LoginForm() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const [login, setLogin] = useState({
        email: "",
        password: "",
        remember: true,
    });
    const dispatch = useAuthDispatch() // get the dispatch method from the useDispatch custom hook


    const onSubmit = async () => {
        if (!login.email || !login.password) return setIsLoading(false);
        setIsLoading(true);
        let result;
        try {
            result = await loginUser(dispatch, login)
            if (!result) throw new Error();
            else navigate("/");
        } catch (error) {
            setIsLoading(false);
            setError('Email o password errati.');
        }

    };


    const handleChange = (event) => {
        const {name, value} = event.target;
        setLogin({...login, [name]: value});
    }

    return (
        <form>
            <Stack spacing={3}>
                <TextField
                    name="email"
                    label="Email address"
                    onChange={handleChange}
                    value={login.email}
                />

                <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChange}
                    value={login.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
            {error &&
                <Stack spacing={3} sx={{my: 2}}>
                    <Alert variant="filled" severity="error">
                        {error}
                    </Alert>
                </Stack>
            }

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{my: 2}}>
                <div>
                    <Checkbox name="remember" defaultChecked={login.remember}
                              onChange={() => setLogin({...login, remember: !login.remember})}/> Remember me
                </div>
                <Link variant="subtitle2" underline="hover" component={RouterLink} to="/resetEmail">
                    Forgot password?
                </Link>
            </Stack>

            <LoadingButton fullWidth size="large" onClick={onSubmit} variant="contained" loading={isLoading}>
                Login
            </LoadingButton>
        </form>

    );
}
