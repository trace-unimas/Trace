import sys
import urllib.parse
import json
import os
import pyperclip
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt

console = Console()

# 🧱 Detect if running as PyInstaller .exe
is_frozen = getattr(sys, 'frozen', False)

# Emojis only if not running as PyInstaller .exe
EMOJI = {
    "title": "🛠️ " if not is_frozen else "",
    "link": "🔗" if not is_frozen else "Link",
    "done": "✅" if not is_frozen else "Success",
    "copy": "📋" if not is_frozen else "Copied",
    "exit": "👋" if not is_frozen else "Exit",
    "error": "❌" if not is_frozen else "Error",
    "warn": "⚠️" if not is_frozen else "Warning"
}

def gs_to_firebase_url(gs_url):
    if not gs_url.startswith("gs://"):
        raise ValueError("Invalid gs:// URL")
    gs_url = gs_url.replace("gs://", "")
    bucket, *path_parts = gs_url.split("/")
    path = "/".join(path_parts)
    encoded_path = urllib.parse.quote(path, safe="").replace("/", "%2F")
    return f"https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{encoded_path}?alt=media"

# Determine exhibitor level based on location prefix
def get_exhibitor_level(location):
    prefix = location[0].upper()
    levels = {
        "P": "Platinum",
        "G": "Gold",
        "S": "Silver",
        "A": "Standard"
    }
    return levels.get(prefix, "Standard")

# Load existing JSON file or create a new one
def load_or_create_json(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            try:
                data = json.load(file)
                if "companies" not in data:
                    data["companies"] = []
                return data
            except json.JSONDecodeError:
                console.print(f"[red]{EMOJI['error']} Error reading JSON file. Creating a new file.[/red]")
                return {"companies": []}
    else:
        return {"companies": []}

# Save JSON data to file
def save_json(data, file_path):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)
    console.print(f"[green]{EMOJI['done']} JSON file updated successfully![/green]")

# Prompt for company details and add to JSON
def add_company(file_path):
    try:
        # User input for company details
        # Load existing data
        data = load_or_create_json(file_path)

        # Automatically get the next ID
        if data["companies"]:
            company_id = max(company["id"] for company in data["companies"]) + 1
        else:
            company_id = 1
        name = Prompt.ask("Enter company name")
        gs_link = Prompt.ask("Enter gs:// logo link")
        location = Prompt.ask("Enter location (e.g., P1/8)")
        bookmarked = Prompt.ask("Is it bookmarked? (y/n)").strip().lower() == "y"

        # Automatically determine exhibitor level based on location prefix
        exhibitor_level = get_exhibitor_level(location)
        console.print(f"[cyan]Auto-detected exhibitor level: {exhibitor_level}[/cyan]")

        # Convert gsutil link to public URL
        public_url = gs_to_firebase_url(gs_link)
        pyperclip.copy(public_url)

        # Load existing data
        data = load_or_create_json(file_path)

        # Add new company to the list
        new_company = {
            "id": company_id,
            "name": name,
            "logo": public_url,
            "exhibitorLevel": exhibitor_level,
            "location": location,
            "bookmarked": bookmarked
        }
        data["companies"].append(new_company)

        # Save updated data to file
        save_json(data, file_path)

        console.print(f"\n[bold green]{EMOJI['done']} Company added successfully:[/bold green]")
        console.print(f"[cyan1]{json.dumps(new_company, indent=4)}[/cyan1]")
        console.print(f"[magenta]{EMOJI['copy']} Logo URL copied to clipboard![/magenta]\n")
    except ValueError as ve:
        console.print(f"[red]{EMOJI['error']} {ve}[/red]\n")
    except Exception as ex:
        console.print(f"[red]{EMOJI['error']} Unexpected error: {ex}[/red]\n")

# Main loop for adding companies
def main():
    file_path = Prompt.ask("Enter the JSON file path (e.g., site-data/trace2025.json)")
    while True:
        add_company(file_path)
        another = Prompt.ask("Add another company? (y/n)").strip().lower()
        if another != "y":
            console.print(f"[green]{EMOJI['exit']} Goodbye![/green]")
            break

# Run the script
if __name__ == "__main__":
    main()
