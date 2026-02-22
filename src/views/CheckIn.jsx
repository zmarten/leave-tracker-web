import { useRef } from 'react'
import WeekPicker from '../components/WeekPicker'
import CategorySection from '../components/CategorySection'
import { CATEGORIES, LEAVE_START } from '../data/defaultData'

function weekStartDate(week) {
  const d = new Date(LEAVE_START)
  d.setDate(d.getDate() + (week - 1) * 7)
  return d
}

function fmtDate(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function babyAge(week) {
  const months = Math.floor((week - 1) / 4)
  if (months === 0) return 'newborn'
  return `~${months} month${months === 1 ? '' : 's'} old`
}

export default function CheckIn({
  selectedWeek, setSelectedWeek,
  store,
}) {
  const { items, weekNotes, currentWeek, setCurrentWeek, toggleItem, addItem, deleteItem, setWeekNote } = store
  const totalDone  = items.filter(i => i.isCompleted).length
  const totalItems = items.length
  const progress   = totalItems > 0 ? totalDone / totalItems : 0
  const isCurrent  = selectedWeek === currentWeek

  return (
    <div className="view">
      {/* Week title */}
      <div className="week-heading">
        <h1 className="week-number">Week {selectedWeek}</h1>
        <p className="week-sub">
          {fmtDate(weekStartDate(selectedWeek))} &nbsp;·&nbsp; Baby is {babyAge(selectedWeek)}
        </p>
      </div>

      {/* Week picker */}
      <WeekPicker
        selected={selectedWeek}
        current={currentWeek}
        onSelect={setSelectedWeek}
      />

      {/* Actions row */}
      <div className="actions-row">
        {isCurrent ? (
          <span className="current-label">✓ Current Week</span>
        ) : (
          <button className="mark-btn" onClick={() => setCurrentWeek(selectedWeek)}>
            Mark as Current Week
          </button>
        )}
        <span className="prog-label">{totalDone} / {totalItems} done</span>
      </div>

      {/* Progress bar */}
      <div className="prog-wrap">
        <div className="prog-track">
          <div className="prog-fill" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      {/* Note card */}
      <div className="note-card">
        <div className="note-label">WEEK {selectedWeek} NOTES</div>
        <textarea
          className="note-ta"
          placeholder="How's the week going? Any wins, struggles, or things to remember…"
          value={weekNotes[selectedWeek] || ''}
          onChange={e => setWeekNote(selectedWeek, e.target.value)}
        />
      </div>

      {/* Category sections */}
      {CATEGORIES.map(cat => (
        <CategorySection
          key={cat.id}
          category={cat}
          items={items.filter(i => i.categoryId === cat.id)}
          onToggle={toggleItem}
          onAdd={addItem}
          onDelete={deleteItem}
        />
      ))}
    </div>
  )
}
