import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IMeta } from "../../models/user";
import services from "../../services";

interface Props {
  user: string;
  meta: IMeta;
}

const Meta: React.FC<Props> = ({ user, meta }) => {
  const { totalLikes } = services;
  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    totalLikes(user).then(
      (response) => typeof response === "number" && setLikes(response)
    );
  }, [totalLikes, user]);

  return (
    <Grid
      container
      flexWrap="nowrap"
      alignSelf="center"
      maxWidth="70%"
      pt={2}
      pb={2}
    >
      <Grid
        container
        item
        flexDirection="column"
        flexWrap="nowrap"
        alignItems="center"
      >
        <Grid item>
          <Typography color="primary" variant="h6" fontWeight={700}>
            {meta.following.length}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            following
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
          <Typography color="primary" variant="h6" fontWeight={700}>
            {meta.followers.length}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            followers
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
          <Typography color="primary" variant="h6" fontWeight={700}>
            {likes}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            likes
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Meta;
