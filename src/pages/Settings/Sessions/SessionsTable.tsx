import React from 'react';
import { Paper, Table, TableContainer, TablePagination } from '@mui/material';

import { useSessionsContext } from './sessionsState';
import SessionsTableHead from './SessionsTableHead';
import SessionsTableToolbar from './SessionsTableToolbar';
import SessionsTableBody from './SessionsTableBody';

// -------------------------------------------------------------------

export default function SessionsTable() {
  const { state, dispatch } = useSessionsContext();
  const { total, pageId, pageSize } = state;

  const handleChangePageId = (event: unknown, newPageId: number) => {
    dispatch({ type: 'setPageId', pageId: newPageId });
  };

  const handleChangePageSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setPageSize', pageSize: parseInt(event.target.value, 10) });
  };

  return (
    <Paper elevation={0} sx={{ borderRadius: '8px', mb: 3 }}>
      <SessionsTableToolbar />
      <TableContainer>
        <Table>
          <SessionsTableHead />
          <SessionsTableBody />
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
