import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
  store: null,
  priceRange: { min: 500, max: 50000 },
  dateRange: { startDate: null, endDate: null },
  type: [],
  tradeType: [],
  saleType: [],
  countries: [],
  ratings: []
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    
    setType: (state, action) => {
      state.type = action.payload;
    },
    
    setTradeType: (state, action) => {
      state.tradeType = action.payload;
    },
    
    setSaleType: (state, action) => {
      state.saleType = action.payload;
    },
    
    setCountries: (state, action) => {
      state.countries = action.payload;
    },

    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },

    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    
    setRatings: (state, action) => {
      state.ratings = action.payload;
    },

    clearFilter: (state) => {
      state.category = null;
      state.type = [];
      state.tradeType = [];
      state.saleType = [];
      state.countries = [];
      state.priceRange = { min: 500, max: 50000 };
      state.dateRange = { startDate: null, endDate: null };
      state.ratings = [];
    },
    
    resetFilter: (state) => {
      state.category = null;
      state.type = [];
      state.tradeType = [];
      state.saleType = [];
      state.countries = [];
      state.priceRange = { min: 500, max: 50000 };
      state.dateRange = { startDate: null, endDate: null };
      state.ratings = [];
    }
  }
});

export const { 
  setCategory, 
  setType, 
  setTradeType, 
  setSaleType, 
  setCountries, 
  setDateRange, 
  setPriceRange, 
  setRatings, 
  clearFilter,
  resetFilter
} = filterSlice.actions;
export default filterSlice.reducer;