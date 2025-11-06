import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [],
  currentRequest: null,
  loading: false,
  error: null,
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    setCurrentRequest: (state, action) => {
      state.currentRequest = action.payload;
    },
    addRequest: (state, action) => {
      state.requests.push(action.payload);
    },
    updateRequest: (state, action) => {
      const index = state.requests.findIndex(
        (request) => request._id === action.payload._id
      );
      if (index !== -1) {
        state.requests[index] = action.payload;
      }
    },
    removeRequest: (state, action) => {
      state.requests = state.requests.filter(
        (request) => request._id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setRequests,
  setCurrentRequest,
  addRequest,
  updateRequest,
  removeRequest,
  setLoading,
  setError,
} = requestSlice.actions;

export default requestSlice.reducer;