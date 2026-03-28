# Makefile for a tic tac toe game by Kyrylo Pylinskyi

GAEM_DIR	:= tictactoe
ENTRY		:= main.sh
BINARY		:= tictactoe
BUNDLE		:= tictactoe.run
SACES_DIR	:= $(GAME_DIR)/saves

.PHONY: all run bindle binary clean install uninstall help

all: bundle

run:
	@bash $(GAME_DIR)/$(ENTRY)

bundle:
	@echo "Packaging"
	@mkdir -p $(SAVES_DIR)
	makeself $(GAME_DIR) $(BUNDLE) "Tic Tac Toe" ./$(ENTRY)
	@echo "Done $(BUNDLE)"

binary:
	@echo "Cleaning"
	shc -r -f $(GAME_DIR)/$(ENTRY) -o $(BINARY)
	@rm -f $(GAME_DIR)/$(ENTRY).x.c
	@echo "Done $(BINARY)"

clean:
	@echo "Cleaning"
	@rm -f $(BINARY) $(BUNDLE) $(GAME_DIR)/$(ENTRY).x.c
	@rm -f $(SAVES_DIR)/*.sav
	@echo "Clean"

install: binary
	@echo "Installing to /usr/local/bin/$(BINARY)..."
	@sudo cp $(BINARY) /usr/local/bin/$(BINARY)
	@sudo chmod +x /usr/local/bin/$(BINARY)
	@echo "Installed - run with $(BINARY)"

uninstall: 
	@sudo rm -f /usr/local/bin/$(BINARY)
	@echo "Uninstalled"

help:
	@echo ""
	@echo "  make run        → Run the game directly"
	@echo "  make bundle     → Build .run package (makeself)"
	@echo "  make binary     → Compile to binary (shc)"
	@echo "  make install    → Build + install to /usr/local/bin"
	@echo "  make uninstall  → Remove from /usr/local/bin"
	@echo "  make clean      → Remove build artifacts"
	@echo ""
