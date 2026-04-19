#!/bin/bash

show_pause_menu() {
    local items=("Resume" "Save & Quit" "Quit without saving")
    local selected=0

    while true; do
        draw_pause_menu "$selected" "${items[@]}"

        IFS= read -rsn1 pkey
        if [[ $pkey == $'\x1b' ]]; then
            IFS= read -rsn2 pkey
            case $pkey in
                '[A') (( selected > 0 ))                && (( selected-- )) ;;
                '[B') (( selected < ${#items[@]} - 1 )) && (( selected++ )) ;;
            esac
        else
            case $pkey in
                ''|$'\n'|$'\r') return $selected ;;
            esac
        fi
    done
}

player_input() {
    while true; do
        clear
        draw_hud
        draw_board "$CURSOR_ROW" "$CURSOR_COL"

        IFS= read -rsn1 key

        if [[ $key == $'\x1b' ]]; then
            IFS= read -rsn2 key2
            case $key2 in
                '[A') (( CURSOR_ROW > 0 )) && (( CURSOR_ROW-- )) ;;
                '[B') (( CURSOR_ROW < BOARD_SIZE - 1 )) && (( CURSOR_ROW++ )) ;;
                '[C') (( CURSOR_COL < BOARD_SIZE - 1 )) && (( CURSOR_COL++ )) ;;
                '[D') (( CURSOR_COL > 0 )) && (( CURSOR_COL-- )) ;;
            esac
        else
            case $key in
                q|Q)
                    show_pause_menu
                    local choice=$?
                    case $choice in
                        0) ;;
                        1) save_game; return 1 ;;
                        2) return 1            ;;
                    esac
                    ;;
                ''|$'\n'|$'\r'|' ')
                    if is_cell_empty; then
                        update_board
                        return 0
                    else
                        printf '\a'
                    fi
                    ;;
            esac
        fi
    done
}

player_turn() {
    if [[ $CURRENT_PLAYER == "X" ]]; then
        player_input || return 1
    else
        ai_move
    fi

    if check_game_over; then
        case "$LAST_RESULT" in
            X_WIN) ((X_SCORE++)) ;;
            O_WIN) ((O_SCORE++)) ;;
        esac
        if handle_game_over; then
            return 0
        else
            return 1
        fi
    fi

    [[ $CURRENT_PLAYER == "X" ]] && CURRENT_PLAYER="O" || CURRENT_PLAYER="X"
}

