#!/bin/bash
#
# ui.sh — All terminal rendering.
# Pure output: reads globals, writes to the terminal, never mutates state.
#
# Exports:
#   draw_cell <X|O|" ">           — prints a styled cell character
#   draw_board                    — prints the full 3×3 board with cursor highlight
#   draw_title                    — clears and prints the game title header
#   draw_main_menu <selected>     — prints the main-menu item list
#   draw_pause_menu <selected>    — prints the pause-menu item list
#   draw_records                  — prints the records file (or "no records" msg)
#   draw_hud                      — prints the one-line heads-up display (turn/scores)

draw_cell() {
    local cell=$1
    case $cell in
        X) printf "${BLUE}${BOLD}X${RESET}" ;;
        O) printf "${RED}${BOLD}O${RESET}"  ;;
        *) printf " "                        ;;
    esac
}

draw_board() {
    local top_sep="┌─────┬─────┬─────┐"
    local mid_sep="├─────┼─────┼─────┤"
    local bot_sep="└─────┴─────┴─────┘"

    echo -e "${DIM}$top_sep${RESET}"
    local row
    for row in 0 1 2; do
        local line="${DIM}│${RESET}"
        local col
        for col in 0 1 2; do
            local idx=$(( row * BOARD_SIZE + col ))
            local cell
            cell=$(draw_cell "${BOARD[$idx]}")
            if [[ $row -eq $CURSOR_ROW && $col -eq $CURSOR_COL ]]; then
                line+="${DIM}  ${RESET}${HIGHLIGHT}${cell}${RESET}${DIM}  │${RESET}"
            else
                line+="${DIM}  ${RESET}${cell}${DIM}  │${RESET}"
            fi
        done
        echo -e "$line"
        if [[ $row -lt $(( BOARD_SIZE - 1 )) ]]; then
            echo -e "${DIM}$mid_sep${RESET}"
        fi
    done
    echo -e "${DIM}$bot_sep${RESET}"
}

draw_title() {
    clear
    printf "${BOLD}TIC-TAC-TOE${RESET}\n"
    printf "${DIM}Kyrylo Pylinskyi${RESET}\n"
    echo
}

draw_main_menu() {
    local selected=$1
    local items=("Start" "Load" "Records" "Quit")
    local i
    for i in "${!items[@]}"; do
        if [[ $i -eq $selected ]]; then
            printf "${HIGHLIGHT} ${items[$i]} ${RESET}\n"
        else
            printf "  ${items[$i]}\n"
        fi
    done
}

draw_pause_menu() {
    local selected=$1
    local items=("Resume" "Save & Quit" "Quit without saving")
    clear
    echo -e "${BOLD}Game paused${RESET}"
    echo
    local i
    for i in "${!items[@]}"; do
        if [[ $i -eq $selected ]]; then
            printf "${HIGHLIGHT} ${items[$i]} ${RESET}\n"
        else
            printf "  ${items[$i]}\n"
        fi
    done
}

draw_hud() {
    echo -e " $(draw_cell "${CURRENT_PLAYER}")'s turn  |  ${PLAYER_NAME}  |  X: ${X_SCORE}  O: ${O_SCORE}"
    echo -e "${DIM}  arrows: move   enter/space: place   q: pause${RESET}"
}

draw_records() {
    clear
    echo "TicTacToe Records"
    echo "================="
    if [[ -f "$RECORD_FILE" ]]; then
        nl -ba "$RECORD_FILE"
    else
        echo "No records yet."
    fi
    echo
}
