#!/bin/bash

declare -i BOARD_SIZE=3
declare -a BOARD
declare    CURRENT_PLAYER="X"
declare -i CURSOR_ROW=0
declare -i CURSOR_COL=0
declare -i X_SCORE=0
declare -i O_SCORE=0
declare    LAST_RESULT=""
declare -a WIN_COMBO

init_game() {
    if has_saved_game; then
        if handle_load_game; then
            return
        fi
    fi

    init_board
}

handle_load_game() {
    local items=("Load Game" "New Game")
    local selected=0

    while true; do
        clear
        echo -e "${BOLD}Tic Tac Toe${RESET}"
        echo -e  ${DIM}by Kyrylo Pylinskyi${RESET}
        echo
        draw_load_menu "$selected" "${items[@]}"

        IFS= read -rsn1 key
        if [[ $key == $'\x1b' ]]; then
            IFS= read -rsn2 key2
            case $key2 in
                '[A') (( selected > 0 )) && (( selected-- )) ;;
                '[B') (( selected < ${#items[@]} - 1 )) && (( selected++ )) ;;
            esac
        else
            case $key in
                ''|$'\n'|$'\r')
                    if (( selected == 0 )); then
                        if load_game; then
                            return 0
                        fi
                    fi
                    return 1
                    ;;
            esac
        fi
    done
}

game_loop() {
    while true; do
        player_turn || return
    done
}

handle_game_over() {
    local items=("Play again" "Quit")
    local selected=0

    while true; do
        clear
        draw_hud
        draw_board -1 -1
        echo
        echo "Game over: ${LAST_RESULT//_/ }"
        echo
        draw_game_over_menu "$selected" "${items[@]}"

        IFS= read -rsn1 key
        if [[ $key == $'\x1b' ]]; then
            IFS= read -rsn2 key2
            case $key2 in
                '[A') (( selected > 0 )) && (( selected-- )) ;;
                '[B') (( selected < ${#items[@]} - 1 )) && (( selected++ )) ;;
            esac
        else
            case $key in
                ''|$'\n'|$'\r')
                    if (( selected == 0 )); then
                        CURRENT_PLAYER="X"
                        CURSOR_ROW=0
                        CURSOR_COL=0
                        LAST_RESULT=""
                        WIN_COMBO=()
                        init_board
                        return 0
                    fi
                    return 1
                    ;;
            esac
        fi
    done
}

check_game_over() {
  if _check_win "$CURRENT_PLAYER"; then
    LAST_RESULT="${CURRENT_PLAYER}_WIN"
    clear
    draw_hud
    draw_board -1 -1
    return 0
  fi
  if _check_draw; then
    LAST_RESULT="DRAW"
    clear
    draw_hud
    draw_board -1 -1
    return 0
  fi
  LAST_RESULT=""
  return 1
}
