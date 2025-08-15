import { useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import FloatingHearts from './components/FloatingHearts'
import MusicToggle from './components/MusicToggle'
import StoryCard from './components/StoryCard'
import TypewriterText from './components/TypewriterText'
import ConfettiBurst from './components/ConfettiBurst.tsx'
import smile from './assets/images/smile.png'
import AmbientOrbs from './components/AmbientOrbs'
import Navbar from './components/Navbar'

function App() {
  const totalCards = 8
  const [current, setCurrent] = useState(0)
  const [lastIndex, setLastIndex] = useState(0)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [confettiKey, setConfettiKey] = useState(0)

  const next = () => setCurrent((c) => { setLastIndex(c); return Math.min(c + 1, totalCards - 1) })
  const prev = () => setCurrent((c) => { setLastIndex(c); return Math.max(c - 1, 0) })
  const startStory = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {}
    setCurrent(0)
  }

  const direction = current >= lastIndex ? 1 : -1

  // Set page title with her name
  useEffect(() => {
    document.title = 'Someone Special — Riya'
  }, [])

  // Keyboard navigation: Enter/Space/ArrowRight to advance; ArrowLeft to go back; Esc to close lightbox
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (lightboxSrc) {
        if (e.key === 'Escape') setLightboxSrc(null)
        return
      }
      if (tag && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(tag)) return
      if (['Enter', ' ', 'Spacebar', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxSrc])

  // Wheel (scroll) navigation + touch swipe
  useEffect(() => {
    if (lightboxSrc) return
    let locked = false
    const unlock = () => { locked = false }
    const onWheel = (e: WheelEvent) => {
      if (locked) return
      if (e.deltaY > 20) { next(); locked = true; setTimeout(unlock, 650) }
      else if (e.deltaY < -20) { prev(); locked = true; setTimeout(unlock, 650) }
    }
    let startY = 0
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0]?.clientY ?? 0 }
    const onTouchEnd = (e: TouchEvent) => {
      if (locked) return
      const endY = e.changedTouches[0]?.clientY ?? startY
      const dy = endY - startY
      if (dy < -40) { next(); locked = true; setTimeout(unlock, 700) }
      else if (dy > 40) { prev(); locked = true; setTimeout(unlock, 700) }
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel as any)
      window.removeEventListener('touchstart', onTouchStart as any)
      window.removeEventListener('touchend', onTouchEnd as any)
    }
  }, [lightboxSrc])

  // Auto-focus each card's heading when it becomes active
  useEffect(() => {
    const el = document.querySelector(
      `[data-card-index="${current}"] [data-focus]`
    ) as HTMLElement | null
    if (el) setTimeout(() => el.focus({ preventScroll: true }), 50)
  }, [current])

  // Trigger confetti when the reveal card (index 6) appears
  useEffect(() => {
    if (current === 6) setConfettiKey((k) => k + 1)
  }, [current])

  return (
    <>
      <a
        href="#story-root"
        className="sr-only focus:not-sr-only fixed top-3 left-3 z-[60] rounded-full bg-white/90 px-3 py-1.5 shadow ring-1 ring-black/10"
      >
        Skip to story
      </a>
      <main id="story-root" role="main" className="relative w-full h-screen overflow-hidden">
      <Preloader />
      <FloatingHearts />
      <AmbientOrbs />
      <div className="absolute inset-0 vignette-overlay pointer-events-none -z-10" aria-hidden />
      <Navbar name="Riya" onStart={startStory} />
      <MusicToggle />

      {/* SR-only live region announcing progress */}
      <div aria-live="polite" className="sr-only">{`Step ${current + 1} of ${totalCards}`}</div>

      {/* Card 1: Intro */}
      <StoryCard isActive={current === 0} direction={direction}>
        <div data-card-index="0">
          <h1 tabIndex={-1} data-focus className="font-serif text-5xl md:text-7xl tracking-tight">Hey, Riya</h1>
          <p className="mt-4 text-lg text-gray-600">I've been wanting to tell you something...</p>
          <button onClick={next} className="btn btn-primary mt-8 shadow-lg">Click to start</button>
        </div>
      </StoryCard>

      {/* Card 2: Smile */}
      <StoryCard isActive={current === 1} direction={direction}>
        <div data-card-index="1" className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2">
            <h2 tabIndex={-1} data-focus className="font-serif text-3xl md:text-4xl leading-tight tracking-tight">My world kind of stops for a second...</h2>
            <p className="mt-4 text-gray-600">...whenever you smile. It's like everything else fades away. I'm not even kidding.</p>
            <button onClick={next} className="btn btn-secondary mt-8 shadow-lg">Next →</button>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={smile}
              alt="A picture of her smiling"
              className="rounded-2xl shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </StoryCard>

      {/* Card 3: Talking */}
      <StoryCard isActive={current === 2} direction={direction}>
        <div data-card-index="2" className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2">
            <h2 tabIndex={-1} data-focus className="font-serif text-3xl md:text-4xl leading-tight tracking-tight">And I could talk to you forever.</h2>
            <p className="mt-4 text-gray-600">Hours feel like minutes. You have this way of making everything interesting and making me feel so comfortable.</p>
            <button onClick={next} className="btn btn-primary mt-8 shadow-lg">And... →</button>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://placehold.co/600x700/fde4e4/333?text=A+Candid+Photo"
              alt="A candid picture of her"
              className="rounded-2xl object-cover shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </StoryCard>

      {/* Card 4: Gallery */}
      <StoryCard isActive={current === 3} direction={direction}>
        <div data-card-index="3">
        <h2 tabIndex={-1} data-focus className="font-serif text-4xl md:text-5xl tracking-tight">I find myself thinking about these moments...</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full max-w-2xl">
          <img onClick={() => setLightboxSrc('https://placehold.co/800x1000/e6e6fa/333?text=Memory+1')} src="https://placehold.co/400x500/e6e6fa/333?text=Memory+1" alt="Gallery image 1" className="rounded-xl shadow-lg w-full h-full object-cover cursor-zoom-in" />
          <img onClick={() => setLightboxSrc('https://placehold.co/800x1000/fdfbfb/333?text=Memory+2')} src="https://placehold.co/400x500/fdfbfb/333?text=Memory+2" alt="Gallery image 2" className="rounded-xl shadow-lg w-full h-full object-cover cursor-zoom-in" />
          <img onClick={() => setLightboxSrc('https://placehold.co/800x1000/fde4e4/333?text=Memory+3')} src="https://placehold.co/400x500/fde4e4/333?text=Memory+3" alt="Gallery image 3" className="rounded-xl shadow-lg w-full h-full object-cover cursor-zoom-in" />
        </div>
        <button onClick={next} className="btn btn-secondary mt-8 shadow-lg">Almost done...</button>
        </div>
      </StoryCard>

      {/* Card 5: Poem */}
      <StoryCard isActive={current === 4} direction={direction}>
        <div data-card-index="4">
        <h2 tabIndex={-1} data-focus className="font-serif text-4xl md:text-5xl tracking-tight">A little poem, just for you...</h2>
        <p className="mt-6 text-lg text-gray-700 max-w-xl mx-auto whitespace-pre-wrap">
          <TypewriterText
            text={`A quiet light, a gentle grace,\nThe world feels right when I see your face.\nA cheerful sound, a spirit bright,\nYou make the darkest moments feel so light.`}
            speed={28}
          />
        </p>
        <button onClick={next} className="btn btn-primary mt-8 shadow-lg">So...</button>
        </div>
      </StoryCard>

      {/* Card 6: Final Message */}
      <StoryCard isActive={current === 5} direction={direction}>
        <div data-card-index="5">
        <h2 tabIndex={-1} data-focus className="font-serif text-4xl md:text-6xl font-bold tracking-tight">To be honest...</h2>
        <p className="mt-6 text-xl text-gray-700 max-w-xl mx-auto">Being around you just feels... right. You make everything better, just by being you.</p>
        <div className="text-6xl mt-8">💖</div>
        <button onClick={next} className="btn btn-secondary mt-8 shadow-lg">I guess what I'm trying to say is...</button>
        </div>
      </StoryCard>

      {/* Card 7: Surprise */}
      <StoryCard isActive={current === 6} direction={direction}>
        <div data-card-index="6">
        <h2 tabIndex={-1} data-focus className="font-serif text-4xl md:text-5xl tracking-tight">I really, really like you.</h2>
        <p className="mt-6 text-2xl text-pink-500 font-serif">And I was hoping we could hang out sometime?</p>
        <button onClick={next} className="btn mt-8 opacity-0">.</button>
        </div>
      </StoryCard>

      {/* Card 8: Final */}
      <StoryCard isActive={current === 7} direction={direction}>
        <div data-card-index="7">
        <h2 tabIndex={-1} data-focus className="font-serif text-2xl md:text-3xl text-gray-500 tracking-tight">Made with 💖, just for you.</h2>
        </div>
      </StoryCard>

      {/* Progress dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {Array.from({ length: totalCards }).map((_, i) => (
          <span
            key={i}
            aria-label={`Step ${i + 1} of ${totalCards}`}
            className={`h-2.5 rounded-full transition-all ${
              i === current ? 'w-6 bg-pink-500 scale-125 ring-2 ring-pink-300' : 'w-2.5 bg-gray-300/70'
            }`}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-modal="true"
        >
          <img onClick={(e) => e.stopPropagation()} src={lightboxSrc} alt="Enlarged memory" className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl" />
        </div>
      )}

      {/* Confetti burst on reveal */}
      <ConfettiBurst key={confettiKey} active={current === 6} />
    </main>
    </>
  )
}

export default App
