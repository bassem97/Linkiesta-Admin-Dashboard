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
import {resetPassword} from "../../../utils/Api/UserApi";

// ----------------------------------------------------------------------

export default function EmailForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [email, setEmail] = useState();

    const onSubmit =  async () => {
        setIsLoading(true);
        try {
            const { data } = await resetPassword({email}) ;
            if (!data) throw new Error()
            else{
                setSuccess(data.message)
                setError('')
                setIsLoading(false);
            }

        }catch (error) {
            setError(error.response.data.error);
            setSuccess('')
            setIsLoading(false);
        }

    };


    const handleChange = (event) => {
        setEmail(event.target.value);
    }

    return (
        <form>
            <Stack spacing={3}>
                <TextField
                    name="email"
                    label="Email address"
                    onChange={handleChange}
                    value={email}
                />

            </Stack>
            {error &&
                <Stack spacing={3}  sx={{my: 2}}>
                    <Alert variant="filled" severity="error">
                        {error}
                    </Alert>
                </Stack>
            }
            {success &&
                <Stack spacing={3}  sx={{my: 2}}>
                    <Alert variant="filled" severity="success">
                        Email sent  — check it out!
                    </Alert>
                </Stack>
            }

            <Stack sx={{my: 3}}>
                <LoadingButton fullWidth size="large" onClick={onSubmit} variant="contained"  loading={isLoading}>
                    Send password reset email
                </LoadingButton>
            </Stack>

        </form>

    );
}
