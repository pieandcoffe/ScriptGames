#!/bin/bash

init_board () 
{
	local size=$((BOARD_SIZE * BOARD_SIZE))
	BOARD=()
	for ((i=0; i<size; i++)); do
		BOARD+=(" ")
	done
}

_check_line() {
    local player="$1"
    shift
    local indices=("$@")
    for idx in "${indices[@]}"; do
        if [[ "${BOARD[$idx]}" != "$player" ]]; then
            return 1
        fi
    done
    return 0
}

_check_win() {
    local player="$1"
    # Check rows
    for ((r=0; r<BOARD_SIZE; r++)); do
        local indices=()
        for ((c=0; c<BOARD_SIZE; c++)); do
            indices+=($((r*BOARD_SIZE + c)))
        done
        if _check_line "$player" "${indices[@]}"; then WIN_COMBO=("${indices[@]}"); return 0; fi
    done
    # Check columns
    for ((c=0; c<BOARD_SIZE; c++)); do
        local indices=()
        for ((r=0; r<BOARD_SIZE; r++)); do
            indices+=($((r*BOARD_SIZE + c)))
        done
        if _check_line "$player" "${indices[@]}"; then WIN_COMBO=("${indices[@]}"); return 0; fi
    done
    # Check main diagonal
    local indices=()
    for ((i=0; i<BOARD_SIZE; i++)); do
        indices+=($((i*BOARD_SIZE + i)))
    done
    if _check_line "$player" "${indices[@]}"; then WIN_COMBO=("${indices[@]}"); return 0; fi
    # Check anti-diagonal
    local indices=()
    for ((i=0; i<BOARD_SIZE; i++)); do
        indices+=($((i*BOARD_SIZE + (BOARD_SIZE-1-i))))
    done
    if _check_line "$player" "${indices[@]}"; then WIN_COMBO=("${indices[@]}"); return 0; fi
    return 1
}

_check_draw () 
{
	for cell in "${BOARD[@]}"; do
		if [[ "$cell" == " " ]]; then
			return 1
		fi
	done
	return 0
}

check_game_over() {
    if _check_win "X"; then
        LAST_RESULT="X_WIN"
    elif _check_win "O"; then
        LAST_RESULT="O_WIN"
    elif _check_draw; then
        LAST_RESULT="DRAW"
    else
        LAST_RESULT=""
        return 1
    fi
    return 0
}

_coords_to_index () 
{
	echo $(( CURSOR_ROW * BOARD_SIZE + CURSOR_COL ))
}

update_board () 
{
	local index=$(_coords_to_index $CURSOR_ROW $CURSOR_COL)
	BOARD[$index]=$CURRENT_PLAYER
}

is_cell_empty () 
{
	local index=$(_coords_to_index $CURSOR_ROW $CURSOR_COL)
	[[ "${BOARD[$index]}" == " " ]]
}