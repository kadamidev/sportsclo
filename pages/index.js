import Head from "next/head"
import styles from "../styles/Home.module.scss"
import Image from "next/image"
import { CarouselData } from "../components/Carousel/CarouselData"
import Carousel from "../components/Carousel/Carousel"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SportsClo</title>
        <meta name="Ecom site clone" content="A concept sports ecom site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.logoContainer}>
        <Image src="/logo.svg" width={570} height={116} alt="SportsClo logo" />
      </div>

      <section className={styles.carouselWrapper}>
        <Carousel slides={CarouselData} />
      </section>

      <button className={styles.shopBtn}>SHOP NOW</button>
    </div>
  )
}
