#!/bin/bash
echo "=== Aprelieva Team — локальний сервер ==="
echo ""
echo "Сайт буде доступний за адресою: http://localhost:8080"
echo "Щоб зупинити — натисни Ctrl+C"
echo ""
python3 -m http.server 8080 2>/dev/null || python -m http.server 8080
