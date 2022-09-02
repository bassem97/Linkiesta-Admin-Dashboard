import {useEffect, useState} from 'react';
// form
// @mui
import { Stack, IconButton, InputAdornment, TextField} from '@mui/material';
import {Alert, LoadingButton} from '@mui/lab';
// components
import Iconify from "../../../components/Iconify";
import {resetPassword} from "../../../utils/Api/UserApi";

// ----------------------------------------------------------------------

export default function PasswordForm({token}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [disableButton, setDisableButton] = useState(true);





    const onSubmit = async () => {
        setIsLoading(true);
        const payload = {password, token}
        try {
            const {data} = await resetPassword({payload});
            console.log(data)
            if (!data) throw new Error()
            else {
                setSuccess(data.message)
                setError('')
                setIsLoading(false);
            }

        } catch (error) {
            setError(error.response.data.error);
            setSuccess('')
            setIsLoading(false);
        }

    };

    useEffect(() => {
        if (password === repassword && password.length > 0) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    }, [repassword,password]);


    return (
        <form>
            <Stack spacing={3} sx={{my: 2}}>
                <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(event)=>setPassword(event.target.value)}
                    value={password}
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
            <Stack spacing={3}>
                <TextField
                    name="repassword"
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(event)=>setRepassword(event.target.value)}
                    value={repassword}
                    helperText={password !== repassword && repassword.length > 0   ? 'Passwords do not match' : ''}
                    error={password !== repassword && repassword.length > 0}
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
            {success &&
                <Stack spacing={3} sx={{my: 2}}>
                    <Alert variant="filled" severity="success">
                        {success}
                    </Alert>
                </Stack>
            }

            <Stack sx={{my: 3}}>
                <LoadingButton fullWidth size="large" onClick={onSubmit} disabled={disableButton} variant="contained" loading={isLoading}>
                    Change password
                </LoadingButton>
            </Stack>

        </form>

    );
}
