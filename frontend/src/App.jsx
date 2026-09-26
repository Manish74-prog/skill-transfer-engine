import { useState } from "react";

function App() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [target, setTarget] = useState("");

  const [showResults, setShowResults] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [selectedCareer, setSelectedCareer] = useState("");

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // CALL FASTAPI BACKEND
  // =========================================================
  const handleAnalyze = async () => {
    if (!role || !skills || !target) {
      alert("Please fill in all three fields.");
      return;
    }

    setLoading(true);
    setError("");

    const skillList = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            current_role: role,
            target_role: target,
            skills: skillList,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }

      const data = await response.json();

      console.log("Backend response:", data);

      setResults(data);
      setShowResults(true);
      setActiveStep(1);

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    } catch (err) {
      console.error(err);

      setError(
        "Could not connect to the Skill Transfer Engine. Make sure the FastAPI backend is running on port 8000."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // NEW ANALYSIS
  // =========================================================
  const handleNewAnalysis = () => {
    setShowResults(false);
    setActiveStep(1);
    setSelectedCareer("");
    setResults(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // ANALYSIS DATA
  // =========================================================
  const analysis = results?.analysis || {};

  const transferableSkills =
    analysis.transferable_skills || [];

  const skillGaps =
    analysis.skill_gaps || [];

  // =========================================================
  // GET ROADMAP ITEMS
  // =========================================================
  const getRoadmapItems = (stepName) => {
    if (
      !results?.roadmap ||
      !Array.isArray(results.roadmap)
    ) {
      return [];
    }

    const filtered = results.roadmap.filter((item) => {
      if (typeof item === "string") {
        return false;
      }

      return (
        String(item?.title || "").toLowerCase() ===
        stepName.toLowerCase()
      );
    });

    return filtered.map((item) => ({
      skill: item.skill || "",
      action: item.action || "",
    }));
  };

  // =========================================================
  // CAREER ROADMAP
  // =========================================================
  const roadmapContent = {
    1: {
      title: "Learn",
      subtitle: "Build missing knowledge",

      items:
        getRoadmapItems("Learn").length > 0
          ? getRoadmapItems("Learn")
          : skillGaps.map((skill) => ({
              skill: skill,
              action: `Learn the fundamentals of ${skill}.`,
            })),
    },

    2: {
      title: "Practice",
      subtitle: "Apply your knowledge",

      items:
        getRoadmapItems("Practice").length > 0
          ? getRoadmapItems("Practice")
          : [
              {
                skill: "Real-world practice",
                action:
                  "Practice solving real-world problems.",
              },
              {
                skill: "Product analysis",
                action:
                  "Analyze existing products.",
              },
              {
                skill: "Case studies",
                action:
                  "Study successful case studies.",
              },
            ],
    },

    3: {
      title: "Build",
      subtitle: "Create proof of skill",

      items:
        getRoadmapItems("Build").length > 0
          ? getRoadmapItems("Build")
          : [
              {
                skill: "Portfolio project",
                action: `Build a project related to ${results?.target_role}.`,
              },
              {
                skill: "Case study",
                action:
                  "Create a case study showing your thinking.",
              },
              {
                skill: "Documentation",
                action:
                  "Document your work and decisions.",
              },
            ],
    },

    4: {
      title: "Apply",
      subtitle: "Target real opportunities",

      items:
        getRoadmapItems("Apply").length > 0
          ? getRoadmapItems("Apply")
          : [
              {
                skill: "Target opportunities",
                action: `Search for ${results?.target_role} opportunities.`,
              },
              {
                skill: "Networking",
                action:
                  "Connect with professionals in the field.",
              },
              {
                skill: "Applications",
                action:
                  "Apply for relevant internships and roles.",
              },
            ],
    },
  };

  // =========================================================
  // WHAT-IF CAREER
  // =========================================================
  const handleCareerChange = (career) => {
    setSelectedCareer(career);
    setTarget(career);
  };

  // =========================================================
  // LANDING PAGE
  // =========================================================
  if (!showResults) {
    return (
      <div className="app">

        {/* NAVBAR */}
        <nav className="navbar">

          <div className="logo">
            Skill<span>Transfer</span>
          </div>

          <div className="nav-links">
            <a href="#how-it-works">
              How It Works
            </a>
          </div>

        </nav>

        <main>

          {/* HERO */}
          <section className="hero">

            <p className="badge">
              AI-POWERED CAREER TRANSITION
            </p>

            <h1>
              Don't start from zero.
              <br />
              <span>
                Discover where your skills can take you.
              </span>
            </h1>

            <p className="hero-text">
              Your current experience may already contain
              the skills needed for your next career. Find
              your transferable skills, discover career
              paths, and get a roadmap to move forward.
            </p>

          </section>

          {/* PROFILE FORM */}
          <section className="profile-card">

            <h2>
              Build Your Career Profile
            </h2>

            <p className="section-description">
              Tell us where you are and where you want to go.
            </p>

            {/* CURRENT ROLE */}
            <div className="form-group">

              <label>
                Current Role
              </label>

              <input
                type="text"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                placeholder="e.g. Sales Executive"
              />

            </div>

            {/* SKILLS */}
            <div className="form-group">

              <label>
                Your Skills
              </label>

              <input
                type="text"
                value={skills}
                onChange={(e) =>
                  setSkills(e.target.value)
                }
                placeholder="e.g. Communication, Customer Handling, Negotiation"
              />

            </div>

            {/* TARGET CAREER */}
            <div className="form-group">

              <label>
                Target Career
              </label>

              <input
                type="text"
                value={target}
                onChange={(e) =>
                  setTarget(e.target.value)
                }
                placeholder="e.g. Product Management"
              />

            </div>

            {/* ERROR */}
            {error && (
              <p className="error-message">
                {error}
              </p>
            )}

            {/* ANALYZE BUTTON */}
            <button
              className="primary-btn"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading
                ? "Analyzing Your Skills..."
                : "Discover My Career Paths →"}
            </button>

          </section>

          {/* HOW IT WORKS */}
          <section
            className="how-it-works"
            id="how-it-works"
          >

            <p className="badge">
              HOW IT WORKS
            </p>

            <h2>
              Your experience becomes your advantage.
            </h2>

            <div className="how-grid">

              <div className="info-card">

                <span>01</span>

                <h3>
                  Map Your Skills
                </h3>

                <p>
                  We identify the skills you already have
                  from your current experience.
                </p>

              </div>

              <div className="info-card">

                <span>02</span>

                <h3>
                  Find Transferable Skills
                </h3>

                <p>
                  Discover which existing skills can move
                  with you into another career.
                </p>

              </div>

              <div className="info-card">

                <span>03</span>

                <h3>
                  Build Your Career GPS
                </h3>

                <p>
                  Get a step-by-step path from your current
                  role to your target career.
                </p>

              </div>

            </div>

          </section>

        </main>

      </div>
    );
  }

  // =========================================================
  // RESULTS PAGE
  // =========================================================
  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="logo">
          Skill<span>Transfer</span>
        </div>

        <button
          className="back-btn"
          onClick={handleNewAnalysis}
        >
          ← New Analysis
        </button>

      </nav>

      <main className="results-page">

        {/* RESULT HEADER */}
        <div className="result-header">

          <p className="badge">
            YOUR CAREER GPS
          </p>

          <h1>
            {results.current_role} →{" "}
            {results.target_role}
          </h1>

          <p>
            You don't need to start from zero. Here's how
            your existing experience can move you toward
            your target career.
          </p>

        </div>

        {/* =================================================
            MATCH SCORE
        ================================================= */}

        <section className="result-card match-card">

          <div className="card-icon">
            ★
          </div>

          <h2>
            Career Match
          </h2>

          <div className="match-number">
            {analysis.match_percentage || "0%"}
          </div>

          <p>
            Based on the skills you already have for{" "}
            <strong>
              {analysis.target_role ||
                results.target_role}
            </strong>.
          </p>

        </section>

        {/* =================================================
            SKILLS GRID
        ================================================= */}

        <section className="grid">

          {/* EXISTING SKILLS */}
          <div className="result-card">

            <div className="card-icon">
              ✓
            </div>

            <h2>
              Skills You Already Have
            </h2>

            <div className="skill-list">

              {skills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
                .map((skill) => (

                  <span
                    className="skill-tag existing"
                    key={skill}
                  >
                    {skill}
                  </span>

                ))}

            </div>

          </div>

          {/* TRANSFERABLE SKILLS */}
          <div className="result-card">

            <div className="card-icon">
              ↗
            </div>

            <h2>
              Transferable Skills
            </h2>

            {transferableSkills.length > 0 ? (

              transferableSkills.map((skill) => (

                <div
                  className="transfer-item"
                  key={skill}
                >

                  <h3>
                    {skill}
                  </h3>

                  <p>
                    This skill already matches a
                    requirement for{" "}
                    {analysis.target_role ||
                      results.target_role}.
                  </p>

                </div>

              ))

            ) : (

              <p>
                No direct transferable skills were found
                yet. Explore the skill gaps below to see
                what you can build next.
              </p>

            )}

          </div>

          {/* SKILL GAPS */}
          <div className="result-card">

            <div className="card-icon">
              !
            </div>

            <h2>
              Skills You Need
            </h2>

            <div className="skill-list">

              {skillGaps.length > 0 ? (

                skillGaps.map((skill) => (

                  <span
                    className="skill-tag gap"
                    key={skill}
                  >
                    {skill}
                  </span>

                ))

              ) : (

                <p>
                  Your current skills cover the known
                  requirements.
                </p>

              )}

            </div>

          </div>

        </section>

        {/* =================================================
            CAREER GPS
        ================================================= */}

        <section
          className="gps"
          id="career-gps"
        >

          <div className="gps-heading">

            <p className="badge">
              CAREER GPS
            </p>

            <h2>
              Your transition path
            </h2>

            <p>
              We turn your skill gaps into a practical
              journey.
            </p>

          </div>

          {/* FOUR STAGES */}
          <div className="path">

            {[1, 2, 3, 4].map(
              (step, index) => {

                const data =
                  roadmapContent[step];

                return (

                  <div
                    className="path-wrapper"
                    key={step}
                  >

                    <button
                      className={`path-step ${
                        activeStep === step
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setActiveStep(step)
                      }
                    >

                      <span>
                        {step}
                      </span>

                      <strong>
                        {data.title}
                      </strong>

                      <small>
                        {data.subtitle}
                      </small>

                    </button>

                    {index < 3 && (
                      <div className="line"></div>
                    )}

                  </div>

                );
              }
            )}

          </div>

          {/* ROADMAP DETAILS */}
          <div className="roadmap-details">

            <p className="badge">
              {roadmapContent[activeStep].title}
            </p>

            <h2>
              {roadmapContent[activeStep].subtitle}
            </h2>

            <div className="roadmap-list">

              {roadmapContent[
                activeStep
              ].items.map(
                (item, index) => (

                  <div
                    className="roadmap-item"
                    key={`${item.skill}-${index}`}
                  >

                    <span>
                      {index + 1}
                    </span>

                    <div>

                      <h3>
                        {item.skill}
                      </h3>

                      <p>
                        {item.action}
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </section>

        {/* =================================================
            WHAT IF SIMULATOR
        ================================================= */}

        <section className="what-if">

          <p className="badge">
            WHAT-IF SIMULATOR
          </p>

          <h2>
            What if you choose another career?
          </h2>

          <p>
            Your skills can open more than one door.
          </p>

          <div className="career-options">

            <button
              className={`career-option ${
                selectedCareer ===
                "Customer Success Manager"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                handleCareerChange(
                  "Customer Success Manager"
                )
              }
            >
              Customer Success Manager →
            </button>

            <button
              className={`career-option ${
                selectedCareer ===
                "Business Development"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                handleCareerChange(
                  "Business Development"
                )
              }
            >
              Business Development →
            </button>

            <button
              className={`career-option ${
                selectedCareer ===
                "Product Management"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                handleCareerChange(
                  "Product Management"
                )
              }
            >
              Product Management →
            </button>

          </div>

          {selectedCareer && (

            <div className="selected-career">

              <p>
                Exploring your transferable skills for{" "}
                <strong>
                  {selectedCareer}
                </strong>.
              </p>

              <button
                className="primary-btn"
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading
                  ? "Analyzing..."
                  : "Analyze This Career →"}
              </button>

            </div>

          )}

        </section>

        {/* =================================================
            FINAL MESSAGE
        ================================================= */}

        <section className="final-message">

          <p className="badge">
            YOUR NEXT MOVE
          </p>

          <h2>
            Your previous experience is not something
            you leave behind.
          </h2>

          <p>
            It becomes the foundation for where you go next.
          </p>

          <button
            className="primary-btn"
            onClick={handleNewAnalysis}
          >
            Try Another Career →
          </button>

        </section>

      </main>

    </div>
  );
}

export default App;