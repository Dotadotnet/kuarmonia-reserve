import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  session: {}  // اضافه کردن session به auth
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setSession: (state, { payload }) => {
      state.session = payload; // ذخیره session در auth
    }
  },
});

export const { setUser, setSession } = authSlice.actions;
export default authSlice.reducer;
