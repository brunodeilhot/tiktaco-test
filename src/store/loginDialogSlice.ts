import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginDialogState {
  open: boolean;
}

const initialState: LoginDialogState = {
  open: false
};

export const LoginDialogSlice = createSlice({
  name: "loginDialog",
  initialState,
  reducers: {
    updateDialogStatus: (state: LoginDialogState, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    }
  },
});

export const {
  updateDialogStatus
} = LoginDialogSlice.actions;

export default LoginDialogSlice.reducer;
