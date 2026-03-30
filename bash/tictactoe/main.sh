#!/bin/bash

. ./lib/board.sh
. ./lib/player.sh

# Trap Ctrl+C and save game before exiting
trap 'save_game; exit' INT TERM

init_board
load_game && echo "Loaded OK" || echo "Load FAILED, using fresh board"

while true; do
  player_turn
  save_game
done
