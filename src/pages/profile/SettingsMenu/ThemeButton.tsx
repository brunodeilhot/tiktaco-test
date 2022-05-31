import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { Switch } from "@mui/material";
import { useAppSelector } from "../../../hooks";
import useThemeChange from "../../../hooks/useThemeChange";

const ThemeButton: React.FC = () => {
  const { setDarkMode } = useThemeChange();
  const { dark } = useAppSelector((state) => state.theme);

  const toggleMode = () => {
    setDarkMode(!dark);
  };

  const iconOptions = {
    fontSize: 30,
    padding: 0.5,
    marginTop: -0.7,
    backgroundColor: "#383A47",
    borderRadius: "50%",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
  };

  return (
    <Switch
      checked={dark}
      onChange={toggleMode}
      aria-label="theme mode"
      color="secondary"
      checkedIcon={<DarkModeRounded color="primary" sx={iconOptions} />}
      icon={<LightModeRounded color="primary" sx={iconOptions} />}
      sx={{ paddingBottom: 1.5, paddingTop: 1.5, width: 70 }}
    />
  );
};

export default ThemeButton;
