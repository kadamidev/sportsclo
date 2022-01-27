import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./reducers/counterSlice"
import itemsReducer from "./reducers/itemsSlice"

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    items: itemsReducer,
  },
})
