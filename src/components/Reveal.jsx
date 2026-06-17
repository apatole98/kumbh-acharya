import React, { useEffect, useRef, useState } from 'react'

/* Scroll-triggered reveal wrapper — fades/slides/scales children into view once visible. */
export default function Reveal({ children, as = 'div', direction = 'up', delay = 0, style, className = '', once = true, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        if (once) obs.disconnect()
      } else if (!once) {
        setVisible(false)
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [once])

  const Tag = as
  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${direction} ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
