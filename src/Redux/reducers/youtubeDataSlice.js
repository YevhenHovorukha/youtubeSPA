import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getYouTubeData = createAsyncThunk(
  "youtube/getData",
  async ({ search, results, sort }) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: "AIzaSyCJ6AL7gdQucwj1Mmd1wTXWz9-nUJT-M90",
            part: "snippet",
            type: "video",
            maxResults: results,
            order: sort,
            q: search,
          },
        }
      );

      return { data: response.data.items, search: search };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const youtubeDataSlice = createSlice({
  name: "youtube",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getYouTubeData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getYouTubeData.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getYouTubeData.pending, (state) => {
      state.loading = true;
    });
  },
});

export default youtubeDataSlice.reducer;
