import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import styles from "./Navbar.module.scss"
import useDebounce from "../../utils/useDebounce"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

export default function Navbar() {
  const items = useSelector((state) => state.items.value)

  const { data: session } = useSession()
  const router = useRouter()
  if (session) {
    console.log(session.user)
  }
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery, 250)
  const [filteredItems, setFilteredItems] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [showAuthBtns, setShowAuthBtns] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)

  const resultsRef = useRef(null)

  //show/hide search results
  useEffect(() => {
    debouncedSearchQuery.length > 0
      ? setShowSearchResults(true)
      : setShowSearchResults(false)
  }, [debouncedSearchQuery])

  //filter search results
  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      )
    )
  }, [debouncedSearchQuery])

  const handleOutsideResultsClick = (e) => {
    if (
      resultsRef.current &&
      !resultsRef.current.contains(e.target) &&
      e.target.id != "search"
    ) {
      setShowSearchResults(false)
    }
  }

  // event listener to listen to clicks outside of search results box
  useEffect(() => {
    if (showSearchResults == true)
      document.addEventListener("click", handleOutsideResultsClick)

    return () => {
      document.removeEventListener("click", handleOutsideResultsClick)
    }
  }, [showSearchResults])

  return (
    <div>
      <div className={styles.navContainer}>
        <Link href="/">
          <div className={styles.logoContainer}>
            <Image
              src="/logo.svg"
              width={260}
              height={53}
              layout="intrinsic"
              alt="SportsClo logo"
            />
          </div>
        </Link>

        <div
          className={
            showSearchBar
              ? [styles.searchBarContainer, styles.searchBarContainerShow].join(
                  " "
                )
              : styles.searchBarContainer
          }
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (searchQuery.length > 0) setShowSearchResults(true)
            }}
            id="search"
          />
          {showSearchResults && (
            <div ref={resultsRef} className={styles.searchResultsPopup}>
              <ul>
                {filteredItems.map((item, idx) => (
                  <li
                    onClick={() => {
                      console.log(item.name)
                      setShowSearchResults(false)
                      setSearchQuery("")
                    }}
                    key={idx}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.right}>
          <div
            className={
              showSearchBar ? styles.searchCloseIcon : styles.searchIconWrapper
            }
            onClick={() => {
              setShowSearchBar(!showSearchBar)
              setShowAuthBtns(false)
              setShowCart(false)
            }}
          >
            <Image
              src={showSearchBar ? "/close.svg" : "/search.svg"}
              width={30}
              height={35}
              alt="search icon"
            />
          </div>

          <div
            className={
              showAuthBtns
                ? [styles.authBtnsContainer, styles.authBtnsContainerShow].join(
                    " "
                  )
                : styles.authBtnsContainer
            }
          >
            {session ? (
              <>
                <button
                  className={styles.loginBtn}
                  onClick={() => {
                    signOut()
                  }}
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link href="/api/auth/signin">
                  <button
                    className={styles.loginBtn}
                    onClick={() => router.push("/api/auth/signin")}
                  >
                    LOGIN
                  </button>
                </Link>
                <Link href="/signup">
                  <button className={styles.signUpBtn}>SIGN UP</button>
                </Link>
              </>
            )}
          </div>
          {session ? (
            <div
              className={styles.userIcon}
              onClick={() => {
                setShowAuthBtns(!showAuthBtns)
                setShowSearchBar(false)
                setShowCart(false)
              }}
            >
              {session.user.username[0].toUpperCase()}
            </div>
          ) : (
            <div
              className={
                showAuthBtns ? styles.closeIcon : styles.avatarIconWrapper
              }
              onClick={() => {
                setShowAuthBtns(!showAuthBtns)
                setShowSearchBar(false)
                setShowCart(false)
              }}
            >
              <Image
                src={showAuthBtns ? "/close.svg" : "/avatar.svg"}
                height={35}
                width={35}
                alt="User icon"
              />
            </div>
          )}

          <div
            className={showCart ? styles.closeCartIcon : styles.cartWrapper}
            onClick={() => {
              setShowCart(!showCart)
              setShowAuthBtns(false)
              setShowSearchBar(false)
            }}
          >
            <Image
              src={showCart ? "/close.svg" : "/cart.svg"}
              layout="responsive"
              width={35}
              height={35}
              alt="toggle Cart button"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
