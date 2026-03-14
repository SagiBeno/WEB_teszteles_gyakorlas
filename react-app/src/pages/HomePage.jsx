export default function HomePage() {
  return (
    <section className="page-section">
      <div className="hero-panel">
        <h2 className="page-title">Welcome</h2>
        <p className="lead mb-3">
          This demo site is prepared for students to learn frontend and backend integration
          on Vercel using React and serverless functions.
        </p>
        <div className="row g-3 mt-1">
          <div className="col-md-4">
            <div className="feature-card">
              <h3>SWAPI</h3>
              <p>Load Star Wars films from SWAPI and save them into Supabase.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">
              <h3>Lamp</h3>
              <p>Visualize a traffic light with animated red-yellow-green flashing cycles.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">
              <h3>Voting</h3>
              <p>Submit student votes for a teacher birthday present via backend API.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
