import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import { Post, Order } from '@/api';

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
  id: keyof Post | 'action';
  label: string;
  sortable?: boolean;
}

const headCells: HeadCell[] = [
  {
    id: 'title',
    label: 'TITLE',
  },
  {
    id: 'createAt',
    label: 'DATE',
    sortable: true,
  },
  {
    id: 'status',
    label: 'STATUS',
  },
  {
    id: 'action',
    label: '',
  },
];

// -------------------------------------------------------------------

interface IProps {
  order: Order;
  orderBy: string;
  rowCount: number;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Post) => void;
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthorPostsHead({ order, orderBy, rowCount, numSelected, onRequestSort, onSelectAll }: IProps) {
  const createSortHandler = (property: keyof Post) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAll}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="left" sortDirection={orderBy === headCell.id ? order : false}>
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id as keyof Post)}
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
