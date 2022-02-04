import React, { useState } from "react"
import styles from "./Cart.module.scss"
import { useSelector } from "react-redux"

export default function Cart() {
  return (
    <div className={styles.cartContainer}>
      {/* add clear cart somewhere */}
      {/* <header className={styles.columnHeaders}>
        <span>item</span>
        <span>quantity</span>
        <span>sum</span>
      </header> */}

      <section className={styles.contentsContainer}>
        <header className={styles.columnHeaders}>
          <span className={styles.item}>item</span>
          <span className={styles.quantity}>qty</span>
          <span className={styles.sum}>sum</span>
        </header>

        <ul className={styles.itemsList}>
          <li>
            <div className={styles.firstCol}>
              <span className={styles.itemName}>Badminton Beginner Set</span>
              <ul className={styles.optionsList}>
                <li>Size M</li>
                <li>Red</li>
              </ul>
            </div>

            <div className={styles.quantityWrapper}>
              <input
                className={styles.quantityInput}
                // value={quantity}
                // onChange={handleQuantityChange}
              />
              <button
                className={styles.quantityPlus}
                // onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
              <button
                className={styles.quantityMinus}
                // onClick={() => {
                //   if (quantity === 1) return
                //   setQuantity(quantity - 1)
                // }}
              >
                -
              </button>
            </div>

            <span className={styles.itemSum}>$0.00</span>
            <button>x</button>
          </li>
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
