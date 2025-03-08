import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/slice";

export const rootStore = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
  },
  devTools: true,
});

// function handleChange() {
//   console.log("stare_store", rootStore.getState().user?.user);
// }
// rootStore.subscribe(handleChange);
