import { useEffect, useRef, useState } from 'react'
import * as Tone from 'tone'
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const [busy, setBusy] = useState(false)
  const [volume, setVolume] = useState(0.6) // 0..1
  const synthRef = useRef<Tone.PolySynth | null>(null)
  const loopRef = useRef<Tone.Loop | null>(null)
  const reverbRef = useRef<Tone.Reverb | null>(null)
  const gainRef = useRef<Tone.Gain | null>(null)

  useEffect(() => {
    return () => {
      loopRef.current?.stop()
      loopRef.current?.dispose()
      synthRef.current?.dispose()
      reverbRef.current?.dispose()
      gainRef.current?.dispose()
    }
  }, [])

  async function toggle() {
    if (busy) return
    setBusy(true)
    try {
      if (Tone.context.state !== 'running') await Tone.start()

      if (!synthRef.current) {
        const synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'fatsine' },
          envelope: { attack: 0.02, decay: 0.2, sustain: 0.4, release: 1.2 },
          volume: -12,
        })
        const reverb = new Tone.Reverb({ decay: 5, wet: 0.45 })
        const gain = new Tone.Gain(volume)
        synth.connect(reverb)
        reverb.connect(gain)
        gain.toDestination()

        const chords: (string[])[] = [
          ['C4', 'E4', 'G4'],
          ['G3', 'B3', 'D4'],
          ['A3', 'C4', 'E4'],
          ['F3', 'A3', 'C4'],
        ]
        let step = 0
        const loop = new Tone.Loop((time: number) => {
          const chord = chords[step % chords.length]
          synth.triggerAttackRelease(chord, '1n', time)
          step++
        }, '1m').start(0)

        Tone.Transport.bpm.value = 70
        synthRef.current = synth
        loopRef.current = loop
        reverbRef.current = reverb
        gainRef.current = gain
      }

      if (playing) {
        Tone.Transport.stop()
      } else {
        Tone.Transport.start()
      }
      setPlaying(!playing)
    } finally {
      // brief debounce to avoid rapid re-triggering
      setTimeout(() => setBusy(false), 200)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-2 group">
      {/* Volume slider */}
      <div className="opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-all duration-200">
        <label className="sr-only" htmlFor="volume">Volume</label>
        <input
          id="volume"
          type="range"
          min={0}
          max={100}
          value={Math.round(volume * 100)}
          onChange={(e) => {
            const v = Number(e.target.value) / 100
            setVolume(v)
            if (gainRef.current) gainRef.current.gain.rampTo(v, 0.05)
          }}
          className="h-24 w-2 appearance-none bg-white/60 rounded-full outline-none cursor-pointer [writing-mode:bt-lr] rotate-180
                     [accent-color:#ec4899]"
          aria-label="Music volume"
        />
      </div>

      {/* Toggle button */}
      <button
        aria-label={playing ? 'Stop music' : 'Play music'}
        aria-pressed={playing}
        onClick={toggle}
        disabled={busy}
        className={`w-12 h-12 rounded-full glass flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 ${
          busy ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
        }`}
        title={busy ? 'Initializing audio…' : playing ? 'Stop music' : 'Play music'}
      >
        {playing ? (
          <SpeakerXMarkIcon className="w-6 h-6 text-gray-700" />
        ) : (
          <SpeakerWaveIcon className="w-6 h-6 text-gray-700" />
        )}
      </button>
    </div>
  )
}
