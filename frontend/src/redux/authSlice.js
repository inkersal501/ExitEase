import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    updateResignationStatus: (state, action) => {
      state.user.resignation = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});
 
export const selectUser = (state) => state.auth.user;

export const { login, logout, updateResignationStatus } = authSlice.actions;
export default authSlice.reducer; 
