#!/bin/bash

. ./lib/colors.sh

build_sep() {
    local left="$1" mid="$2" right="$3"
    local sep="─────"
    local s="$left"
    for ((i=0; i<BOARD_SIZE; i++)); do
        s+="$sep"
        if ((i < BOARD_SIZE-1)); then
            s+="$mid"
        fi
    done
    s+="$right"
    echo "$s"
}

draw_board ()
{
  local cur_row=$1
  local cur_col=$2

  local top_sep=$(build_sep "┌" "┬" "┐")
  local mid_sep=$(build_sep "├" "┼" "┤")
  local bot_sep=$(build_sep "└" "┴" "┘")

  echo -e "${DIM}$top_sep${RESET}"
	for ((row=0; row<BOARD_SIZE; row++)); do
    local line="${DIM}│${RESET}"
    for ((col=0; col<BOARD_SIZE; col++)); do
      local idx=$(( row * BOARD_SIZE + col ))
      local cell="${BOARD[$idx]}"
      if (( ${#WIN_COMBO[@]} > 0 )); then
        if [[ " ${WIN_COMBO[*]} " == *" $idx "* ]]; then
          line+="  $(draw_cell "${cell:-}" )  "
        else
          line+="  $(draw_cell_dim "${cell:- }")  "
        fi
      else
        if [[ $row -eq $cur_row && $col -eq $cur_col ]]; then
          line+="  ${HIGHLIGHT}$(draw_cell "${cell:-}" )${RESET}  "
        else
          line+="  $(draw_cell "${cell:- }")  "
        fi
      fi
      line+="${DIM}│${RESET}"
    done
    echo -e "$line"
    if [[ $row -lt $((BOARD_SIZE - 1)) ]]; then
      echo -e "${DIM}$mid_sep${RESET}"
    fi
	done
	echo -e "${DIM}$bot_sep${RESET}"
}

draw_cell () 
{
  local cell=$1
  case $cell in
    X) printf "${BLUE}${BOLD}X${RESET}" ;;
    O) printf "${RED}${BOLD}O${RESET}" ;;
    *) printf " " ;;
  esac
}

draw_cell_dim () 
{
  local cell=$1
  case $cell in
    X) printf "${BLUE}${DIM}X${RESET}" ;;
    O) printf "${RED}${DIM}O${RESET}" ;;
    *) printf " " ;;
  esac
}

draw_pause_menu() {
    local selected=$1
    shift
    local items=("$@")
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
    echo -e " Turn: $(draw_cell "${CURRENT_PLAYER}") | Player: ${PLAYER_NAME} | Scores X: ${X_SCORE}  O: ${O_SCORE}"
    echo -e "${DIM}  ↑↓/←→: move   ↵/␣: place   Q: pause${RESET}"
}
