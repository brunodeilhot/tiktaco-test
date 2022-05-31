import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Logo from "../../assets/Logo.svg";

interface Props {
  steps: string[];
}

const Instructions: React.FC<Props> = ({ steps }) => {
  return (
    <Grid container item direction="column" pt={3}>
      <Typography variant="h4" component="h2" color="primary" fontWeight={700}>
        Instructions
      </Typography>
      <List dense>
        {steps.map((step, index) => (
          <ListItem key={index} disablePadding>
            <ListItemText
              primary={
                <>
                  <Typography fontWeight={700} display="inline">
                    {index + 1}
                    {". "}
                  </Typography>
                  <Typography display="inline">{step}</Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
      <Grid container item direction="column" alignItems="center" pt={3.5}>
        <Box
          component="img"
          sx={{ height: 35, width: 52 }}
          src={Logo}
          alt="whatsinmypantry smiling taco logo"
        />
        <Typography variant="h3" component="p" color="primary" fontWeight={700}>
          bon appétit!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Instructions;
