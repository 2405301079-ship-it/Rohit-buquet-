@echo off
title Amore & Co. Boutique — Full Stack Launcher
echo ======================================================================
echo    Amore ^& Co. Luxury Boutique — Launching Full-Stack Services
echo ======================================================================
echo.
echo 1. Starting Backend REST API on http://localhost:5000 ...
start "Amore & Co. Backend API" cmd /k "cd /d "%~dp0stitch_eternal_love_gift_boutique\backend" && node src\server.js"

echo 2. Starting Frontend Boutique Web App on http://localhost:3000 ...
start "Amore & Co. Frontend UI" cmd /k "cd /d "%~dp0stitch_eternal_love_gift_boutique\frontend" && npm.cmd run dev"

echo.
echo Both services launched!
echo - Backend API:  http://localhost:5000/api/health
echo - Frontend App: http://localhost:3000
echo ======================================================================
pause
