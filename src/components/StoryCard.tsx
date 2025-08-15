import type { PropsWithChildren } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type StoryCardProps = PropsWithChildren<{
  isActive: boolean
  direction?: number // 1 forward, -1 backward
}>

export default function StoryCard({ isActive, direction = 1, children }: StoryCardProps) {
  const prefersReducedMotion = useReducedMotion()

  const variants = {
    idle: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.98,
      y: 20,
      rotate: 0,
      transition: { duration: 0.35, ease: 'easeOut' as const },
    },
    enterForward: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
    enterBackward: {
      opacity: 1,
      scale: 1,
      y: -10,
      rotate: -2,
      transition: prefersReducedMotion
        ? { duration: 0.4, ease: 'easeOut' as const }
        : { type: 'spring' as const, stiffness: 260, damping: 24 },
    },
  }

  const currentVariant = isActive
    ? direction >= 0
      ? 'enterForward'
      : 'enterBackward'
    : 'idle'

  return (
    <motion.section
      className="absolute inset-0 w-full h-full flex items-center justify-center p-6 md:p-8"
      variants={variants}
      initial={false}
      animate={currentVariant}
      style={{ pointerEvents: isActive ? 'auto' : 'none' }}
      aria-hidden={!isActive}
    >
      <div
        className={`card glass relative overflow-hidden max-w-3xl w-full mx-auto text-center
        rounded-3xl shadow-2xl ring-1 ring-white/40
        px-6 py-12 md:px-10 md:py-16
        before:content-[''] before:absolute before:-top-24 before:-left-24 before:h-72 before:w-72 before:rounded-full before:bg-pink-200/40 before:blur-3xl
        after:content-[''] after:absolute after:-bottom-24 after:-right-24 after:h-72 after:w-72 after:rounded-full after:bg-violet-200/40 after:blur-3xl${isActive ? ' story-card-glow' : ''}`}
      >
        {children}
      </div>
    </motion.section>
  )
}
