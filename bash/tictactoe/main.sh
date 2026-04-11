#!/bin/bash

. ./lib/game.sh

tput civis
tput smcup
clear

cleanup() {
    trap - INT TERM EXIT
    tput rmcup
    tput cnorm
    tput sgr0
    
    goodbye
    exit 0
}

goodbye() {
  echo "Thanks for playing! See you later (^o^)"
}

trap 'cleanup' INT TERM EXIT

init_game
game_loop
