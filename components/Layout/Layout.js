import React, { useState } from "react"
import Cart from "../Cart/Cart"
import Navbar from "../Navbar/Navbar"
import styles from "./Layout.module.scss"

export default function Layout({ children }) {
  const [showCart, setShowCart] = useState(false)
  return (
    <div className={styles.container}>
      <nav className={styles.navbarWrapper}>
        <Navbar setShowCart={setShowCart} />
      </nav>

      <div
        className={
          showCart
            ? [styles.cartWrapper, styles.cartShow].join(" ")
            : styles.cartWrapper
        }
      >
        <Cart />
      </div>
      <main>{children}</main>
    </div>
  )
}
