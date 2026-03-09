import { useState } from 'react'

const teacherOptions = ['Ms. Allen', 'Mr. Rivera', 'Ms. Chen', 'Mr. Thompson']
const giftOptions = ['Flower Bouquet', 'Gift Card', 'Book Collection', 'Classroom Plant']

export default function VotingPage() {
  const [formData, setFormData] = useState({
    studentName: '',
    teacherName: teacherOptions[0],
    giftChoice: giftOptions[0],
    note: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/submit-vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error || 'Vote submission failed.')
      }

      setMessage('Your vote was submitted successfully.')
      setFormData((prev) => ({ ...prev, studentName: '', note: '' }))
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-section">
      <h2 className="page-title">Teacher Birthday Voting</h2>
      <p className="mb-3">
        Submit your preferred birthday present for your teacher through the backend API.
      </p>

      <form className="vote-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="studentName">
            Student Name
          </label>
          <input
            className="form-control"
            id="studentName"
            name="studentName"
            onChange={handleChange}
            required
            value={formData.studentName}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="teacherName">
            Teacher
          </label>
          <select
            className="form-select"
            id="teacherName"
            name="teacherName"
            onChange={handleChange}
            value={formData.teacherName}
          >
            {teacherOptions.map((teacher) => (
              <option key={teacher} value={teacher}>
                {teacher}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="giftChoice">
            Gift Choice
          </label>
          <select
            className="form-select"
            id="giftChoice"
            name="giftChoice"
            onChange={handleChange}
            value={formData.giftChoice}
          >
            {giftOptions.map((gift) => (
              <option key={gift} value={gift}>
                {gift}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="note">
            Note (Optional)
          </label>
          <textarea
            className="form-control"
            id="note"
            name="note"
            onChange={handleChange}
            rows="3"
            value={formData.note}
          />
        </div>

        <button className="btn btn-primary" disabled={loading} type="submit">
          {loading ? 'Submitting...' : 'Submit Vote'}
        </button>
      </form>

      {error && <div className="alert alert-danger mt-3 py-2">{error}</div>}
      {message && <div className="alert alert-success mt-3 py-2">{message}</div>}
    </section>
  )
}
