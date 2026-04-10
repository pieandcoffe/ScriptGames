#!/bin/bash

. ./lib/draw.sh
. ./lib/board.sh
. ./lib/player.sh

declare -i BOARD_SIZE=3
declare -a BOARD
declare    CURRENT_PLAYER="X"
declare -i CURSOR_ROW=0
declare -i CURSOR_COL=0
declare    LAST_RESULT=""

prompt_player_name
init_board

while true; do
  player_turn
done
