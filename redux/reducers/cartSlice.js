import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
  cart: [],
  activeCoupons: [],
  couponDiscount: 0,
  subTotal: 0,
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
    setCoupons: (state, action) => {
      state.coupons = action.payload
    },
    addCoupon: (state, action) => {
      const collision = state.activeCoupons.find(
        (coupon) => coupon.code === action.payload.coupon.code
      )
      if (collision) return
      state.activeCoupons.push(action.payload.coupon)
    },
    removeCoupon: (state, action) => {
      state.activeCoupons.splice(action.payload, 1)
    },
    calculateCouponDiscount: (state) => {
      let couponDiscount = 0
      state.activeCoupons.forEach((coupon) => {
        let itemTotal = 0

        //calculate item total per coupon
        if (coupon.items.hasOwnProperty("all")) {
          itemTotal += state.cart.reduce((acc, item) => {
            return acc + parseFloat(item.item.price) * item.quantity
          }, 0)
        } else {
          itemTotal += state.cart.reduce((acc, item) => {
            if (coupon.items.hasOwnProperty(item.item._id))
              return acc + parseFloat(item.item.price) * item.quantity
            return acc
          })
        }

        //calculate discount amt
        if (coupon.discount_type === "percent") {
          couponDiscount += itemTotal * coupon.discount_val
        }
      })
      state.couponDiscount = couponDiscount
    },
    calculateSubTotal: (state) => {
      state.subTotal = state.cart.reduce((acc, item) => {
        return acc + item.item.price * item.quantity
      }, 0)
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
  addCoupon,
  removeCoupon,
  calculateCouponDiscount,
  calculateSubTotal,
} = cartSlice.actions

export default cartSlice.reducer
