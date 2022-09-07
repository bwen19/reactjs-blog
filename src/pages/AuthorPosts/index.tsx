import React, { useState } from 'react';
import {
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import { Post } from '@/api';
import { useAppSelector, useListPost } from '@/hooks';
import { fDateSuffix } from '@/utils/formatTime';
import Label from '@/components/Label';
import AuthorPostsToolbar from './AuthorPostsToolbar';
import AuthorPostsHead from './AuthorPostsHead';
import AuthorPostsAction from './AuthorPostsAction';

// -------------------------------------------------------------------

type ViewName = 'list' | 'edit' | 'preview' | 'new';

export default function AuthorPosts() {
  const authorId = useAppSelector((state) => state.auth.authUser?.id);
  const [viewName, setViewName] = useState<ViewName>('list');
  const [selected, setSelected] = useState<readonly number[]>([]);

  const { posts, order, setOrder, orderBy, setOrderBy, pageId, setPageId, pageSize, setPageSize } = useListPost({
    authorId,
  });

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = posts.map((post) => post.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Post) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePageId = (event: unknown, newPageId: number) => {
    setPageId(newPageId);
  };

  const handleChangePageSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageId(0);
  };
  const handleClick = (event: React.ChangeEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleActionClick = (id: number, actionType: string) => {
    switch (actionType) {
      case 'preview':
        setViewName('preview');
        break;
      case 'edit':
        setViewName('edit');
        break;
      case 'delete':
        console.log('delete');
        break;
      default:
    }
  };

  const status2color = (status: string) => {
    switch (status) {
      case 'Published':
        return 'primary';
      case 'In review':
        return 'secondary';
      case 'Draft':
        return 'warning';
      default:
        return 'primary';
    }
  };
  const emptyRows = pageId > 0 ? Math.max(0, (1 + pageId) * pageSize - posts.length) : 0;

  const renderAuthorPostsTable = (
    <Card elevation={0} sx={{ borderRadius: '8px' }}>
      <TableContainer sx={{ minWidth: 500 }}>
        <Table>
          <AuthorPostsHead
            order={order}
            orderBy={orderBy}
            rowCount={posts.length}
            numSelected={selected.length}
            onRequestSort={handleRequestSort}
            onSelectAll={handleSelectAll}
          />
          <TableBody>
            {posts.map((post) => {
              const { id, title, createAt, status } = post;
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
                    <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle2">{title}</Typography>
                  </TableCell>
                  <TableCell align="left">{fDateSuffix(createAt)}</TableCell>
                  <TableCell align="left">
                    <Label variant="ghost" color={status2color(status)}>
                      {status}
                    </Label>
                  </TableCell>
                  <TableCell align="right">
                    <AuthorPostsAction id={id} onActionClick={handleActionClick} />
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          {/* {isUserNotFound && (
      <TableBody>
        <TableRow>
          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
            <SearchNotFound searchQuery={filterName} />
          </TableCell>
        </TableRow>
      </TableBody>
    )} */}
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={posts.length}
        rowsPerPage={pageSize}
        page={pageId}
        onPageChange={handleChangePageId}
        onRowsPerPageChange={handleChangePageSize}
      />
    </Card>
  );

  return (
    <>
      {viewName === 'list' && (
        <>
          <AuthorPostsToolbar numSelected={selected.length} />
          {renderAuthorPostsTable}
        </>
      )}
      {viewName === 'edit'}
      {viewName === 'preview'}
    </>
  );
}
