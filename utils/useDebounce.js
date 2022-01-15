import { useState, useEffect } from "react"

export default function useDebounce(val, timeout) {
  const [debouncedVal, setDebouncedVal] = useState(val)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedVal(val)
    }, timeout)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [val, timeout])

  return debouncedVal
}
