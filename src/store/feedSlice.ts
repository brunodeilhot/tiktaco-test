import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRecipePreview } from "../models/recipe";

export interface FeedState {
  followRecipes: IRecipePreview[];
  followActiveRecipe: number;
  discovRecipes: IRecipePreview[];
  discovActiveRecipe: number;
  activeFeed: number;
}

const initialState: FeedState = {
  followRecipes: [],
  followActiveRecipe: 0,
  discovRecipes: [],
  discovActiveRecipe: 0,
  activeFeed: 1,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    updateFollowActRec: (state: FeedState, action: PayloadAction<number>) => {
      state.followActiveRecipe = action.payload;
    },
    followAddRecipes: (state: FeedState, action: PayloadAction<IRecipePreview[]>) => {
      // state.followRecipes = state.followRecipes.concat(action.payload);
      state.followRecipes = action.payload;
    },
    updateDiscovActRec: (state: FeedState, action: PayloadAction<number>) => {
      state.discovActiveRecipe = action.payload;
    },
    discovAddRecipes: (state: FeedState, action: PayloadAction<IRecipePreview[]>) => {
      // state.discovRecipes = state.discovRecipes.concat(action.payload);
      state.discovRecipes = action.payload;
    },
    updateActiveFeed: (state: FeedState, action: PayloadAction<number>) => {
      state.activeFeed = action.payload;
    }
  },
});

export const {
  updateFollowActRec,
  followAddRecipes,
  updateDiscovActRec,
  discovAddRecipes,
  updateActiveFeed,
} = feedSlice.actions;

export default feedSlice.reducer;
