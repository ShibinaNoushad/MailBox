import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: "",
  isLoggedIn: false,
  email: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    loginHandler(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logoutHandler(state) {
      state.isLoggedIn = false;
      state.email = null;
      state.token = null;
    },
  },
});
export default authSlice.reducer;
export const authActions = authSlice.actions;
