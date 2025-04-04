
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  session: {},
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    addSession: (state, { payload }) => {
      state.session = payload;
    },
  },
});

export const { addSession } = sessionSlice.actions;
export default sessionSlice.reducer;
