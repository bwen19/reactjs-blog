import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Box, Button, Dialog, IconButton, InputAdornment, Link, Stack, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { register, RegisterRequest } from '@/api';
import { useAlert, useAppDispatch, useAppSelector } from '@/hooks';
import { closeAuthDialog, setUser, switchAuthDialog } from '@/redux/authSlice';

// -------------------------------------------------------------------

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialog-paper': {
    width: 420,
  },
}));

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Username is required'),
  email: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .email('Must be a valid email')
    .required('Email is required'),
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Password is required'),
  passwordRepeat: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Repeat password is required'),
});

// ========================// RegisterDialog //======================== //

export default function RegisterDialog() {
  const dispatch = useAppDispatch();
  const { open, openLogin } = useAppSelector((state) => state.auth);
  const handleSwitch = () => dispatch(switchAuthDialog());

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const { alertMsg } = useAlert();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { resetForm }) => {
      if (values.password !== values.passwordRepeat) {
        alertMsg('The repeated password is incorrect', 'warning');
        return;
      }

      const req: RegisterRequest = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      try {
        const { data } = await register(req);
        dispatch(setUser(data.user));
        resetForm();
        alertMsg(`Registration success: ${data.user.username}, Please Login`, 'info');
        handleSwitch();
      } catch (err) {
        alertMsg(err as string, 'error');
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, resetForm } = formik;
  const handleClose = () => {
    resetForm();
    dispatch(closeAuthDialog());
  };

  return (
    <StyledDialog open={open && !openLogin} onClose={handleClose}>
      <Stack spacing={2} alignItems="center" sx={{ my: 3 }}>
        <Typography component="h1" variant="h5" color="secondary" sx={{ fontWeight: 500 }}>
          Sign up
        </Typography>
        <Box
          sx={{ maxWidth: 360, width: '100%' }}
          component="form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <Stack spacing={3} sx={{ my: 1 }}>
            <TextField
              fullWidth
              autoComplete="username"
              label="Username"
              {...getFieldProps('username')}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
            />
            <TextField
              fullWidth
              autoComplete="email"
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
            <TextField
              fullWidth
              autoComplete="password-repeat"
              type={showPassword ? 'text' : 'password'}
              label="Password Repeat"
              {...getFieldProps('passwordRepeat')}
              error={Boolean(touched.passwordRepeat && errors.passwordRepeat)}
              helperText={touched.passwordRepeat && errors.passwordRepeat}
            />
            <Button fullWidth size="large" type="submit" variant="contained" disabled={isSubmitting}>
              Register
            </Button>
          </Stack>
        </Box>
        <Link component="button" variant="body2" onClick={handleSwitch}>
          Already have an account?
        </Link>
      </Stack>
    </StyledDialog>
  );
}
