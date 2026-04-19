#!/bin/bash

. ./lib/game.sh
. ./lib/goodbye.sh

tput civis
tput smcup
clear

cleanup() {
    save_game

    trap - INT TERM EXIT
    tput rmcup
    tput cnorm
    tput sgr0

    goodbye
    exit 0
}

trap 'cleanup' INT TERM EXIT

init_game
game_loop
