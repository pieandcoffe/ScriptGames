#!/bin/bash

source board.sh

cursor_row=0
cursor_col=0

current_player="X"

player_turn ()
{
  echo "${current_player}'s turn"
  player_input

  [[ $current_player="X" ]] && current_player="O" || current_player="X"
}

player_input ()
{
  while true; do
    clear
    draw_board $cursor_row $cursor_col

    read -rsn1 key
    if [[ $key == $'\x1b' ]]; then
      read -rsn2 key
      case $key in
        '[A') (( cursor_row > 0 )) && (( cursor_row-- )) ;;
        '[B') (( cursor_row < 2 )) && (( cursor_row++ )) ;;
        '[C') (( cursor_col > 0 )) && (( cursor_col-- )) ;;
        '[D') (( cursor_col < 2 )) && (( cursor_col++ )) ;;
      esac
    elif [[ $key == '' ]]; then
      if is_cell_empty $cursor_row $cursor_col; then
        update_board $cursor_row $cursor_col "$current_player"
        break 
      fi
  done
}
