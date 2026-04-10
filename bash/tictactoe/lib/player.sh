#!/bin/bash

player_input ()
{
  while true; do
    clear
    echo "$(draw_cell "${CURRENT_PLAYER}")'s turn"
    draw_board $CURSOR_ROW $CURSOR_COL

    read -rsn1 key
    if [[ $key == $'\x1b' ]]; then
      read -rsn2 key
      case $key in
        '[A') (( CURSOR_ROW > 0 )) && (( CURSOR_ROW-- )) ;;
        '[B') (( CURSOR_ROW < 2 )) && (( CURSOR_ROW++ )) ;;
        '[C') (( CURSOR_COL < 2 )) && (( CURSOR_COL++ )) ;;
        '[D') (( CURSOR_COL > 0 )) && (( CURSOR_COL-- )) ;;
      esac
    elif [[ $key == $'\n' || $key == $'\r' || $key == '' || $key == $' ' ]]; then
      if is_cell_empty $CURSOR_ROW $CURSOR_COL; then
        update_board $CURSOR_ROW $CURSOR_COL "$CURRENT_PLAYER"
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

