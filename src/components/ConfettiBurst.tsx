import { useEffect, useMemo, useState } from 'react'

type ConfettiBurstProps = {
  active: boolean
  count?: number
  emojis?: string[]
}

export default function ConfettiBurst({ active, count = 28, emojis = ['💖', '✨', '🌸', '💫', '💕'] }: ConfettiBurstProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.2,
      duration: 1.2 + Math.random() * 0.9,
      size: 1.2 + Math.random() * 0.8,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }))
  }, [count, emojis, active])

  if (!active || !mounted) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      {items.map((p) => (
        <span
          key={p.id}
          className="confetti-piece select-none"
          style={{
            left: `${p.left}%`,
            top: '20%',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}rem`,
          }}
          aria-hidden
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}
