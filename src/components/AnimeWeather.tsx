import { useEffect, useMemo, useState } from 'react'

type Mode = 'sakura' | 'rain' | 'snow' | 'clouds'

const MODES: { id: Mode; label: string }[] = [
  { id: 'sakura', label: 'Sakura' },
  { id: 'rain', label: 'Rain' },
  { id: 'snow', label: 'Snow' },
  { id: 'clouds', label: 'Clouds' },
]

export default function AnimeWeather() {
  const [modeIndex, setModeIndex] = useState(0)
  const mode = MODES[modeIndex].id

  // Reduce motion: hide the whole layer
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!media.matches) return
    const el = document.querySelector('.anime-weather') as HTMLElement | null
    if (el) el.style.display = 'none'
  }, [])

  const petals = useMemo(() => (
    Array.from({ length: 24 }).map((_, i) => ({
      key: i,
      left: `${Math.random() * 100}%`,
      delay: `${-Math.random() * 10}s`,
      duration: `${12 + Math.random() * 10}s`,
      size: `${0.9 + Math.random() * 1.3}rem`,
      rotate: `${-30 + Math.random() * 60}deg`,
    }))
  ), [])

  const raindrops = useMemo(() => (
    Array.from({ length: 120 }).map((_, i) => ({
      key: i,
      left: `${Math.random() * 100}%`,
      delay: `${-Math.random() * 4}s`,
      duration: `${0.9 + Math.random() * 0.8}s`,
      height: `${40 + Math.random() * 60}px`,
      opacity: 0.25 + Math.random() * 0.35,
    }))
  ), [])

  const snow = useMemo(() => (
    Array.from({ length: 60 }).map((_, i) => ({
      key: i,
      left: `${Math.random() * 100}%`,
      delay: `${-Math.random() * 12}s`,
      duration: `${10 + Math.random() * 16}s`,
      size: `${0.45 + Math.random() * 0.9}rem`,
      drift: `${-20 + Math.random() * 40}px`,
    }))
  ), [])

  const clouds = useMemo(() => (
    [
      { top: '12%', size: 420, opacity: 0.35, delay: '-6s', duration: '60s' },
      { top: '28%', size: 520, opacity: 0.28, delay: '-12s', duration: '75s' },
      { top: '56%', size: 460, opacity: 0.32, delay: '-18s', duration: '70s' },
    ]
  ), [])

  const cycleMode = () => setModeIndex((i) => (i + 1) % MODES.length)

  return (
    <>
      {/* Layers */}
      <div className="anime-weather pointer-events-none absolute inset-0 -z-10">
        {mode === 'sakura' && (
          <div aria-hidden className="absolute inset-0">
            {petals.map((p) => (
              <span
                key={p.key}
                className="weather-petal select-none"
                style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration, fontSize: p.size, transform: `rotate(${p.rotate})` }}
              >
                🌸
              </span>
            ))}
          </div>
        )}

        {mode === 'rain' && (
          <div aria-hidden className="absolute inset-0">
            {raindrops.map((r) => (
              <span
                key={r.key}
                className="weather-raindrop"
                style={{ left: r.left, animationDelay: r.delay, animationDuration: r.duration, height: r.height, opacity: r.opacity }}
              />
            ))}
          </div>
        )}

        {mode === 'snow' && (
          <div aria-hidden className="absolute inset-0">
            {snow.map((s) => (
              <span
                key={s.key}
                className="weather-snow select-none"
                style={{ left: s.left, animationDelay: s.delay, animationDuration: s.duration, fontSize: s.size, ['--drift' as any]: s.drift }}
              >
                ❄️
              </span>
            ))}
          </div>
        )}

        {mode === 'clouds' && (
          <div aria-hidden className="absolute inset-0">
            {clouds.map((c, i) => (
              <span
                key={i}
                className="weather-cloud"
                style={{ top: c.top as string, width: c.size, height: c.size * 0.55, opacity: c.opacity, animationDelay: c.delay as string, animationDuration: c.duration as string }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Toggle (non-intrusive) */}
      <div className="fixed bottom-5 right-20 z-40">
        <button
          type="button"
          aria-label="Change weather vibe"
          onClick={cycleMode}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-1.5 text-xs font-medium text-gray-700 ring-1 ring-black/10 shadow-sm hover:bg-white"
        >
          <span className="text-base" aria-hidden>
            {mode === 'sakura' ? '🌸' : mode === 'rain' ? '🌧️' : mode === 'snow' ? '❄️' : '☁️'}
          </span>
          {MODES[modeIndex].label}
        </button>
      </div>
    </>
  )
}
