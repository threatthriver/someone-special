type Props = {
  name: string
  onStart: () => void
}

export default function Navbar({ name, onStart }: Props) {
  return (
    <nav
      role="navigation"
      aria-label="Main"
      className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 nav-appear"
    >
      <div className="mx-auto max-w-5xl flex items-center justify-between rounded-2xl bg-gradient-to-r from-white/60 to-white/30 backdrop-blur-xl shadow-lg ring-1 ring-white/40 supports-[backdrop-filter]:bg-white/35 transition-colors">
        <div className="flex items-center gap-2 px-4 py-2 select-none">
          <img src="/heart.svg" alt="" className="h-5 w-5" aria-hidden />
          <span className="text-sm sm:text-base font-semibold tracking-tight text-gray-800">{name}</span>
        </div>
        <div className="px-4 py-2">
          <button
            onClick={onStart}
            className="group inline-flex items-center gap-2 rounded-full bg-pink-500 text-white text-xs sm:text-sm px-4 py-2 shadow-md shadow-pink-400/20 hover:bg-pink-600 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 transition"
          >
            Story From My Side
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
