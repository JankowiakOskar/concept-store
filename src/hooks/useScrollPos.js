import { useState, useEffect } from 'react'

const useScrollPos = (ref) => {
  const [scrollYPos, setScrollYPos] = useState(0)

  useEffect(() => {
    function handleScroll() {
      setScrollYPos(this.scrollY)
    }

    ref.addEventListener('scroll', handleScroll)

    return () => {
      ref.removeEventListener('scroll', handleScroll)
    }
  }, [ref])

  return [scrollYPos]
}

export default useScrollPos
