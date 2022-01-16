import Image from "next/image"
import styles from "./ItemGrid.module.scss"
import { items } from "../../utils/data"
import React from "react"

export default function ItemGrid() {
  return (
    <section className={styles.itemGridContainer}>
      <div className={styles.top}>
        <div className={styles.filterWrapper}>
          <Image src="/filter.svg" width={18} height={18} />
        </div>
        <div className={styles.sortContainer}>
          <div className={styles.sortSvgWrapper}>
            <Image src="/sort.svg" width={20} height={16} />
          </div>
          <span className={styles.sortType}>price: low-to-high</span>
          {/* <select name="sort">
            <option value="price-l-h">price: low-to-high</option>
            <option value="price-h-l">price: high-to-low</option>
          </select> */}
        </div>
      </div>
      <ul className={styles.itemList}>
        {items.map((item, idx) => {
          return (
            <li key={idx} className={styles.gridItem}>
              <div className={styles.imageWrapper}>
                <Image
                  src={`/items/${item.image.url}`}
                  alt={item.image.alt}
                  width={200}
                  height={200}
                  // layout="intrinsic"
                  objectFit="cover"
                />
              </div>
              <div className={styles.itemDetails}>
                <span>{item.name}</span>
                <span>&#36;{item.price}.00</span>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
