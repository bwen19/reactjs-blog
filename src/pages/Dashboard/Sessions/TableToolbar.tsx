import { alpha, styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { SessionState } from '@/hooks';

// -------------------------------------------------------------------

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: 56,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ========================// TableToolbar //======================== //

interface IProps {
  state: SessionState;
  deleteSessions: () => Promise<void>;
}

export default function TableToolbar({ state, deleteSessions }: IProps) {
  const { selected } = state;
  const numSelected = selected.length;

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
            <IconButton color="error" onClick={deleteSessions}>
              <DeleteOutlined />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Typography component="div" variant="h6">
          Sessions
        </Typography>
      )}
    </StyledToolbar>
  );
}
