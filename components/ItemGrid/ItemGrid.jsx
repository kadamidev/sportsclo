import Image from "next/image"
import styles from "./ItemGrid.module.scss"
import { items } from "../../utils/data"
import React, { useState, useRef } from "react"

export default function ItemGrid() {
  const filtersRef = useRef()
  const [filter, setFilter] = useState(0)
  const [showFilterSelection, setShowFilterSelection] = useState(false)

  const filterOptions = [
    "price: low-to-high",
    "price: high-to-low",
    "newest-to-oldest",
  ]

  return (
    <section className={styles.itemGridContainer}>
      <div className={styles.top}>
        <div className={styles.filterWrapper}>
          <Image src="/filter.svg" width={18} height={18} />
        </div>
        <div
          className={styles.sortContainer}
          onClick={() => setShowFilterSelection(!showFilterSelection)}
        >
          <div className={styles.sortSvgWrapper}>
            <Image src="/sort.svg" width={20} height={16} />
          </div>
          <span className={styles.sortType}>{filterOptions[filter]}</span>
          {showFilterSelection && (
            <div ref={filtersRef} className={styles.filterTypesPopup}>
              <ul>
                {filterOptions.map((filter, idx) => (
                  <li
                    onClick={() => {
                      setFilter(idx)
                    }}
                    key={idx}
                  >
                    {filter}
                  </li>
                ))}
              </ul>
            </div>
          )}
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
                  layout="responsive"
                  objectFit="cover"
                />
              </div>
              <div className={styles.itemDetails}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemPrice}>&#36;{item.price}.00</span>
              </div>
            </li>
          )
        })}
        <li className={styles.ghostElm}></li>
      </ul>
    </section>
  )
}
