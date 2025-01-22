import os
import json
import re
import requests

# Paths
json_file_path = "companies2024.json"
logo_folder_path = "./Assets/company-logo"

# SerpAPI Key (Replace with your actual key)
SERPAPI_KEY = "d85a1d66645ebcbfb10267de39827cac391569affd238c0a7e8c51ee57aa3427"

# Function to search and download a logo manually using SerpAPI API
def search_and_download_logo(company_name, save_folder):
    search_url = "https://serpapi.com/search.json"
    params = {
        "engine": "google",
        "q": f"{company_name} logo",
        "tbm": "isch",  # Image search
        "api_key": SERPAPI_KEY
    }

    try:
        response = requests.get(search_url, params=params)
        response.raise_for_status()
        results = response.json()

        if "images_results" in results:
            image_url = results["images_results"][0]["original"]  # Get the first image result
            print(f"Downloading logo for {company_name} from {image_url}...")
            
            image_response = requests.get(image_url)
            if image_response.status_code == 200:
                # Clean and save the image
                clean_name = re.sub(r'[^a-zA-Z0-9]', '_', company_name)  # Clean company name for filename
                file_path = os.path.join(save_folder, f"{clean_name}.png").replace("\\", "/")
                with open(file_path, "wb") as img_file:
                    img_file.write(image_response.content)
                return file_path
    except Exception as e:
        print(f"Error fetching image for {company_name}: {e}")
    return None

# Load JSON file
with open(json_file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# Fix missing logos
for company in data['companies']:
    logo_path = company['logo']
    company_name = company['name']
    logo_full_path = os.path.join(logo_folder_path, os.path.basename(logo_path)).replace("\\", "/")
    
    if not os.path.exists(logo_full_path):
        print(f"Logo not found locally for: {logo_path} (Company: {company_name})")
        new_logo_path = search_and_download_logo(company_name, logo_folder_path)
        if new_logo_path:
            company['logo'] = os.path.relpath(new_logo_path, start=os.path.dirname(json_file_path)).replace("\\", "/")
            print(f"Downloaded and saved logo for: {company_name}")
        else:
            print(f"Failed to fetch logo for: {company_name}")

# Save updated JSON file
with open(json_file_path, "w", encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

print("Logos updated in 'companies2024.json'.")
