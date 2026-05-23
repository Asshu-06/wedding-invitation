import { useEffect, useRef, useState } from 'react'

/**
 * Returns [ref, inView] — attach ref to the section element.
 * Once the section enters the viewport it stays "in-view" permanently.
 */
export default function useHighlight(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, inView]
}
