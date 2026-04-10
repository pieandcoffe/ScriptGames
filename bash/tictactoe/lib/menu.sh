#!/bin/bash
#
# menu.sh — Main menu and records screen.
#
# Exports:
#   show_menu      — interactive main-menu loop (never returns; exits via cleanup)
#   show_records   — displays the records file and waits for Enter

show_menu() {
    local items=("Start" "Load" "Records" "Quit")
    local selected=0

    while true; do
        draw_title
        draw_main_menu "$selected"

        IFS= read -rsn1 key
        if [[ $key == $'\x1b' ]]; then
            IFS= read -rsn2 key
            case $key in
                '[A') (( selected > 0 ))                     && (( selected-- )) ;;
                '[B') (( selected < ${#items[@]} - 1 )) && (( selected++ )) ;;
            esac
        else
            case $key in
                ''|$'\n'|$'\r')
                    case "${items[$selected]}" in
                        "Start")
                            init_board
                            CURRENT_PLAYER="X"
                            CURSOR_ROW=1
                            CURSOR_COL=1
                            prompt_player_name
                            game_loop
                            ;;
                        "Load")
                            if load_game; then
                                game_loop
                            else
                                # load_game already called init_board + prompt_player_name on failure
                                game_loop
                            fi
                            ;;
                        "Records") show_records ;;
                        "Quit")    cleanup      ;;
                    esac
                    ;;
            esac
        fi
    done
}

show_records() {
    draw_records
    read -rp "Press Enter to return to menu..."
}
