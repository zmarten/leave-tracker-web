import { useState } from 'react'
import { useStore } from './hooks/useStore'
import CheckIn  from './views/CheckIn'
import AllItems from './views/AllItems'
import Overview from './views/Overview'
import './App.css'

const TABS = [
  { id: 0, label: 'Check-In', icon: '⌂' },
  { id: 1, label: 'All Items', icon: '≡' },
  { id: 2, label: 'Overview', icon: '◫' },
]

export default function App() {
  const store = useStore()
  const [activeTab,    setActiveTab]    = useState(0)
  const [selectedWeek, setSelectedWeek] = useState(store.currentWeek)

  function goToWeek(week) {
    setSelectedWeek(week)
    setActiveTab(0)
  }

  return (
    <div className="app">
      <main className="content">
        {activeTab === 0 && (
          <CheckIn
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
            store={store}
          />
        )}
        {activeTab === 1 && <AllItems store={store} />}
        {activeTab === 2 && <Overview store={store} onSelectWeek={goToWeek} />}
      </main>

      <nav className="tab-bar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
