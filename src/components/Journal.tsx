import { useEffect, useRef, useState } from 'react'
import userStory from '../assets/stories/story.txt?raw'
import BlurText from './BlurText'

export default function Journal() {
  // Ensure we start at top when opening the journal
  useEffect(() => {
    try { window.scrollTo({ top: 0, behavior: 'smooth' }) } catch {}
  }, [])

  const sections = [
    { id: 'from-my-side', title: 'A Note From My Side' },
    { id: 'maybe-my-behaviour', title: 'You Said Your Behaviour Wasn’t Something Someone Could Love… But I Loved You Anyway' },
  ] as const

  const [activeId, setActiveId] = useState<typeof sections[number]['id']>(sections[0].id)
  const [progress, setProgress] = useState(0)
  const scrollRef = useRef<HTMLElement | null>(null)

  // Normalize the TXT body: strip duplicated title lines if present, keep the rest as-is
  const sectionFullTitle =
    'You Said Your Behaviour Wasn’t Something Someone Could Love… But I Loved You Anyway'
  const storyBody = (() => {
    const trimmed = userStory.replace(/^[\uFEFF\s]*/, '')
    const lines = trimmed.split(/\r?\n/)
    for (let i = 0; i < 2; i++) {
      if (lines[0] && lines[0].trim() === sectionFullTitle) lines.shift()
    }
    return lines.join('\n').trimEnd()
  })()

  // Scroll progress within the content area
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight
      const p = max > 0 ? (el.scrollTop / max) * 100 : 0
      setProgress(Math.max(0, Math.min(100, p)))
    }
    onScroll()
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll as any)
  }, [])

  // Scrollspy for active section
  useEffect(() => {
    const root = scrollRef.current
    if (!root) return
    const opts: IntersectionObserverInit = {
      root,
      rootMargin: '0px 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
    const handler = (entries: IntersectionObserverEntry[]) => {
      // Pick the most visible entry
      let best: IntersectionObserverEntry | null = null
      for (const e of entries) {
        if (!best || e.intersectionRatio > best.intersectionRatio) best = e
      }
      const id = best?.target.getAttribute('id') as typeof sections[number]['id'] | null
      if (id) setActiveId(id)
    }
    const io = new IntersectionObserver(handler, opts)
    for (const s of sections) {
      const node = root.querySelector(`#${s.id}`)
      if (node) io.observe(node)
    }
    return () => io.disconnect()
  }, [])

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-x-0 top-16 bottom-0 p-4 sm:p-6 md:p-8 flex gap-4 md:gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <nav aria-label="Journal sections" className="sticky top-4">
            <div className="rounded-2xl bg-white/60 backdrop-blur-xl ring-1 ring-black/5 shadow-lg p-3">
              <h3 className="px-2 py-2 text-sm font-semibold text-gray-700">Sections</h3>
              <ul className="space-y-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={activeId === s.id ? 'true' : undefined}
                      className={`block rounded-xl px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 transition ${
                        activeId === s.id
                          ? 'bg-pink-50 text-pink-700 ring-1 ring-pink-200'
                          : 'text-gray-700 hover:bg-pink-50 hover:text-pink-700'
                      }`}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <section ref={scrollRef} className="flex-1 overflow-y-auto">
          {/* Reading progress bar */}
          <div className="sticky top-0 z-10 h-1.5 bg-transparent">
            <div
              className="h-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 rounded-r-full shadow-[0_0_8px_rgba(236,72,153,0.35)] transition-[width] duration-200"
              style={{ width: `${progress}%` }}
              aria-hidden
            />
          </div>
          {/* Mobile sections pills */}
          <nav className="md:hidden sticky top-2 z-10 mb-3">
            <div className="flex gap-2 overflow-x-auto no-scrollbar rounded-2xl bg-white/60 backdrop-blur-xl ring-1 ring-black/5 p-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition ${
                    activeId === s.id
                      ? 'bg-white text-pink-700 ring-pink-200'
                      : 'text-gray-700 ring-black/10 hover:bg-white/80'
                  }`}
                >
                  {s.title}
                </a>
              ))}
            </div>
          </nav>

          <div className="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-black/5 shadow-xl p-6 sm:p-8 md:p-10 max-w-3xl mx-auto">
            {/* Section: From My Side */}
            <article id="from-my-side" className="scroll-mt-24">
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
                <BlurText text="A Note From My Side" animateBy="words" direction="top" />
              </h2>
              <div className="prose prose-p:text-gray-700 prose-headings:font-serif prose-headings:tracking-tight max-w-none">
              <p className="mt-4 leading-relaxed first-letter:text-4xl first-letter:font-serif first-letter:mr-1 first-letter:float-left">
                I know I haven’t said this properly, and maybe these words are long overdue. I never looked at you in any wrong way, nor thought of you like that. If there were mistakes in my actions, please know they were never reflections of my heart. I’ve already paid for them in full, in quiet moments of regret. I’ve always seen you with a deep, unwavering respect—almost like something sacred. In my world, you were a light I felt I was not meant to touch, only to admire from a distance. Even now, after all this time, there’s no one like you in my eyes.
              </p>
              <p className="mt-3 leading-relaxed">
                There isn’t much about me that people usually like, or perhaps, that I like about myself. Back in school, you were unique—truly different from everyone else. You had a spark, a way of moving through the world that seemed so effortless and bright. I lived carelessly for a while, lost in my own world. When I finally tried to fix things in my life, they only seemed to break more, leaving me feeling more lost than before. Now I’m at a place where it feels like I have so little left. At home, Dad is distant, lost in his own thoughts. Mom worries, and her words can sometimes be sharp, born from a place of concern that I don't always know how to receive. I spent most of my life in front of a computer, building digital worlds while my own felt empty. In many ways, it felt like my story had ended before it even began.
              </p>
              <p className="mt-3 leading-relaxed">
                This might sound strange, but one night, lying awake and chatting, the city quiet outside my window, I made a quiet wish. It was a prayer sent into the darkness: even if it’s not written for us to be together in this lifetime, then at least—at the very end of my road—let me meet you just once more. That would be my last wish. It may sound unreal, a line from a movie, but it was painfully real for me. Things had gotten so bad that I don’t even remember if I cried; maybe I did, silently. The feeling of hopelessness was a heavy blanket. Someone once showed me a photo of you with someone close, and you looked happy. I kept quiet, burying the ache deep inside… because in the real world, feelings like mine don’t always hold value or change anything.
              </p>
              <p className="mt-6 text-gray-800 italic">
                I’m not asking for anything. I don’t expect this to change a thing. I just wanted you to know where my heart has been all this time—honest, imperfect, but always, always respectful toward you. This is for the boy who was too shy to say it, and the man who is finally brave enough to write it down.
              </p>
              </div>
            </article>

            <hr className="my-10 border-0 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />

            {/* Section: Maybe My Behaviour */}
            <article id="maybe-my-behaviour" className="scroll-mt-24">
              <h2 className="font-ui text-3xl md:text-4xl tracking-tight text-gray-900">
                <BlurText text="You Said Your Behaviour Wasn’t Something Someone Could Love… But I Loved You Anyway" animateBy="words" direction="top" />
              </h2>
              <div className="whitespace-pre-wrap font-ui leading-relaxed md:leading-8 text-gray-800 sm:text-[1.05rem] first-letter:text-4xl first-letter:font-serif first-letter:mr-1 first-letter:float-left">
                {storyBody}
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  )
}
