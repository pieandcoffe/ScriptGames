import ollama
from src.prompt import Prompt
from src.history import Message

class Bot:
    def __init__(self, model: str = "gemma3:4b"):
        self.model = model
        self.prompt = Prompt()

    def ask(self, user_input: str) -> str:
        self.prompt.add_conversation_message("user", user_input)
        messages = self.prompt.build(user_input)
        
        response = ollama.chat(model=self.model, messages=messages)
        reply = response["message"]["content"]
        
        self.prompt.add_conversation_message("assistant", reply)

        return reply