@echo off
REM Start npm in the same window
start cmd /k "cd /d %~dp0 && npm start"

REM Change directory to Backend and start node in a new window
start cmd /k "cd /d %~dp0Backend && node index.js"
