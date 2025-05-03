import json
from pathlib import Path

# Load vacancy data
with open("vacancy.json", "r", encoding="utf-8") as f:
    vacancy_data = json.load(f)

# Extract unique companies
unique_companies = sorted(set(entry["company"] for entry in vacancy_data))

# Load or initialize companies.json
companies_path = Path("companies.json")
if companies_path.exists():
    try:
        with open(companies_path, "r", encoding="utf-8") as f:
            company_links = json.load(f)
    except json.JSONDecodeError:
        company_links = {}
else:
    company_links = {}

while True:
    print("\nSelect a company to add/edit a website URL:\n")
    for idx, company in enumerate(unique_companies, 1):
        current = f" ({company_links[company]})" if company in company_links else ""
        print(f"{idx}. {company}{current}")

    user_input = input("\nEnter the number of the company (or type 'exit'): ").strip()
    if user_input.lower() == "exit":
        break

    try:
        selected_index = int(user_input) - 1
        if not 0 <= selected_index < len(unique_companies):
            raise ValueError("Invalid index selected.")
    except ValueError as e:
        print(f"❌ Error: {e}")
        continue

    selected_company = unique_companies[selected_index]
    website = input(f"Enter website URL for {selected_company}: ").strip()

    company_links[selected_company] = website
    with open(companies_path, "w", encoding="utf-8") as f:
        json.dump(company_links, f, indent=4)

    print(f"✅ Website for '{selected_company}' saved.")
