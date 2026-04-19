#!/bin/bash

ai_move() {
  minimax_move
}

random_move() {
  local empty=()
  for i in "${!BOARD[@]}"; do
    [[ "${BOARD[$i]}" == " " ]] && empty+=("$i")
  done

  (( ${#empty[@]} == 0 )) && return 1
  local pick=$(( RANDOM % ${#empty[@]} ))
  BOARD[${empty[$pick]}]="O"
}

minimax_move() {
  local empty=()
  for i in "${!BOARD[@]}"; do
    [[ "${BOARD[$i]}" == " " ]] && empty+=("$i")
  done

  (( ${#empty[@]} == 0 )) && return 1

  # to safe performance
  if (( ${#empty[@]} > 6 )); then
    random_move
    return
  fi

  local best_score=-999
  local best_move=${empty[0]}

  for i in "${empty[@]}"; do
    BOARD[$i]="O"
    local score
    score=$(minimax "X")
    BOARD[$i]=" "

    if (( score > best_score )); then
      best_score=$score
      best_move=$i
    fi
  done

  BOARD[$best_move]="O"
}

minimax() {
  local player="$1"
  local depth=${2:-0}

  if (( depth > 3 )); then
    echo 0
    return
  fi

  if _check_win "O"; then
    echo 10
    return
  fi
  if _check_win "X"; then
    echo -10
    return
  fi
  if _check_draw; then
    echo 0
    return
  fi

  local best_score
  if [[ "$player" == "O" ]]; then
    best_score=-999
  else
    best_score=999
  fi

  local next_player
  for i in "${!BOARD[@]}"; do
    if [[ "${BOARD[$i]}" == " " ]]; then
      BOARD[$i]="$player"
      if [[ "$player" == "O" ]]; then
        next_player="X"
      else
        next_player="O"
      fi
      local score
      score=$(minimax "$next_player" $((depth + 1)))
      BOARD[$i]=" "

      if [[ "$player" == "O" ]]; then
        (( score > best_score )) && best_score=$score
      else
        (( score < best_score )) && best_score=$score
      fi
    fi
  done

  echo "$best_score"
}
