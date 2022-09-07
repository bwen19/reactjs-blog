import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Avatar,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';

import { getRemember, saveRemember } from '@/utils/localStorage';
import { setAuth } from '@/redux/authSlice';
import { useAlert, useAppDispatch } from '@/hooks';
import { login, LoginRequest } from '@/api';

// -------------------------------------------------------------------

interface IProps {
  onClose: () => void;
  onSwitch: () => void;
  newEmail: string;
}

export default function LoginForm(props: IProps) {
  const { onClose, onSwitch, newEmail } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { alertMsg } = useAlert();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .email('Email is not valid')
      .required('Email is required'),
    password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Password is required'),
  });

  const [remember, email] = getRemember(newEmail);
  const formik = useFormik({
    initialValues: {
      email,
      password: '',
      remember,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const req: LoginRequest = {
        email: values.email,
        password: values.password,
      };
      saveRemember(values.remember, values.email);

      try {
        const { data } = await login(req);
        dispatch(setAuth(data));
        onClose();
      } catch (err) {
        alertMsg(err as string, 'error');
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Stack alignItems="center" spacing={2} sx={{ my: 1 }}>
      <Avatar sx={{ bgcolor: 'secondary.main' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
        Sign in
      </Typography>
      <Box
        sx={{ pt: 1, maxWidth: 360, width: '100%' }}
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: '0.875rem',
              },
            }}
            label="Remember me"
          />
          <Link href="#" variant="body2" underline="hover" sx={{ color: 'secondary.dark' }}>
            Forgot password?
          </Link>
        </Stack>
        <Button fullWidth size="large" type="submit" variant="contained" disabled={isSubmitting}>
          Login
        </Button>
      </Box>
      <Link component="button" variant="body2" onClick={onSwitch}>
        Don’t have an account?
      </Link>
    </Stack>
  );
}
