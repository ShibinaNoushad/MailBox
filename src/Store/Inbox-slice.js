import { createSlice } from "@reduxjs/toolkit";

const InboxSlice = createSlice({
  name: "inbox",
  initialState: { inboxArr: [] },
  reducers: {
    addMails(state, action) {
      state.inboxArr = action.payload;
    },
  },
});
export default InboxSlice.reducer;
export const InboxActions = InboxSlice.actions;
