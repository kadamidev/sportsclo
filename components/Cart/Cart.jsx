import React, { useState } from "react"
import styles from "./Cart.module.scss"
import { useSelector, useDispatch } from "react-redux"
import {
  updateItemQuantity,
  deleteFromCart,
} from "../../redux/reducers/cartSlice"

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()

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
          <input type="text" />
          <button className={styles.addCouponBtn}>ADD</button>
        </div>

        <div className={styles.summationWrapper}>
          <div className={styles.subTotal}>
            <span className={styles.lightHeading}>SUBTOTAL</span>
            <span className={styles.lightHeading}>$135.00</span>
          </div>
          <div className={styles.coupons}>
            <div className={styles.couponsHeader}>
              <span className={styles.lightHeading}>COUPONS</span>
              <span className={styles.lightHeading}>-$20.25</span>
            </div>
            <ul className={styles.couponsList}>
              <li>
                <span>coupon 1</span>
                <button>x</button>
              </li>
              <li>
                <span>coupon 2</span>
                <button>x</button>
              </li>
            </ul>
          </div>
          <div className={styles.delivery}>
            <span className={styles.lightHeading}>DELIVERY</span>
            <span className={styles.lightHeading}>$0.00</span>
          </div>

          <div className={styles.total}>
            <h2>TOTAL</h2>
            <h2>$114.75</h2>
          </div>
        </div>

        <button className={styles.checkOutBtn}>CHECK OUT</button>
      </section>
    </div>
  )
}
