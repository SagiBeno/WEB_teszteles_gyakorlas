import { useEffect, useState } from 'react'

const colors = ['red', 'yellow', 'green']
const stages = [['red'], ['red', 'yellow'], ['green'], ['yellow']]
const STAGE_INTERVAL_MS = 1700

export default function LampPage() {
  const [running, setRunning] = useState(false)
  const [activeStageIndex, setActiveStageIndex] = useState(0)

  useEffect(() => {
    if (!running) {
      return undefined
    }

    const timerId = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % stages.length)
    }, STAGE_INTERVAL_MS)

    return () => clearInterval(timerId)
  }, [running])

  const activeColors = stages[activeStageIndex]

  return (
    <section className="page-section">
      <h2 className="page-title">Traffic Lamp Demo</h2>
      <p className="mb-3">
        Press start to run this sequence: red, red+yellow, green, yellow, then repeat.
      </p>

      <div className="lamp-box">
        {colors.map((color) => (
          <div
            className={`lamp-light ${color} ${activeColors.includes(color) ? 'active' : ''}`}
            key={color}
            role="img"
            aria-label={`${color} lamp`}
          />
        ))}
      </div>

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-primary" onClick={() => setRunning(true)}>
          Start
        </button>
        <button className="btn btn-secondary" onClick={() => setRunning(false)}>
          Stop
        </button>
      </div>
    </section>
  )
}
