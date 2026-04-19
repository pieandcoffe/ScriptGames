#!/bin/bash

. ./lib/game.sh
. ./lib/goodbye.sh

tput civis
tput smcup
stty -echo -icanon -isig
clear

cleanup() {
    save_game

    trap - INT TERM EXIT
    stty echo icanon isig
    tput rmcup
    tput cnorm
    tput sgr0

    goodbye
    exit 0
}

trap 'cleanup' INT TERM EXIT

init_game
game_loop
