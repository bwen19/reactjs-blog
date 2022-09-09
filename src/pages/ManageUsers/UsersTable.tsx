import React from 'react';
import { Card, Table, TableContainer, TablePagination } from '@mui/material';

import { useUsersContext } from './usersState';
import UsersTableHead from './UsersTableHead';
import UsersTableToolbar from './UsersTableToolbar';
import UsersTableBody from './UsersTableBody';

// -------------------------------------------------------------------

export default function UsersTable() {
  const { state, dispatch } = useUsersContext();
  const { total, pageId, pageSize } = state;

  const handleChangePageId = (event: unknown, newPageId: number) => {
    dispatch({ type: 'setPageId', pageId: newPageId });
  };

  const handleChangePageSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setPageSize', pageSize: parseInt(event.target.value, 10) });
  };

  return (
    <Card elevation={2} sx={{ borderRadius: '8px', mb: 3 }}>
      <UsersTableToolbar />
      <TableContainer>
        <Table sx={{ minWidth: 700 }}>
          <UsersTableHead />
          <UsersTableBody />
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
    </Card>
  );
}
