import { useState } from "react";

function App() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [target, setTarget] = useState("");

  const [showResults, setShowResults] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const [selectedCareer, setSelectedCareer] = useState("");

  const analysisData = {
    current_role: role || "Sales Executive",
    target_role: target || "Product Manager",

    existing_skills: [
      "Communication",
      "Negotiation",
      "Customer Handling",
      "CRM",
    ],

    transferable_skills: [
      {
        name: "Customer Understanding",
        reason:
          "Your experience working with customers helps you understand user needs and problems.",
      },
      {
        name: "Stakeholder Communication",
        reason:
          "Your communication experience can transfer to working with product teams and stakeholders.",
      },
      {
        name: "Negotiation",
        reason:
          "Negotiation skills are useful when balancing customer, business, and team requirements.",
      },
    ],

    skill_gaps: [
      "Product Analytics",
      "Product Strategy",
      "User Research",
      "Agile & Scrum",
    ],

    alternative_careers: [
      "Customer Success Manager",
      "Business Development Manager",
      "Product Operations",
    ],

    roadmap: {
      learn: [
        "Product Management Fundamentals",
        "Product Analytics",
        "Agile & Scrum",
      ],

      practice: [
        "Analyze an existing product",
        "Write product case studies",
        "Practice user research",
      ],

      build: [
        "Create a Product Improvement Case Study",
        "Create a simple Product Requirements Document",
        "Build a product roadmap",
      ],

      apply: [
        "Apply for Product Internships",
        "Apply for Associate Product Manager roles",
        "Connect with Product Managers",
      ],
    },
  };

  const handleAnalyze = () => {
    if (!role || !skills || !target) {
      alert("Please fill in all three fields.");
      return;
    }

    setShowResults(true);
    setActiveStep(1);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleNewAnalysis = () => {
    setShowResults(false);
    setActiveStep(1);
    setSelectedCareer("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCareerChange = (career) => {
    setSelectedCareer(career);
    setTarget(career);
    setShowResults(true);
    setActiveStep(1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const roadmapContent = {
    1: {
      title: "Learn",
      subtitle: "Build missing knowledge",
      items: analysisData.roadmap.learn,
    },

    2: {
      title: "Practice",
      subtitle: "Apply your knowledge",
      items: analysisData.roadmap.practice,
    },

    3: {
      title: "Build",
      subtitle: "Create proof of skill",
      items: analysisData.roadmap.build,
    },

    4: {
      title: "Apply",
      subtitle: "Target real opportunities",
      items: analysisData.roadmap.apply,
    },
  };

  if (!showResults) {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="logo">
            Skill<span>Transfer</span>
          </div>

          <div className="nav-links">
            <a href="#career-gps">Career GPS</a>
            <a href="#how-it-works">How It Works</a>
          </div>
        </nav>

        <main>
          <section className="hero">
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
          </section>

          <section className="profile-card">
            <h2>Build Your Career Profile</h2>

            <p className="section-description">
              Tell us where you are and where you want to go.
            </p>

            <div className="form-group">
              <label>Current Role</label>

              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Sales Executive"
              />
            </div>

            <div className="form-group">
              <label>Your Skills</label>

              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. Communication, Negotiation, CRM"
              />
            </div>

            <div className="form-group">
              <label>Target Career</label>

              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g. Product Manager"
              />
            </div>

            <button className="primary-btn" onClick={handleAnalyze}>
              Discover My Career Paths →
            </button>
          </section>

          <section className="how-it-works" id="how-it-works">
            <p className="badge">HOW IT WORKS</p>

            <h2>Your experience becomes your advantage.</h2>

            <div className="how-grid">
              <div className="info-card">
                <span>01</span>
                <h3>Map Your Skills</h3>
                <p>
                  We identify the skills you already have from your current
                  experience.
                </p>
              </div>

              <div className="info-card">
                <span>02</span>
                <h3>Find Transferable Skills</h3>
                <p>
                  Discover which existing skills can move with you into another
                  career.
                </p>
              </div>

              <div className="info-card">
                <span>03</span>
                <h3>Build Your Career GPS</h3>
                <p>
                  Get a step-by-step path from your current role to your target
                  career.
                </p>
              </div>
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

        <button className="back-btn" onClick={handleNewAnalysis}>
          ← New Analysis
        </button>
      </nav>

      <main className="results-page">
        <div className="result-header">
          <p className="badge">YOUR CAREER GPS</p>

          <h1>
            {analysisData.current_role.toLowerCase()} →{" "}
            {analysisData.target_role.toLowerCase()}
          </h1>

          <p>
            You don't need to start from zero. Here's how your existing
            experience can move you toward your target career.
          </p>
        </div>

        <section className="grid">
          <div className="result-card">
            <div className="card-icon">✓</div>

            <h2>Skills You Already Have</h2>

            <div className="skill-list">
              {analysisData.existing_skills.map((skill) => (
                <span className="skill-tag existing" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="result-card">
            <div className="card-icon">↗</div>

            <h2>Transferable Skills</h2>

            {analysisData.transferable_skills.map((skill) => (
              <div className="transfer-item" key={skill.name}>
                <h3>{skill.name}</h3>
                <p>{skill.reason}</p>
              </div>
            ))}
          </div>

          <div className="result-card">
            <div className="card-icon">!</div>

            <h2>Skills You Need</h2>

            <div className="skill-list">
              {analysisData.skill_gaps.map((skill) => (
                <span className="skill-tag gap" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="gps" id="career-gps">
          <div className="gps-heading">
            <p className="badge">CAREER GPS</p>

            <h2>Your transition path</h2>

            <p>We turn your skill gaps into a practical journey.</p>
          </div>

          <div className="path">
            {[1, 2, 3, 4].map((step, index) => {
              const data = roadmapContent[step];

              return (
                <div className="path-wrapper" key={step}>
                  <button
                    className={`path-step ${
                      activeStep === step ? "active" : ""
                    }`}
                    onClick={() => setActiveStep(step)}
                  >
                    <span>{step}</span>

                    <strong>{data.title}</strong>

                    <small>{data.subtitle}</small>
                  </button>

                  {index < 3 && <div className="line"></div>}
                </div>
              );
            })}
          </div>

          <div className="roadmap-details">
            <p className="badge">{roadmapContent[activeStep].title}</p>

            <h2>{roadmapContent[activeStep].subtitle}</h2>

            <div className="roadmap-list">
              {roadmapContent[activeStep].items.map((item, index) => (
                <div className="roadmap-item" key={item}>
                  <span>{index + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="what-if">
          <p className="badge">WHAT-IF SIMULATOR</p>

          <h2>What if you choose another career?</h2>

          <p>Your skills can open more than one door.</p>

          <div className="career-options">
            {analysisData.alternative_careers.map((career) => (
              <button
                className={`career-option ${
                  selectedCareer === career ? "selected" : ""
                }`}
                key={career}
                onClick={() => handleCareerChange(career)}
              >
                {career} →
              </button>
            ))}
          </div>

          {selectedCareer && (
            <div className="selected-career">
              <p>
                Exploring your transferable skills for{" "}
                <strong>{selectedCareer}</strong>.
              </p>
            </div>
          )}
        </section>

        <section className="final-message">
          <p className="badge">YOUR NEXT MOVE</p>

          <h2>
            Your previous experience is not something you leave behind.
          </h2>

          <p>
            It becomes the foundation for where you go next.
          </p>

          <button className="primary-btn" onClick={handleNewAnalysis}>
            Try Another Career →
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;