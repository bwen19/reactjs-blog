import { alpha, styled } from '@mui/material/styles';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Paper,
  Stack,
  Button,
} from '@mui/material';
import { BorderColorOutlined, SearchOutlined, DeleteOutlined, FilterListOutlined } from '@mui/icons-material';

// -------------------------------------------------------------------

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: 76,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// -------------------------------------------------------------------

interface IProps {
  numSelected: number;
  // filterName?: string;
  // onFilterName?: () => void;
}

export default function AuthorPostsToolbar({ numSelected }: IProps) {
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" fontWeight="600">
          My Posts
        </Typography>
        <Button sx={{ borderRadius: '8px' }} variant="contained" startIcon={<BorderColorOutlined />}>
          New Post
        </Button>
      </Stack>
      <Paper elevation={0} sx={{ my: 2, borderRadius: '8px' }}>
        <StyledToolbar
          sx={{
            borderRadius: '8px',
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
              <Tooltip title="Delete">
                <IconButton>
                  <DeleteOutlined />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <OutlinedInput
                // value={filterName}
                // onChange={onFilterName}
                sx={{ width: 300 }}
                placeholder="Search post..."
                startAdornment={
                  <InputAdornment position="start">
                    <SearchOutlined sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                  </InputAdornment>
                }
              />
              <Tooltip title="Filter list">
                <IconButton>
                  <FilterListOutlined />
                </IconButton>
              </Tooltip>
            </>
          )}
        </StyledToolbar>
      </Paper>
    </>
  );
}
