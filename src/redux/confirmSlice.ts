import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// -------------------------------------------------------------------

interface ConfirmState {
  open: boolean;
  message: string;
}

const initialState: ConfirmState = {
  open: false,
  message: '',
};

export const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    showConfirm: (state, action: PayloadAction<string>) => {
      state.open = true;
      state.message = action.payload;
    },
    closeConfirm: (state) => {
      state.open = false;
      state.message = '';
    },
  },
});

export const { showConfirm, closeConfirm } = confirmSlice.actions;
export default confirmSlice.reducer;
