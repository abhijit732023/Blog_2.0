import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  profileID:null,

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
    setprofile:(state,action)=>{
      state.profileID=action.payload.profileID
    }

  },
});

export const { login, logout, setprofile } = authSlice.actions;

export default authSlice.reducer;