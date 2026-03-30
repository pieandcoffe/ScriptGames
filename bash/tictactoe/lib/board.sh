#!/bin/bash

readonly BOARD_SIZE=3

RED=$'\e[31m'
BLUE=$'\e[34m'
WHITE=$'\e[97m'
GRAY=$'\e[90m'
BOLD=$'\e[1m'

HIGHLIGHT=$'\e[7m'
RESET=$'\e[0m'

init_board () 
{
	BOARD=(" " " " " " " " " " " " " " " " " ")
}

draw_board ()
{
	echo "${BOARD[@]}"
	echo "Current CURRENT_PLAYER: ${CURRENT_PLAYER}"
	echo "Cursor position: (${CURSOR_ROW}, ${CURSOR_COL})"

  local top_sep="┌─────┬─────┬─────┐"
  local mid_sep="├─────┼─────┼─────┤"
  local bot_sep="└─────┴─────┴─────┘"

  echo -e "$top_sep"
	for row in 0 1 2; do
    local line="│"
    for col in 0 1 2; do
      local idx=$(( row * BOARD_SIZE + col ))
      local cell=$(draw_cell "${BOARD[$idx]}") 
      if [[ $row -eq $CURSOR_ROW && $col -eq $CURSOR_COL ]]; then
        line+="  ${HIGHLIGHT}${cell:-}${RESET}  "
      else
        line+="  ${cell:- }  "
      fi
      line+="│"
    done
    echo -e "$line"
    if [[ $row -lt $((BOARD_SIZE - 1)) ]]; then
      echo -e "$mid_sep"
    fi
	done
	echo -e "$bot_sep"
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

check_win () 
{
	# Check rows
	for row in 0 1 2; do
		local i=$((row * BOARD_SIZE))
		if [[ "${BOARD[$i]}" == "$CURRENT_PLAYER" && "${BOARD[$i+1]}" == "$CURRENT_PLAYER" && "${BOARD[$i+2]}" == "$CURRENT_PLAYER" ]]; then
			return 0
		fi
	done

	# Check columns
	for col in 0 1 2; do
		local i=$col
		if [[ "${BOARD[$i]}" == "$CURRENT_PLAYER" && "${BOARD[$i+BOARD_SIZE]}" == "$CURRENT_PLAYER" && "${BOARD[$i+2*BOARD_SIZE]}" == "$CURRENT_PLAYER" ]]; then
			return 0
		fi
	done

	# Check diagonals
	if [[ "${BOARD[0]}" == "$CURRENT_PLAYER" && "${BOARD[4]}" == "$CURRENT_PLAYER" && "${BOARD[8]}" == "$CURRENT_PLAYER" ]]; then
		return 0
	fi

	if [[ "${BOARD[2]}" == "$CURRENT_PLAYER" && "${BOARD[4]}" == "$CURRENT_PLAYER" && "${BOARD[6]}" == "$CURRENT_PLAYER" ]]; then
		return 0
	fi

	return 1
}

check_draw () 
{
	for cell in "${BOARD[@]}"; do
		if [[ "$cell" == " " ]]; then
			return 1
		fi
	done
	return 0
}

check ()
{
  if check_win "$CURRENT_PLAYER"; then 
    echo "$(draw_cell "${CURRENT_PLAYER}") wins!"
    return 0
	fi
	if check_draw; then
		echo "Draw!"
		return 0
	fi

	return 1
}

update_board () 
{
	local index=$(coords_to_index)
	BOARD[$index]=$CURRENT_PLAYER
}

is_cell_empty () 
{
	local index=$(coords_to_index)
	[[ "${BOARD[$index]}" == " " ]]
}

coords_to_index () 
{
	echo $(( CURSOR_ROW * BOARD_SIZE + CURSOR_COL ))
}

save_game () {
	local save_file="${SAVE_FILE:-$HOME/.tictactoe_save}"
    {
        declare -p BOARD
        declare -p CURRENT_PLAYER
        declare -p X_SCORE
        declare -p O_SCORE
        declare -p CURSOR_ROW
        declare -p CURSOR_COL
        declare -p SAVE_DATE
        declare -p PLAYER_NAME
    } > "$save_file"
    echo "Game saved to $save_file"
}
 
load_game () {
    local save_file="${SAVE_FILE:-$HOME/.tictactoe_save}"
    if [[ -f "$save_file" ]]; then
        source "$save_file"
        (( CURSOR_ROW < 0 || CURSOR_ROW > 2 )) && CURSOR_ROW=1
        (( CURSOR_COL < 0 || CURSOR_COL > 2 )) && CURSOR_COL=1

        # sanity check
        if [[ ${#BOARD[@]} -ne 9 ]]; then
            echo "Save corrupted, reinitializing..."
            init_board
            return 1
        fi

        return 0
    else
        init_board 
        
        printf "Who is playing? (enter your nickname) XO\n"
		read -p "" PLAYER_NAME
    fi
    return 1
}
