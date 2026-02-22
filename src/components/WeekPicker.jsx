import { useRef, useEffect } from 'react'

export default function WeekPicker({ selected, current, onSelect }) {
  const scrollRef = useRef(null)
  const btnRefs   = useRef({})

  useEffect(() => {
    const btn = btnRefs.current[selected]
    const wrap = scrollRef.current
    if (!btn || !wrap) return
    const center = btn.offsetLeft + btn.offsetWidth / 2
    wrap.scrollLeft = center - wrap.offsetWidth / 2
  }, [selected])

  return (
    <div className="week-picker-scroll" ref={scrollRef}>
      <div className="week-picker-row">
        {Array.from({ length: 16 }, (_, i) => i + 1).map(w => {
          const isSel  = w === selected
          const isCur  = w === current
          const isPast = w < current && !isSel
          return (
            <button
              key={w}
              ref={el => (btnRefs.current[w] = el)}
              className={['week-btn', isSel && 'sel', isPast && 'past'].filter(Boolean).join(' ')}
              onClick={() => onSelect(w)}
            >
              <span className="week-btn-num">{w}</span>
              <span className="week-dot" style={{ background: isCur ? '#C8956C' : 'transparent' }} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
