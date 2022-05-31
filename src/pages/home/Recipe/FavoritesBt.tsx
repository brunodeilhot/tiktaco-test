import { StarRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import FavoriteBorder from "../../../icons/FavoriteBorder";
import { IRecipeMeta } from "../../../models/recipe";

interface Props {
  recipeId: string;
  recipesStarred: IRecipeMeta[];
  toggleStar: (
    e: React.SyntheticEvent,
    recipeId: string,
    recipeIsStarred: number
  ) => void;
}

const FavoritesBt: React.FC<Props> = ({
  recipeId,
  recipesStarred,
  toggleStar,
}) => {
  const recipeIsStarred = recipesStarred.findIndex(
    (r: IRecipeMeta) => r.recipe === recipeId
  );

  return (
    <IconButton onClick={(e) => toggleStar(e, recipeId, recipeIsStarred)}>
      {recipeIsStarred === -1 ? (
        <StarRounded sx={{ fontSize: 46, color: "#FAFAFA"  }} />
      ) : (
        <FavoriteBorder sx={{ fontSize: 46 }} />
      )}
    </IconButton>
  );
};

export default FavoritesBt;
