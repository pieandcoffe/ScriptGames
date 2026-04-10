#!/bin/bash

. ./lib/colors.sh

draw_board ()
{
  local cur_row=$1
  local cur_col=$2

  local top_sep="┌─────┬─────┬─────┐"
  local mid_sep="├─────┼─────┼─────┤"
  local bot_sep="└─────┴─────┴─────┘"

  echo -e "${DIM}$top_sep${RESET}"
	for row in 0 1 2; do
    local line="${DIM}│${RESET}"
    for col in 0 1 2; do
      local idx=$(( row * BOARD_SIZE + col ))
      local cell="${BOARD[$idx]}"
      if [[ $row -eq $cur_row && $col -eq $cur_col ]]; then
        line+="  ${HIGHLIGHT}$(draw_cell "${cell:-}" )${RESET}  "
      else
        line+="  $(draw_cell "${cell:- }")  "
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