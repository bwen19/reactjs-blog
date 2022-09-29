import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Avatar, Box, Button, Divider, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { SwitchAccountOutlined } from '@mui/icons-material';
import { User, changeProfile, ChangeProfileRequest, uploadAvatar } from '@/api';
import { useAlert, useAppDispatch, useAppSelector } from '@/hooks';
import { setUser } from '@/redux/authSlice';

// -------------------------------------------------------------------
const ProfileSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!'),
  email: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').email('Email is not valid'),
  intro: Yup.string().max(150, 'Too Long!'),
  file: Yup.mixed(),
});

const IMG_TYPE = ['image/png', 'image/jpeg'];

// ========================// Profile //======================== //

export default function Profile() {
  const user = useAppSelector((state) => state.auth.authUser) as User;
  const dispatch = useAppDispatch();
  const { alertMsg } = useAlert();

  const formik = useFormik({
    initialValues: {
      username: user.username,
      email: user.email,
      intro: user.intro,
      file: null,
    },
    validationSchema: ProfileSchema,
    onSubmit: async (values) => {
      const req: ChangeProfileRequest = {};
      if (values.username && values.username !== user.username) {
        req.username = values.username;
      }
      if (values.email && values.email !== user.email) {
        req.email = values.email;
      }
      if (values.intro && values.intro !== user.intro) {
        req.intro = values.intro;
      }
      if (Object.keys(req).length === 0) {
        alertMsg('Nothing seems to change', 'warning');
        return;
      }

      try {
        const { data } = await changeProfile(user.id, req);
        dispatch(setUser(data.user));
        alertMsg('Your profile intro has been changed', 'success');
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
    <>
      <Box sx={{ mb: 2, px: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">General settings</Typography>
        <Tooltip title="Go to your profile page">
          <IconButton component={Link} to={`/user/${user.id}`}>
            <SwitchAccountOutlined color="primary" />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider />
      <Box
        sx={{ maxWidth: 360, mx: 'auto', my: 2, px: 2 }}
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Stack spacing={4} alignItems="center">
          <label htmlFor="upload-file">
            <input style={{ display: 'none' }} id="upload-file" name="file" type="file" onChange={changeAvatar} />
            <Tooltip title="Change your avatar" arrow>
              <IconButton color="secondary" component="span">
                <Avatar src={user.avatar} sx={{ width: 96, height: 96 }} />
              </IconButton>
            </Tooltip>
          </label>
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
            autoComplete="intro"
            type="intro"
            label="Personal Introduction"
            {...getFieldProps('intro')}
            error={Boolean(touched.intro && errors.intro)}
            helperText={touched.intro && errors.intro}
          />
          <Button size="large" type="submit" variant="contained" disabled={isSubmitting}>
            Save Changes
          </Button>
        </Stack>
      </Box>
    </>
  );
}
