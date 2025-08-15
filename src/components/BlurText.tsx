import React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

export type BlurTextProps = {
  text: string
  delay?: number // in ms before starting children
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  onAnimationComplete?: () => void
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 150,
  animateBy = 'words',
  direction = 'top',
  className,
  onAnimationComplete,
}) => {
  const reduce = useReducedMotion()

  const parts = React.useMemo(() => (
    animateBy === 'letters' ? text.split('') : text.split(' ')
  ), [text, animateBy])

  const baseTranslate = React.useMemo(() => {
    switch (direction) {
      case 'bottom':
        return { y: -8 }
      case 'left':
        return { x: 8 }
      case 'right':
        return { x: -8 }
      case 'top':
      default:
        return { y: 8 }
    }
  }, [direction])

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.06,
        delayChildren: delay / 1000,
      },
    },
  }

  const child: Variants = {
    hidden: {
      filter: reduce ? 'blur(0px)' : 'blur(8px)',
      opacity: reduce ? 1 : 0,
      ...(reduce ? {} : baseTranslate),
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      onAnimationComplete={onAnimationComplete}
    >
      {parts.map((p, i) => (
        <motion.span
          key={i}
          variants={child}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {p}
          {animateBy === 'words' && i < parts.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default BlurText
