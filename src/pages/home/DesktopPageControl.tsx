import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import Mouse from "../../assets/mouse.svg";
import Keyboard from "../../assets/keyboard.svg";

const DesktopPageControl: React.FC = () => {
  const theme = useTheme();
  const desktopLarge = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Grid
      container
      item
      position="absolute"
      bottom="10%"
      right={desktopLarge ? "12%" : "6%"}
      maxWidth={200}
      flexDirection="column"
      flexWrap="nowrap"
      gap={3}
    >
      <Typography variant="h5">Page Controls</Typography>

      <Grid container item flexWrap="nowrap" gap={2} alignItems="center">
        <Grid item minWidth="50px">
          <Box
            component="img"
            height={41}
            width={28}
            src={Mouse}
            alt="whatsinmypantry smiling taco logo"
          />
        </Grid>

        <Typography variant="body2">
          You can use mouse{" "}
          <Typography component="span" fontWeight={700}>
            scroll wheel
          </Typography>{" "}
          to move between posts
        </Typography>
      </Grid>
      <Grid container item flexWrap="nowrap" gap={2} alignItems="center">
        <Grid item minWidth="50px">
          <Box
            component="img"
            height={28}
            width={40}
            src={Keyboard}
            alt="whatsinmypantry smiling taco logo"
          />
        </Grid>

        <Typography variant="body2">
          or use the keyboard{" "}
          <Typography component="span" fontWeight={700}>
            directional keys
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DesktopPageControl;
