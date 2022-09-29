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
import { UpdateUserRequest, UserItem, UserRole } from '@/api';

// -------------------------------------------------------------------

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialog-paper': {
    width: 420,
  },
}));

const UpdateUserSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').nullable(),
  email: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').email('Must be a valid email').nullable(),
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').nullable(),
  role: Yup.mixed().oneOf<UserRole>(['user', 'author', 'admin']).defined(),
  deleted: Yup.mixed().oneOf<string>(['true', 'false']).defined(),
});

// ========================// UpdateUser //======================== //

interface IProps {
  user: UserItem;
  updateUser: (userId: string, req: UpdateUserRequest) => Promise<void>;
}

export default function UpdateUser({ user, updateUser }: IProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      username: user.username,
      email: user.email,
      password: '',
      role: user.role,
      deleted: user.deleted ? 'true' : 'false',
    },
    validationSchema: UpdateUserSchema,
    onSubmit: async (values) => {
      const req: UpdateUserRequest = {};
      if (values.username && values.username !== user.username) {
        req.username = values.username;
      }
      if (values.email && values.email !== user.email) {
        req.email = values.email;
      }
      if (values.role && values.role !== user.role) {
        req.role = values.role;
      }
      const oldDeleted = user.deleted ? 'true' : 'false';
      if (values.deleted && values.deleted !== oldDeleted) {
        req.deleted = Boolean(values.deleted);
      }
      await updateUser(user.id, req);
      setOpen(false);
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <Tooltip title="Modify this user">
        <IconButton size="small" onClick={() => setOpen(true)}>
          <EditOutlined color="info" />
        </IconButton>
      </Tooltip>
      <StyledDialog open={open} onClose={() => setOpen(false)}>
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
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
                      {...getFieldProps('deleted')}
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
