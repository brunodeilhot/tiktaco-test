import { Avatar, Grid, IconButton, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  picture?: string;
}

const EditAvatar: React.FC<Props> = ({ picture }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const tempPicture = watch("picture") ?? [];
  const [currentPicture, setPicture] = useState<string>(
    picture
      ? `${process.env.REACT_APP_AVATAR_IMAGE_PATH}/${picture}`
      : process.env.REACT_APP_IMAGE_PLACEHOLDER
  );

  const changePicture = tempPicture[0];

  useEffect(() => {
    if (changePicture === undefined) {
      return;
    }

    setPicture(URL.createObjectURL(changePicture));
  }, [changePicture]);

  return (
    <Grid
      container
      item
      flexDirection="column"
      flexWrap="nowrap"
      alignItems="center"
    >
      <Grid
        container
        item
        component="label"
        flexDirection="column"
        flexWrap="nowrap"
        alignItems="center"
      >
        <Input
          sx={{ display: "none" }}
          type="file"
          id="upload-image"
          {...register("picture")}
        />
        <IconButton
          aria-label="upload avatar"
          component="span"
          sx={{ display: "flex", flexDirection: "column", flexWrap: "nowrap" }}
        >
          <Avatar
            alt="edit avatar"
            src={`${currentPicture}`}
            sx={{
              width: 90,
              height: 90,
              border: "3px solid",
              borderColor: "primary.main",
            }}
          />
          <Typography pt={1} sx={{ color: "text.primary" }}>
            Change picture
          </Typography>
        </IconButton>
      </Grid>

      {errors.picture?.message && (
        <Typography pb={2} variant="body1" color="error">
          {errors.picture.message}
        </Typography>
      )}
    </Grid>
  );
};

export default EditAvatar;
