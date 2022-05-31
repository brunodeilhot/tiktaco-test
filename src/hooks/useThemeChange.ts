import { useAppDispatch } from "./index";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { changeTheme } from "../store/themeSlice";

const useThemeChange = () => {
  const dispatch = useAppDispatch();
  const preferedMode = useMediaQuery("(prefers-color-scheme: dark)");
  const storedMode = localStorage.getItem("darkMode");
  const storedDarkMode = storedMode ? JSON.parse(storedMode) === true : null;

  const [darkMode, setDarkMode] = useState<boolean>(
    storedDarkMode ?? preferedMode
  );

  useEffect(() => {
    dispatch(changeTheme(darkMode));
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode, dispatch]);

  return { setDarkMode };
};

export default useThemeChange;
