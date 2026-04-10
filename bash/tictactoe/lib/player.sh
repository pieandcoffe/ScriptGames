#!/bin/bash
#
# player.sh — Human-player input handling.
#
# Exports:
#   prompt_player_name   — asks for a nickname, sets PLAYER_NAME
#   show_pause_menu      — interactive pause overlay; returns exit code:
#                            0 = Resume
#                            1 = Save & Quit
#                            2 = Quit without saving
#   player_input         — one full turn of input; returns:
#                            0 = valid move placed
#                            1 = player chose to quit

prompt_player_name() {
    printf "Who is playing? (enter your nickname): "
    read -r PLAYER_NAME
    PLAYER_NAME="${PLAYER_NAME:-Anonymous}"
}

show_pause_menu() {
    local items=("Resume" "Save & Quit" "Quit without saving")
    local selected=0

    while true; do
        draw_pause_menu "$selected"

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
        draw_board

        IFS= read -rsn1 key

        if [[ $key == $'\x1b' ]]; then
            IFS= read -rsn2 key2
            case $key2 in
                '[A') (( CURSOR_ROW > 0 )) && (( CURSOR_ROW-- )) ;;
                '[B') (( CURSOR_ROW < 2 )) && (( CURSOR_ROW++ )) ;;
                '[C') (( CURSOR_COL < 2 )) && (( CURSOR_COL++ )) ;;
                '[D') (( CURSOR_COL > 0 )) && (( CURSOR_COL-- )) ;;
            esac
        else
            case $key in
                q|Q)
                    show_pause_menu
                    local choice=$?
                    case $choice in
                        0) ;;                      # Resume — loop back
                        1) save_game; return 1 ;;  # Save & Quit
                        2) return 1             ;;  # Quit without saving
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
