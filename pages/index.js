import Head from "next/head"
import styles from "../styles/Home.module.scss"
import Image from "next/image"
import Link from "next/link"
import {
  CarouselDataLandscape,
  CarouselDataPortrait,
} from "../components/Carousel/CarouselData"
import Carousel from "../components/Carousel/Carousel"
import { useMediaQuery } from "../utils/useMediaQuery"

export default function Home() {
  const portraitMode = useMediaQuery("(max-width: 768px)")
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
        <Carousel
          slides={portraitMode ? CarouselDataPortrait : CarouselDataLandscape}
        />
      </section>
      <Link href="/shop">
        <button className={styles.shopBtn}>SHOP NOW</button>
      </Link>
    </div>
  )
}
