import React from 'react';
import { Checkbox, IconButton, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { HighlightOffOutlined } from '@mui/icons-material';

import { deleteSessions, DeleteSessionsRequest } from '@/api';
import { useAlert, useConfirm } from '@/hooks';
import { useSessionsContext } from './sessionsState';
import { fAgent, fDateSuffix } from '@/utils';

// -------------------------------------------------------------------

export default function SessionsTableBody() {
  const { state, dispatch } = useSessionsContext();
  const { sessions, selected } = state;

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

  const { confirm } = useConfirm();
  const { alertMsg } = useAlert();

  const handleDeleteUser = async (sessionId: string) => {
    const isConfirm = await confirm('Are you sure to delete this session?');
    if (!isConfirm) return;

    try {
      const req: DeleteSessionsRequest = {
        sessionIds: [sessionId],
      };
      await deleteSessions(req);
      dispatch({ type: 'reload', numDeleted: req.sessionIds.length });
    } catch (err) {
      alertMsg(err as string, 'error');
    }
  };

  return (
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
                <IconButton color="warning" size="small" onClick={() => handleDeleteUser(id)}>
                  <HighlightOffOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
