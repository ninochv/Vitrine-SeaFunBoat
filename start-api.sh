#!/bin/sh
# Lance l'API Express en arrière-plan avant que nginx démarre
DATA_DIR="${DATA_DIR:-/data}" ADMIN_PASS="${ADMIN_PASS:-sfb2025}" node /api/server.js &
echo "[SFB] API démarrée (PID: $!)"
