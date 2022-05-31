import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "./Header";
import CustomTextField from "./CustomTextField";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import DietOptions from "./DietOptions";
import services from "../../services";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Loading from "../../components/Loading";
import { schema } from "../../models/recipeForm";
import { Ingredient } from "../../models/recipe";
import useAuth from "../../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../../hooks";
import NavDesktop from "../home/NavDesktop";
import { updateDiscovActRec } from "../../store/feedSlice";

type FormData = {
  title: string;
  time: number;
  servings: number;
  ingredients: Ingredient[];
  steps: Step[];
  picture: FileList;
  diet: string[];
};

export interface Step {
  step: string;
}

const CreateRecipe: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const { createRecipe, uploadRecipeImage } = services;

  !isAuthenticated && navigate("/");

  const { user } = useAppSelector((state) => state.user);

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const instructions = data.steps.map((step) => step.step);
    const fileType = data.picture[0].name.split(".");
    const diets = data.diet && data.diet.filter((diet) => diet !== "");

    const uniqueId = uuid();
    const imageName = `${uniqueId}.${fileType[fileType.length - 1]}`;

    const recipe = {
      ...data,
      picture: imageName,
      steps: instructions,
      user: user._id,
      diet: diets,
    };

    const formData = new FormData();
    formData.append("file", data.picture[0], imageName);

    setLoading(true);

    uploadRecipeImage(formData);

    createRecipe(recipe).then(() => {
      setLoading(false);
      dispatch(updateDiscovActRec(0));
      navigate("/");
    });
  };

  if (loading) return <Loading />;

  return (
    <Grid container paddingX={desktop ? "30%" : 0}>
      <FormProvider {...methods}>
        <Header desktop={desktop} />
        <Grid
          container
          flexDirection="column"
          flexWrap="nowrap"
          component="form"
          padding={4}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container item flexWrap="nowrap" pb={3}>
            <Grid
              container
              item
              xs={7}
              flexWrap="nowrap"
              alignItems="center"
              pr={4}
            >
              <CustomTextField
                type="tel"
                name="time"
                label="Cook Time"
                error={errors.time}
                endAdornment={
                  <Typography color="primary" variant="body1">
                    minutes
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={5}>
              <CustomTextField
                type="tel"
                name="servings"
                label="Servings"
                error={errors.servings}
              />
            </Grid>
          </Grid>
          <Grid item alignSelf="center" pb={3} width="100%">
            <CustomTextField name="title" label="Title" error={errors.title} />
          </Grid>
          <DietOptions />
          <Ingredients />
          <Instructions />
          <Grid item alignSelf="center" paddingY={2}>
            <Button
              variant="contained"
              size="large"
              sx={{
                borderRadius: 10,
                textTransform: "uppercase",
                color: "background.paper",
                "&:hover": {
                  backgroundColor: "primary.main",
                },
              }}
              type="submit"
            >
              publish
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
      {desktop && <NavDesktop />}
    </Grid>
  );
};

export default CreateRecipe;
