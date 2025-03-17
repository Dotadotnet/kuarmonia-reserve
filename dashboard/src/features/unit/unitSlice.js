

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  unit: {},
};

const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    setUnit: (state, action) => {
      state.unit = action.payload;
    },
  },
});

export const {  setUnit } = unitSlice.actions;
export default unitSlice.reducer;
