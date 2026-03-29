#!/bin/bash

readonly BOARD_SIZE=3

declare -a BOARD

init_board () 
{
	BOARD=(" " " " " " " " " " " " " " " " " ")
}

draw_board ()
{
	local top_sep="┌─────┬─────┬─────┐"
	local mid_sep="├─────┼─────┼─────┤"
	local bot_sep="└─────┴─────┴─────┘"

    	echo "$top_sep"
	for row in 0 1 2; do
		local i=$((row * BOARD_SIZE))
		echo "│  ${BOARD[$i]}  │  ${BOARD[$i+1]}  │  ${BOARD[$i+2]}  │"
		if [[ $row -lt 2 ]]; then
			echo "$mid_sep"
		fi
	done
	echo "$bot_sep"
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
	echo $(( (row - 1) * BOARD_SIZE + (col - 1) ))
}
