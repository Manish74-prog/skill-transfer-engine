from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import json
import os

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

    # Run Chandan's skill-matching engine
    analysis = analyze_skill_gap(
        data.skills,
        data.target_role
    )

    # Load Indira's roadmap data
    roadmap_path = os.path.join(
        "..",
        "data",
        "career_graphs.json"
    )

    roadmap_steps = []

    if os.path.exists(roadmap_path):
        with open(roadmap_path, "r") as f:
            all_roadmaps = json.load(f)

        # Use canonical target role from the engine
        key = f"{data.current_role}_to_{analysis['target_role']}"

        roadmap_steps = all_roadmaps.get(key, [])

    # Return combined result to Bhavya's frontend
    return {
        "current_role": data.current_role,
        "target_role": analysis["target_role"],
        "analysis": analysis,
        "roadmap": roadmap_steps
    }