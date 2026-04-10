#!/bin/bash
#
# save.sh — Persistence: save/load game state and append match records.
#
# Exports:
#   save_game       — serialises all game globals to SAVE_FILE
#   load_game       — restores state from SAVE_FILE; returns 1 if missing/corrupt
#   append_record   — appends a result line to RECORD_FILE

save_game() {
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
}

load_game() {
    local save_file="${SAVE_FILE:-$HOME/.tictactoe_save}"

    if [[ ! -f "$save_file" ]]; then
        init_board
        prompt_player_name
        return 1
    fi

    # shellcheck source=/dev/null
    source "$save_file"

    # Clamp cursor into valid range in case the save is from an older version
    (( CURSOR_ROW < 0 || CURSOR_ROW > 2 )) && CURSOR_ROW=1
    (( CURSOR_COL < 0 || CURSOR_COL > 2 )) && CURSOR_COL=1

    if [[ ${#BOARD[@]} -ne 9 ]]; then
        echo "Save file corrupted — reinitialising board."
        init_board
        return 1
    fi

    return 0
}

append_record() {
    local status="$1"
    mkdir -p "$(dirname "$RECORD_FILE")"
    printf '%s | %s | X=%d O=%d | %s\n' \
        "$(date '+%Y-%m-%d %H:%M:%S')" \
        "$PLAYER_NAME" \
        "$X_SCORE" \
        "$O_SCORE" \
        "$status" \
        >> "$RECORD_FILE"
}
