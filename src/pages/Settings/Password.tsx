import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Divider, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAlert, useAppSelector } from '@/hooks';
import { ChangePasswordRequest, changePassword } from '@/api';

// -------------------------------------------------------------------

const PasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Password is required'),
  newPassword: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Password is required'),
  newPasswordRepeat: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Password is required'),
});

// ========================// Password //======================== //

export default function Password() {
  const userId = useAppSelector((state) => state.auth.authUser?.id) as string;
  const { alertMsg } = useAlert();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordRepeat: '',
    },
    validationSchema: PasswordSchema,
    onSubmit: async (values) => {
      if (values.newPassword !== values.newPasswordRepeat) {
        alertMsg('The repeated password is incorrect', 'warning');
        return;
      }
      if (values.newPassword === values.oldPassword) {
        alertMsg('New password cannot be the same as old password', 'warning');
        return;
      }

      const req: ChangePasswordRequest = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      try {
        await changePassword(userId, req);
        alertMsg('Your password has been changed', 'info');
      } catch (err) {
        alertMsg(err as string, 'error');
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2, ml: 1 }}>
        Change password
      </Typography>
      <Divider />
      <Box
        sx={{ maxWidth: 360, mx: 'auto', mt: 6, mb: 2, px: 2 }}
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Stack spacing={4} alignItems="center">
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Old Password"
            {...getFieldProps('oldPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.oldPassword && errors.oldPassword)}
            helperText={touched.oldPassword && errors.oldPassword}
          />
          <TextField
            fullWidth
            autoComplete="new-password"
            type={showPassword ? 'text' : 'password'}
            label="New Password"
            {...getFieldProps('newPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.newPassword && errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
          />
          <TextField
            fullWidth
            autoComplete="new-password-repeat"
            type={showPassword ? 'text' : 'password'}
            label="New Password Repeat"
            {...getFieldProps('newPasswordRepeat')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.newPasswordRepeat && errors.newPasswordRepeat)}
            helperText={touched.newPasswordRepeat && errors.newPasswordRepeat}
          />
          <Button size="large" type="submit" variant="contained" disabled={isSubmitting}>
            Save changes
          </Button>
        </Stack>
      </Box>
    </>
  );
}
