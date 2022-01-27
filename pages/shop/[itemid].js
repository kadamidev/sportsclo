import React from "react"
import styles from "../../styles/Item.module.scss"
import Navbar from "../../components/Navbar/Navbar"
import Image from "next/image"

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
  return (
    <div className={styles.container}>
      <div className={styles.navbarWrapper}>
        <Navbar className={styles.navbar} />
      </div>

      <section className={styles.heroContainer}>
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
          <h1>{item.name.toUpperCase()}</h1>
          <h1>&#36;{item.price}.00</h1>

          {item.options.length > 0 &&
            item.options.map((option, idx) => {
              return (
                <div key={idx} className={styles.optionsContainer}>
                  <h2>{Object.keys(option)}</h2>
                  <ul>
                    {Object.values(option)[0].map((selector, idx) => {
                      return <li key={idx}>{selector}</li>
                    })}
                  </ul>
                </div>
              )
            })}

          <div className={styles.cartOptions}>
            <h2>Quantity</h2>
            <input type="number" step="1" />

            <button>ADD TO CART</button>
            <button>REMOVE FROM CART</button>
          </div>

          <p>{item.description}</p>
        </div>

        <div className={styles.recommendedContainer}>
          <h1>Recommended</h1>
        </div>
      </section>
    </div>
  )
}
