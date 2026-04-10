#!/bin/bash
#
# game.sh — Round lifecycle and game loop.
#
# Exports:
#   game_loop      — runs rounds until the player quits to menu
#   _player_turn   — one full turn: input → place → check → switch

# Runs a full match session.  Returns when QUIT_TO_MENU is set.
game_loop() {
    GAME_OVER=0
    QUIT_TO_MENU=0

    while [[ $GAME_OVER -eq 0 ]]; do
        _player_turn

        if [[ $QUIT_TO_MENU -eq 0 && $GAME_OVER -eq 0 ]]; then
            save_game
        fi
    done
}

# One player turn:
#   1. Collect input (move or quit).
#   2. If quit → flag and return.
#   3. Check win/draw.
#   4. If game over → display result, update scores, save, wait for keypress.
#   5. Otherwise → switch player and continue.
_player_turn() {
    player_input
    local input_status=$?

    if [[ $input_status -eq 1 ]]; then
        QUIT_TO_MENU=1
        GAME_OVER=1
        return
    fi

    if check_game_over; then
        clear
        draw_board
        echo

        case "$LAST_RESULT" in
            X_WIN)
                echo -e "$(draw_cell X) wins!"
                (( X_SCORE++ ))
                append_record "X wins"
                ;;
            O_WIN)
                echo -e "$(draw_cell O) wins!"
                (( O_SCORE++ ))
                append_record "O wins"
                ;;
            DRAW)
                echo "It's a draw!"
                append_record "Draw"
                ;;
        esac

        save_game
        read -rsn1 -p $'\nPress any key to continue...'
        echo

        # Reset for next round without wiping scores or player name
        init_board
        CURRENT_PLAYER="X"
        CURSOR_ROW=1
        CURSOR_COL=1
        GAME_OVER=1   # exit game_loop; caller (show_menu) re-enters it if desired
        return
    fi

    # Switch player
    [[ $CURRENT_PLAYER == "X" ]] && CURRENT_PLAYER="O" || CURRENT_PLAYER="X"
}
