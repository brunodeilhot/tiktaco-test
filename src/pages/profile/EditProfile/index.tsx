import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronLeftRounded } from "@mui/icons-material";
import { Button, Drawer, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import CustomTextField from "../../createRecipe/CustomTextField";
import Loading from "../../../components/Loading";
import { IUser } from "../../../models/user";
import { updateSchema } from "../../../models/userForm";
import { v4 as uuid } from "uuid";
import EditAvatar from "./EditAvatar";
import services from "../../../services";
import { updateStoredUser } from "../../../store/userSlice";
import { useAppDispatch } from "../../../hooks";

type FormData = {
  name: string;
  email: string;
  username: string;
  picture?: FileList;
  bio?: string;
};

interface Props {
  editProfile: boolean;
  returnToProfile: () => void;
  user: IUser;
}

const EditProfile: React.FC<Props> = ({
  editProfile,
  returnToProfile,
  user,
}) => {
  const dispatch = useAppDispatch();
  const { updateUser, uploadUserImage } = services;

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const methods = useForm<FormData>({
    resolver: yupResolver(updateSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
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
      _id: user._id,
      picture: tempFile ? imageName : tempFile,
    };

    const formData = new FormData();
    tempFile && formData.append("file", tempFile, imageName);

    setLoading(true);

    tempFile && uploadUserImage(formData);

    updateUser(updatedUser).then(() => {
      dispatch(
        updateStoredUser({
          ...user,
          name: data.name ?? user.name,
          username: data.username ?? user.username,
          picture: imageName ?? user.picture,
          bio: data.bio ?? user.bio,
        })
      );
      setLoading(false);
      returnToProfile();
    });
  };

  if (loading)
    return (
      <Drawer anchor="right" open={editProfile} onClose={returnToProfile}>
        <Loading />
      </Drawer>
    );

  return (
    <Drawer anchor="right" open={editProfile} onClose={returnToProfile} >
      <Grid
        container
        width={desktop ? "30vw" : "100vw"}
        flexDirection="column"
        flexWrap="nowrap"
        alignItems="center"
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
          <Grid item position="absolute" left={0}>
            <IconButton onClick={returnToProfile}>
              <ChevronLeftRounded
                fontSize="large"
                sx={{ color: "text.primary" }}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h6" component="h1">
              Edit Profile
            </Typography>
          </Grid>
        </Grid>
        <FormProvider {...methods}>
          <EditAvatar picture={user.picture} />
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
    </Drawer>
  );
};

export default EditProfile;
