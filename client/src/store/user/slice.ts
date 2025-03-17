import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type User = {
  email: string | null;
  fullName: string | null;
  id: string | null;
  role: string | null;
  createdAt: string | null;
};

type UserSliceState = {
  isLoading: boolean;
  isPopUpLogin: boolean;
  user: User;
};

const initialState: UserSliceState = {
  isLoading: false,
  isPopUpLogin: false,
  user: {
    email: "",
    fullName: "",
    id: "",
    role: "",
    createdAt: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsPopUpLogin: (state, action: PayloadAction<boolean>) => {
      state.isPopUpLogin = action.payload;
    },
    clearUserStore: () => initialState,
  },
  selectors: {
    getUser: (state) => state.user,
    getUserIsLoading: (state) => state.isLoading,
    getUserFullName: (state) => state.user.fullName,
    getUserRole: (state) => state.user.role,
    getIsPopUpLogin: (state) => state.isPopUpLogin,
  },
});

export const userActions = userSlice.actions;

export const { getUser, getUserFullName, getUserRole, getIsPopUpLogin } = userSlice.selectors;
