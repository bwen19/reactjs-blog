import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { LockOutlined, SwapHorizOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { closeAuthDialog, setAuth, switchAuthDialog } from '@/redux/authSlice';
import { useAlert, useAppDispatch, useAppSelector } from '@/hooks';
import { login, LoginRequest } from '@/api';
import { getLocalUser, saveLocalUser } from '@/utils/localStorage';

// -------------------------------------------------------------------

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialog-paper': {
    width: 420,
  },
}));

// ========================// LoginDialog //======================== //

export default function LoginDialog() {
  const dispatch = useAppDispatch();
  const { isLoggedIn, authUser, open, openLogin } = useAppSelector((state) => state.auth);
  const handleSwitch = () => dispatch(switchAuthDialog());

  const [showEmail, setShowEmail] = useState<boolean>(false);
  const handleSwap = () => {
    setShowEmail(!showEmail);
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { alertMsg } = useAlert();

  const { username, email, remember } = getLocalUser(authUser?.username, authUser?.email);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!'),
    email: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').email('Email is not valid'),
    password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username,
      email,
      password: '',
      remember,
    },
    enableReinitialize: true,
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const req: LoginRequest = { password: values.password };
      if (showEmail) {
        if (!values.email) {
          setErrors({ email: 'email is empty' });
          return;
        }
        req.email = values.email;
      } else {
        if (!values.username) {
          setErrors({ username: 'username is empty' });
          return;
        }
        req.username = values.username;
      }

      try {
        const { data } = await login(req);
        dispatch(setAuth(data));
        saveLocalUser(data.user.username, data.user.email, values.remember);
        resetForm();
      } catch (err) {
        alertMsg(err as string, 'error');
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, resetForm } = formik;

  const handleClose = () => {
    resetForm();
    dispatch(closeAuthDialog());
  };

  return (
    <StyledDialog open={open && openLogin} onClose={handleClose}>
      <Stack alignItems="center" spacing={2} sx={{ my: 5 }}>
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
            {showEmail ? (
              <TextField
                fullWidth
                autoComplete="email"
                type="email"
                label="Email address"
                {...getFieldProps('email')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Login with username">
                        <IconButton onClick={handleSwap} edge="end">
                          <SwapHorizOutlined />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            ) : (
              <TextField
                fullWidth
                autoComplete="username"
                type="text"
                label="Username"
                {...getFieldProps('username')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Login with email">
                        <IconButton onClick={handleSwap} edge="end">
                          <SwapHorizOutlined />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
              />
            )}
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
        {!isLoggedIn && (
          <Link component="button" variant="body2" onClick={handleSwitch}>
            Don’t have an account?
          </Link>
        )}
      </Stack>
    </StyledDialog>
  );
}
