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
import { EditOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { updateUser, UpdateUserRequest, UserItem, UserRole } from '@/api';
import { useAlert } from '@/hooks';
import { useUsersContext } from './usersState';

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

interface IProps {
  user: UserItem;
}

export default function UpdateUser({ user }: IProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const { alertMsg } = useAlert();
  const { dispatch } = useUsersContext();

  const UpdateUserSchema = Yup.object().shape({
    username: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').nullable(),
    email: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').email('Must be a valid email').nullable(),
    password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').nullable(),
    role: Yup.mixed().oneOf<UserRole>(['user', 'author', 'admin']).defined(),
    isDeleted: Yup.mixed().oneOf<string>(['true', 'false']).defined(),
  });

  const formik = useFormik({
    initialValues: {
      username: user.username,
      email: user.email,
      password: '',
      role: user.role,
      isDeleted: user.isDeleted ? 'true' : 'false',
    },
    validationSchema: UpdateUserSchema,
    onSubmit: async (values) => {
      try {
        const req: UpdateUserRequest = { id: user.id };
        if (values.username && values.username !== user.username) {
          req.username = values.username;
        }
        if (values.email && values.email !== user.email) {
          req.email = values.email;
        }
        if (values.role && values.role !== user.role) {
          req.role = values.role;
        }
        const oldDeleted = user.isDeleted ? 'true' : 'false';
        if (values.isDeleted && values.isDeleted !== oldDeleted) {
          req.isDeleted = Boolean(values.isDeleted);
        }
        if (Object.keys(req).length === 1) {
          alertMsg('Nothing seems to change', 'warning');
          return;
        }

        await updateUser(req);
        dispatch({ type: 'reload' });
        alertMsg('User updated successfully', 'success');
        setOpen(false);
      } catch (err) {
        alertMsg(err as string, 'error');
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <Tooltip title="Modify this user">
        <IconButton color="secondary" size="small" onClick={handleOpen}>
          <EditOutlined />
        </IconButton>
      </Tooltip>
      <StyledDialog open={open} onClose={handleClose}>
        <DialogContent>
          <Stack spacing={2} alignItems="center" sx={{ my: 1 }}>
            <Typography component="h1" variant="h5" color="secondary" sx={{ fontWeight: 500 }}>
              Update user
            </Typography>
            <Box
              sx={{ maxWidth: 360, width: '100%' }}
              component="form"
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit}
            >
              <Stack spacing={3} sx={{ my: 2 }}>
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
                <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
                  <FormControl sx={{ width: 180 }}>
                    <InputLabel id="select-role">Role</InputLabel>
                    <Select labelId="select-role" id="simple-select-role" label="Role" {...getFieldProps('role')}>
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="author">Author</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: 150 }}>
                    <InputLabel id="select-active">Active</InputLabel>
                    <Select
                      labelId="select-active"
                      id="simple-select-active"
                      label="Deleted"
                      {...getFieldProps('isDeleted')}
                    >
                      <MenuItem value="true">false</MenuItem>
                      <MenuItem value="false">true</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
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
