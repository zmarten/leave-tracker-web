import { useState } from 'react'
import Checkbox from '../components/Checkbox'
import { CATEGORIES } from '../data/defaultData'

export default function AllItems({ store }) {
  const { items, toggleItem, addItem, deleteItem } = store

  return (
    <div className="view">
      <h1 className="nav-title">All Items</h1>
      {CATEGORIES.map(cat => {
        const catItems = items.filter(i => i.categoryId === cat.id)
        const done     = catItems.filter(i => i.isCompleted).length
        return (
          <div key={cat.id} className="group">
            <div className="group-header">
              <span className="group-icon">{cat.icon}</span>
              <span className="group-label">{cat.label.toUpperCase()}</span>
              <span className="group-count">{done}/{catItems.length}</span>
            </div>
            <div className="group-card">
              {catItems.map((item, i) => (
                <AllItemRow
                  key={item.id}
                  item={item}
                  color={cat.color}
                  onToggle={() => toggleItem(item.id)}
                  onDelete={() => deleteItem(item.id)}
                  divider={i < catItems.length - 1}
                />
              ))}
              <AddItemRow color={cat.color} onAdd={text => addItem(cat.id, text)} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function AllItemRow({ item, color, onToggle, onDelete, divider }) {
  const [swiped, setSwiped] = useState(false)
  const startX = { current: null }

  return (
    <div className="item-wrap">
      <div
        className={`item-row ${swiped ? 'swiped' : ''}`}
        onTouchStart={e => (startX.current = e.touches[0].clientX)}
        onTouchEnd={e => {
          const dx = (startX.current ?? e.changedTouches[0].clientX) - e.changedTouches[0].clientX
          if (dx > 60) setSwiped(true)
          else if (dx < -20) setSwiped(false)
        }}
      >
        <Checkbox checked={item.isCompleted} color={color} onChange={onToggle} />
        <span className={`item-text ${item.isCompleted ? 'done' : ''}`} onClick={onToggle}>
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

function AddItemRow({ color, onAdd }) {
  const [editing, setEditing] = useState(false)
  const [text, setText]       = useState('')

  function commit() {
    if (text.trim()) { onAdd(text); setText('') }
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="add-row">
        <input
          autoFocus
          className="add-input"
          placeholder="New item…"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); commit() } if (e.key === 'Escape') setEditing(false) }}
          onBlur={commit}
        />
      </div>
    )
  }

  return (
    <button className="add-item-row" style={{ color }} onClick={() => setEditing(true)}>
      <span style={{ fontSize: 20 }}>＋</span>
      <span>Add item</span>
    </button>
  )
}
