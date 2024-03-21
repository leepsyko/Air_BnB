import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import modalNotiSlice from "../features/modalNotiSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    modalNoti: modalNotiSlice,
  },
});
