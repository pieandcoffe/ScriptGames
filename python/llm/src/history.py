import json

class Message:
    def __init__(self, role: str, content: str):
        self.role = role
        self.content = content
    
    def get(self):
        return { "role": self.role, "content": self.content }

class History:
    def __init__(self, path: str = "storage/history.json", limit: int = 10):
        self.path = path
        self.limit = limit
        self.persistant = list[dict] = []
        self.conversation = list[dict] = []
    
        self._load()

    def _load(self):
        pass

    def append(self, message: Message, persistant: bool = False):
        if persistant:
            self.persistant.append(message.get())
        else:
            self.conversation.append(message.get())
