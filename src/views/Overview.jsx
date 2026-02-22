import { CATEGORIES, LEAVE_START } from '../data/defaultData'

function fmtDate(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function weekStartDate(week) {
  const d = new Date(LEAVE_START)
  d.setDate(d.getDate() + (week - 1) * 7)
  return d
}

export default function Overview({ store, onSelectWeek }) {
  const { items, weekNotes, currentWeek } = store

  const weeksRemaining = Math.max(0, 17 - currentWeek)
  const leavePct       = Math.round((currentWeek - 1) / 16 * 100)

  const notes = Object.entries(weekNotes)
    .filter(([, t]) => t?.trim())
    .map(([w, t]) => ({ week: +w, text: t }))
    .sort((a, b) => a.week - b.week)

  return (
    <div className="view">
      <h1 className="nav-title">Overview</h1>

      {/* Stats banner */}
      <div className="stats-banner">
        <div>
          <div className="stat-num">{weeksRemaining}</div>
          <div className="stat-lbl">weeks remaining</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="stat-num">{leavePct}%</div>
          <div className="stat-lbl">leave progress</div>
        </div>
      </div>

      {/* Category grid */}
      <div className="progress-grid">
        {CATEGORIES.map(cat => {
          const catItems = items.filter(i => i.categoryId === cat.id)
          const done     = catItems.filter(i => i.isCompleted).length
          const total    = catItems.length
          const pct      = total > 0 ? Math.round(done / total * 100) : 0
          return (
            <div key={cat.id} className="progress-card">
              <div className="pc-header">
                <span className="pc-icon">{cat.icon}</span>
                <span className="pc-pct" style={{ color: cat.color }}>{pct}%</span>
              </div>
              <div className="pc-name">{cat.label}</div>
              <div className="pc-count">{done} of {total} done</div>
              <div className="mini-track">
                <div className="mini-fill" style={{ width: `${pct}%`, background: cat.color }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Week notes history */}
      {notes.length > 0 && (
        <div className="notes-history">
          <div className="notes-history-label">WEEK NOTES</div>
          {notes.map(({ week, text }) => (
            <button
              key={week}
              className="week-note-card"
              onClick={() => onSelectWeek(week)}
            >
              <div className="wn-header">WEEK {week} · {fmtDate(weekStartDate(week))}</div>
              <div className="wn-text">{text.length > 200 ? text.slice(0, 200) + '…' : text}</div>
            </button>
          ))}
        </div>
      )}

      <div style={{ height: 16 }} />
    </div>
  )
}
