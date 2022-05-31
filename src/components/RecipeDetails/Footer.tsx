import { CopyrightRounded } from "@mui/icons-material";
import { Grid, Link, Typography } from "@mui/material";

interface Props {
  username: string;
  id: string;
}

const Footer: React.FC<Props> = ({ username, id }) => (
  <Grid item pt={3.5} mb={2}>
    <Typography
      variant="body1"
      component="p"
      display="flex"
      alignItems="center"
      sx={{ color: "text.secondary" }}
    >
      COPYRIGHT <CopyrightRounded fontSize="small" sx={{ marginX: 0.5 }} />
      Recipe by
      <Link target="_blank" underline="none" sx={{ ml: 0.5 }}>
        {username}
      </Link>
    </Typography>
  </Grid>
);

export default Footer;
