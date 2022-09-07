import { alpha, styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';

import { deleteUsers, DeleteUsersRequest } from '@/api';
import { useAlert, useConfirm, useUsersContext } from '@/hooks';
import CreateUser from './CreateUser';

// -------------------------------------------------------------------

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: 64,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// -------------------------------------------------------------------

export default function UsersTableToolbar() {
  const { state, dispatch } = useUsersContext();
  const { selected } = state;
  const numSelected = selected.length;

  const { confirm } = useConfirm();
  const { alertMsg } = useAlert();

  const handleDeleteSelected = async () => {
    const isConfirm = await confirm('Are you sure to delete these users?');
    if (!isConfirm) return;

    try {
      const req: DeleteUsersRequest = {
        userIds: selected,
      };
      await deleteUsers(req);
      dispatch({ type: 'reload' });
    } catch (err) {
      alertMsg(err as string, 'error');
    }
  };

  return (
    <StyledToolbar
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <>
          <Typography component="div" variant="h6">
            {numSelected} selected
          </Typography>
          <Tooltip title="Delete all selected users">
            <IconButton color="error" onClick={handleDeleteSelected}>
              <DeleteOutlined />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Typography component="div" variant="h6">
            Users
          </Typography>
          <CreateUser />
        </>
      )}
    </StyledToolbar>
  );
}
