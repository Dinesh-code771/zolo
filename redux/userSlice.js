import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload;
      state.email = action.payload;
    },
    clearUser(state) {
      state.name = "";
      state.email = "";
    },
    setUserPassword(state, action) {
      state.password = action.payload;
    },
  },
});

export const { setUser, clearUser, setUserPassword } = userSlice.actions;
export default userSlice.reducer;
