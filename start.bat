@echo off
cd /d %~dp0
echo === Aprelieva Team — локальний сервер ===
echo.
echo Сайт буде доступний за адресою:
echo Щоб зупинити — закрий це вікно або натисни Ctrl+C
echo.
echo Перевіряю наявність Python...
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo ПОМИЛКА: Python не знайдено. Встановіть Python з https://python.org
    echo Після встановлення позначте "Add Python to PATH"
    pause
    exit /b 1
)
python --version
echo.
python -m http.server 8080
pause
