import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cart: [],
  show: false,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    showCart: (state) => {
      state.show = true
    },
    hideCart: (state) => {
      state.show = false
    },
    toggleCart: (state) => {
      state.show = !state.show
    },
    setCart: (state, action) => {
      cart = action.payload
    },
    addItemToCart: (state, action) => {
      state.cart.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleCart, showCart, hideCart, setCart, addItemToCart } =
  cartSlice.actions

export default cartSlice.reducer
