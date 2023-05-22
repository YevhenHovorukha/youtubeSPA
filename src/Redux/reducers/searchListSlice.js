import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      search: "React js",
      result: 8,
      sort: "relevance",
    },
    {
      search: "Nike React",
      result: 8,
      sort: "relevance",
    },
    {
      search: "Balenciaga ",
      result: 8,
      sort: "relevance",
    },
    {
      search: "MUI",
      result: 8,
      sort: "relevance",
    },
  ],
};

export const searchList = createSlice({
  name: "searchList",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.value.push({
        search: action.payload,
        results: 8,
        sort: "relevance",
      });
    },
    deleteItem: (state, action) => {
      const newArr = state.value.filter(
        (item) => item.search !== action.payload
      );
      return { ...state, value: newArr };
    },
    editItem: (state, action) => {
      const newArr = state.value.map((item) =>
        item.search === action.payload.prevState
          ? {
              search: action.payload.newState,
              results: action.payload.results,
              sort: action.payload.sort,
            }
          : item
      );
      return { ...state, value: newArr };
    },
  },
});

export const { addItem, deleteItem, editItem } = searchList.actions;

export default searchList.reducer;
