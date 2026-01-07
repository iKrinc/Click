import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {authAPI} from '../../services/api';

// Initial state for auth
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isSkipped: false,
  loading: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, {rejectWithValue}) => {
    try {
      const response = await authAPI.login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Skip login action
    skipLogin: state => {
      state.isSkipped = true;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    // Logout action
    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isSkipped = false;
      state.error = null;
    },
    // Clear error
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Login pending
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      // Login fulfilled
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isSkipped = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      // Login rejected
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

// Export actions
export const {skipLogin, logout, clearError} = authSlice.actions;

// Export selectors
export const selectAuth = state => state.auth;
export const selectIsAuthenticated = state => state.auth.isAuthenticated;
export const selectIsSkipped = state => state.auth.isSkipped;
export const selectUser = state => state.auth.user;
export const selectToken = state => state.auth.token;
export const selectAuthLoading = state => state.auth.loading;
export const selectAuthError = state => state.auth.error;

// Export reducer
export default authSlice.reducer;
