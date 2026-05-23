import { useRef, useEffect, useContext, createContext } from 'react'
import { createPortal } from 'react-dom'

/**
 * ParallaxDivider
 *
 * The image is rendered via a React Portal directly into <body> so it is
 * never trapped inside a framer-motion stacking context (opacity/transform
 * break position:fixed).  The slot div reserves height in the normal flow.
 * A rAF-based scroll listener clips the portal image to exactly the slot's
 * viewport rect — no React state, no re-render, no black flash.
 */
export default function ParallaxDivider({ image, height = '420px', children }) {
  const slotRef  = useRef(null)
  const imageRef = useRef(null)
  const rafRef   = useRef(null)

  useEffect(() => {
    const imageEl = imageRef.current
    const slotEl  = slotRef.current
    if (!imageEl || !slotEl) return

    const update = () => {
      const r  = slotEl.getBoundingClientRect()
      const vh = window.innerHeight
      const vw = window.innerWidth
      const top    = Math.max(0, r.top)
      const bottom = Math.max(0, vh - r.bottom)
      const left   = Math.max(0, r.left)
      const right  = Math.max(0, vw - r.right)
      imageEl.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px)`
    }

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update,   { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const portalImage = createPortal(
    <div
      ref={imageRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `url('${image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        clipPath: 'inset(100% 0 0 0)',
        zIndex: 5,          // above page bg, below content sections (zIndex 10)
        pointerEvents: 'none',
        willChange: 'clip-path',
      }}
    />,
    document.body
  )

  return (
    <>
      {portalImage}

      {/* In-flow slot */}
      <div
        ref={slotRef}
        style={{
          position: 'relative',
          width: '100%',
          height: `clamp(300px, 40vw, ${height})`,
          zIndex: 10,
          background: 'transparent',
        }}
      >
        {/* Dark overlay for readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(8, 0, 4, 0.28)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        {children && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 2,
          }}>
            {children}
          </div>
        )}
      </div>
    </>
  )
}
