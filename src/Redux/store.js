import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import searchListSlice from "./reducers/searchListSlice";
import youtubeDataSlice from "./reducers/youtubeDataSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    searchList: searchListSlice,
    youtube: youtubeDataSlice,
  },
});
