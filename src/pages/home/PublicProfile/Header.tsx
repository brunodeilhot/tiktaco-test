import { ChevronLeftRounded } from "@mui/icons-material";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";

interface Props {
  name: string;
  username: string;
  picture: string;
  returnToHome: (event: React.SyntheticEvent, id?: string) => void;
}

const Header: React.FC<Props> = ({ name, username, picture, returnToHome }) => {
  return (
    <Grid container>
      <Grid
        container
        item
        flexWrap="nowrap"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <Grid item position="absolute" left={0}>
          <IconButton onClick={returnToHome}>
            <ChevronLeftRounded
              fontSize="large"
              sx={{ color: "text.primary" }}
            />
          </IconButton>
        </Grid>
        <Grid item padding={3}>
          <Typography
            variant="h5"
            component="h1"
            color="primary"
            fontWeight={700}
          >
            {name}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        flexDirection="column"
        flexWrap="nowrap"
        alignItems="center"
      >
        <Grid item>
          <Avatar
            alt={name}
            src={`${process.env.REACT_APP_AVATAR_IMAGE_PATH}/${picture}`}
            sx={{
              width: 90,
              height: 90,
              border: "3px solid",
              borderColor: "primary.main",
            }}
          />
        </Grid>
        <Grid item pt={1}>
          <Typography variant="body2" color="primary">
            @{username}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
