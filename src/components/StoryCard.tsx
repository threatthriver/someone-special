import { useRef, type PropsWithChildren, type MouseEvent } from 'react'
import { motion, useReducedMotion, useMotionValue, useTransform } from 'framer-motion'

type StoryCardProps = PropsWithChildren<{
  isActive: boolean
  direction?: number // 1 forward, -1 backward
}>

export default function StoryCard({ isActive, direction = 1, children }: StoryCardProps) {
  const prefersReducedMotion = useReducedMotion()

  // Subtle 3D tilt based on cursor position (respects reduced motion)
  const cardRef = useRef<HTMLDivElement>(null)
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const rotX = useTransform(mvY, [-0.5, 0.5], [6, -6])
  const rotY = useTransform(mvX, [-0.5, 0.5], [-6, 6])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !isActive) return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    mvX.set(px)
    mvY.set(py)
  }

  const handleMouseLeave = () => {
    mvX.set(0)
    mvY.set(0)
  }

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
      {/* Gradient border wrapper */}
      <div className={`group relative rounded-3xl p-[2px] max-w-3xl w-full mx-auto ${
        isActive
          ? 'bg-[conic-gradient(at_10%_10%,#f9a8d4,#c4b5fd,#f9a8d4)]'
          : 'bg-white/30'
      }`}>
        <motion.div
          ref={cardRef}
          className={`card glass relative overflow-hidden w-full text-center
          rounded-3xl shadow-2xl ring-1 ring-white/40
          px-6 py-12 md:px-10 md:py-16
          before:content-[''] before:absolute before:-top-24 before:-left-24 before:h-72 before:w-72 before:rounded-full before:bg-pink-200/40 before:blur-3xl
          after:content-[''] after:absolute after:-bottom-24 after:-right-24 after:h-72 after:w-72 after:rounded-full after:bg-violet-200/40 after:blur-3xl${
            isActive ? ' story-card-glow' : ''
          }`}
          style={{
            rotateX: prefersReducedMotion ? 0 : rotX,
            rotateY: prefersReducedMotion ? 0 : rotY,
            transformPerspective: 900,
          }}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {children}
          {/* Sheen overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="sheen" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
