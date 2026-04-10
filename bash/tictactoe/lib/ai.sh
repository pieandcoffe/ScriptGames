#!/bin/bash
#
# ai.sh — AI opponent (minimax, not yet implemented).
#
# Exports:
#   ai_move   — sets CURSOR_ROW / CURSOR_COL to the best available cell,
#               then calls update_board.
#               Returns 1 if the board is already full (should not happen).

# Placeholder: picks the first empty cell.
# Replace the body of _ai_best_move with a minimax implementation.
ai_move() {
    local row col idx
    for row in 0 1 2; do
        for col in 0 1 2; do
            idx=$(( row * BOARD_SIZE + col ))
            if [[ "${BOARD[$idx]}" == " " ]]; then
                CURSOR_ROW=$row
                CURSOR_COL=$col
                update_board
                return 0
            fi
        done
    done
    return 1   # board full
}
