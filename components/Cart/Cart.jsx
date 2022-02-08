import React, { useEffect, useState } from "react"
import styles from "./Cart.module.scss"
import { useSelector, useDispatch } from "react-redux"
import {
  updateItemQuantity,
  deleteFromCart,
  addCoupon,
  removeCoupon,
  calculateCouponDiscount,
  calculateSubTotal,
} from "../../redux/reducers/cartSlice"

import { formatAmount } from "../../utils/formatAmount"

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cart)
  const activeCoupons = useSelector((state) => state.cart.activeCoupons)
  const couponDiscount = useSelector((state) => state.cart.couponDiscount)
  const subTotal = useSelector((state) => state.cart.subTotal)

  const dispatch = useDispatch()

  const [couponCode, setCouponCode] = useState("")
  const [couponMsg, setCouponMsg] = useState("")

  async function handleAddCoupon() {
    const res = await fetch(`/api/coupons/${couponCode}`)
    if (res.ok) {
      const coupon = await res.json()
      dispatch(addCoupon(coupon))
      setCouponMsg("Coupon applied")
    } else {
      setCouponMsg("Invalid coupon")
    }
    setCouponCode("")
  }

  useEffect(() => {
    dispatch(calculateSubTotal())
    dispatch(calculateCouponDiscount())
  }, [cartItems, activeCoupons])

  return (
    <div className={styles.cartContainer}>
      {/* add clear cart somewhere */}

      <section className={styles.contentsContainer}>
        <header className={styles.columnHeaders}>
          <span className={styles.item}>item</span>
          <span className={styles.quantity}>qty</span>
          <span className={styles.sum}>sum</span>
        </header>

        <ul className={styles.itemsList}>
          {cartItems.map((item, idx) => {
            return (
              <li key={idx}>
                <div className={styles.firstCol}>
                  <span className={styles.itemName}>{item.item.name}</span>
                  <ul className={styles.optionsList}>
                    {item.item.options.map((option, idx) => {
                      const key = Object.keys(option)[0]
                      const selected =
                        Object.values(option)[0][item.selectedOptions[key]]
                      return <li key={idx}>{selected}</li>
                    })}
                  </ul>
                </div>

                <div className={styles.quantityWrapper}>
                  <input
                    className={styles.quantityInput}
                    value={item.quantity}
                    onBlur={(e) => {
                      if (item.quantity < 1) {
                        dispatch(updateItemQuantity({ idx: idx, value: 1 }))
                      }
                    }}
                    onChange={(e) => {
                      dispatch(
                        updateItemQuantity({ idx: idx, value: e.target.value })
                      )
                    }}
                  />
                  <button
                    className={styles.quantityPlus}
                    onClick={() =>
                      dispatch(
                        updateItemQuantity({
                          idx: idx,
                          value: item.quantity + 1,
                        })
                      )
                    }
                  >
                    +
                  </button>
                  <button
                    className={styles.quantityMinus}
                    onClick={() => {
                      if (item.quantity === 1) return
                      dispatch(
                        updateItemQuantity({
                          idx: idx,
                          value: item.quantity - 1,
                        })
                      )
                    }}
                  >
                    -
                  </button>
                </div>

                <span className={styles.itemSum}>
                  &#36;{item.item.price * item.quantity}.00
                </span>
                <button onClick={() => dispatch(deleteFromCart(idx))}>x</button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.bottomSection}>
        <div className={styles.couponWrapper}>
          <span className={styles.lightHeading}>COUPON CODE</span>
          <input
            type="text"
            value={couponCode}
            placeholder={couponMsg}
            onChange={(e) => {
              if (couponMsg) setCouponMsg("")
              setCouponCode(e.target.value)
            }}
          />
          <button className={styles.addCouponBtn} onClick={handleAddCoupon}>
            ADD
          </button>
        </div>

        <div className={styles.summationWrapper}>
          <div className={styles.subTotal}>
            <span className={styles.lightHeading}>SUBTOTAL</span>
            <span className={styles.lightHeading}>
              {formatAmount(subTotal)}
            </span>
          </div>
          <div className={styles.coupons}>
            <div className={styles.couponsHeader}>
              <span className={styles.lightHeading}>COUPONS</span>
              <span className={styles.lightHeading}>
                -{formatAmount(couponDiscount)}
              </span>
            </div>
            <ul className={styles.couponsList}>
              {activeCoupons.map((coupon, idx) => {
                return (
                  <li key={idx}>
                    <span>{coupon.description}</span>
                    <button
                      onClick={() => {
                        dispatch(removeCoupon(idx))
                      }}
                    >
                      x
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className={styles.delivery}>
            <span className={styles.lightHeading}>DELIVERY</span>
            <span className={styles.lightHeading}>$0.00</span>
          </div>

          <div className={styles.total}>
            <h2>TOTAL</h2>
            <h2>{formatAmount(subTotal - couponDiscount)}</h2>
          </div>
        </div>

        <button className={styles.checkOutBtn}>CHECK OUT</button>
      </section>
    </div>
  )
}
