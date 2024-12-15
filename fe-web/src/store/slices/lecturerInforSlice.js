import { createSlice } from "@reduxjs/toolkit";

const setup = () => {
  const lecturerInfor = localStorage.getItem("lecturerInfor");
  if (!lecturerInfor || lecturerInfor === "undefined") {
    localStorage.setItem("lecturerInfor", JSON.stringify([]));
    return { lecturerInfor: [] };
  }
  return { lecturerInfor: JSON.parse(lecturerInfor) };
};

export const lecturerInforSlice = createSlice({
  name: "lecturerInfor",
  initialState: setup(),
  reducers: {
    addLecturerInfor: (state, action) => {
      let profile = action.payload;
      state.lecturerInfor = profile;

      localStorage.setItem(
        "lecturerInfor",
        JSON.stringify(state.lecturerInfor)
      );
    },
    removeLecturerInfor: (state) => {
      state.lecturerInfor = [];
      localStorage.setItem("lecturerInfor", JSON.stringify([]));
    }
  }
});

export const { addLecturerInfor, removeLecturerInfor } =
  lecturerInforSlice.actions;
export default lecturerInforSlice.reducer;
