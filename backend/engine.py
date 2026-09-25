
# CHANDAN'S LOGIC: Skill graph & gap matching engine

SKILL_GRAPH = {
    "Communication": ["Sales", "Customer Success", "Product Management"],
    "Customer Handling": ["Customer Success", "Product Management"],
    "Negotiation": ["Sales", "Business Development"]
}

CAREER_REQUIREMENTS = {
    "Product Management": ["Communication", "Customer Handling", "Product Strategy", "Data Analytics"],
    "Business Development": ["Communication", "Negotiation", "Lead Generation"]
}

def analyze_skill_gap(current_skills: list, target_role: str):
    needed = CAREER_REQUIREMENTS.get(target_role, [])
    
    # Skills the user already has that match the target role
    transferable = [s for s in current_skills if s in needed]
    
    # Skills the user still needs to learn
    gaps = [s for s in needed if s not in current_skills]
    
    # Calculate match percentage
    overlap_pct = int((len(transferable) / max(len(needed), 1)) * 100)
    
    return {
        "target_role": target_role,
        "match_percentage": f"{overlap_pct}%",
        "transferable_skills": transferable,
        "skill_gaps": gaps
    }
