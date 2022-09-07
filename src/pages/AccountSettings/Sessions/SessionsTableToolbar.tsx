import { alpha, styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';

import { deleteSessions, DeleteSessionsRequest } from '@/api';
import { useAlert, useConfirm, useSessionsContext } from '@/hooks';

// -------------------------------------------------------------------

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: 56,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// -------------------------------------------------------------------

export default function SessionsTableToolbar() {
  const { state, dispatch } = useSessionsContext();
  const { selected } = state;
  const numSelected = selected.length;

  const { confirm } = useConfirm();
  const { alertMsg } = useAlert();

  const handleDeleteSelected = async () => {
    const isConfirm = await confirm('Are you sure to delete these sessions?');
    if (!isConfirm) return;

    try {
      const req: DeleteSessionsRequest = {
        sessionIds: selected,
      };
      await deleteSessions(req);
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
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>
          <Tooltip title="Delete all selected sessions">
            <IconButton color="error" onClick={handleDeleteSelected}>
              <DeleteOutlined />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Typography component="div" variant="h6">
          Login history
        </Typography>
      )}
    </StyledToolbar>
  );
}
