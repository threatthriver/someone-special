import { useEffect, useState } from 'react'

export default function Preloader() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const onLoad = () => {
      setTimeout(() => setLoaded(true), 500)
    }
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <div id="preloader" className={loaded ? 'loaded' : ''}>
      <div className="loader-heart">💖</div>
    </div>
  )
}
