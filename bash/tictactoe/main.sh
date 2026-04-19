#!/bin/bash

. ./lib/goodbye.sh
. ./lib/save.sh
. ./lib/colors.sh
. ./lib/draw.sh
. ./lib/board.sh
. ./lib/player.sh
. ./lib/ai.sh
. ./lib/game.sh

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
