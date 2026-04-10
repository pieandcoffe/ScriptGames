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

check_win () 
{
	local player=$1

	# Check rows
	for row in 0 1 2; do
		local i=$((row * BOARD_SIZE))
		if [[ "${BOARD[$i]}" == "$player" && "${BOARD[$i+1]}" == "$player" && "${BOARD[$i+2]}" == "$player" ]]; then
			return 0
		fi
	done

	# Check columns
	for col in 0 1 2; do
		local i=$col
		if [[ "${BOARD[$i]}" == "$player" && "${BOARD[$i+BOARD_SIZE]}" == "$player" && "${BOARD[$i+2*BOARD_SIZE]}" == "$player" ]]; then
			return 0
		fi
	done

	# Check diagonals
	if [[ "${BOARD[0]}" == "$player" && "${BOARD[4]}" == "$player" && "${BOARD[8]}" == "$player" ]]; then
		return 0
	fi

	if [[ "${BOARD[2]}" == "$player" && "${BOARD[4]}" == "$player" && "${BOARD[6]}" == "$player" ]]; then
		return 0
	fi

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

check ()
{
	local current_player=$1
	if check_win "$current_player"; then
    	echo "$(draw_cell "${current_player}") wins!"
    	return 0
	fi
	if check_draw; then
		echo "Draw!"
		return 0
	fi

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
