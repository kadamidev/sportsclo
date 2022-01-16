import React from "react"
import ItemGrid from "../../components/ItemGrid/ItemGrid"
import Navbar from "../../components/Navbar/Navbar"
import styles from "../../styles/Shop.module.scss"

export default function Shop() {
  return (
    <div className={styles.container}>
      <div className={styles.navbarWrapper}>
        <Navbar className={styles.navbar} />
      </div>

      <div className={styles.itemGridWrapper}>
        <ItemGrid className={styles.itemGrid} />
      </div>
    </div>
  )
}
