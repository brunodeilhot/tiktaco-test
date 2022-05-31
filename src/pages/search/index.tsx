import { useAuth0 } from "@auth0/auth0-react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../components/ActionButtons";

const Search = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  !isAuthenticated && navigate("/");

  return (
    <Grid>
      <div>Search Page</div>
      <ActionButtons />
    </Grid>
  );
};

export default Search;
