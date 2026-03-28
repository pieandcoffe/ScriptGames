# Makefile for a tic tac toe game by Kyrylo Pylinskyi

GAME_DIR	:= .
ENTRY		:= main.sh
BINARY		:= tictactoe
BUNDLE		:= tictactoe.run
APP		:= tictactoe.app
SAVES_DIR	:= $(GAME_DIR)/saves

.PHONY: all run bundle binary clean install uninstall help

all: bundle

run:
	@bash ./$(ENTRY)

bundle:
	@echo "Packaging Linux .run..."
	@mkdir -p $(SAVES_DIR)
	makeself $(GAME_DIR) $(BUNDLE) "Tic Tac Toe" ./$(ENTRY)
	@echo "Done $(BUNDLE)"

app:
	@echo "Packeging macOS .app..."
	@mkdir -p $(APP)/Contents/MacOS
	@mkdir -p $(APP)/Contents/Resources

	@cp -r $(GAME_DIR)/* $(APP)/Contents/MacOS/
	@mkdir -p $(APP)/Contents/MacOS/saves

	@echo '#!/bin/bash' > $(APP)/Contents/MacOS/launcher
	@echo 'DIR="$$(cd "$$(dirname "$$0")" && pwd)"' >> $(APP)/Contents/MacOS/launcher
	@echo 'open -a Terminal "$$DIR/$(ENTRY)"' >> $(APP)/Contents/MacOS/launcher
	@chmod +x $(APP)/Contents/MacOS/launcher

	@echo '<?xml version="1.0" encoding="UTF-8"?>' > $(APP)/Contents/Info.plist
	@echo '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"' >> $(APP)/Contents/Info.plist
	@echo '  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">' >> $(APP)/Contents/Info.plist
	@echo '<plist version="1.0"><dict>' >> $(APP)/Contents/Info.plist
	@echo '  <key>CFBundleName</key><string>TicTacToe</string>' >> $(APP)/Contents/Info.plist
	@echo '  <key>CFBundleExecutable</key><string>launcher</string>' >> $(APP)/Contents/Info.plist
	@echo '  <key>CFBundleIdentifier</key><string>com.yourname.tictactoe</string>' >> $(APP)/Contents/Info.plist
	@echo '  <key>CFBundleVersion</key><string>1.0</string>' >> $(APP)/Contents/Info.plist
	@echo '</dict></plist>' >> $(APP)/Contents/Info.plist

	@echo "Done $(APP)"

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
	@echo "  make run        Run the game directly"
	@echo "  make bundle     Build .run package (makeself)"
	@echo "  make binary     Compile to binary (shc)"
	@echo "  make install    Build + install to /usr/local/bin"
	@echo "  make uninstall  Remove from /usr/local/bin"
	@echo "  make clean      Remove build artifacts"
	@echo ""
