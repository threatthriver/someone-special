type Props = {
  name: string
  active: 'story' | 'journal'
  onStart: () => void
  onOpenJournal: () => void
}

export default function Navbar({ name, active, onStart, onOpenJournal }: Props) {
  return (
    <nav
      role="navigation"
      aria-label="Main"
      className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 nav-appear"
    >
      <div className={`mx-auto max-w-5xl flex items-center justify-between rounded-2xl bg-gradient-to-r from-white/60 to-white/30 backdrop-blur-xl shadow-lg ring-1 ring-white/40 supports-[backdrop-filter]:bg-white/35 transition-colors ${
        active === 'journal' ? 'shadow-violet-300/20' : 'shadow-pink-300/20'
      }`}>
        <div className="flex items-center gap-2 px-4 py-2 select-none">
          <img src="/heart.svg" alt="" className="h-5 w-5" aria-hidden />
          <span className="text-sm sm:text-base font-semibold tracking-tight text-gray-800">{name}</span>
        </div>
        <div className="px-4 py-2 flex items-center">
          <button
            onClick={onStart}
            aria-current={active === 'story' ? 'page' : undefined}
            className={`group inline-flex items-center gap-2 rounded-full text-xs sm:text-sm px-4 py-2 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 transition ${
              active === 'story'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-400/20 hover:from-pink-600 hover:to-rose-600'
                : 'bg-white/40 text-gray-700 ring-1 ring-black/10 hover:bg-white/60'
            }`}
          >
            Story From My Side
            <span aria-hidden className={`transition-transform ${active === 'story' ? 'group-hover:translate-x-0.5' : 'opacity-50 group-hover:translate-x-0.5'}`}>→</span>
          </button>
          <button
            onClick={onOpenJournal}
            aria-current={active === 'journal' ? 'page' : undefined}
            className={`ml-2 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm shadow-sm ring-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${
              active === 'journal'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white ring-0 shadow-md shadow-pink-400/20 hover:from-pink-600 hover:to-rose-600'
                : 'bg-white/40 text-gray-700 ring-black/10 hover:bg-white/60'
            }`}
          >
            Journal
            <span aria-hidden className={`transition-transform ${active === 'journal' ? 'group-hover:translate-x-0.5' : 'opacity-50 group-hover:translate-x-0.5'}`}>→</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
