import json
import os
import requests
from rich.console import Console
from rich.prompt import Prompt

console = Console()

# Wikidata SPARQL endpoint
WIKIDATA_API = "https://query.wikidata.org/sparql"

# Query to fetch the official name from Wikidata
def get_wikidata_name(company_name):
    query = f"""
    SELECT ?officialName WHERE {{
      ?company rdfs:label "{company_name}"@en;
               wdt:P1448 ?officialName.
    }}
    LIMIT 1
    """
    headers = {
        "Accept": "application/sparql-results+json"
    }
    try:
        response = requests.get(WIKIDATA_API, params={"query": query, "format": "json"}, headers=headers)
        if response.status_code == 200:
            results = response.json().get("results", {}).get("bindings", [])
            if results:
                official_name = results[0]["officialName"]["value"]
                return official_name
        console.print(f"[yellow]No official name found in Wikidata for {company_name}. Keeping as is.[/yellow]")
    except Exception as e:
        console.print(f"[red]Error fetching name for {company_name} from Wikidata: {e}[/red]")
    return None

# Load JSON file
def load_json(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            try:
                data = json.load(file)
                return data
            except json.JSONDecodeError:
                console.print(f"[red]Error reading JSON file. Check the file format.[/red]")
                return None
    else:
        console.print(f"[red]File not found: {file_path}[/red]")
        return None

# Save JSON file
def save_json(data, file_path):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)
    console.print(f"[green]Updated JSON file saved successfully![/green]")

# Update company names in the JSON data using Wikidata API
def update_company_names(data):
    for company in data.get("companies", []):
        original_name = company.get("name", "")
        # Use Wikidata to find the official name
        scraped_name = get_wikidata_name(original_name)
        if scraped_name:
            console.print(f"[cyan]Updated:[/cyan] {original_name} -> {scraped_name}")
            company["name"] = scraped_name
        else:
            console.print(f"[yellow]No official name found for {original_name}. Keeping as is.[/yellow]")
    return data

# Main function
def main():
    file_path = Prompt.ask("Enter the JSON file path (e.g., site-data/trace2025.json)")
    data = load_json(file_path)
    if data:
        updated_data = update_company_names(data)
        save_json(updated_data, file_path)

if __name__ == "__main__":
    main()
