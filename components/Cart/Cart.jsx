import React from "react"
import styles from "./Cart.module.scss"

export default function Cart() {
  return (
    <div className={styles.cartContainer}>
      {/* add clear cart somewhere */}
      <header className={styles.columnHeaders}>
        <span>item</span>
        <span>quantity</span>
        <span>sum</span>
      </header>

      <section className={styles.contentsContainer}></section>

      <section className={styles.bottomSection}>
        <div className={styles.couponWrapper}>
          <span className={styles.lightHeading}>Coupon Code</span>
          <input type="text" />
        </div>

        <div className={styles.summationWrapper}>
          <div className={styles.subTotal}>
            <span className={styles.lightHeading}>SUBTOTAL</span>
            <span className={styles.lightHeading}>$135.00</span>
          </div>
          <div className={styles.coupons}>
            <span className={styles.lightHeading}>COUPONS</span>
            <span className={styles.lightHeading}>-$20.25</span>
            <ul className={styles.couponsList}>
              <li>coupon 1</li>
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
