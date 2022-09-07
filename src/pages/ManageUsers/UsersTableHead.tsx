import React from 'react';
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

import { User, UserOrderBy } from '@/api';
import { useUsersContext } from '@/hooks';

// -------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

interface HeadCell {
  id: keyof User | 'action';
  label: string;
  sortable?: boolean;
  align: 'left' | 'right' | 'center';
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    label: 'ID',
    align: 'left',
    sortable: true,
  },
  {
    id: 'username',
    label: 'User Profile',
    sortable: true,
    align: 'left',
  },
  {
    id: 'role',
    label: 'Role',
    sortable: true,
    align: 'left',
  },
  {
    id: 'postCount',
    label: 'Posts',
    sortable: true,
    align: 'right',
  },
  {
    id: 'starCount',
    label: 'Stars',
    align: 'right',
  },
  {
    id: 'createAt',
    label: 'Creat Time',
    sortable: true,
    align: 'right',
  },
  {
    id: 'action',
    label: 'Actions',
    align: 'center',
  },
];

// -------------------------------------------------------------------

export default function UsersTableHead() {
  const { state, dispatch } = useUsersContext();
  const { users, selected, order, orderBy } = state;
  const rowCount = users.length;
  const numSelected = selected.length;

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = users.map((user) => user.id);
      dispatch({ type: 'setSelected', selected: newSelected });
      return;
    }
    dispatch({ type: 'setSelected', selected: [] });
  };

  const createSortHandler = (property: UserOrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    dispatch({ type: 'setSort', order: isAsc ? 'desc' : 'asc', orderBy: property });
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={handleSelectAll}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} sortDirection={orderBy === headCell.id ? order : false}>
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={() => createSortHandler(headCell.id as UserOrderBy)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
