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
import { EmojiEmotionsOutlined, HighlightOffOutlined, SentimentDissatisfiedOutlined } from '@mui/icons-material';

import { deleteUsers, DeleteUsersRequest } from '@/api';
import { useAlert, useConfirm } from '@/hooks';
import { fDateSuffix, role2color } from '@/utils';
import Label from '@/components/Label';
import { useUsersContext } from './usersState';
import UpdateUser from './UpdateUser';

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
        const { id, username, email, avatar, role, postCount, isDeleted, createAt } = user;
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
            <TableCell align="center">
              <Label variant="ghost" color={role2color(role)}>
                {role}
              </Label>
            </TableCell>
            <TableCell align="right">{postCount}</TableCell>
            <TableCell align="right">
              {isDeleted ? (
                <SentimentDissatisfiedOutlined fontSize="small" color="disabled" />
              ) : (
                <EmojiEmotionsOutlined fontSize="small" color="success" />
              )}
            </TableCell>
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
