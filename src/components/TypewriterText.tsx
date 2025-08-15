import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function TypewriterText({ text, speed = 35, className = '' }: { text: string; speed?: number; className?: string }) {
  const prefersReducedMotion = useReducedMotion()
  const [shown, setShown] = useState(prefersReducedMotion ? text : '')
  const chars = useMemo(() => Array.from(text), [text])

  useEffect(() => {
    if (prefersReducedMotion) {
      setShown(text)
      return
    }
    setShown('')
    let i = 0
    const id = setInterval(() => {
      i++
      setShown(chars.slice(0, i).join(''))
      if (i >= chars.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed, chars, prefersReducedMotion])

  return <span className={className} aria-live="polite">{shown}</span>
}
