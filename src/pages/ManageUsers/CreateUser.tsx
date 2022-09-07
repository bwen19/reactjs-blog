import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Dialog,
  Tooltip,
  IconButton,
  DialogContent,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { PersonAddOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { createUser, CreateUserRequest, UserRole } from '@/api';
import { useAlert, useUsersContext } from '@/hooks';

// -------------------------------------------------------------------

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialog-paper': {
    width: 420,
  },
}));

// -------------------------------------------------------------------

export default function CreateUser() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const { alertMsg } = useAlert();
  const { dispatch } = useUsersContext();

  const CreateUserSchema = Yup.object().shape({
    username: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Username is required'),
    email: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .email('Must be a valid email')
      .required('Email is required'),
    password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Password is required'),
    role: Yup.mixed().oneOf<UserRole>(['user', 'author', 'admin']).defined(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '123456',
      role: 'user',
    },
    validationSchema: CreateUserSchema,
    onSubmit: async (values) => {
      try {
        const req: CreateUserRequest = {
          username: values.username,
          email: values.email,
          password: values.password,
          role: values.role as UserRole,
        };
        const { data } = await createUser(req);
        setOpen(false);
        dispatch({ type: 'reload' });
        alertMsg(`User created successfully: ${data.user.username}`, 'success');
      } catch (err) {
        alertMsg(err as string, 'error');
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <Tooltip title="Add new user">
        <IconButton color="primary" onClick={handleOpen}>
          <PersonAddOutlined />
        </IconButton>
      </Tooltip>
      <StyledDialog open={open} onClose={handleClose}>
        <DialogContent>
          <Stack spacing={2} alignItems="center" sx={{ my: 1 }}>
            <Typography component="h1" variant="h5" color="secondary" sx={{ fontWeight: 500 }}>
              New user
            </Typography>
            <Box
              sx={{ maxWidth: 360, width: '100%' }}
              component="form"
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit}
            >
              <Stack spacing={3} sx={{ my: 2 }}>
                <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
                  <TextField
                    fullWidth
                    autoComplete="username"
                    label="Username"
                    {...getFieldProps('username')}
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  <FormControl sx={{ width: 150 }}>
                    <InputLabel id="select-label">Role</InputLabel>
                    <Select labelId="select-label" id="simple-select" label="Role" {...getFieldProps('role')}>
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="author">Author</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
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

                <Button fullWidth size="large" type="submit" variant="contained" disabled={isSubmitting}>
                  Submit
                </Button>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
      </StyledDialog>
    </>
  );
}
