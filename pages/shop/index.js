import React, { useEffect } from "react"
import ItemGrid from "../../components/ItemGrid/ItemGrid"
import Navbar from "../../components/Navbar/Navbar"
import styles from "../../styles/Shop.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { setItems } from "../../redux/reducers/itemsSlice"
import Cart from "../../components/Cart/Cart"

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/items")
  const items = await res.json()

  return {
    props: {
      items,
    },
  }
}

export default function Shop({ items }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setItems(items))
  }, [items, dispatch])

  return (
    <div className={styles.container}>
      <div className={styles.navbarWrapper}>
        <Navbar className={styles.navbar} />
      </div>

      <div className={styles.cartWrapper}>
        <Cart />
      </div>

      <div className={styles.itemGridWrapper}>
        <ItemGrid items={items} className={styles.itemGrid} />
      </div>
    </div>
  )
}
