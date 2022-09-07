import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material';

// -------------------------------------------------------------------

interface AlertState {
  open: boolean;
  message: string;
  severity: AlertColor;
  alertId: number;
}

const initialState: AlertState = {
  open: false,
  message: '',
  severity: 'info',
  alertId: 0,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<{ message: string; severity?: AlertColor }>) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || 'info';
      state.alertId = new Date().getTime();
    },
    closeAlert: (state) => {
      state.open = false;
      state.message = '';
    },
  },
});

export const { showAlert, closeAlert } = alertSlice.actions;
export default alertSlice.reducer;
