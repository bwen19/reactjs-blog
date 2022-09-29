import React from 'react';
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import { SessionAction, SessionState } from '@/hooks';
import { Session, SessionOrderBy, TableHeadCell } from '@/api';

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

const headCells: readonly TableHeadCell<Session>[] = [
  {
    id: 'userAgent',
    label: 'Agent',
    align: 'left',
  },
  {
    id: 'clientIp',
    label: 'IP',
    sortable: true,
    align: 'left',
  },
  {
    id: 'createAt',
    label: 'CreatTime',
    sortable: true,
    align: 'right',
  },
  {
    id: 'expiresAt',
    label: 'ExpireTime',
    sortable: true,
    align: 'right',
  },
  {
    id: 'action',
    label: 'Actions',
    align: 'center',
  },
];

// ========================// TableHeader //======================== //

interface IProps {
  state: SessionState;
  dispatch: React.Dispatch<SessionAction>;
}

export default function TableHeader({ state, dispatch }: IProps) {
  const {
    param: { order, orderBy },
    sessions,
    selected,
  } = state;
  const rowCount = sessions.length;
  const numSelected = selected.length;

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = sessions.map((session) => session.id);
      dispatch({ type: 'setSelected', selected: newSelected });
      return;
    }
    dispatch({ type: 'setSelected', selected: [] });
  };

  const createSortHandler = (property: SessionOrderBy) => {
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
                onClick={() => createSortHandler(headCell.id as SessionOrderBy)}
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
