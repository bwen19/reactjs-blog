import React from 'react';
import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { HighlightOffOutlined } from '@mui/icons-material';
import { useSessions } from '@/hooks';
import { fAgent, fDateSuffix } from '@/utils';
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';

// ========================// Sessions //======================== //

export default function Sessions() {
  const { state, dispatch, deleteSessions } = useSessions();
  const {
    total,
    sessions,
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
    <Paper elevation={0} sx={{ borderRadius: '8px', mb: 3 }}>
      <TableToolbar state={state} deleteSessions={deleteSessions} />
      <TableContainer>
        <Table>
          <TableHeader state={state} dispatch={dispatch} />
          <TableBody>
            {sessions.map((session) => {
              const { id, userAgent, clientIp, createAt, expiresAt } = session;
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
                  <TableCell>{fAgent(userAgent)}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{clientIp}</Typography>
                  </TableCell>
                  <TableCell align="right">{fDateSuffix(createAt)}</TableCell>
                  <TableCell align="right">{fDateSuffix(expiresAt)}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete this session">
                      <IconButton color="warning" size="small" onClick={() => deleteSessions(id)}>
                        <HighlightOffOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
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
        count={Number(total)}
        rowsPerPage={pageSize}
        page={pageId}
        onPageChange={handleChangePageId}
        onRowsPerPageChange={handleChangePageSize}
      />
    </Paper>
  );
}
