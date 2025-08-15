import { useEffect } from 'react'

export default function Journal() {
  // Ensure we start at top when opening the journal
  useEffect(() => {
    try { window.scrollTo({ top: 0, behavior: 'smooth' }) } catch {}
  }, [])

  const sections = [
    { id: 'from-my-side', title: 'A Note From My Side' },
    // Additional sections can be appended here later
  ] as const

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex gap-4 md:gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <nav aria-label="Journal sections" className="sticky top-4">
            <div className="rounded-2xl bg-white/60 backdrop-blur-xl ring-1 ring-black/5 shadow-lg p-3">
              <h3 className="px-2 py-2 text-sm font-semibold text-gray-700">Sections</h3>
              <ul className="space-y-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      className="block rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
                      href={`#${s.id}`}
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
        <section className="flex-1 overflow-y-auto">
          <div className="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-black/5 shadow-xl p-6 sm:p-8 md:p-10 max-w-3xl mx-auto">
            {/* Section: From My Side */}
            <article id="from-my-side" className="scroll-mt-24">
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight">A Note From My Side</h2>
              <p className="mt-4 text-gray-700 leading-relaxed">
                I know I haven’t said this properly. I never looked at you in any wrong way, nor thought of you like that. If there were mistakes, I’ve already paid for them in full. I’ve always seen you with deep respect—almost like something sacred—and even now, there’s no one like you in my eyes.
              </p>
              <p className="mt-3 text-gray-700 leading-relaxed">
                There isn’t much about me that people usually like. Back in school, you were unique—truly different from everyone else. I lived carelessly for a while; when I finally tried to fix things, they only seemed to break more. Now I’m at a place where it feels like I have so little left. At home, Dad is distant. Mom worries and sometimes speaks sharply. I spent most of my life in front of a computer; in many ways, it felt like my story had ended before it even began.
              </p>
              <p className="mt-3 text-gray-700 leading-relaxed">
                This might sound strange, but one night, lying awake and chatting, I made a quiet wish: even if it’s not written for us to be together in this lifetime, then at least—at the very end—let me meet you once. That would be my last wish. It may sound unreal, but it was real for me. Things had gotten so bad that even I don’t remember if I cried; maybe I did. Someone once showed a photo of you with someone close; even then I kept quiet… because in the real world, feelings don’t always hold value.
              </p>
              <p className="mt-6 text-gray-800 italic">
                I’m not asking for anything. I just wanted you to know where my heart has been—honest, imperfect, but always respectful toward you.
              </p>
            </article>
          </div>
        </section>
      </div>
    </div>
  )
}
