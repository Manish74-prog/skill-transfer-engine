import json


def load_json(filename):
    with open(filename, "r", encoding="utf-8") as file:
        return json.load(file)


skills_data = load_json("skills.json")
careers_data = load_json("careers.json")
mapping_data = load_json("skill_mapping.json")


print("AI Engine loaded successfully!")
print("Number of known skills:", len(skills_data["skills"]))
print("Number of careers:", len(careers_data["careers"]))
