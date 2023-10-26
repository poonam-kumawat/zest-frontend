import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: "" as string,
    refreshToken: "" as string,
  },
  reducers: {
    userLogin: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    userLogout: () => {
      return {
        accessToken: "" as string,
        refreshToken: "" as string,
      };
    },
  },
});

export const {userLogin,userLogout} = userSlice.actions;

export default userSlice.reducer;
