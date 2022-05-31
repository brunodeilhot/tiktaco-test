import { DeleteForeverRounded } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";
import CustomTextField from "./CustomTextField";

interface Props {}

const Ingredients: React.FC<Props> = () => {
  const {
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
  });

  const handleClick = () => {
    append({});
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <Grid container item width="100%" flexDirection="column" flexWrap="nowrap">
      <Typography
        variant="h4"
        component="h2"
        color="primary"
        fontWeight={700}
        pb={3}
      >
        Ingredients
      </Typography>
      {errors.ingredients?.message && (
        <Typography pb={2} variant="body1" color="error">
          {errors.ingredients.message}
        </Typography>
      )}
      <Grid container item>
        {fields.map((field, index) => (
          <Grid
            key={field.id}
            container
            item
            flexWrap="nowrap"
            pb={2}
            alignItems="center"
          >
            <Grid container item xs={7} pr={3}>
              <CustomTextField
                name={`ingredients.${index}.name`}
                label="Ingredient"
                error={
                  !errors.ingredients ||
                  typeof errors.ingredients[index] === "undefined"
                    ? false
                    : errors.ingredients[index].name
                }
              />
            </Grid>
            <Grid container item xs={4}>
              <CustomTextField
                name={`ingredients.${index}.quantity`}
                label="Quantity"
                error={
                  !errors.ingredients ||
                  typeof errors.ingredients[index] === "undefined"
                    ? false
                    : errors.ingredients[index].quantity
                }
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                color="primary"
                size="small"
                onClick={() => handleRemove(index)}
              >
                <DeleteForeverRounded />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Button
        onClick={handleClick}
        variant="outlined"
        sx={{
          borderRadius: 10,
          textTransform: "uppercase",
          fontSize: 10,
        }}
      >
        add ingredient
      </Button>
    </Grid>
  );
};

export default Ingredients;
