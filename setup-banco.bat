@echo off
REM ==== Rode este arquivo com "Executar como Administrador" ====
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup-banco.ps1" -Password "madara"
pause