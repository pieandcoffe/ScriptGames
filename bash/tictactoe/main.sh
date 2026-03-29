#!/bin/bash

. ./lib/board.sh
. ./lib/player.sh

init_board
current_player="X"

while true; do
  player_turn
done
