import { useEffect, useMemo } from 'react'

const HEARTS = ['💖', '💕', '💗']

export default function FloatingHearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${8 + Math.random() * 84}%`,
      delay: -Math.random() * 8,
      duration: 10 + Math.random() * 8,
      size: 1.25 + Math.random() * 1.5,
      char: HEARTS[i % HEARTS.length],
    }))
  }, [])

  // Reduce motion for users who prefer it
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) {
      const container = document.querySelector('.hearts-container') as HTMLElement | null
      if (container) container.style.display = 'none'
    }
  }, [])

  return (
    <div className="hearts-container">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="heart"
          style={{ left: h.left, animationDelay: `${h.delay}s`, animationDuration: `${h.duration}s`, fontSize: `${h.size}rem` }}
        >
          {h.char}
        </div>
      ))}
    </div>
  )
}
