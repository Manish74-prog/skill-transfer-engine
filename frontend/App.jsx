
import React, { useState } from "react";

export default function App() {
  const [role, setRole] = useState("Sales Executive");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // THIS IS THE API CONNECTION FUNCTION
  const handleAnalyze = async () => {
    setLoading(true);
    try {
      // Connect to Manish's FastAPI backend running locally on port 8000
      const response = await fetch("http://127.0.0.1:8000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_role: role,
          skills: ["Communication", "Negotiation", "Customer Handling"]
        }),
      });

      const data = await response.json();
      setResults(data); // Save the API response to state
    } catch (error) {
      console.error("Error connecting to backend API:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <h1>Skill Transfer Engine</h1>
      
      <div>
        <label>Current Role: </label>
        <input value={role} onChange={(e) => setRole(e.target.value)} />
        <button onClick={handleAnalyze} style={{ marginLeft: "10px" }}>
          {loading ? "Analyzing..." : "Analyze Career Paths"}
        </button>
      </div>

      {/* Render the API response */}
      {results && (
        <div style={{ marginTop: "20px" }}>
          <h3>Recommended Paths:</h3>
          <ul>
            {results.recommended_paths.map((p, i) => (
              <li key={i}>{p.title} - {p.overlap} match</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
