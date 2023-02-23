import { createSlice } from "@reduxjs/toolkit";

const InboxSlice = createSlice({
  name: "inbox",
  initialState: {
    inboxArr: [],
    totalUnreadMessages: 0,
    inboxOrSentBox: true,
    sentBoxArr: [],
  },
  reducers: {
    addMails(state, action) {
      state.inboxArr = action.payload;
    },
    noOfUnreadMessages(state, action) {
      state.totalUnreadMessages = action.payload;
    },
    changetoSentBox(state) {
      state.inboxOrSentBox = false;
    },
    changetoInbox(state) {
      state.inboxOrSentBox = true;
    },
    addtoSentBox(state, action) {
      state.sentBoxArr = action.payload;
    },
  },
});
export default InboxSlice.reducer;
export const InboxActions = InboxSlice.actions;
