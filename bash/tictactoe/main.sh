#!/bin/bash

. ./lib/save.sh
. ./lib/draw.sh
. ./lib/board.sh
. ./lib/player.sh

declare -i BOARD_SIZE=3
declare -a BOARD
declare    CURRENT_PLAYER="X"
declare -i CURSOR_ROW=0
declare -i CURSOR_COL=0
declare -i X_SCORE=0
declare -i O_SCORE=0
declare    LAST_RESULT=""

if has_saved_game; then
    printf "Saved game found. Load it? [Y/n]: "
    read -r load_choice
    if [[ -z "$load_choice" || "$load_choice" =~ ^[Yy]$ ]] && load_game; then
        echo "Saved game loaded."
    else
        prompt_player_name
        init_board
    fi
else
    prompt_player_name
    init_board
fi

while player_turn; do
    :
 done
