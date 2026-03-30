#!/bin/bash

. ./lib/board.sh
. ./lib/player.sh

declare -a BOARD
declare CURRENT_PLAYER="X"
declare -i X_SCORE=0
declare -i O_SCORE=0
declare -i CURSOR_ROW=1
declare -i CURSOR_COL=1
declare -u PLAYER_NAME
declare SAVE_DATE=$(date)

# Trap Ctrl+C and save game before exiting
trap 'save_game; exit' INT TERM

init_board
load_game && echo "Loaded OK" || echo "Load FAILED, using fresh board"

while true; do
  player_turn
  save_game
done
