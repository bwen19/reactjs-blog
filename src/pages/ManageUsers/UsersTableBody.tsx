import React from 'react';
import {
  Avatar,
  Box,
  Checkbox,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { HighlightOffOutlined } from '@mui/icons-material';

import { deleteUsers, DeleteUsersRequest, UserRole } from '@/api';
import { useAlert, useConfirm, useUsersContext } from '@/hooks';
import { fDateSuffix } from '@/utils/formatTime';
import Label from '@/components/Label';
import UpdateUser from './UpdateUser';

// -------------------------------------------------------------------

const role2color = (role: UserRole) => {
  switch (role) {
    case 'admin':
      return 'error';
    case 'author':
      return 'secondary';
    case 'user':
      return 'primary';
    default:
      return 'primary';
  }
};

// -------------------------------------------------------------------

export default function UsersTableBody() {
  const { state, dispatch } = useUsersContext();
  const { users, selected } = state;

  const handleSelect = (event: React.ChangeEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    dispatch({ type: 'setSelected', selected: newSelected });
  };

  const { confirm } = useConfirm();
  const { alertMsg } = useAlert();

  const handleDeleteUser = async (userId: number) => {
    const isConfirm = await confirm('Are you sure to delete this user?');
    if (!isConfirm) return;

    try {
      const req: DeleteUsersRequest = {
        userIds: [userId],
      };
      await deleteUsers(req);
      dispatch({ type: 'reload' });
    } catch (err) {
      alertMsg(err as string, 'error');
    }
  };

  return (
    <TableBody>
      {users.map((user) => {
        const { id, username, email, avatar, role, postCount, starCount, createAt } = user;
        const isItemSelected = selected.indexOf(id) !== -1;
        return (
          <TableRow
            hover
            key={id}
            tabIndex={-1}
            role="checkbox"
            selected={isItemSelected}
            aria-checked={isItemSelected}
          >
            <TableCell padding="checkbox">
              <Checkbox checked={isItemSelected} onChange={(event) => handleSelect(event, id)} />
            </TableCell>
            <TableCell component="th" scope="row">
              <Typography variant="subtitle2">{id}</Typography>
            </TableCell>
            <TableCell>
              <Stack spacing={2} direction="row" alignItems="center">
                <Avatar alt="User" src={avatar} sx={{ width: 40, height: 40 }} />
                <Box>
                  <Typography variant="subtitle2">{username}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {email}
                  </Typography>
                </Box>
              </Stack>
            </TableCell>
            <TableCell align="left">
              <Label variant="ghost" color={role2color(role)}>
                {role}
              </Label>
            </TableCell>
            <TableCell align="right">{postCount || 0}</TableCell>
            <TableCell align="right">{starCount || 0}</TableCell>
            <TableCell align="right">{fDateSuffix(createAt)}</TableCell>
            <TableCell align="right">
              <Stack direction="row" spacing={0.5} justifyContent="center">
                <UpdateUser user={user} />
                <Tooltip title="Delete this user">
                  <IconButton color="warning" size="small" onClick={() => handleDeleteUser(id)}>
                    <HighlightOffOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
