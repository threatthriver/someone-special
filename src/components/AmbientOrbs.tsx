import { useMemo } from 'react'

export default function AmbientOrbs() {
  // Precompute a few softly colored orbs with varied sizes/positions
  const orbs = useMemo(
    () => [
      { left: '8%', top: '12%', size: 280, colorA: '#fbcfe8', colorB: 'rgba(251, 207, 232, 0)' }, // pink-200
      { right: '6%', top: '18%', size: 340, colorA: '#ddd6fe', colorB: 'rgba(221, 214, 254, 0)' }, // violet-200
      { left: '12%', bottom: '10%', size: 320, colorA: '#fde68a', colorB: 'rgba(253, 230, 138, 0)' }, // amber-200
      { right: '14%', bottom: '8%', size: 260, colorA: '#bfdbfe', colorB: 'rgba(191, 219, 254, 0)' }, // sky-200
    ],
    []
  )

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {orbs.map((o, i) => (
        <span
          key={i}
          className="orb animate-orbFloat"
          style={{
            ...o,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle at 30% 30%, ${o.colorA}, ${o.colorB} 60%)`,
            animationDelay: `${i * 1.3}s`,
            // Vary duration a bit per orb for organic motion
            // @ts-ignore custom CSS var used in stylesheet
            '--orb-duration': `${12 + i * 2}s`,
          } as React.CSSProperties}
          aria-hidden
        />
      ))}
    </div>
  )
}
