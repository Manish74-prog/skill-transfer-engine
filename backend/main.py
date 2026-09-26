from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import json
import os

# 1. IMPORT CHANDAN'S LOGIC
from engine import analyze_skill_gap

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    current_role: str
    target_role: str
    skills: List[str]

@app.post("/api/analyze")
def analyze(data: UserInput):
    # RUN CHANDAN'S ENGINE
    analysis = analyze_skill_gap(data.skills, data.target_role)

    # LOAD INDIRA'S ROADMAP DATA
    roadmap_path = os.path.join("..", "data", "career_graphs.json")
    roadmap_steps = []
    
    if os.path.exists(roadmap_path):
        with open(roadmap_path, "r") as f:
            all_roadmaps = json.load(f)
            key = f"{data.current_role}_to_{analysis['target_role']}"
            roadmap_steps = all_roadmaps.get(key, [])

    # RETURN THE COMBINED RESULT TO BHAVYA'S FRONTEND
    return {
        "current_role": data.current_role,
        "target_role": data.target_role,
        "analysis": analysis,         # Chandan's work
        "roadmap": roadmap_steps       # Indira's work
    }
