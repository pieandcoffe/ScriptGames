import os
from src.history import Message, History
from src.config import Config

class Prompt:
    def __init__(self):
        self.history = History()
        self.config = Config()
        self._load_system_prompt()

    def _load_system_prompt(self, path: str = "configuration/system_prompt.txt"):
        system_prompt = "You are a helpful assistant!"

        if os.path.exists(path):
            try:
                with open(path, "r", encoding="utf-8") as f:
                    text = f.read().strip()
                    if text:
                        system_prompt = text
            except Exception as e:
                print(f"Failed to read system prompt: {e}")

        config_text = (
            "\n\n--- RESTAURANT CONFIGURATION ---\n"
            f"OPENING HOURS: {self.config.get_opening_hours()}"
            f"MENU: {self.config.get_menu()}"
            f"MENU CATEGORIES: {self.config.get_menu_categories()}"
        )

        system_prompt += config_text

        # store the system prompt as persistent
        self.add_persistant_message("system", system_prompt)

    def add_persistant_message(self, role: str, content: str):
        self.history.append(Message(role, content), True)

    def add_conversation_message(self, role: str, content: str):
        self.history.append(Message(role, content), False)

    def build(self, user_input: str):
        message = Message("user", user_input)
        return self.history.get() + [message.get()]
