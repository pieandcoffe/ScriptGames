from src.bot import Bot

def main():
    bot = Bot()
    while True:
        user_input: str = input("Message Bot: ")
        bot.ask(user_input)

        reply: str = bot.reply()
        print(f"Bot: {reply}")

if __name__ == "__main__":
    main()