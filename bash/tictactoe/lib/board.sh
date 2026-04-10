#!/bin/bash

readonly BOARD_SIZE=3

declare -a BOARD

RED=$'\e[31m'
BLUE=$'\e[34m'
WHITE=$'\e[97m'
GRAY=$'\e[90m'
BOLD=$'\e[1m'

HIGHLIGHT=$'\e[7m'
RESET=$'\e[0m'

init_board () 
{
	BOARD=(" " " " " " " " " " " " " " " " " ")
}

_check_line() {
    local p="$1" a=$2 b=$3 c=$4
    [[ "${BOARD[$a]}" == "$p" && "${BOARD[$b]}" == "$p" && "${BOARD[$c]}" == "$p" ]]
}

check_win() {
    local player="$1"
    # rows
    _check_line "$player" 0 1 2 && return 0
    _check_line "$player" 3 4 5 && return 0
    _check_line "$player" 6 7 8 && return 0
    # columns
    _check_line "$player" 0 3 6 && return 0
    _check_line "$player" 1 4 7 && return 0
    _check_line "$player" 2 5 8 && return 0
    # diagonals
    _check_line "$player" 0 4 8 && return 0
    _check_line "$player" 2 4 6 && return 0
    return 1
}

check_draw () 
{
	for cell in "${BOARD[@]}"; do
		if [[ "$cell" == " " ]]; then
			return 1
		fi
	done
	return 0
}

check_game_over() {
    if check_win "$CURRENT_PLAYER"; then
        LAST_RESULT="${CURRENT_PLAYER}_WIN"
        return 0
    fi
    if check_draw; then
        LAST_RESULT="DRAW"
        return 0
    fi
    LAST_RESULT=""
    return 1
}

update_board () 
{
	local row=$1
	local col=$2
	local player=$3
	local index=$(coords_to_index $row $col)
	BOARD[$index]=$player
}

is_cell_empty () 
{
	local row=$1
	local col=$2
	local index=$(coords_to_index $row $col)
	[[ "${BOARD[$index]}" == " " ]]
}

coords_to_index () 
{
	local row=$1
	local col=$2
	echo $(( row * BOARD_SIZE + col ))
}
