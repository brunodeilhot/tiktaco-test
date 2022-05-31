import {
  Dialog,
  Fade,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Header from "./Header";
import Intro from "./Intro";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import Footer from "./Footer";
import Loading from "../Loading";
import useRecipeDetails from "../../hooks/useRecipeDetails";

interface Props {
  open: boolean;
  handleClose: () => void;
  recipeId: string;
}

const RecipeDetails: React.FC<Props> = ({ open, handleClose, recipeId }) => {
  const recipeDetails = useRecipeDetails(recipeId);

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  if (recipeDetails === null) return <Loading />;
  // Destructuring of the recipe details data received from the api
  const { title, picture, diet, servings, time, ingredients, steps, user } =
    recipeDetails;

  return (
    <Dialog
      aria-labelledby="recipe-details-title"
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
      transitionDuration={800}
      fullScreen={!desktop}
      hideBackdrop={!desktop}
      PaperProps={{
        sx: {
          maxWidth: desktop ? "40%" : "100%",
          maxHeight: desktop ? "90%" : "100%",
          width: desktop ? "40%" : "100%",
          height: desktop ? "90%" : "100%",
          borderRadius: desktop ? "20px" : 0,
        },
      }}
    >
      <Grid container>
        <Grid container item>
          <Header handleTransition={handleClose} picture={picture} />
        </Grid>
        <Grid
          container
          item
          direction="column"
          alignItems="stretch"
          pl={2.5}
          pr={2.5}
        >
          <Intro title={title} time={time} servings={servings} diet={diet} />
          <Ingredients ingredients={ingredients} />
          <Instructions steps={steps} />
          <Footer username={user.username} id={user._id} />
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default RecipeDetails;
