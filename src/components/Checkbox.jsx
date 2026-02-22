export default function Checkbox({ checked, color, onChange }) {
  return (
    <button
      className="checkbox"
      onClick={onChange}
      aria-checked={checked}
      role="checkbox"
      style={{
        borderColor: checked ? color : `${color}80`,
        background: checked ? color : 'transparent',
      }}
    >
      {checked && <span className="checkbox-check">✓</span>}
    </button>
  )
}
