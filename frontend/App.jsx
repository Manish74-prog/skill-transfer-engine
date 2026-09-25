import React, { useState } from "react";

export default function App() {
  const [currentRole, setCurrentRole] = useState("");
  const [skills, setSkills] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [results, setResults] = useState(null);

  const handleAnalyze = () => {
    const skillList = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    setResults({
      currentRole,
      targetRole,
      existingSkills: skillList,
      transferableSkills: [
        {
          name: "Communication",
          reason:
            "Your communication experience can transfer directly to cross-functional teamwork."
        },
        {
          name: "Customer Understanding",
          reason:
            "Your experience working with customers helps you understand user needs."
        },
        {
          name: "Problem Solving",
          reason:
            "Handling real-world customer problems develops structured problem-solving."
        }
      ],
      skillGaps: [
        "Product Strategy",
        "Product Analytics",
        "User Research",
        "Agile & Scrum"
      ],
      alternativeCareers: [
        "Customer Success Manager",
        "Business Development Manager",
        "Product Operations"
      ]
    });
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          Skill<span>Transfer</span>
        </div>

        <div className="nav-links">
          <span>Career GPS</span>
          <span>How It Works</span>
        </div>
      </nav>

      {!results ? (
        /* LANDING PAGE */
        <section className="hero">
          <div className="hero-content">

            <div className="badge">
              AI-POWERED CAREER TRANSITION
            </div>

            <h1>
              Don't start from zero.
              <br />
              <span>Discover where your skills can take you.</span>
            </h1>

            <p className="hero-text">
              Your current experience may already contain the skills needed
              for your next career. Find your transferable skills, discover
              career paths, and get a roadmap to move forward.
            </p>

            <div className="profile-card">

              <h2>Build Your Career Profile</h2>

              <p className="muted">
                Tell us where you are and where you want to go.
              </p>

              <label>Current Role</label>

              <input
                type="text"
                placeholder="e.g. Sales Executive"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
              />

              <label>Your Skills</label>

              <input
                type="text"
                placeholder="e.g. Communication, Negotiation, CRM"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />

              <label>Target Career</label>

              <input
                type="text"
                placeholder="e.g. Product Manager"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              />

              <button onClick={handleAnalyze}>
                Discover My Career Paths →
              </button>

            </div>
          </div>
        </section>
      ) : (
        /* RESULTS PAGE */
        <section className="results-page">

          <div className="result-header">

            <div className="badge">
              YOUR CAREER TRANSITION
            </div>

            <h1>
              {currentRole} → {targetRole}
            </h1>

            <p>
              Your existing experience already gives you a starting point.
            </p>

          </div>

          <div className="grid">

            {/* EXISTING SKILLS */}
            <div className="result-card">

              <h2>✓ Existing Skills</h2>

              <p>
                Skills you already have.
              </p>

              <div>
                {results.existingSkills.map((skill, index) => (
                  <span className="skill" key={index}>
                    {skill}
                  </span>
                ))}
              </div>

            </div>

            {/* TRANSFERABLE SKILLS */}
            <div className="result-card">

              <h2>↗ Transferable Skills</h2>

              <p>
                Skills that can move with you.
              </p>

              {results.transferableSkills.map((skill, index) => (
                <div className="transfer-item" key={index}>

                  <strong>{skill.name}</strong>

                  <p>{skill.reason}</p>

                </div>
              ))}

            </div>

            {/* SKILL GAPS */}
            <div className="result-card">

              <h2>! Skill Gaps</h2>

              <p>
                Skills you need to develop.
              </p>

              <div>
                {results.skillGaps.map((skill, index) => (
                  <span className="gap-skill" key={index}>
                    {skill}
                  </span>
                ))}
              </div>

            </div>

          </div>

          {/* CAREER GPS */}
          <div className="gps">

            <h2>Career GPS</h2>

            <p>
              Your transition can happen step by step instead of starting
              from zero.
            </p>

            <div className="path">

              <div className="path-step active">
                <span>1</span>
                <strong>Current</strong>
                <small>{currentRole}</small>
              </div>

              <div className="line"></div>

              <div className="path-step active">
                <span>2</span>
                <strong>Transfer</strong>
                <small>Build on existing skills</small>
              </div>

              <div className="line"></div>

              <div className="path-step">
                <span>3</span>
                <strong>Target</strong>
                <small>{targetRole}</small>
              </div>

            </div>

          </div>

          {/* ALTERNATIVE CAREERS */}
          <div className="what-if">

            <h2>What-If Career Simulator</h2>

            <p>
              Your skills can open multiple career routes.
            </p>

            <div className="career-options">

              {results.alternativeCareers.map((career, index) => (
                <div key={index}>
                  {career}
                </div>
              ))}

            </div>

          </div>
          {/* CAREER ROADMAP */}
<div className="what-if">

  <h2>Your Transition Roadmap</h2>

  <p>
    Move from your current role to your target career step by step.
  </p>

  <div className="career-options">

    <div>
      <strong>1. LEARN</strong>
      <p>Product Strategy</p>
      <p>Product Analytics</p>
    </div>

    <div>
      <strong>2. PRACTICE</strong>
      <p>Case Studies</p>
      <p>User Research</p>
    </div>

    <div>
      <strong>3. BUILD</strong>
      <p>Product Case Study</p>
      <p>Simple PRD</p>
    </div>

    <div>
      <strong>4. APPLY</strong>
      <p>APM Roles</p>
      <p>Product Internships</p>
    </div>

  </div>

</div>
{/* SKILL GRAPH */}
<div className="what-if">

  <div className="badge">SKILL GRAPH</div>

  <h2>How Your Skills Connect</h2>

  <p>
    Your existing skills create bridges toward your target career.
  </p>

  <div className="skill-graph">

    <div className="graph-column">
      <h3>Your Skills</h3>

      <div className="graph-node existing">
        Communication
      </div>

      <div className="graph-node existing">
        Negotiation
      </div>

      <div className="graph-node existing">
        Customer Handling
      </div>
    </div>

    <div className="graph-arrow">
      →
    </div>

    <div className="graph-column">
      <h3>Transferable</h3>

      <div className="graph-node transfer">
        Customer Understanding
      </div>

      <div className="graph-node transfer">
        Stakeholder Communication
      </div>

      <div className="graph-node transfer">
        Problem Solving
      </div>
    </div>

    <div className="graph-arrow">
      →
    </div>

    <div className="graph-column">
      <h3>Target Career</h3>

      <div className="graph-node target">
        {targetRole}
      </div>
    </div>

  </div>

</div>
          <button
            onClick={() => setResults(null)}
            style={{
              marginTop: "25px",
              padding: "14px 25px",
              border: "none",
              borderRadius: "10px",
              background: "#6257e8",
              color: "white",
              cursor: "pointer"
            }}
          >
            ← Try Another Career
          </button>

        </section>
      )}

    </div>
  );
}