#!/bin/bash

. ./lib/game.sh

trap 'printf "\n\nThanks for playing! See you later. (^o^)\n"' EXIT

init_game
game_loop
