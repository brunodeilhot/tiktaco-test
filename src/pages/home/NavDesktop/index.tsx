import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import NavList from "./NavList";
import Logo from "../../../assets/Logo.svg";

const NavDesktop: React.FC = () => {
  const theme = useTheme();
  const desktopLarge = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Grid
      container
      item
      position="absolute"
      top="10%"
      left={desktopLarge ? "13%" : "8%"}
      maxWidth={200}
      flexDirection="column"
      flexWrap="nowrap"
    >
      <Grid container flexDirection="column" alignItems="center">
        <Box
          component="img"
          height={75}
          width={125}
          src={Logo}
          alt="whatsinmypantry smiling taco logo"
        />
        <Typography variant="h5" component="h2" paddingY={1}>
          TikTaco
        </Typography>
      </Grid>
      <Box component="nav" role="navigation">
        <NavList />
      </Box>
    </Grid>
  );
};

export default NavDesktop;
