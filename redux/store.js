import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./reducers/cartSlice"
import itemsReducer from "./reducers/itemsSlice"

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    items: itemsReducer,
    cart: cartReducer,
  },
})
