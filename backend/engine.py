# CHANDAN'S LOGIC: Skill graph & gap matching engine

SKILL_GRAPH = {
    "Communication": ["Sales", "Customer Success", "Product Management"],
    "Customer Handling": ["Customer Success", "Product Management"],
    "Negotiation": ["Sales", "Business Development"],
}

CAREER_REQUIREMENTS = {
    "Product Management": [
        "Communication",
        "Customer Handling",
        "Product Strategy",
        "Data Analytics",
    ],
    "Business Development": [
        "Communication",
        "Negotiation",
        "Lead Generation",
    ],
    "Customer Success": [
        "Communication",
        "Customer Handling",
        "CRM",
    ],
}


def normalize_text(text):
    return text.strip().lower()


def analyze_skill_gap(current_skills: list, target_role: str):
    target_normalized = normalize_text(target_role)

    matched_role = None

    for career in CAREER_REQUIREMENTS:
        if normalize_text(career) == target_normalized:
            matched_role = career
            break

    if matched_role is None:
        aliases = {
            "product manager": "Product Management",
            "product management": "Product Management",
            "business development manager": "Business Development",
            "customer success manager": "Customer Success",
        }

        matched_role = aliases.get(target_normalized)

    needed = CAREER_REQUIREMENTS.get(matched_role, [])

    normalized_user_skills = {
        normalize_text(skill): skill.strip()
        for skill in current_skills
    }

    transferable = []
    gaps = []

    for skill in needed:
        if normalize_text(skill) in normalized_user_skills:
            transferable.append(skill)
        else:
            gaps.append(skill)

    overlap_pct = int(
        (len(transferable) / max(len(needed), 1)) * 100
    )

    return {
        "target_role": matched_role or target_role,
        "match_percentage": f"{overlap_pct}%",
        "transferable_skills": transferable,
        "skill_gaps": gaps,
    }