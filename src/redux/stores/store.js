import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "../reducers/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
