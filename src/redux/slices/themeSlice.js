import {createSlice} from '@reduxjs/toolkit';
import {lightTheme, darkTheme} from '../../constants/theme';

const initialState = {
  isDarkMode: false,
  theme: lightTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.isDarkMode = !state.isDarkMode;
      state.theme = state.isDarkMode ? darkTheme : lightTheme;
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
      state.theme = action.payload ? darkTheme : lightTheme;
    },
  },
});

export const {toggleTheme, setDarkMode} = themeSlice.actions;
export const selectTheme = state => state.theme.theme;
export const selectIsDarkMode = state => state.theme.isDarkMode;
export default themeSlice.reducer;
