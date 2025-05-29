import json
import os
import sys
import urllib.parse
import pyperclip
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt, Confirm
from rich.table import Table
from rich.text import Text
from datetime import datetime

console = Console()

# 🧱 Detect if running as PyInstaller .exe
is_frozen = getattr(sys, 'frozen', False)

# Emojis only if not running as PyInstaller .exe
EMOJI = {
    "title": "🖼️ " if not is_frozen else "",
    "link": "🔗" if not is_frozen else "Link",
    "done": "✅" if not is_frozen else "Success",
    "copy": "📋" if not is_frozen else "Copied",
    "exit": "👋" if not is_frozen else "Exit",
    "error": "❌" if not is_frozen else "Error",
    "warn": "⚠️" if not is_frozen else "Warning",
    "add": "➕" if not is_frozen else "Add",
    "save": "💾" if not is_frozen else "Save",
    "list": "📋" if not is_frozen else "List",
    "tag": "🏷️" if not is_frozen else "Tag",
    "batch": "🚀" if not is_frozen else "Batch"
}

class JSONImageManager:
    def __init__(self, json_path="D:\\project\\Trace\\site-data\\tracetour2024.json"):
        self.json_path = json_path
        self.data = self.load_json()
        
    def load_json(self):
        """Load existing JSON file or create new structure"""
        try:
            if os.path.exists(self.json_path):
                with open(self.json_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    # Ensure proper structure
                    if 'images' not in data:
                        data['images'] = []
                    return data
            else:
                # Create new JSON structure
                return {"images": []}
        except Exception as e:
            console.print(f"[red]{EMOJI['error']} Error loading JSON: {e}[/red]")
            return {"images": []}
    
    def save_json(self):
        """Save data to JSON file"""
        try:
            # Create directory if it doesn't exist
            os.makedirs(os.path.dirname(self.json_path), exist_ok=True)
            
            with open(self.json_path, 'w', encoding='utf-8') as f:
                json.dump(self.data, f, indent=2, ensure_ascii=False)
            return True
        except Exception as e:
            console.print(f"[red]{EMOJI['error']} Error saving JSON: {e}[/red]")
            return False
    
    def get_next_id(self):
        """Get the next available ID"""
        if not self.data['images']:
            return 1
        return max(img['id'] for img in self.data['images']) + 1
    
    def gs_to_firebase_url(self, gs_url):
        """Convert gs:// URL to public Firebase URL"""
        if not gs_url.startswith("gs://"):
            raise ValueError("Invalid gs:// URL")
        
        gs_url = gs_url.replace("gs://", "")
        bucket, *path_parts = gs_url.split("/")
        path = "/".join(path_parts)
        encoded_path = urllib.parse.quote(path, safe="").replace("/", "%2F")
        return f"https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{encoded_path}?alt=media"
    
    def add_single_image(self):
        """Add a single image interactively"""
        console.print(f"\n[bold cyan]{EMOJI['add']} Add New Image[/bold cyan]")
        
        # Get gs:// link
        gs_link = Prompt.ask(f"[yellow]{EMOJI['link']} gs:// link[/yellow]").strip()
        if not gs_link or gs_link.lower() == 'exit':
            return False
        
        try:
            # Convert to public URL
            public_url = self.gs_to_firebase_url(gs_link)
            console.print(f"[green]{EMOJI['done']} Converted URL: {public_url}[/green]")
            
            # Get image details
            title = Prompt.ask(f"[yellow]{EMOJI['title']} Image title[/yellow]")
            if not title:
                title = f"Image {self.get_next_id()}"
            
            # Get tags
            console.print(f"\n[dim]Common tags: university, unimas, uitm, campus, event, 2024, graduation, sports, library, laboratory[/dim]")
            tags_input = Prompt.ask(f"[yellow]{EMOJI['tag']} Tags (comma-separated)[/yellow]")
            tags = [tag.strip().lower() for tag in tags_input.split(',') if tag.strip()]
            
            if not tags:
                tags = ["university"]  # Default tag
            
            # Create new image entry
            new_image = {
                "id": self.get_next_id(),
                "title": title,
                "url": public_url,
                "tags": tags
            }
            
            # Add to data
            self.data['images'].append(new_image)
            
            # Show preview
            self.show_image_preview(new_image)
            
            # Confirm and save
            if Confirm.ask(f"[green]Add this image to the gallery?[/green]"):
                if self.save_json():
                    console.print(f"[bold green]{EMOJI['save']} Image added successfully![/bold green]")
                    pyperclip.copy(public_url)
                    console.print(f"[magenta]{EMOJI['copy']} URL copied to clipboard![/magenta]")
                    return True
                else:
                    # Remove from data if save failed
                    self.data['images'].pop()
                    return False
            else:
                # Remove from data if user cancelled
                self.data['images'].pop()
                console.print("[yellow]Image not added.[/yellow]")
                return False
                
        except Exception as e:
            console.print(f"[red]{EMOJI['error']} Error: {e}[/red]")
            return False
    
    def batch_add_images(self):
        """Add multiple images in batch mode"""
        console.print(f"\n[bold cyan]{EMOJI['batch']} Batch Add Mode[/bold cyan]")
        console.print("[dim]Enter gs:// links one by one. Type 'done' when finished.[/dim]")
        
        batch_images = []
        
        while True:
            gs_link = Prompt.ask(f"\n[yellow]{EMOJI['link']} gs:// link #{len(batch_images) + 1} (or 'done')[/yellow]").strip()
            
            if gs_link.lower() == 'done':
                break
            elif gs_link.lower() == 'exit':
                return False
            
            try:
                public_url = self.gs_to_firebase_url(gs_link)
                
                # Quick details for batch
                title = Prompt.ask(f"[yellow]Title[/yellow]", default=f"Image {self.get_next_id() + len(batch_images)}")
                tags_input = Prompt.ask(f"[yellow]Tags[/yellow]", default="university,event,2024")
                tags = [tag.strip().lower() for tag in tags_input.split(',') if tag.strip()]
                
                batch_image = {
                    "id": self.get_next_id() + len(batch_images),
                    "title": title,
                    "url": public_url,
                    "tags": tags
                }
                
                batch_images.append(batch_image)
                console.print(f"[green]{EMOJI['done']} Added to batch: {title}[/green]")
                
            except Exception as e:
                console.print(f"[red]{EMOJI['error']} Error with this link: {e}[/red]")
                continue
        
        if batch_images:
            # Show batch preview
            self.show_batch_preview(batch_images)
            
            if Confirm.ask(f"[green]Add all {len(batch_images)} images to the gallery?[/green]"):
                self.data['images'].extend(batch_images)
                if self.save_json():
                    console.print(f"[bold green]{EMOJI['save']} {len(batch_images)} images added successfully![/bold green]")
                    return True
                else:
                    # Remove batch from data if save failed
                    for _ in batch_images:
                        self.data['images'].pop()
                    return False
            else:
                console.print("[yellow]Batch cancelled.[/yellow]")
                return False
        else:
            console.print("[yellow]No images to add.[/yellow]")
            return False
    
    def show_image_preview(self, image):
        """Show preview of a single image"""
        table = Table(title="Image Preview", show_header=False, box=None)
        table.add_column("Field", style="cyan")
        table.add_column("Value", style="white")
        
        table.add_row("ID", str(image['id']))
        table.add_row("Title", image['title'])
        table.add_row("URL", image['url'][:60] + "..." if len(image['url']) > 60 else image['url'])
        table.add_row("Tags", ", ".join(image['tags']))
        
        console.print(table)
    
    def show_batch_preview(self, batch_images):
        """Show preview of batch images"""
        table = Table(title=f"Batch Preview ({len(batch_images)} images)")
        table.add_column("ID", style="cyan")
        table.add_column("Title", style="white")
        table.add_column("Tags", style="green")
        
        for img in batch_images:
            table.add_row(str(img['id']), img['title'], ", ".join(img['tags'][:3]))
        
        console.print(table)
    
    def list_images(self):
        """List all existing images"""
        if not self.data['images']:
            console.print("[yellow]No images in gallery yet.[/yellow]")
            return
        
        table = Table(title=f"Current Gallery ({len(self.data['images'])} images)")
        table.add_column("ID", style="cyan")
        table.add_column("Title", style="white")
        table.add_column("Tags", style="green")
        table.add_column("Added", style="dim")
        
        for img in self.data['images']:
            # Try to extract date from filename or use default
            added_date = "Unknown"
            table.add_row(
                str(img['id']), 
                img['title'][:30] + "..." if len(img['title']) > 30 else img['title'],
                ", ".join(img['tags'][:3]),
                added_date
            )
        
        console.print(table)
    
    def delete_image(self):
        """Delete an image by ID"""
        if not self.data['images']:
            console.print("[yellow]No images to delete.[/yellow]")
            return
        
        self.list_images()
        
        try:
            img_id = int(Prompt.ask(f"[red]Enter ID to delete[/red]"))
            
            # Find and remove image
            for i, img in enumerate(self.data['images']):
                if img['id'] == img_id:
                    if Confirm.ask(f"[red]Delete '{img['title']}'?[/red]"):
                        deleted_img = self.data['images'].pop(i)
                        if self.save_json():
                            console.print(f"[green]{EMOJI['done']} Deleted: {deleted_img['title']}[/green]")
                        else:
                            # Restore if save failed
                            self.data['images'].insert(i, deleted_img)
                    return
            
            console.print(f"[red]Image with ID {img_id} not found.[/red]")
            
        except ValueError:
            console.print("[red]Invalid ID. Please enter a number.[/red]")

def main():
    """Main application loop"""
    
    # Initialize manager
    manager = JSONImageManager()
    
    # Show title
    panel_text = (
        f"[bold cyan]{EMOJI['title']}JSON Image Gallery Manager[/bold cyan]\n"
        "[dim]Automatically convert gs:// links and add to your gallery JSON[/dim]\n"
        f"[dim]JSON File: {manager.json_path}[/dim]"
    )
    
    width = min(console.width - 10, 70)
    console.print(Panel(
        panel_text,
        title=f"{EMOJI['title']} Gallery Manager",
        border_style="cyan",
        width=width
    ))
    
    while True:
        try:
            console.print(f"\n[bold cyan]Options:[/bold cyan]")
            console.print(f"[white]1.[/white] {EMOJI['add']} Add single image")
            console.print(f"[white]2.[/white] {EMOJI['batch']} Batch add images")
            console.print(f"[white]3.[/white] {EMOJI['list']} List all images")
            console.print(f"[white]4.[/white] {EMOJI['error']} Delete image")
            console.print(f"[white]5.[/white] {EMOJI['exit']} Exit")
            
            choice = Prompt.ask(f"[yellow]Choose an option[/yellow]", choices=["1", "2", "3", "4", "5"])
            
            if choice == "1":
                manager.add_single_image()
            elif choice == "2":
                manager.batch_add_images()
            elif choice == "3":
                manager.list_images()
            elif choice == "4":
                manager.delete_image()
            elif choice == "5":
                console.print(f"[green]{EMOJI['exit']} Goodbye![/green]")
                break
                
        except KeyboardInterrupt:
            console.print(f"\n[green]{EMOJI['exit']} Goodbye![/green]")
            break
        except Exception as e:
            console.print(f"[red]{EMOJI['error']} Unexpected error: {e}[/red]")

if __name__ == "__main__":
    main()