from history import Message
from history import History
class Prompt:
    def __init__(self, system: str = "You are a helpful asisitant"):
        self.system = system
        self.history = History()
        self.add("system", self.system)

    def add(self, role: str, content: str):
        self.history.append(Message(role, content), True)

    def build(self, user_input: str):
        message = Message("user", user_input)
        return self.history.get() + message.get()