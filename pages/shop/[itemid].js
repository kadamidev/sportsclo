import React, { useState, useEffect } from "react"
import styles from "../../styles/Item.module.scss"
import Navbar from "../../components/Navbar/Navbar"
import Image from "next/image"
import RecommendedGrid from "../../components/RecommendedGrid/RecommendedGrid"
import Link from "next/link"
import { useRouter } from "next/router"

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/items/")
  const items = await res.json()
  const paths = items.map((item) => {
    return {
      params: { itemid: item._id.toString() },
    }
  })

  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const itemid = context.params.itemid
  const res = await fetch(`http://localhost:3000/api/items/${itemid}`)
  const item = await res.json()

  return {
    props: { item: item },
  }
}

export default function Item({ item }) {
  const [activeOptions, setActiveOptions] = useState({})
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  //set initial active options
  useEffect(() => {
    if (item.options.length < 1) return
    const initialOptions = {}
    item.options.forEach((option) => {
      initialOptions[Object.keys(option)] = 0
    })
    setActiveOptions(initialOptions)
  }, [setActiveOptions])

  function handleOptionClick(optionName, selectedOptionIdx) {
    const changedOptions = { ...activeOptions }
    changedOptions[optionName] = selectedOptionIdx
    setActiveOptions(changedOptions)
  }

  useEffect(() => {
    if (quantity < 1 || isNaN(quantity)) setQuantity(1)
  }, [quantity, setQuantity])

  const handleQuantityChange = (e) => {
    if (isNaN(e.target.value)) return
    setQuantity(parseInt(e.target.value))
  }

  return (
    <div className={styles.container}>
      <div className={styles.navbarWrapper}>
        <Navbar className={styles.navbar} />
      </div>

      <section className={styles.heroContainer}>
        <span className={styles.backLink} onClick={() => router.back()}>
          &#8617; return to catalog
        </span>

        <div className={styles.itemContainer}>
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

          <div className={styles.details}>
            <h1>{item.name.toUpperCase()}</h1>
            <h1>&#36;{item.price}.00</h1>

            <p>{item.description}</p>

            {item.options.length > 0 &&
              item.options.map((option, idx) => {
                return (
                  <div key={idx} className={styles.optionsContainer}>
                    <h2>{Object.keys(option)}</h2>
                    <ul>
                      {Object.values(option)[0].map(
                        (selector, selection_idx) => {
                          return (
                            <li
                              className={
                                activeOptions[Object.keys(option)] ===
                                selection_idx
                                  ? styles.active
                                  : null
                              }
                              key={selection_idx}
                              onClick={() => {
                                handleOptionClick(
                                  Object.keys(option),
                                  selection_idx
                                )
                              }}
                            >
                              {selector}
                            </li>
                          )
                        }
                      )}
                    </ul>
                  </div>
                )
              })}

            <div className={styles.cartOptions}>
              <div className={styles.quantityContainer}>
                <h2>Quantity</h2>
                <div className={styles.quantityWrapper}>
                  <input
                    className={styles.quantityInput}
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  <button
                    className={styles.quantityPlus}
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className={styles.quantityMinus}
                    onClick={() => {
                      if (quantity === 1) return
                      setQuantity(quantity - 1)
                    }}
                  >
                    -
                  </button>
                </div>
              </div>

              <div className={styles.buttonsContainer}>
                <button>ADD TO CART</button>
                <button>REMOVE FROM CART</button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.recommendedContainer}>
          <h1>RECOMMENDED</h1>
          <RecommendedGrid item={item} />
        </div>
      </section>
    </div>
  )
}
