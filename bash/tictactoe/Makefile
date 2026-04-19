# Makefile for a tic tac toe game by Kyrylo Pylinskyi
GAME_DIR    := .
ENTRY       := main.sh
BINARY      := tictactoe
BUNDLE      := tictactoe.run
TMP         := .build_tmp.sh

.PHONY: all run bundle binary debug clean install uninstall help

all: bundle

run:
	@bash ./$(ENTRY)

bundle:
	@echo "Packaging Linux .run..."
	@makeself $(GAME_DIR) $(BUNDLE) "Tic Tac Toe" ./$(ENTRY)
	@echo "Done $(BUNDLE)"

$(TMP):
	@echo "Bundling sources..."
	@echo '#!/bin/bash' > $(TMP)
	@for f in lib/goodbye.sh lib/save.sh lib/colors.sh lib/draw.sh \
	           lib/board.sh lib/player.sh lib/ai.sh lib/game.sh; do \
	    echo "" >> $(TMP); \
	    grep -v '^\. \./lib/' "$$f" | grep -v '^#!' >> $(TMP); \
	    echo "" >> $(TMP); \
	done
	@grep -v '^\. \./lib/' lib/game.sh | grep -v '^#!' >> $(TMP)
	@echo "" >> $(TMP)
	@grep -v '^\. \./lib/' $(ENTRY) | grep -v '^#!' >> $(TMP)
	@chmod +x $(TMP)
	@echo "Done $(TMP)"

debug: $(TMP)
	@bash -n $(TMP) && echo "Syntax OK" || echo "Syntax error in $(TMP)"

binary: $(TMP)
	@echo "Compiling..."
	@shc -r -f $(TMP) -o $(BINARY)
	@rm -f $(TMP) $(TMP).x.c
	@echo "Done $(BINARY)"

clean:
	@echo "Cleaning..."
	@rm -f $(BINARY) $(BUNDLE) $(TMP) $(TMP).x.c
	@echo "Clean"

install: binary
	@echo "Installing to /usr/local/bin/$(BINARY)..."
	@sudo cp $(BINARY) /usr/local/bin/$(BINARY)
	@sudo chmod +x /usr/local/bin/$(BINARY)
	@rm -f $(BINARY)
	@echo "Installed - run with $(BINARY)"

uninstall:
	@sudo rm -f /usr/local/bin/$(BINARY)
	@echo "Uninstalled"

help:
	@echo ""
	@echo "  make run        Run the game directly"
	@echo "  make bundle     Build .run package (makeself)"
	@echo "  make binary     Compile to binary (shc)"
	@echo "  make debug      Check bundle syntax without compiling"
	@echo "  make install    Build + install to /usr/local/bin"
	@echo "  make uninstall  Remove from /usr/local/bin"
	@echo "  make clean      Remove build artifacts"
	@echo ""