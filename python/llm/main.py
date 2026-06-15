from src.bot import Bot

def main():
    bot = Bot()

    print("Chatbot is ready. Type 'exit' to quit.\n")

    while True:
        user_input = input("You: ").strip()

        if user_input.lower() in ("exit", "quit", "bye"):
            print("Bot: Goodbye!")
            break

        reply = bot.ask(user_input)
        print(f"Bot: {reply}\n")


if __name__ == "__main__":
    main()
