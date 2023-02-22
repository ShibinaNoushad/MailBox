import { createSlice } from "@reduxjs/toolkit";

const InboxSlice = createSlice({
  name: "inbox",
  initialState: { inboxArr: [], totalUnreadMessages: 0 },
  reducers: {
    addMails(state, action) {
      state.inboxArr = action.payload;
    },
    noOfUnreadMessages(state, action) {
      state.totalUnreadMessages = action.payload;
    },
  },
});
export default InboxSlice.reducer;
export const InboxActions = InboxSlice.actions;
