import { useState, useRef, useEffect } from 'react'
import Checkbox from './Checkbox'

export default function CategorySection({ category, items, onToggle, onAdd, onDelete }) {
  const [adding, setAdding]   = useState(false)
  const [draft, setDraft]     = useState('')
  const inputRef              = useRef(null)

  const incomplete = items.filter(i => !i.isCompleted)
  const done       = items.filter(i =>  i.isCompleted)

  useEffect(() => {
    if (adding) inputRef.current?.focus()
  }, [adding])

  function commitAdd() {
    if (draft.trim()) { onAdd(category.id, draft); setDraft('') }
    else cancelAdd()
  }

  function cancelAdd() { setAdding(false); setDraft('') }

  function handleKey(e) {
    if (e.key === 'Enter')  { e.preventDefault(); commitAdd() }
    if (e.key === 'Escape') cancelAdd()
  }

  return (
    <div className="cat-section">
      {/* Header */}
      <div className="cat-header">
        <span className="cat-icon">{category.icon}</span>
        <span className="cat-name">{category.label}</span>
        <span className="cat-count">{done.length}/{items.length}</span>
        <button
          className="cat-add-btn"
          style={{ color: category.color }}
          onClick={() => setAdding(true)}
          aria-label={`Add item to ${category.label}`}
        >＋</button>
      </div>

      {/* Accent line */}
      <div className="cat-accent" style={{ background: category.color }} />

      {/* Incomplete items */}
      {incomplete.map((item, i) => (
        <ItemRow
          key={item.id}
          item={item}
          color={category.color}
          onToggle={() => onToggle(item.id)}
          onDelete={() => onDelete(item.id)}
          divider={i < incomplete.length - 1}
        />
      ))}

      {/* Done section */}
      {done.length > 0 && (
        <>
          {incomplete.length > 0 && <div className="divider" />}
          <div className="done-label">DONE ✓</div>
          {done.map((item, i) => (
            <ItemRow
              key={item.id}
              item={item}
              color={category.color}
              onToggle={() => onToggle(item.id)}
              onDelete={() => onDelete(item.id)}
              divider={i < done.length - 1}
            />
          ))}
        </>
      )}

      {/* Empty state */}
      {items.length === 0 && !adding && (
        <p className="empty-state">Tap ＋ to add items</p>
      )}

      {/* Inline add */}
      {adding && (
        <div className="add-row">
          <Checkbox checked={false} color={category.color} onChange={() => {}} />
          <input
            ref={inputRef}
            className="add-input"
            placeholder="New item…"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="add-cancel" onClick={cancelAdd}>✕</button>
        </div>
      )}
    </div>
  )
}

function ItemRow({ item, color, onToggle, onDelete, divider }) {
  const [swiped, setSwiped] = useState(false)
  const startX = useRef(null)

  function onTouchStart(e) { startX.current = e.touches[0].clientX }
  function onTouchEnd(e) {
    if (startX.current === null) return
    const dx = startX.current - e.changedTouches[0].clientX
    if (dx > 60) setSwiped(true)
    else if (dx < -20) setSwiped(false)
    startX.current = null
  }

  return (
    <div className="item-wrap">
      <div
        className={`item-row ${swiped ? 'swiped' : ''}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Checkbox checked={item.isCompleted} color={color} onChange={onToggle} />
        <span
          className={`item-text ${item.isCompleted ? 'done' : ''}`}
          onClick={onToggle}
        >
          {item.text}
        </span>
      </div>
      {swiped && (
        <button className="delete-btn" onClick={() => { setSwiped(false); onDelete() }}>
          Delete
        </button>
      )}
      {divider && !swiped && <div className="divider" />}
    </div>
  )
}
