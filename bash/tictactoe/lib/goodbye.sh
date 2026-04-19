#!/bin/bash

declare -i EMOTICONS=(
  "<'(o.o)'>"
  "(^o^)"
  "'o._.o'"
  ">={*-*}=<"
  "(-.-)"
  "^*_*^"
  "(-_-)zzz"
  "(^_^)"
  "(>'.')><('.'<)"
  "\(^-^)/"
  "(#^.^#)"
  "(o_^)"
  "(^.~)"
  "(“_^)"
  ">----(^_^)----<"
)

goodbye() {
  local idx=$(( RANDOM % ${#EMOTICONS[@]} ))
  echo "Thanks for playing! ${EMOTICONS[$idx]}"
}