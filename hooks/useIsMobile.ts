import { useState, useEffect } from 'react'

const MOBILE_WIDTH = 769

export const useIsMobile = () => {
  const [isMobileWidth, setIsMobileWidth] = useState<boolean | null>(null)
  const [, setWidth] = useState<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const getWidth = () => {
      setWidth(window.innerWidth)

      if (window.innerWidth <= MOBILE_WIDTH) {
        setIsMobileWidth(true)
      } else {
        setIsMobileWidth(false)
      }
    }

    window.addEventListener('resize', getWidth)

    getWidth()

    return () => {
      window.removeEventListener('resize', getWidth)
    }
  }, [])

  return {
    isMobile: isMobileWidth,
  }
}
