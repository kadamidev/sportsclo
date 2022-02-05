import Image from "next/image"
import styles from "./RecommendedGrid.module.scss"
import React, { useEffect } from "react"
import Link from "next/link"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

export default function RecommendedGrid({ item, setQuantity }) {
  const items = useSelector((state) => state.items.value)
  const router = useRouter()

  function isSameSport(recItem) {
    return Object.keys(item.sports).some((sport) =>
      Object.keys(recItem.sports).includes(sport)
    )
  }

  const recommendedItems = items.filter(
    (recItem) => recItem._id !== item._id && isSameSport(recItem)
  )

  return (
    <section className={styles.itemGridContainer}>
      <ul className={styles.itemList}>
        {recommendedItems.map((item, idx) => {
          return (
            // <Link href={`/shop/${item._id}`} key={item._id}>
            <li
              key={idx}
              className={styles.gridItem}
              onClick={() => {
                setQuantity(1)
                router.push(`/shop/${item._id}`)
              }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={`/items/${item.image.url}`}
                  alt={item.image.alt}
                  width={200}
                  height={200}
                  layout="responsive"
                  objectFit="cover"
                />
              </div>
              <div className={styles.itemDetails}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemPrice}>&#36;{item.price}.00</span>
              </div>
            </li>
            // </Link>
          )
        })}
        <li className={styles.ghostElm}></li>
      </ul>
    </section>
  )
}
