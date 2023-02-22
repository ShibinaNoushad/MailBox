import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import inboxReducer from "./Inbox-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    inbox: inboxReducer,
  },
});

export default store;
