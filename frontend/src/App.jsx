import { useState } from "react";

function App() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [target, setTarget] = useState("");
  const [showResults, setShowResults] = useState(false);

  const analyzeCareer = () => {
    if (!role || !skills || !target) {
      alert("Please fill all three fields.");
      return;
    }

    setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="logo">
            Skill<span>Transfer</span>
          </div>
          <button
            className="back-btn"
            onClick={() => setShowResults(false)}
          >
            ← New Analysis
          </button>
        </nav>

        <main className="results-page">
          <div className="result-header">
            <p className="badge">YOUR CAREER GPS</p>

            <h1>
              {role} → {target}
            </h1>

            <p>
              You don't need to start from zero. Here's how your existing
              experience can move you toward your target career.
            </p>
          </div>

          <div className="grid">
            <div className="result-card">
              <div className="card-icon">✓</div>
              <h2>Skills You Already Have</h2>

              {skills.split(",").map((skill, index) => (
                <span className="skill" key={index}>
                  {skill.trim()}
                </span>
              ))}
            </div>

            <div className="result-card">
              <div className="card-icon">↗</div>
              <h2>Transferable Skills</h2>

              <div className="transfer-item">
                <strong>Customer Understanding</strong>
                <p>
                  Your experience working with customers helps you understand
                  user needs.
                </p>
              </div>

              <div className="transfer-item">
                <strong>Communication</strong>
                <p>
                  Your communication experience transfers to cross-functional
                  product teams.
                </p>
              </div>

              <div className="transfer-item">
                <strong>Negotiation</strong>
                <p>
                  Negotiation skills help with stakeholder and priority
                  management.
                </p>
              </div>
            </div>

            <div className="result-card">
              <div className="card-icon gap">!</div>
              <h2>Skills You Need</h2>

              <span className="gap-skill">Product Analytics</span>
              <span className="gap-skill">Product Strategy</span>
              <span className="gap-skill">User Research</span>
              <span className="gap-skill">Agile & Scrum</span>
            </div>
          </div>

          <section className="gps">
            <div>
              <p className="badge">CAREER GPS</p>
              <h2>Your transition path</h2>
              <p>
                We turn your skill gaps into a practical journey.
              </p>
            </div>

            <div className="path">
              <div className="path-step active">
                <span>1</span>
                <strong>Learn</strong>
                <small>Build missing knowledge</small>
              </div>

              <div className="line" />

              <div className="path-step">
                <span>2</span>
                <strong>Practice</strong>
                <small>Apply your knowledge</small>
              </div>

              <div className="line" />

              <div className="path-step">
                <span>3</span>
                <strong>Build</strong>
                <small>Create proof of skill</small>
              </div>

              <div className="line" />

              <div className="path-step">
                <span>4</span>
                <strong>Apply</strong>
                <small>Target real opportunities</small>
              </div>
            </div>
          </section>

          <section className="what-if">
            <div>
              <p className="badge">WHAT-IF SIMULATOR</p>
              <h2>What if you choose another career?</h2>
              <p>
                Your skills can open more than one door.
              </p>
            </div>

            <div className="career-options">
              <div>Customer Success Manager →</div>
              <div>Business Development Manager →</div>
              <div>Product Operations →</div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          Skill<span>Transfer</span>
        </div>

        <div className="nav-links">
          <span>Career GPS</span>
          <span>How It Works</span>
        </div>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <p className="badge">AI-POWERED CAREER TRANSITION</p>

          <h1>
            Don't start from zero.
            <br />
            <span>Discover where your skills can take you.</span>
          </h1>

          <p className="hero-text">
            Your current experience may already contain the skills needed for
            your next career. Find your transferable skills, discover career
            paths, and get a roadmap to move forward.
          </p>

          <div className="profile-card">
            <h2>Build Your Career Profile</h2>
            <p className="muted">
              Tell us where you are and where you want to go.
            </p>

            <label>Current Role</label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Sales Executive"
            />

            <label>Your Skills</label>
            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. Communication, Negotiation, CRM"
            />

            <label>Target Career</label>
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g. Product Manager"
            />

            <button onClick={analyzeCareer}>
              Discover My Career Paths →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;