import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./feedSlice";
import loginDialogReducer from "./loginDialogSlice";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    loginDialog: loginDialogReducer,
    user: userReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
