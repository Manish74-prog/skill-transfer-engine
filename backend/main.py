from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Skill Transfer Engine API")

# Allow frontend to call the API without getting CORS errors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (e.g., http://localhost:5173 or 3000)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProfileRequest(BaseModel):
    current_role: str
    skills: List[str]

@app.get("/")
def read_root():
    return {"status": "Backend API is online"}

# The endpoint Bhavya's frontend will call
@app.post("/api/analyze")
def analyze_skills(data: ProfileRequest):
    return {
        "current_role": data.current_role,
        "recommended_paths": [
            {"title": "Product Management", "overlap": "75%"},
            {"title": "Business Development", "overlap": "85%"},
            {"title": "Customer Success", "overlap": "90%"}
        ],
        "transferable_skills": [s for s in data.skills if s in ["Communication", "Negotiation", "Customer Handling"]],
        "skill_gaps": ["Market Research", "Product Analytics", "Roadmapping"]
    }
