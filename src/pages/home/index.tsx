import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateActiveFeed } from "../../store/feedSlice";
import { updateDialogStatus } from "../../store/loginDialogSlice";
import Loading from "../../components/Loading";
import useUpdateMeta from "../../hooks/useUpdateMeta";
import useLoading from "../../hooks/useLoading";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Mobile from "./Mobile";
import Desktop from "./Desktop";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  /**
   * If user is authenticated but has not yet created a profile redirects to create profile page
   */
  const { user, isAuthenticated, halfAuth } = useAuth();
  isAuthenticated && halfAuth && navigate("/create-profile");

  const userEmail = user && user.email;

  /**
   * Calls hook to update the feed and user data if user is authenticated
   * and sends data to the redux store
   */
  const [toggle, setToggle] = useState(false);
  useUpdateMeta(userEmail, toggle);

  /**
   * States that represent the recipes of each feed (following and discover)
   * and also which current feed is selected
   */
  const feed = useAppSelector((state) => state.feed.activeFeed);
  const followActiveRecipe = useAppSelector(
    (state) => state.feed.discovActiveRecipe
  );
  const discovActiveRecipe = useAppSelector(
    (state) => state.feed.discovActiveRecipe
  );
  const recipes = useAppSelector((state) =>
    feed === 0 ? state.feed.followRecipes : state.feed.discovRecipes
  );

  const isLoadingFeed = useLoading(recipes.length);

  /**
   * Function responsible for changing between discover and following feed
   */
  const changeFeed = (_event: React.SyntheticEvent, newFeed: number) => {
    if (newFeed === 0 && !isAuthenticated) {
      dispatch(updateDialogStatus(true));
      return;
    }
    dispatch(updateActiveFeed(newFeed));
  };

  /**
   * Function and state management of public profile drawer
   */
  const [publicProfile, setPublicProfile] = useState<boolean>(false);
  const [publicUser, setPublicUser] = useState<string>();

  const returnToHome = (_event: React.SyntheticEvent, id?: string) => {
    setPublicProfile(!publicProfile);
    id && setPublicUser(id);
  };

  if (isLoadingFeed && feed === 1) return <Grid container justifyContent="center"><Loading /></Grid>;

  return (
    <>
      {desktop ? (
        <Desktop
          feed={feed}
          changeFeed={changeFeed}
          recipes={recipes}
          followActiveRecipe={followActiveRecipe}
          discovActiveRecipe={discovActiveRecipe}
          setToggle={setToggle}
          returnToHome={returnToHome}
          publicProfile={publicProfile}
          publicUser={publicUser}
        />
      ) : (
        <Mobile
          feed={feed}
          changeFeed={changeFeed}
          recipes={recipes}
          followActiveRecipe={followActiveRecipe}
          discovActiveRecipe={discovActiveRecipe}
          setToggle={setToggle}
          returnToHome={returnToHome}
          publicProfile={publicProfile}
          publicUser={publicUser}
        />
      )}
    </>
  );
};

export default Home;
