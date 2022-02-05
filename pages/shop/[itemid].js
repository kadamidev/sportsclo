import React, { useState, useEffect } from "react"
import styles from "../../styles/Item.module.scss"
import Image from "next/image"
import RecommendedGrid from "../../components/RecommendedGrid/RecommendedGrid"
import { useRouter } from "next/router"
import Layout from "../../components/Layout/Layout"
import { useDispatch } from "react-redux"
import {
  addItemToCart,
  removeItemFromCart,
} from "../../redux/reducers/cartSlice"

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
  const dispatch = useDispatch()

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

  const handleQuantityChange = (val) => {
    if (val.length === 0) {
      setQuantity("")
    } else if (val < 1 || isNaN(val)) {
      setQuantity(1)
    } else {
      setQuantity(parseInt(val))
    }
  }

  function handleAddToCart() {
    const newItem = {
      item: item,
      selectedOptions: activeOptions,
      quantity: quantity,
    }
    console.log(newItem)
    dispatch(addItemToCart(newItem))
  }

  function handleRemoveFromCart() {
    const newItem = {
      item: item,
      selectedOptions: activeOptions,
      quantity: quantity,
    }
    console.log(newItem)
    dispatch(removeItemFromCart(newItem))
  }

  return (
    <Layout>
      <div className={styles.container}>
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
                      onBlur={() => {
                        if (quantity < 1) {
                          handleQuantityChange(1)
                        }
                      }}
                      onChange={(e) => handleQuantityChange(e.target.value)}
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
                  <button onClick={handleAddToCart}>ADD TO CART</button>
                  <button onClick={handleRemoveFromCart}>
                    REMOVE FROM CART
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.recommendedContainer}>
            <h1>RECOMMENDED</h1>
            <RecommendedGrid item={item} setQuantity={setQuantity} />
          </div>
        </section>
      </div>
    </Layout>
  )
}
