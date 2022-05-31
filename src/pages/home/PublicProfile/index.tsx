import { Drawer, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Loading from "../../../components/Loading";
import RecipeDetails from "../../../components/RecipeDetails";
import useUserInfo from "../../../hooks/useUserInfo";
import Meta from "../../profile/Meta";
import RecipeList from "../../profile/RecipeList";
import Header from "./Header";

interface Props {
  returnToHome: (event: React.SyntheticEvent, id?: string) => void;
  publicProfile: boolean;
  publicUser: string | undefined;
}

const PublicProfile: React.FC<Props> = ({
  publicProfile,
  returnToHome,
  publicUser,
}) => {
  const user = useUserInfo(publicUser);

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

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

  if (!user)
    return (
      <Drawer anchor="right" open={publicProfile} onClose={returnToHome}>
        <Loading />
      </Drawer>
    );

  return (
    <Drawer anchor="right" open={publicProfile} onClose={returnToHome}>
      <Grid container flexDirection="column" flexWrap="nowrap" width={desktop ? "27vw" : "100vw"}>
        <Header
          name={user.name}
          username={user.username}
          picture={user.picture}
          returnToHome={returnToHome}
        />
        <Meta user={user._id} meta={user.meta} />
        {/* <Grid item alignSelf="center">
          <Button>follow</Button>
        </Grid> */}
        <Grid item p={3} alignSelf="center">
          <Typography variant="body2">{user.bio}</Typography>
        </Grid>
        <RecipeList
          userId={user._id}
          listType={"recipes"}
          handleOpen={handleOpen}
        />
        {recipeId && (
          <RecipeDetails
            open={open}
            handleClose={handleClose}
            recipeId={recipeId}
          />
        )}
      </Grid>
    </Drawer>
  );
};

export default PublicProfile;
