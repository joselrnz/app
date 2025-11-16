@echo off
echo Starting development server...
echo.

cd frontend

REM Add node to PATH temporarily
set PATH=%CD%\..\node-v18.17.0-win-x64;%PATH%

REM Start the dev server
call node_modules\.bin\next.cmd dev -p 3002

pause

