import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { adjustTokenKey } from "../consts";

interface AuthState {
  adjustToken: string
}

const initialState = {
  adjustToken: localStorage.getItem(adjustTokenKey) ?? ""
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdjustToken(
      state: AuthState,
      { payload }: PayloadAction<{token: string}>
    ) {
      localStorage.setItem(adjustTokenKey, payload.token)
      state.adjustToken = payload.token
    },
    logout(
      state: AuthState
    ) {
      localStorage.removeItem(adjustTokenKey)
      state.adjustToken = ""
    }
  },
})