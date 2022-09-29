import React from 'react';
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import { TableHeadCell, UserItem, UserOrderBy } from '@/api';
import { UserAction, UserState } from '@/hooks';

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

const headCells: readonly TableHeadCell<UserItem>[] = [
  {
    id: 'username',
    label: 'USER PROFILE',
    sortable: true,
    align: 'left',
  },
  {
    id: 'role',
    label: 'ROLE',
    sortable: true,
    align: 'left',
  },
  {
    id: 'postCount',
    label: 'POSTS',
    align: 'center',
  },
  {
    id: 'deleted',
    label: 'STATUS',
    sortable: true,
    align: 'center',
  },
  {
    id: 'createAt',
    label: 'CREATE TIME',
    sortable: true,
    align: 'left',
  },
  {
    id: 'action',
    label: 'ACTIONS',
    align: 'center',
  },
];

// ========================// TableHeader //======================== //

interface IProps {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
}

export default function TableHeader({ state, dispatch }: IProps) {
  const {
    param: { order, orderBy },
    users,
    selected,
  } = state;
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
    dispatch({ type: 'setParam', param: { order: isAsc ? 'desc' : 'asc', orderBy: property } });
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
