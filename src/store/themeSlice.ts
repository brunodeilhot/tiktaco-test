import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  dark: boolean;
}

const initialState: ThemeState = {
  dark: false
};

export const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state: ThemeState, action: PayloadAction<boolean>) => {
      state.dark = action.payload;
    }
  },
});

export const {
  changeTheme
} = ThemeSlice.actions;

export default ThemeSlice.reducer;