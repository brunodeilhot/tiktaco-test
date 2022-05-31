import { FavoriteRounded } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import LikeBorder from "../../../icons/LikeBorder";
import { IRecipeMeta } from "../../../models/recipe";

interface Props {
  recipeId: string;
  recipesLiked: IRecipeMeta[];
  totalLikes: number;
  toggleLike: (e: React.SyntheticEvent, recipeId: string, recipeIsLiked: number) => void;
}

const LikesBt: React.FC<Props> = ({
  recipeId,
  recipesLiked,
  totalLikes,
  toggleLike,
}) => {
  const recipeIsLiked = recipesLiked.findIndex(
    (r: IRecipeMeta) => r.recipe === recipeId
  );

  return (
    <IconButton
      onClick={(e) => toggleLike(e, recipeId, recipeIsLiked)}
      sx={{ position: "relative", paddingBottom: 2.5 }}
    >
      {recipeIsLiked === -1 ? (
        <FavoriteRounded sx={{ fontSize: 40, color: "#FAFAFA" }} />
      ) : (
        <LikeBorder sx={{ fontSize: 40 }} />
      )}

      <Typography
        variant="body2"
        component="span"
        position="absolute"
        top={50}
        fontWeight={700}
        sx={{
          color: "#FAFAFA",
          textShadow: "0px 3px 3px rgba(0, 0, 0, 0.25)",
        }}
      >
        {totalLikes}
      </Typography>
    </IconButton>
  );
};

export default LikesBt;
