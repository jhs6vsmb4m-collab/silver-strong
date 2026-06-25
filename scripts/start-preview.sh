#!/usr/bin/env sh
set -eu

PORT="${PORT:-4173}"
HOST="${HOST:-0.0.0.0}"
PID_FILE="${PID_FILE:-/tmp/silver-strong-preview.pid}"
LOG_FILE="${LOG_FILE:-/tmp/silver-strong-preview.log}"

if [ -f "$PID_FILE" ]; then
  EXISTING_PID="$(cat "$PID_FILE")"
  if [ -n "$EXISTING_PID" ] && kill -0 "$EXISTING_PID" 2>/dev/null; then
    echo "Silver Strong preview already running on http://127.0.0.1:$PORT (pid $EXISTING_PID)"
    exit 0
  fi
  rm -f "$PID_FILE"
fi

nohup python3 -m http.server "$PORT" --bind "$HOST" > "$LOG_FILE" 2>&1 &
SERVER_PID="$!"
echo "$SERVER_PID" > "$PID_FILE"

sleep 1
if ! kill -0 "$SERVER_PID" 2>/dev/null; then
  echo "Silver Strong preview failed to start. Log output:" >&2
  cat "$LOG_FILE" >&2
  rm -f "$PID_FILE"
  exit 1
fi

echo "Silver Strong preview running on http://127.0.0.1:$PORT (pid $SERVER_PID)"
echo "Logs: $LOG_FILE"
