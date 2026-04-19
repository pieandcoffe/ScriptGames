#!/bin/bash

ai_move() {
  random
}

random() {
  local empty=()
  for i in "${!BOARD[@]}"; do
    [[ "${BOARD[$i]}" == " " ]] && empty+=("$i")
  done
  (( ${#empty[@]} == 0 )) && return 1
  local pick=$(( RANDOM % ${#empty[@]} ))
  BOARD[${empty[$pick]}]="O"
}
