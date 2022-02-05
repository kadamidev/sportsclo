import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cart: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload
    },
    addItemToCart: (state, action) => {
      const duplicate = state.cart.findIndex((item, idx) => {
        return (
          item.item._id === action.payload.item._id &&
          JSON.stringify(Object.values(item.selectedOptions)) ===
            JSON.stringify(Object.values(action.payload.selectedOptions))
        )
      })

      if (duplicate != -1) {
        state.cart[duplicate].quantity += action.payload.quantity
      } else {
        state.cart.push(action.payload)
      }
    },
    removeItemFromCart: (state, action) => {
      const duplicate = state.cart.findIndex((item, idx) => {
        return (
          item.item._id === action.payload.item._id &&
          JSON.stringify(Object.values(item.selectedOptions)) ===
            JSON.stringify(Object.values(action.payload.selectedOptions))
        )
      })

      if (duplicate != -1) {
        const newQuantity =
          state.cart[duplicate].quantity - action.payload.quantity
        if (newQuantity >= 1) {
          state.cart[duplicate].quantity = newQuantity
        } else {
          state.cart.splice(duplicate, 1)
        }
      }
    },
    updateItemQuantity: (state, action) => {
      const newVal = action.payload.value
      if (newVal.length === 0) {
        state.cart[action.payload.idx].quantity = ""
      } else if (newVal < 1 || isNaN(newVal)) {
        state.cart[action.payload.idx].quantity = 1
      } else {
        state.cart[action.payload.idx].quantity = parseInt(newVal)
      }
    },
    deleteFromCart: (state, action) => {
      state.cart.splice(action.payload, 1)
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  deleteFromCart,
} = cartSlice.actions

export default cartSlice.reducer
