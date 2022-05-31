import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { IRecipePreview } from "../../../models/recipe";
import RecipeDetails from "../../../components/RecipeDetails";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import services from "../../../services";
import Title from "./Title";
import MetaContainer from "./MetaContainer";
import useAuth from "../../../hooks/useAuth";
import { updateDialogStatus } from "../../../store/loginDialogSlice";

interface Props {
  recipe: IRecipePreview;
  setToggle: Dispatch<SetStateAction<boolean>>;
  returnToHome: (event: React.SyntheticEvent, id?: string) => void;
}

const Recipe: React.FC<Props> = ({ recipe, setToggle, returnToHome }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const userState = useAppSelector((state) => state.user);
  const { _id, title, picture, meta, user } = recipe;

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const {
    addLike,
    removeLike,
    addStar,
    removeStar,
    addFollower,
    removeFollower,
  } = services;

  const recipesLiked = userState.user.meta.rec_liked;
  const recipesStarred = userState.user.meta.rec_starred;
  const usersFollowed = userState.user.meta.following;

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickAvatar = (e: React.SyntheticEvent) => {
    returnToHome(e, user._id);
  };

  const toggleFollow = (
    _e: React.SyntheticEvent,
    userId: string,
    userIsFollowed: number
  ) => {
    if (!isAuthenticated) return dispatch(updateDialogStatus(true));

    userIsFollowed === -1
      ? addFollower(userState.user._id, userId).then(() =>
          setToggle((prevState) => !prevState)
        )
      : removeFollower(userState.user._id, userId).then(() =>
          setToggle((prevState) => !prevState)
        );
  };

  const toggleLike = (
    _e: React.SyntheticEvent,
    recipeId: string,
    recipeIsLiked: number
  ) => {
    if (!isAuthenticated) return dispatch(updateDialogStatus(true));

    recipeIsLiked === -1
      ? addLike(recipeId, userState.user._id).then(() =>
          setToggle((prevState) => !prevState)
        )
      : removeLike(recipeId, userState.user._id).then(() =>
          setToggle((prevState) => !prevState)
        );
  };

  const toggleStar = (
    _e: React.SyntheticEvent,
    recipeId: string,
    recipeIsStarred: number
  ) => {
    if (!isAuthenticated) return dispatch(updateDialogStatus(true));

    recipeIsStarred === -1
      ? addStar(userState.user._id, recipeId).then(() =>
          setToggle((prevState) => !prevState)
        )
      : removeStar(userState.user._id, recipeId).then(() =>
          setToggle((prevState) => !prevState)
        );
  };

  return (
    <Grid
      container
      width="100%"
      height="100%"
      flexDirection="column"
      justifyContent="flex-end"
      sx={{
        background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.5) 100%), url(${process.env.REACT_APP_RECIPE_IMAGE_PATH}/${picture})`,
        backgroundColor: "background.default",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid
        container
        flexWrap="nowrap"
        marginBottom={desktop ? "30px" : "76px"}
        zIndex="appBar"
        height="100%"
      >
        <Grid
          container
          item
          paddingLeft={desktop ? 2 : 0}
          paddingBottom={desktop ? 2 : 0}
          onClick={handleOpen}
        >
          <Title title={title} />
        </Grid>
        <MetaContainer
          handleOpen={handleOpen}
          handleClickAvatar={handleClickAvatar}
          toggleFollow={toggleFollow}
          recipeId={_id}
          user={user}
          avatarPath={process.env.REACT_APP_AVATAR_IMAGE_PATH}
          recipesLiked={recipesLiked}
          totalLikes={meta.totalLikes}
          toggleLike={toggleLike}
          toggleStar={toggleStar}
          recipesStarred={recipesStarred}
          usersFollowed={usersFollowed}
          activeUser={userState.user._id}
        />
      </Grid>
      <RecipeDetails open={open} handleClose={handleClose} recipeId={_id} />
    </Grid>
  );
};

export default Recipe;
