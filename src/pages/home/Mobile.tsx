import { Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel } from "swiper";
import ActionButtons from "../../components/ActionButtons";
import FeedTabs from "../../components/FeedTabs";
import NoFollows from "../../components/NoFollows";
import { useAppDispatch } from "../../hooks";
import useViewHeight from "../../hooks/useViewHeight";
import { IRecipePreview } from "../../models/recipe";
import PublicProfile from "./PublicProfile";
import Recipe from "./Recipe";
import { updateFollowActRec, updateDiscovActRec } from "../../store/feedSlice";
import { Dispatch, SetStateAction } from "react";

interface Props {
  feed: number;
  changeFeed: (_event: React.SyntheticEvent, newFeed: number) => void;
  recipes: IRecipePreview[];
  followActiveRecipe: number;
  discovActiveRecipe: number;
  setToggle: Dispatch<SetStateAction<boolean>>;
  returnToHome: (event: React.SyntheticEvent, id?: string) => void;
  publicProfile: boolean;
  publicUser: string | undefined;
}

const Mobile: React.FC<Props> = ({
  feed,
  changeFeed,
  recipes,
  followActiveRecipe,
  discovActiveRecipe,
  setToggle,
  returnToHome,
  publicProfile,
  publicUser,
}) => {
  const dispatch = useAppDispatch();

  /**
   * Hook responsible for maintaining the correct inner height of the feed
   */
  const { viewHeight } = useViewHeight();

  return (
    <Grid container>
      <FeedTabs feed={feed} changeFeed={changeFeed} />

      {recipes.length === 0 && feed === 0 && <NoFollows />}

      {recipes.length > 0 && (
        <Swiper
          style={{ width: "100%" }}
          height={viewHeight}
          modules={[Keyboard, Mousewheel]}
          direction={"vertical"}
          keyboard
          mousewheel
          onRealIndexChange={(swiper) => {
            setTimeout(() => {
              dispatch(
                feed === 0
                  ? updateFollowActRec(swiper.activeIndex)
                  : updateDiscovActRec(swiper.activeIndex)
              );
            }, 100);
          }}
          initialSlide={feed === 0 ? followActiveRecipe : discovActiveRecipe}
          observer
          onObserverUpdate={(swiper) => {
            feed === 0
              ? swiper.slideTo(followActiveRecipe, 0, true)
              : swiper.slideTo(discovActiveRecipe, 0, true);
          }}
        >
          {recipes.map((recipe: IRecipePreview) => (
            <SwiperSlide key={recipe._id}>
              <Recipe
                recipe={recipe}
                setToggle={setToggle}
                returnToHome={returnToHome}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <PublicProfile
        returnToHome={returnToHome}
        publicProfile={publicProfile}
        publicUser={publicUser}
      />
      <ActionButtons />
    </Grid>
  );
};

export default Mobile;
