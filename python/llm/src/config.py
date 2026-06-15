import os
import json
import unicodedata

class Config:
    def __init__(self, path="configuration/config.json"):
        self.path = path
        self.data = self._load()
    
    def _load(self):
        if not os.path.exists(self.path):
            raise FileNotFoundError(f"Config file not found: {self.path}")
        
        with open(self.path, "r", encoding="utf-8") as f:
            return json.load(f)
        
    def get_opening_hours(self):
        return self.data.get("opening_hours", {})
    
    def get_opening_hours_for(self, day: str):
        day = day.lower().strip()
        return self.data.get("opening_hours", {}).get(day, None)
    
    def get_menu(self):
        return self.data.get("menu", [])
    
    def get_menu_categories(self):
        return [category["category"] for category in self.get_menu()]

    def find_item_by_id(self, item_id: str):
        item_id = item_id.upper().strip()

        for category in self.get_menu():
            for item in category["items"]:
                if item["id"].upper() == item_id:
                    return item
        return None

    def find_item_by_name(self, name: str):
        normalized = self._normalize(name)

        for category in self.get_menu():
            for item in category["items"]:
                if self._normalize(item["name"]) == normalized:
                    return item

        return None

    def _normalize(self, text: str):
        text = text.lower().strip()
        text = unicodedata.normalize("NFKD", text)
        return "".join(c for c in text if not unicodedata.combining(c))