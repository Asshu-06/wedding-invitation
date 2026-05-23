import { useEffect, useRef } from 'react'

const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(
  typeof navigator !== 'undefined' ? navigator.userAgent : ''
)

export default function Particles() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Fewer particles on mobile to reduce GPU load
    if (isMobile) return

    const container = containerRef.current
    if (!container) return
    const particles = []

    for (let i = 0; i < 14; i++) {
      const el = document.createElement('div')
      const size = Math.random() * 4 + 2
      el.style.cssText = `
        position:absolute;
        width:${size}px;height:${size}px;
        left:${Math.random()*100}%;
        bottom:-10px;
        border-radius:50%;
        background:radial-gradient(circle,rgba(212,175,55,0.5),rgba(212,175,55,0.08));
        animation:floatUp ${Math.random()*10+14}s ${Math.random()*8}s linear infinite;
        pointer-events:none;
        will-change:transform;
      `
      container.appendChild(el)
      particles.push(el)
    }
    return () => particles.forEach(p => p.remove())
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}
    />
  )
}
