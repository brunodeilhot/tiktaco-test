import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import LoginDialog from "./components/LoginDialog";
import { useAppSelector } from "./hooks";
import useThemeChange from "./hooks/useThemeChange";
import { responsiveDarkTheme, responsiveLightTheme } from "./Theme";

const App = () => {
  useThemeChange();
  const { dark } = useAppSelector((state) => state.theme);

  return (
    <ThemeProvider theme={dark ? responsiveDarkTheme : responsiveLightTheme}>
      <CssBaseline />
      <Outlet />
      <LoginDialog />
    </ThemeProvider>
  );
};
export default App;
