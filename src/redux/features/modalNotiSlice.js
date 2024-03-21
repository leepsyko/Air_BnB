import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  success: false,
  error: false,
  title: "",
  secondTitle: "",
};

export const modalNotiSlice = createSlice({
  name: "modalNoti",
  initialState,
  reducers: {
    handleOpenNoti: (state, action) => {
      state.open = true;
      state.title = action.payload.title;
      state.secondTitle = action.payload.secondTitle;
      if (action.payload.success === true) {
        state.success = true;
        state.error = false;
      } else if (action.payload.error === true) {
        state.success = false;
        state.error = true;
      }
    },
    handleCloseNoti: (state) => {
      state.open = false;
      state.success = false;
      state.error = false;
      state.title = "";
      state.secondTitle = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleOpenNoti, handleCloseNoti } = modalNotiSlice.actions;

export default modalNotiSlice.reducer;
