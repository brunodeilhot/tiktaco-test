import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Loading from "../../components/Loading";
import { useAppDispatch } from "../../hooks";
import useAuth from "../../hooks/useAuth";
import { createSchema } from "../../models/userForm";
import services from "../../services";
import { updateStoredUser } from "../../store/userSlice";
import CustomTextField from "../createRecipe/CustomTextField";
import EditAvatar from "../profile/EditProfile/EditAvatar";

type FormData = {
  name: string;
  email: string;
  username: string;
  picture?: FileList;
  bio?: string;
};

const CreateProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { createUser, uploadUserImage } = services;
  const { isAuthenticated, halfAuth, user } = useAuth();

  !isAuthenticated && navigate("/");
  isAuthenticated && !halfAuth && navigate("/");

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const methods = useForm<FormData>({
    resolver: yupResolver(createSchema),
    defaultValues: {
      email: user && user.email,
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const uniqueId = uuid();
    const tempFile =
      data.picture && data.picture.length !== 0 ? data.picture[0] : undefined;
    const fileType = tempFile && tempFile.name.split(".");
    const imageName =
      tempFile && fileType && `${uniqueId}.${fileType[fileType.length - 1]}`;

    const updatedUser = {
      ...data,
      picture: imageName,
    };

    const formData = new FormData();
    tempFile && formData.append("file", tempFile, imageName);

    setLoading(true);

    tempFile && uploadUserImage(formData);

    createUser(updatedUser).then((response) => {
      dispatch(updateStoredUser(response));
      setLoading(false);
      navigate("/profile");
    });
  };

  if (loading) return <Loading />;

  return (
    <Grid
      container
      width="100vw"
      flexDirection="column"
      flexWrap="nowrap"
      alignItems="center"
      paddingX={desktop ? "30%" : 0}
    >
      <Grid
        container
        item
        justifyContent="center"
        alignItems="center"
        minHeight={60}
        position="relative"
        mb={2}
      >
        <Grid item>
          <Typography variant="h6" component="h1">
            Create Profile
          </Typography>
        </Grid>
      </Grid>
      <FormProvider {...methods}>
        <EditAvatar />
        <Grid
          component="form"
          container
          item
          maxWidth="80%"
          flexDirection="column"
          flexWrap="nowrap"
          paddingY={4}
          gap={4}
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomTextField name="name" label="Name" error={errors.name} />
          <CustomTextField disabled name="email" label="Email" />
          <CustomTextField
            name="username"
            label="@username"
            error={errors.username}
            startAdornment={
              <Typography color="primary" variant="body1">
                @
              </Typography>
            }
          />
          <CustomTextField
            multiline
            name="bio"
            label="Bio"
            error={errors.bio}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ color: "background.default", mt: 4 }}
          >
            Save
          </Button>
        </Grid>
      </FormProvider>
    </Grid>
  );
};

export default CreateProfile;
