import { useEffect, useRef, useState } from 'react'

export default function Preloader() {
  const [loaded, setLoaded] = useState(false)
  const startRef = useRef<number>(Date.now())

  useEffect(() => {
    const MIN_DISPLAY_MS = 1200
    const onLoad = () => {
      const elapsed = Date.now() - startRef.current
      const wait = Math.max(MIN_DISPLAY_MS - elapsed, 0)
      const t = window.setTimeout(() => setLoaded(true), wait)
      return () => window.clearTimeout(t)
    }
    if (document.readyState === 'complete') {
      const cleanup = onLoad();
      return cleanup
    } else {
      window.addEventListener('load', onLoad)
      return () => window.removeEventListener('load', onLoad)
    }
  }, [])

  return (
    <div id="preloader" className={loaded ? 'loaded' : ''} aria-hidden={loaded} aria-busy={!loaded} role="status">
      <div className="text-center flex flex-col items-center gap-4 px-6">
        <div className="loader-heart" aria-hidden>💖</div>
        <h1 className="loader-title text-3xl md:text-4xl font-serif tracking-tight">Someone Special</h1>
        <p className="font-ui text-gray-700">
          Loading our little story
          <span className="loading-dots ml-1" aria-hidden>
            <span>.</span><span>.</span><span>.</span>
          </span>
        </p>
        <div className="loader-bar mt-3" aria-hidden>
          <span className="bar-fill" />
        </div>

        <button
          onClick={() => setLoaded(true)}
          className="sr-only focus:not-sr-only fixed bottom-4 right-4 rounded-full bg-white/90 px-3 py-1.5 shadow ring-1 ring-black/10"
        >
          Skip
        </button>
      </div>
    </div>
  )
}
