import { createSlice } from "@reduxjs/toolkit";
import { parseJwt } from "../utils/parse_jwt";

export const applicationSlice = createSlice({
  name: "application",
  initialState: {
    authToken: window.localStorage.getItem("jwt"),
    settings: parseJwt(window.localStorage.getItem("jwt")),
    user: null,
  },
  reducers: {
    setAuthToken: (state, {payload}) => {
      if (payload) {
        state.settings = parseJwt(payload)
        window.localStorage.setItem("jwt", payload);
      } else {
        window.localStorage.removeItem("jwt");
      }
      state.authToken = payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  }
});

export const { setAuthToken, setUser } = applicationSlice.actions;

export const applicationReducer = applicationSlice.reducer;