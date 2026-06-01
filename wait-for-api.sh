#!/bin/sh
echo "[SFB] Attente de l'API..."
n=0
until wget -qO- http://api:3000/data/news > /dev/null 2>&1; do
    n=$((n+1))
    [ $n -ge 30 ] && echo "[SFB] Timeout API, démarrage quand même." && break
    sleep 2
done
echo "[SFB] API prête."
