#!/bin/bash

. ./lib/draw.sh
. ./lib/board.sh
. ./lib/player.sh

declare -a BOARD
declare    CURRENT_PLAYER="X"
declare    LAST_RESULT=""

init_board

while true; do
  player_turn
done
