import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
  store: null,
  priceRange: { min: 500, max: 50000 },
  dateRange: { startDate: null, endDate: null }
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },

    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },

    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },

    clearFilter: (state) => {
      state.category = null;
      state.priceRange = { min: 50, max: 50000 };
      state.dateRange = { startDate: null, endDate: null };
      state.ratings = [];
    }
  }
});

export const { setCategory, setRatings, clearFilter,setDateRange,setPriceRange } =
  filterSlice.actions;
export default filterSlice.reducer;
