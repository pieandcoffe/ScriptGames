import os
import json

class Message:
    def __init__(self, role: str, content: str):
        self.role = role
        self.content = content
    
    def get(self):
        return {"role": self.role, "content": self.content}


class History:
    DEFAULT_LIMIT: int = 10

    def __init__(self, path: str = "storage/history.json", limit: int = DEFAULT_LIMIT):
        self.path = path
        self.limit = limit
        self.persistant: list[dict] = []
        self.conversation: list[dict] = []
    
        self._load()

    def _load(self):
        if not os.path.exists(self.path):
            self._save()
            return
        
        try:
            with open(self.path, "r", encoding="utf-8") as f:
                data = json.load(f)
            
            self.limit = data.get("limit", self.DEFAULT_LIMIT)
            self.persistant = data.get("persistant", [])
            self.conversation = data.get("conversation", [])

        except (json.JSONDecodeError, IOError):
            self.limit = self.DEFAULT_LIMIT
            self.persistant = []
            self.conversation = []
            self._save()

    def _save(self):
        data = {
            "limit": self.limit,
            "persistant": self.persistant,
            "conversation": self.conversation
        }

        os.makedirs(os.path.dirname(self.path), exist_ok=True)

        with open(self.path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

    def append(self, message: Message, persistant: bool = False):
        if persistant:
            self.persistant.append(message.get())
        else:
            self.conversation.append(message.get())
            self.conversation = self.conversation[-self.limit:]

        self._save()

    def get(self):
        return self.persistant + self.conversation
