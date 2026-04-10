#!/bin/bash
#
# main.sh — Entry point.
# Declares all game globals, sets up the terminal, sources libs, starts the menu.

# ── Source libraries (order matters: dependencies first) ─────────────────────
. "$(dirname "$0")/lib/colors.sh"
. "$(dirname "$0")/lib/board.sh"
. "$(dirname "$0")/lib/ui.sh"
. "$(dirname "$0")/lib/save.sh"
. "$(dirname "$0")/lib/player.sh"
. "$(dirname "$0")/lib/game.sh"
. "$(dirname "$0")/lib/menu.sh"
. "$(dirname "$0")/lib/ai.sh"

# ── Global state ─────────────────────────────────────────────────────────────
declare -a BOARD
declare    CURRENT_PLAYER="X"
declare -i X_SCORE=0
declare -i O_SCORE=0
declare -i CURSOR_ROW=1
declare -i CURSOR_COL=1
declare -i GAME_OVER=0
declare -i QUIT_TO_MENU=0
declare    LAST_RESULT=""
declare    SAVE_DATE
declare    SAVE_FILE="$HOME/.tictactoe_save"
declare    RECORD_FILE="$HOME/.tictactoe_records"
declare    PLAYER_NAME="Anonymous"

SAVE_DATE=$(date)

TERM_COLS=$(tput cols)
TERM_ROWS=$(tput lines)

# ── Terminal setup ────────────────────────────────────────────────────────────
tput civis    # hide cursor
tput smcup    # save screen
clear

cleanup() {
    tput rmcup   # restore screen
    tput cnorm   # show cursor
    tput sgr0    # reset attributes
    exit 0
}

trap 'cleanup' INT TERM EXIT

# ── Entry point ───────────────────────────────────────────────────────────────
init_board
show_menu
