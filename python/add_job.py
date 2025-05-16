import json
import urllib.parse
import os

VACANCY_FILE = "vacancy.json"

def gs_to_firebase_url(gs_url):
    if not gs_url.startswith("gs://"):
        raise ValueError("Invalid gs:// URL")
    gs_url = gs_url.replace("gs://", "")
    bucket, *path_parts = gs_url.split("/")
    path = "/".join(path_parts)
    encoded_path = urllib.parse.quote(path, safe="").replace("/", "%2F")
    return f"https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{encoded_path}?alt=media"

def load_data():
    if os.path.exists(VACANCY_FILE):
        with open(VACANCY_FILE, "r") as f:
            return json.load(f)
    return []

def save_data(data):
    with open(VACANCY_FILE, "w") as f:
        json.dump(data, f, indent=4)
    print("✅ Saved to vacancy.json")

def get_next_id(data):
    return max([entry["id"] for entry in data], default=0) + 1

def main():
    print("📌 Firebase gs:// to Job Entry (type 'exit' to quit)")
    data = load_data()

    while True:
        company = input("Company name: ").strip()
        if company.lower() == "exit":
            break

        title = input("Job title: ").strip()
        if title.lower() == "exit":
            break

        gs_link = input("gs:// link: ").strip()
        if gs_link.lower() == "exit":
            break

        try:
            public_url = gs_to_firebase_url(gs_link)
        except Exception as e:
            print(f"❌ Error: {e}")
            continue

        new_entry = {
            "id": get_next_id(data),
            "title": title,
            "company": company,
            "src": public_url
        }

        data.append(new_entry)
        print(f"✅ Added: {title} for {company}")
        print(f"🔗 URL: {public_url}\n")

    save_data(data)

if __name__ == "__main__":
    main()
