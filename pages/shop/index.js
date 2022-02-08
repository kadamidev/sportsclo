import React, { useEffect } from "react"
import ItemGrid from "../../components/ItemGrid/ItemGrid"
import styles from "../../styles/Shop.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { setItems } from "../../redux/reducers/itemsSlice"
import Layout from "../../components/Layout/Layout"
import dbConnect from "../../utils/dbConnect"
import Item from "../../models/Item"

export async function getStaticProps() {
  await dbConnect()
  const query = await Item.find({})
  const items = JSON.parse(JSON.stringify(query))

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
      <Layout>
        <div className={styles.itemGridWrapper}>
          <ItemGrid items={items} className={styles.itemGrid} />
        </div>
      </Layout>
    </div>
  )
}
