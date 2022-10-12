import React from 'react';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { TaskAltOutlined, DeleteOutlined, CancelOutlined } from '@mui/icons-material';
import { useUsers } from '@/hooks';
import { Label } from '@/components';
import { fDateSuffix, role2color } from '@/utils';
import UpdateUser from './UpdateUser';
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';

// ========================// Users //======================== //

export default function Users() {
  const { state, dispatch, createUser, deleteUsers, updateUser } = useUsers();
  const {
    total,
    users,
    selected,
    param: { pageId, pageSize },
  } = state;

  const handleChangePageId = (event: unknown, newPageId: number) => {
    dispatch({ type: 'setParam', param: { pageId: newPageId + 1 } });
  };

  const handleChangePageSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setParam', param: { pageSize: parseInt(event.target.value, 10) } });
  };

  const handleSelect = (event: React.ChangeEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

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

  return (
    <Card elevation={2} sx={{ borderRadius: '8px', mb: 3 }}>
      <TableToolbar state={state} dispatch={dispatch} createUser={createUser} deleteUsers={deleteUsers} />
      <TableContainer>
        <Table sx={{ minWidth: 700 }}>
          <TableHeader state={state} dispatch={dispatch} />
          <TableBody>
            {users.map((user) => {
              const { id, username, email, avatar, role, postCount, deleted, createAt } = user;
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
                    <Stack spacing={1} direction="row" alignItems="center">
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
                  <TableCell align="center">{postCount}</TableCell>
                  <TableCell align="center">
                    {deleted ? (
                      <CancelOutlined fontSize="small" color="error" />
                    ) : (
                      <TaskAltOutlined fontSize="small" color="success" />
                    )}
                  </TableCell>
                  <TableCell align="left">{fDateSuffix(createAt)}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      <UpdateUser user={user} updateUser={updateUser} />
                      <Tooltip title="Delete this user">
                        <IconButton size="small" onClick={() => deleteUsers(id)}>
                          <DeleteOutlined color="info" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={total}
        rowsPerPage={pageSize}
        page={pageId - 1}
        onPageChange={handleChangePageId}
        onRowsPerPageChange={handleChangePageSize}
      />
    </Card>
  );
}
