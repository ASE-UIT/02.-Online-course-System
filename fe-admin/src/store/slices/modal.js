import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    title: "", // current  title state management
    isOpen: false, // modal state management for opening closing
    bodyType: "", // modal content management
    extraObject: {}
  },
  reducers: {
    openModal: (state, action) => {
      const { title, bodyType, extraObject } = action.payload;
      state.isOpen = true;
      state.bodyType = bodyType;
      state.title = title;
      state.extraObject = extraObject;
    },

    closeModal: (state) => {
      state.isOpen = false;
      state.bodyType = "";
      state.title = "";
      state.extraObject = {};
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
