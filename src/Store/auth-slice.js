import { createSlice } from "@reduxjs/toolkit";
const initialIdToken = localStorage.getItem("token");

const initialAuthState = {
  isLoggedIn: false,
  token: initialIdToken,
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
      console.log("login");
    },
    logoutHandler(state) {
      state.isLoggedIn = false;
      state.email = null;
      state.token = null;
      console.log(state.isLoggedIn);
      console.log("logout");
    },
  },
});
export default authSlice.reducer;
export const authActions = authSlice.actions;
