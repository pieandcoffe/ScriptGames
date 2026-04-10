#!/bin/bash
#
# board.sh — Board state and game logic.
# No rendering, no I/O, no save/load.
#
# Exports:
#   BOARD[]          9-cell array, " " | "X" | "O"
#   LAST_RESULT      set by check_game_over: "X_WIN" | "O_WIN" | "DRAW" | ""
#
#   init_board
#   update_board          — places CURRENT_PLAYER at (CURSOR_ROW, CURSOR_COL)
#   is_cell_empty         — returns 0 if the cell at cursor is free
#   coords_to_index       — echoes the flat index for (CURSOR_ROW, CURSOR_COL)
#   check_win <player>    — returns 0 if <player> has won
#   check_draw            — returns 0 if the board is full (no " " left)
#   check_game_over       — sets LAST_RESULT; returns 0 if the game ended

readonly BOARD_SIZE=3

init_board() {
    BOARD=(" " " " " " " " " " " " " " " " " ")
}

# ── Win / draw detection ──────────────────────────────────────────────────────

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

check_draw() {
    local cell
    for cell in "${BOARD[@]}"; do
        [[ "$cell" == " " ]] && return 1
    done
    return 0
}

# Sets LAST_RESULT to "X_WIN", "O_WIN", "DRAW", or "" (game ongoing).
# Returns 0 if the game is over, 1 if it continues.
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

# ── Board mutation ────────────────────────────────────────────────────────────

coords_to_index() {
    echo $(( CURSOR_ROW * BOARD_SIZE + CURSOR_COL ))
}

is_cell_empty() {
    local index
    index=$(coords_to_index)
    [[ "${BOARD[$index]}" == " " ]]
}

update_board() {
    local index
    index=$(coords_to_index)
    BOARD[$index]=$CURRENT_PLAYER
}
