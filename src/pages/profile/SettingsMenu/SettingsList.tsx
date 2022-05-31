import { useAuth0 } from "@auth0/auth0-react";
import { LogoutRounded } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const SettingsList = () => {
  const { logout } = useAuth0();

  const fontColor = "#383A47";

  const navList = [
    {
      name: "Logout",
      icon: <LogoutRounded sx={{ color: fontColor }}/>,
      link: "logout",
    },
  ];

  return (
    <List>
      {navList.map((item) => (
        <ListItem
          divider
          disablePadding
          key={item.name}
          sx={{ width: "100%", borderColor: fontColor }}
        >
          {item.link !== "logout" ? (
            <ListItemButton
              component={Link}
              to={item.link}
              sx={{ width: "100%", paddingX: 2 }}
            >
              {item.icon === null ? null : (
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              )}
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ color: fontColor, align: "right" }}
              />
            </ListItemButton>
          ) : (
            <ListItemButton
              onClick={() => logout({ returnTo: process.env.REACT_APP_HOSTNAME })}
              sx={{ width: "100%", paddingX: 2 }}
            >
              {item.icon === null ? null : (
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              )}
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ align: "right", sx: { color: fontColor } }}
              />
            </ListItemButton>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default SettingsList;
