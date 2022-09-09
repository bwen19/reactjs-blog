import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Avatar, Box, Button, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';

import { User, changeProfile, ChangeProfileRequest, uploadAvatar } from '@/api';
import { useAlert, useAppDispatch, useAppSelector } from '@/hooks';
import { setUser } from '@/redux/authSlice';

// -------------------------------------------------------------------

const IMG_TYPE = ['image/png', 'image/jpeg'];

export default function Profile() {
  const { alertMsg } = useAlert();

  const user = useAppSelector((state) => state.auth.authUser) as User;
  const dispatch = useAppDispatch();

  const ProfileSchema = Yup.object().shape({
    username: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!'),
    email: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').email('Email is not valid'),
    info: Yup.string().max(150, 'Too Long!'),
    file: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues: {
      username: user.username,
      email: user.email,
      info: user.info,
      file: null,
    },
    validationSchema: ProfileSchema,
    onSubmit: async (values) => {
      const req: ChangeProfileRequest = { id: user.id };
      if (values.username && values.username !== user.username) {
        req.username = values.username;
      }
      if (values.email && values.email !== user.email) {
        req.email = values.email;
      }
      if (values.info && values.info !== user.info) {
        req.info = values.info;
      }
      if (Object.keys(req).length === 1) {
        alertMsg('Nothing seems to change', 'warning');
        return;
      }

      try {
        const { data } = await changeProfile(req);
        dispatch(setUser(data.user));
        alertMsg('Your profile info has been changed', 'success');
      } catch (err) {
        alertMsg(err as string, 'error');
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  const changeAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const file = event.currentTarget.files[0];
      if (IMG_TYPE.includes(file.type) && file.size < 1024000) {
        setFieldValue('file', file);
        try {
          const { data } = await uploadAvatar(file);
          dispatch(setUser(data.user));
          alertMsg('Your avatar has been changed', 'info');
        } catch (err) {
          alertMsg(err as string, 'error');
        }
      } else {
        alertMsg('Only support png and jpg images within 1M', 'error');
      }
    }
  };

  return (
    <Paper elevation={0} sx={{ py: 3 }}>
      <Box sx={{ mx: 'auto', maxWidth: 380 }} component="form" autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack alignItems="center" sx={{ mb: 5 }}>
          <label htmlFor="upload-file">
            <input style={{ display: 'none' }} id="upload-file" name="file" type="file" onChange={changeAvatar} />
            <IconButton component="span">
              <Avatar src={user.avatar} sx={{ width: 80, height: 80 }} />
            </IconButton>
          </label>
          <Typography variant="h6" sx={{ mb: 3 }}>
            My avatar
          </Typography>
          <TextField
            fullWidth
            autoComplete="username"
            label="Username"
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            sx={{ mb: 4 }}
          />
          <TextField
            fullWidth
            autoComplete="info"
            type="info"
            label="Personal Intro"
            {...getFieldProps('info')}
            error={Boolean(touched.info && errors.info)}
            helperText={touched.info && errors.info}
            sx={{ mb: 4 }}
          />
          <Button size="large" type="submit" variant="contained" disabled={isSubmitting}>
            Save Profile
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
