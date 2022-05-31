import {
  AddBoxRounded,
  HomeRounded,
  PersonRounded,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks";
import useAuth from "../../../hooks/useAuth";
import { updateDialogStatus } from "../../../store/loginDialogSlice";

const NavList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, halfAuth } = useAuth();

  const iconColor = "primary.main";

  const navList = [
    {
      name: "Create",
      icon: <AddBoxRounded sx={{ fontSize: "55px", color: iconColor }} />,
      link: "/create",
    },
    {
      name: "Home",
      icon: <HomeRounded sx={{ ml: 2, color: iconColor }} />,
      link: "/",
    },
    {
      name: "Profile",
      icon: <PersonRounded sx={{ ml: 2, color: iconColor }} />,
      link: "/profile",
    },
  ];

  const handleClick = () => {
    if (!isAuthenticated) return dispatch(updateDialogStatus(true));
    if (isAuthenticated && halfAuth) navigate("/create-profile");
  };

  return (
    <List>
      {navList.map((item) => (
        <ListItem divider={false} disablePadding key={item.name}>
          <ListItemButton
            onClick={handleClick}
            component={Link}
            to={!isAuthenticated ? "/" : item.link}
            sx={{ width: "100%" }}
          >
            {item.icon === null ? null : (
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            )}
            <ListItemText
              primary={item.name}
              primaryTypographyProps={{ align: "right" }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default NavList;
