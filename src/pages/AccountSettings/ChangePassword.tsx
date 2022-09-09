import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, IconButton, InputAdornment, Paper, Stack, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { ChangePasswordRequest, changePassword } from '@/api';
import { useAlert, useAppSelector } from '@/hooks';

// -------------------------------------------------------------------

export default function ChangePassword() {
  const userId = useAppSelector((state) => state.auth.authUser?.id) as number;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const { alertMsg } = useAlert();

  const ProfileSchema = Yup.object().shape({
    oldPassword: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Password is required'),
    newPassword: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Password is required'),
    newPasswordRepeat: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordRepeat: '',
    },
    validationSchema: ProfileSchema,
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
    <Paper elevation={0} sx={{ py: 3 }}>
      <Box
        sx={{ mx: 'auto', maxWidth: 360, width: '100%', height: '100%' }}
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Stack spacing={3} alignItems="center" sx={{ mt: 3, mb: 5 }}>
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
            Change Password
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
