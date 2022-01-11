import styles from "./Carousel.module.scss"
import React, { useEffect, useState } from "react"
import Image from "next/image"

function Carousel({ slides }) {
  const [currentImage, setCurrentImage] = useState(0)
  const length = slides.length

  const prevSlide = () => {
    setCurrentImage(currentImage === 0 ? length - 1 : currentImage - 1)
  }
  const nextSlide = () => {
    setCurrentImage(currentImage === length - 1 ? 0 : currentImage + 1)
  }

  // handles auto image rotation
  useEffect(() => {
    const id = setTimeout(() => {
      nextSlide()
    }, 10000)

    return () => {
      clearTimeout(id)
    }
  }, [currentImage, setCurrentImage, nextSlide])

  return (
    <div className={styles.carousel}>
      <button
        className={[styles.carouselButton, styles.carouselPrevBtn].join(" ")}
        onClick={() => {
          prevSlide()
        }}
      >
        <Image src="/left-arrow.svg" width={30} height={100} />
      </button>

      <button
        className={[styles.carouselButton, styles.carouselNextBtn].join(" ")}
        onClick={() => {
          nextSlide()
        }}
      >
        <Image src="/right-arrow.svg" width={30} height={100} />
      </button>

      <div className={styles.circleBtnsContainer}>
        {[...Array(length)].map((elm, idx) => {
          return (
            <div
              style={
                idx === currentImage ? { opacity: "75%" } : { opacity: "30%" }
              }
              className={styles.circleBtn}
              key={idx}
              onClick={() => {
                setCurrentImage(idx)
              }}
            >
              <Image
                src="/circle.svg"
                width={24}
                height={24}
                alt={`promotion ${idx + 1}`}
              />
            </div>
          )
        })}
      </div>

      <div className={styles.slideContainer}>
        {slides.map((slide, idx) => {
          return (
            <div
              key={idx}
              className={
                idx === currentImage
                  ? [styles.slide, styles.slideActive].join(" ")
                  : styles.slide
              }
            >
              {idx === currentImage && (
                <Image
                  key={idx}
                  src={slide.image}
                  // width={1920}
                  // height={1080}
                  layout="fill"
                  alt="Sky"
                  className={styles.image}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Carousel
