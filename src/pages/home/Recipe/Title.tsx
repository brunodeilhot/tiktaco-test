import { Grid, Typography } from "@mui/material";

interface Props {
  title: string;
}

const Title: React.FC<Props> = ({ title }) => (
  <Grid
    xs={9}
    container
    item
    flexDirection="column"
    flexWrap="nowrap"
    paddingLeft={4}
    justifyContent="flex-end"
    height="100%"
    sx={{ textDecoration: "none" }}
  >
    <Typography
      component="h1"
      variant="h4"
      fontWeight={700}
      sx={{
        color: "#FAFAFA",
        textShadow: "0px 3px 3px rgba(0, 0, 0, 0.25)",
      }}
    >
      {title}
    </Typography>
    <Typography
      pt={2}
      mb={0}
      paragraph
      textTransform="uppercase"
      fontWeight={700}
      sx={{
        fontSize: 12,
        color: "#FAFAFA",
        textShadow: "0px 3px 3px rgba(0, 0, 0, 0.25)",
      }}
    >
      view recipe step by step
    </Typography>
  </Grid>
);

export default Title;
