@echo off
setlocal
"%ProgramFiles%\nodejs\node.exe" scripts\validate-gallery.mjs
if errorlevel 1 exit /b %errorlevel%
exit /b 0
