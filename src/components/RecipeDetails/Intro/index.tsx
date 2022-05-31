import { Grid, Typography } from "@mui/material";
import DietIcons from "./DietIcons";
import Info from "./Info";

interface Props {
  title: string;
  time: number;
  servings: number;
  diet: string[];
}

const Intro: React.FC<Props> = ({
  title,
  time,
  servings,
  diet
}) => (
  <Grid container item pt={2.5}>
    <Info time={time} servings={servings} />
    <Typography
      variant="h3"
      component="h2"
      id="recipe-details-title"
      pt={5}
      pb={1}
      fontWeight={700}
    >
      {title}
    </Typography>
    <DietIcons
      diet={diet}
    />
  </Grid>
);

export default Intro;
