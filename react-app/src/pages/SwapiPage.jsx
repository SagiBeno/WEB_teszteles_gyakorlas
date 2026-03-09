import { useMemo, useState } from 'react'

function SwapiPage() {
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const sortedFilms = useMemo(
    () => [...films].sort((a, b) => a.episode_id - b.episode_id),
    [films],
  )

  async function loadFilms() {
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/swapi-films')
      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error || 'Failed to fetch films.')
      }

      setFilms(payload.films || [])
      setMessage('Films loaded from SWAPI.')
    } catch (fetchError) {
      setError(fetchError.message)
    } finally {
      setLoading(false)
    }
  }

  async function saveFilmsToSupabase() {
    if (films.length === 0) {
      setError('Load films first before storing to Supabase.')
      return
    }

    setSaving(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/save-films', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ films }),
      })
      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error || 'Failed to save films.')
      }

      setMessage(`Saved ${payload.savedCount} films to Supabase.`)
    } catch (saveError) {
      setError(saveError.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="page-section">
      <h2 className="page-title">SWAPI Films</h2>
      <p className="mb-3">
        Fetch films from <code>https://swapi.info/api/films</code> and store them in Supabase
        database <code>swdb</code> through a serverless backend.
      </p>

      <div className="d-flex flex-wrap gap-2 mb-3">
        <button className="btn btn-primary" onClick={loadFilms} disabled={loading}>
          {loading ? 'Loading...' : 'Load Films'}
        </button>
        <button
          className="btn btn-success"
          onClick={saveFilmsToSupabase}
          disabled={saving || films.length === 0}
        >
          {saving ? 'Saving...' : 'Save to Supabase'}
        </button>
      </div>

      {error && <div className="alert alert-danger py-2">{error}</div>}
      {message && <div className="alert alert-info py-2">{message}</div>}

      <div className="row g-3">
        {sortedFilms.map((film) => (
          <div className="col-sm-6 col-xl-4" key={film.episode_id}>
            <article className="film-card">
              <div className="film-badge">Episode {film.episode_id}</div>
              <h3>{film.title}</h3>
              <p className="text-muted mb-2">Director: {film.director}</p>
              <p className="small mb-2">Producer: {film.producer}</p>
              <p className="film-opening">{film.opening_crawl}</p>
              <p className="small mb-0">
                Release date: <strong>{film.release_date}</strong>
              </p>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SwapiPage
