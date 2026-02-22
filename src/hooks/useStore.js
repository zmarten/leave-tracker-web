import { useState, useEffect } from 'react'
import { DEFAULT_ITEMS } from '../data/defaultData'

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v !== null ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

function persist(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* quota */ }
}

export function useStore() {
  const [items, setItems] = useState(() => load('lt_items', DEFAULT_ITEMS))
  const [weekNotes, setWeekNotes] = useState(() => load('lt_weekNotes', {}))
  const [currentWeek, _setCurrentWeek] = useState(() => load('lt_currentWeek', 1))

  useEffect(() => persist('lt_items', items), [items])
  useEffect(() => persist('lt_weekNotes', weekNotes), [weekNotes])
  useEffect(() => persist('lt_currentWeek', currentWeek), [currentWeek])

  function setCurrentWeek(w) {
    _setCurrentWeek(w)
    persist('lt_currentWeek', w)
  }

  function toggleItem(id) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, isCompleted: !i.isCompleted } : i))
  }

  function addItem(categoryId, text) {
    const item = {
      id: crypto.randomUUID(),
      categoryId,
      text: text.trim(),
      isCompleted: false,
      createdAt: new Date().toISOString(),
    }
    setItems(prev => [...prev, item])
  }

  function deleteItem(id) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  function setWeekNote(week, text) {
    setWeekNotes(prev => ({ ...prev, [week]: text }))
  }

  return {
    items,
    weekNotes,
    currentWeek,
    setCurrentWeek,
    toggleItem,
    addItem,
    deleteItem,
    setWeekNote,
  }
}
