from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

# Import Chandan's engine
from engine import analyze_transition

app = FastAPI(title="Skill Transfer Engine API")

# Enable CORS for Bhavya's frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
class AnalyzeRequest(BaseModel):
    current_role: str
    skills: List[str]
    target_role: str

class SimulateRequest(BaseModel):
    current_role: str
    skills: List[str]
    target_role: str
    previous_target_role: str = ""

# Response Models
class Roadmap(BaseModel):
    learn: List[str]
    practice: List[str]
    build: List[str]
    apply: List[str]

class AnalyzeResponse(BaseModel):
    current_role: str
    target_role: str
    existing_skills: List[str]
    transferable_skills: List[str]
    skill_gaps: List[str]
    alternative_careers: List[str]
    roadmap: Roadmap

# Helper function to generate Indira's roadmap
def generate_roadmap(target_role: str, gaps: List[str]) -> Roadmap:
    primary_gap = gaps[0] if gaps else "Domain Fundamentals"
    secondary_gap = gaps[1] if len(gaps) > 1 else "Hands-on Tools"

    return Roadmap(
        learn=[f"Learn core foundations of {primary_gap}", f"Study {secondary_gap} frameworks"],
        practice=[f"Conduct mock analysis using {secondary_gap}", "Audit real-world case studies"],
        build=[f"Build a mini-portfolio project showcasing {primary_gap} solutions"],
        apply=[f"Target entry/associate {target_role} listings focusing on transferable strengths"]
    )

@app.get("/")
def home():
    return {
        "status": "online",
        "message": "Skill Transfer Engine backend is active"
    }

# Endpoint 1: Standard Analysis
@app.post("/analyze", response_model=AnalyzeResponse)
def analyze_skills(payload: AnalyzeRequest):
    # Run Chandan's engine
    result = analyze_transition(payload.current_role, payload.skills, payload.target_role)
    
    # Generate Indira's dynamic roadmap based on gaps
    roadmap_data = generate_roadmap(payload.target_role, result["gaps"])
    
    return AnalyzeResponse(
        current_role=payload.current_role,
        target_role=payload.target_role,
        existing_skills=payload.skills,
        transferable_skills=result["transferable"],
        skill_gaps=result["gaps"],
        alternative_careers=result["alternatives"],
        roadmap=roadmap_data
    )

# Endpoint 2: What-If Career Simulator
@app.post("/simulate", response_model=AnalyzeResponse)
def simulate_career_pivot(payload: SimulateRequest):
    # When user switches target career (e.g. from Product Manager -> Customer Success)
    result = analyze_transition(payload.current_role, payload.skills, payload.target_role)
    roadmap_data = generate_roadmap(payload.target_role, result["gaps"])

    return AnalyzeResponse(
        current_role=payload.current_role,
        target_role=payload.target_role,
        existing_skills=payload.skills,
        transferable_skills=result["transferable"],
        skill_gaps=result["gaps"],
        alternative_careers=result["alternatives"],
        roadmap=roadmap_data
    )

# Endpoint 3: Dropdown List of Available Roles
@app.get("/career-paths")
def get_career_paths():
    return {
        "roles": [
            "Sales Executive",
            "Product Manager",
            "Customer Success Manager",
            "Business Analyst",
            "Business Development Manager"
        ]
    }