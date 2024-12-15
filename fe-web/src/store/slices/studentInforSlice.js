import { createSlice } from "@reduxjs/toolkit";

const setup = () => {
  const studentInfor = localStorage.getItem("studentInfor");
  if (!studentInfor || studentInfor === "undefined") {
    localStorage.setItem("studentInfor", JSON.stringify([]));
    return { studentInfor: [] };
  }
  return { studentInfor: JSON.parse(studentInfor) };
};

export const studentInforSlice = createSlice({
  name: "studentInfor",
  initialState: setup(),
  reducers: {
    addStudentInfor: (state, action) => {
      let profile = action.payload;
      state.studentInfor = profile;

      localStorage.setItem("studentInfor", JSON.stringify(state.studentInfor));
    },
    removeStudentInfor: (state) => {
      state.studentInfor = [];
      localStorage.setItem("studentInfor", JSON.stringify([]));
    }
  }
});

export const { addStudentInfor, removeStudentInfor } =
  studentInforSlice.actions;
export default studentInforSlice.reducer;
