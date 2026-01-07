import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  message: '',
  type: 'success', // 'success', 'error', 'warning', 'info'
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.visible = true;
      state.message = action.payload.message;
      state.type = action.payload.type || 'success';
    },
    hideSnackbar: state => {
      state.visible = false;
      state.message = '';
    },
  },
});

export const {showSnackbar, hideSnackbar} = snackbarSlice.actions;
export const selectSnackbar = state => state.snackbar;
export default snackbarSlice.reducer;
