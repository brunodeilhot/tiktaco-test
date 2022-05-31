import {
  Button,
  Grid,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../components/ActionButtons";
import RecipeDetails from "../../components/RecipeDetails";
import { useAppSelector } from "../../hooks";
import useAuth from "../../hooks/useAuth";
import NavDesktop from "../home/NavDesktop";
import EditProfile from "./EditProfile";
import Header from "./Header";
import Meta from "./Meta";
import ProfileFeedTab from "./ProfileFeedTab";
import RecipeList from "./RecipeList";
import SettingsMenu from "./SettingsMenu";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, halfAuth } = useAuth();

  !isAuthenticated && navigate("/");
  isAuthenticated && halfAuth && navigate("/create-profile");

  const { user } = useAppSelector((state) => state.user);

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  /**
   * State and handle function responsible for the tab menu
   */
  const [tabValue, setTabValue] = useState("recipes");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  /**
   * State and handle functions responsible for the recipe details modal
   */
  const [open, setOpen] = useState<boolean>(false);
  const [recipeId, setRecipeId] = useState<string>();

  const handleOpen = (id: string) => {
    setRecipeId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /**
   * State and handle function responsible for the edit profile drawer
   */

  const [editProfile, setEditProfile] = useState<boolean>(false);

  const returnToProfile = () => setEditProfile(!editProfile);

  /**
   * State and handle functions responsible for the settings drawer
   */

  const [settings, setSettings] = useState<boolean>(false);

  const toggleSettings = () => setSettings(!settings);

  return (
    <Grid
      container
      flexDirection="column"
      flexWrap="nowrap"
      paddingX={desktop ? "30%" : 0}
    >
      <Header
        name={user.name}
        username={user.username}
        picture={user.picture}
        toggleSettings={toggleSettings}
      />
      <Meta user={user._id} meta={user.meta} />
      <Grid item alignSelf="center">
        <Button
          onClick={returnToProfile}
          variant="outlined"
          sx={{ borderRadius: 10, textTransform: "uppercase", fontSize: 10 }}
        >
          edit profile
        </Button>
      </Grid>
      <Grid item p={3} alignSelf="center">
        <Typography variant="body2">{user.bio}</Typography>
      </Grid>
      <ProfileFeedTab handleTabChange={handleTabChange} tabValue={tabValue} />
      <RecipeList
        userId={user._id}
        listType={tabValue}
        handleOpen={handleOpen}
      />
      {recipeId && (
        <RecipeDetails
          open={open}
          handleClose={handleClose}
          recipeId={recipeId}
        />
      )}
      <EditProfile
        returnToProfile={returnToProfile}
        editProfile={editProfile}
        user={user}
      />
      <SettingsMenu toggleSettings={toggleSettings} settings={settings} />
      <Toolbar />
      {!desktop && <ActionButtons />}
      {desktop && <NavDesktop />}
    </Grid>
  );
};

export default Profile;
