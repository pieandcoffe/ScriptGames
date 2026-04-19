#!/bin/bash

declare -a EMOTICONS=(
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