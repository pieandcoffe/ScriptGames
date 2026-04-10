#!/bin/bash

. ./lib/draw.sh
. ./lib/board.sh
. ./lib/player.sh

declare -a BOARD
declare    CURRENT_PLAYER="X"
declare -i CURSOR_ROW=1
declare -i CURSOR_COL=1
declare    LAST_RESULT=""

init_board

while true; do
  player_turn
done
