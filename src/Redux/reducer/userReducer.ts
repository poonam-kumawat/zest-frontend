import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: "" as string,
    refreshToken: "" as string,
    email: "" as string,
  },
  reducers: {
    userLogin: (state, action) => {
      const { accessToken, refreshToken, email } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.email = email;
    },
    userLogout: () => {
      return {
        accessToken: "" as string,
        refreshToken: "" as string,
        email: "" as string,
      };
    },
    setAccessToken: (state, action) => {
      const accessToken = action.payload;
      state.accessToken = accessToken;
    },
  },
});

export const { userLogin, userLogout, setAccessToken } = userSlice.actions;

export default userSlice.reducer;
