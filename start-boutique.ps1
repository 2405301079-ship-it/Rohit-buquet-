# Amore & Co. Boutique Full-Stack Launcher (PowerShell)
$root = $PSScriptRoot
$backendDir = Join-Path $root "stitch_eternal_love_gift_boutique\backend"
$frontendDir = Join-Path $root "stitch_eternal_love_gift_boutique\frontend"

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "   Amore & Co. Luxury Romantic Gift Boutique Launcher     " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Green

Write-Host "`n1. Launching Backend API on http://localhost:5000 ..." -ForegroundColor Cyan
Start-Process "cmd.exe" -ArgumentList "/k cd /d `"$backendDir`" && node src/server.js"

Write-Host "2. Launching Frontend Dev Server on http://localhost:3000 ..." -ForegroundColor Cyan
Start-Process "cmd.exe" -ArgumentList "/k cd /d `"$frontendDir`" && npm.cmd run dev"

Write-Host "`nServices successfully launched!" -ForegroundColor Green
Write-Host "Backend API:  http://localhost:5000/api/health" -ForegroundColor Gray
Write-Host "Frontend App: http://localhost:3000" -ForegroundColor Gray
