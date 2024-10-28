import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "../features/exampleSlice";

export const store = configureStore({
  reducer: {
    example: exampleReducer,
  },
});
