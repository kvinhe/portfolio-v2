#!/bin/bash
set -euo pipefail

if [ $# -eq 0 ]; then
  echo "Usage: $0 <file.mov> [file2.mov ...]"
  exit 1
fi

for input in "$@"; do
  if [ ! -f "$input" ]; then
    echo "skip: $input (not found)"
    continue
  fi

  output="${input%.*}.mp4"

  if [ -f "$output" ]; then
    echo "skip: $output already exists"
    continue
  fi

  echo "converting: $input → $output"
  ffmpeg -i "$input" \
    -c:v libx264 -preset slow -crf 20 \
    -pix_fmt yuv420p \
    -vf "scale=1920:1080" \
    -c:a aac -b:a 128k \
    -movflags +faststart \
    "$output" \
    -loglevel warning -stats

  echo "done: $output"
done
