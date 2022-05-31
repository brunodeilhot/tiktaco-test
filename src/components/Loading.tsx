import { Box, CircularProgress, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import useViewHeight from "../hooks/useViewHeight";
import Logo from "../assets/Logo.svg";

const Loading: React.FC = () => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const { viewHeight } = useViewHeight();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      flexWrap="nowrap"
      height={viewHeight}
      width={desktop ? "30vw" : "100vw"}
      sx={{ backgroundColor: "background.default" }}
    >
      <Grid item>
        <Box
          component="img"
          width={170}
          height={106}
          src={Logo}
          alt="Large whatsinmypantry smiling taco logo"
        />
      </Grid>
      <Grid item>
        <Typography variant="h1">TikTaco</Typography>
      </Grid>
      <Grid item mt={10}>
        <CircularProgress size={150} color="primary" />
      </Grid>
    </Grid>
  );
};

export default Loading;
