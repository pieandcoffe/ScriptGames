#!/bin/bash

. ./lib/player.sh
. ./lib/board.sh

init_board
current_player="X"

while true; do
  player_turn
done
