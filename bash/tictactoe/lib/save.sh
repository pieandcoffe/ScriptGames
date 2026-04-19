#!/bin/bash

SAVE_FILE="./tictactoe.save"

has_saved_game() {
    [[ -f "$SAVE_FILE" ]]
}

save_game() {
    local file="$SAVE_FILE"
    {
        printf 'BOARD_SIZE=%q\n' "$BOARD_SIZE"
        printf 'CURRENT_PLAYER=%q\n' "$CURRENT_PLAYER"
        printf 'CURSOR_ROW=%q\n' "$CURSOR_ROW"
        printf 'CURSOR_COL=%q\n' "$CURSOR_COL"
        printf 'X_SCORE=%q\n' "$X_SCORE"
        printf 'O_SCORE=%q\n' "$O_SCORE"
        printf 'LAST_RESULT=%q\n' "$LAST_RESULT"
        printf 'BOARD=(' 
        for cell in "${BOARD[@]}"; do
            printf '%q ' "$cell"
        done
        printf ')\n'
    } > "$file"

    if [[ $? -ne 0 ]]; then
        printf "Failed to save game to %q." "$file"
        return 1
    fi

    printf "Game saved to %q." "$file"
    return 0
}

load_game() {
    if ! has_saved_game; then
        return 1
    fi

    source "$SAVE_FILE"
    return $?
}

delete_save() {
    rm -f "$SAVE_FILE"
}
