import {useState} from 'react';
// form
// @mui
import { Stack, IconButton, InputAdornment, TextField} from '@mui/material';
import {Alert, LoadingButton} from '@mui/lab';
// components
import Iconify from "../../../components/Iconify";

// ----------------------------------------------------------------------

export default function PasswordForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [disableButton, setDisableButton] = useState(true);

    console.log(password, repassword)


    const onSubmit = async () => {
        // setIsLoading(true);
        // try {
        //     const {data} = await resetPassword({email});
        //     if (!data) throw new Error()
        //     else {
        //         setSuccess(data.message)
        //         setError('')
        //         setIsLoading(false);
        //     }
        //
        // } catch (error) {
        //     setError(error.response.data.error);
        //     setSuccess('')
        //     setIsLoading(false);
        // }

    };


    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === 'password') setPassword(value);
        if (name === 'repassword') {
            setRepassword(value);
            if (password === repassword) setDisableButton(false)
            else setDisableButton(true)
        }

    }

    return (
        <form>
            <Stack spacing={3} sx={{my: 2}}>
                <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    value={repassword}
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
                        Email sent — check it out!
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
