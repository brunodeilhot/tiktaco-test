import { AddPhotoAlternateRounded, CloseRounded } from "@mui/icons-material";
import { Fab, Grid, IconButton, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Props {
  desktop?: boolean;
}

const Header: React.FC<Props> = ({ desktop }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const tempPicture = watch("picture") ?? [];
  const [currentPicture, setPicture] = useState<string>(process.env.REACT_APP_IMAGE_PLACEHOLDER);

  const changePicture = tempPicture[0];

  useEffect(() => {
    if (changePicture === undefined) {
      return;
    }

    setPicture(URL.createObjectURL(changePicture));
  }, [changePicture]);

  const navigate = useNavigate();
  const handleReturn = () => navigate(-1);
  return (
    <Grid
      container
      item
      flexDirection="column"
      flexWrap="nowrap"
      justifyContent={desktop ? "flex-end" : "space-between"}
      alignItems="flex-end"
      minHeight="30vh"
      bgcolor="text.secondary"
      borderBottom="5px solid"
      borderColor="primary.main"
      sx={{
        background: `url(${currentPicture}) no-repeat`,
        backgroundColor: "background.default",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!desktop && (
        <Fab
          aria-label="close"
          onClick={handleReturn}
          sx={{ backgroundColor: "background.default", mr: 2, mt: 3, p: 0.5 }}
        >
          <CloseRounded color="primary" sx={{ fontSize: 40 }} />
        </Fab>
      )}

      <Grid container item justifyContent="flex-end" alignItems="center">
        <Grid item>
          {errors.picture?.message && (
            <Typography pb={2} variant="body1" color="error">
              {errors.picture.message}
            </Typography>
          )}
        </Grid>
        <Grid component="label" htmlFor="upload-image" item pr={2} pb={1}>
          <Input
            sx={{ display: "none" }}
            type="file"
            id="upload-image"
            {...register("picture")}
          />
          <IconButton aria-label="upload picture" component="span">
            <AddPhotoAlternateRounded color="primary" fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
