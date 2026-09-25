# Chandan's Skill Matching & Relationship Logic

CAREER_PROFILES = {
    "Product Manager": {
        "required_skills": ["Communication", "Negotiation", "Customer Handling", "Product Strategy", "Product Analytics", "Agile"],
        "alternatives": ["Customer Success Manager", "Business Development Manager", "Product Operations"]
    },
    "Customer Success Manager": {
        "required_skills": ["Communication", "Customer Handling", "CRM", "Empathy", "Account Management"],
        "alternatives": ["Account Manager", "Sales Executive", "Support Lead"]
    },
    "Business Analyst": {
        "required_skills": ["Communication", "Data Analysis", "SQL", "Requirements Gathering", "Excel"],
        "alternatives": ["Product Manager", "Operations Analyst", "Project Manager"]
    }
}

def analyze_transition(current_role: str, user_skills: list, target_role: str):
    # Retrieve profile or provide fallback
    profile = CAREER_PROFILES.get(target_role, {
        "required_skills": ["Communication", "Problem Solving", "Domain Expertise"],
        "alternatives": ["Associate Consultant", "General Management"]
    })
    
    target_requirements = profile["required_skills"]
    
    # 1. Existing & Transferable: skills user has that match or help the target role
    transferable = [s for s in user_skills if s in target_requirements]
    
    # 2. Skill Gaps: what the user is missing
    gaps = [s for s in target_requirements if s not in user_skills]
    
    # 3. Alternatives
    alternatives = profile["alternatives"]
    
    return {
        "transferable": transferable,
        "gaps": gaps,
        "alternatives": alternatives
    }
