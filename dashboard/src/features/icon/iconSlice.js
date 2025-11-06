

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  icon: {},
};

const iconSlice = createSlice({
  name: "icon",
  initialState,
  reducers: {
    setIcon: (state, action) => {
      state.icon = action.payload;
    },
  },
});

export const {  setIcon } = iconSlice.actions;
export default iconSlice.reducer;
