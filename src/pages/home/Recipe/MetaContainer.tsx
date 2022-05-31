import { Grid } from "@mui/material";
import { IRecipeMeta } from "../../../models/recipe";
import { IUserMeta, IUserPreview } from "../../../models/user";
import FavoritesBt from "./FavoritesBt";
import LikesBt from "./LikesBt";
import ProfileBt from "./ProfileBt";

interface Props {
  toggleLike: (
    e: React.SyntheticEvent,
    recipeId: string,
    recipeIsLiked: number
  ) => void;
  handleOpen: () => void;
  handleClickAvatar: (e: React.SyntheticEvent) => void;
  toggleFollow: (
    e: React.SyntheticEvent,
    userId: string,
    userIsFollowed: number
  ) => void;
  recipeId: string;
  user: IUserPreview;
  avatarPath: string;
  recipesLiked: IRecipeMeta[];
  totalLikes: number;
  recipesStarred: IRecipeMeta[];
  toggleStar: (
    e: React.SyntheticEvent,
    recipeId: string,
    recipeIsLiked: number
  ) => void;
  usersFollowed: IUserMeta[];
  activeUser: string;
}

const MetaContainer: React.FC<Props> = ({
  handleOpen,
  handleClickAvatar,
  recipeId,
  user,
  avatarPath,
  toggleFollow,
  usersFollowed,
  activeUser,
  recipesLiked,
  totalLikes,
  toggleLike,
  recipesStarred,
  toggleStar,
}) => {
  const { _id, username, picture } = user;
  return (
    <Grid
      xs={3}
      container
      item
      flexDirection="column"
      flexWrap="nowrap"
      alignItems="center"
      gap={1}
      pl={1}
      justifyContent="flex-end"
      height="100%"
    >
      <Grid item width="100%" height="100%" onClick={handleOpen}></Grid>
      <ProfileBt
        handleClickAvatar={handleClickAvatar}
        userId={_id}
        username={username}
        picture={picture}
        avatarPath={avatarPath}
        toggleFollow={toggleFollow}
        usersFollowed={usersFollowed}
        activeUser={activeUser}
      />
      <LikesBt
        recipeId={recipeId}
        recipesLiked={recipesLiked}
        totalLikes={totalLikes}
        toggleLike={toggleLike}
      />
      <FavoritesBt
        recipeId={recipeId}
        recipesStarred={recipesStarred}
        toggleStar={toggleStar}
      />
    </Grid>
  );
};

export default MetaContainer;
