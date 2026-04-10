#!/bin/bash

cursor_row=0
cursor_col=0

player_input ()
{
  while true; do
    clear
    echo "$(draw_cell "${CURRENT_PLAYER}")'s turn"
    draw_board $cursor_row $cursor_col

    read -rsn1 key
    if [[ $key == $'\x1b' ]]; then
      read -rsn2 key
      case $key in
        '[A') (( cursor_row > 0 )) && (( cursor_row-- )) ;;
        '[B') (( cursor_row < 2 )) && (( cursor_row++ )) ;;
        '[C') (( cursor_col < 2 )) && (( cursor_col++ )) ;;
        '[D') (( cursor_col > 0 )) && (( cursor_col-- )) ;;
      esac
    elif [[ $key == $'\n' || $key == $'\r' || $key == '' || $key == $' ' ]]; then
      if is_cell_empty $cursor_row $cursor_col; then
        update_board $cursor_row $cursor_col "$CURRENT_PLAYER"
        break
      else
        printf '\a'
      fi
    fi
  done
}

player_turn ()
{
  player_input

  if check_game_over "$CURRENT_PLAYER"; then
    echo "Game over. Thanks for playing!"
    read -rsn1 -p $'Press any key to exit...\n'
    echo
    exit 0
  fi

  [[ $CURRENT_PLAYER == "X" ]] && CURRENT_PLAYER="O" || CURRENT_PLAYER="X"
}

