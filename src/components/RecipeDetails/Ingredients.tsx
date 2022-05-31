import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Ingredient } from "../../models/recipe";

interface Props {
  ingredients: Ingredient[];
}

const Ingredients: React.FC<Props> = ({ ingredients }) => {
  return (
    <Grid container item direction="column" pt={5}>
      <Typography variant="h4" component="h2" color="primary" fontWeight={700}>
        Ingredients
      </Typography>
      <List dense>
        {ingredients.map((ingredient, index) => (
          <ListItem key={index} disablePadding>
            <ListItemText
              primary={
                <>
                  <Typography fontWeight={700} display="inline">
                    {ingredient.quantity}
                  </Typography>
                  <Typography display="inline"> {ingredient.name}</Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default Ingredients;
