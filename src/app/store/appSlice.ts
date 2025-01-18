import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserRole = "USER" | "ADMIN";

export interface AppState {
  user: UserRole | null;
}

const initialState: AppState = {
  user: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserRole>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = appSlice.actions;

export const selectUser = (state: { app: AppState }) => state.app.user;
export default appSlice.reducer;
