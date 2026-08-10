# Script para tentar resolver problema com HD externo (executado como Admin)
Write-Host "=== REPARO DO HD EXTERNO ===" -ForegroundColor Cyan

# Verificar se esta rodando como admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "Este script precisa ser executado como Administrador!" -ForegroundColor Red
    Write-Host "Tentando elevar privilegios..." -ForegroundColor Yellow
    $arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`""
    Start-Process powershell -Verb RunAs -ArgumentList $arguments
    exit
}

Write-Host "Executando como Administrador..." -ForegroundColor Green

# 1. Remover dispositivos fantasmas do HD
Write-Host "`n1. Removendo dispositivos fantasmas..." -ForegroundColor Yellow
$phantomDevices = @(
    "SCSI\DISK&VEN_ST1000LM&PROD_035-1RK172\6&16622ED5C&0&000000",
    "USBSTOR\DISK&VEN_ST1000LM&PROD_035-1RK172&REV_V_1.02\012345679219&0",
    "USBSTOR\DISK&VEN____MASS&PROD_STORAGE_DEVICE&&REV_\116AC2101219&0",
    "USBSTOR\DISK&VEN_REALTEK&PROD_RTL9201&REV_1.002\012345679219&0"
)

foreach ($device in $phantomDevices) {
    Write-Host "  Removendo: $device" -ForegroundColor Gray
    $result = pnputil /remove-device $device 2>&1
    Write-Host "  Resultado: $result" -ForegroundColor Gray
}

# 2. Forcar escaneamento de novos dispositivos
Write-Host "`n2. Forcando redeteccao de hardware..." -ForegroundColor Yellow
$result = pnputil /scan-devices 2>&1
Write-Host "  Resultado: $result" -ForegroundColor Gray

# 3. Aguardar e verificar
Write-Host "`n3. Aguardando deteccao..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# 4. Verificar resultado
Write-Host "`n4. Verificando discos detectados:" -ForegroundColor Yellow
Get-Disk | Select-Object Number, FriendlyName, OperationalStatus, Size | Format-Table -AutoSize
Get-Volume | Select-Object DriveLetter, FileSystemType, HealthStatus | Format-Table -AutoSize

Write-Host "`n=== Script concluido! ===" -ForegroundColor Green
Write-Host "Se o HD ainda nao aparecer, tente:" -ForegroundColor Cyan
Write-Host "1. Desconectar e conectar o HD em outra porta USB" -ForegroundColor White
Write-Host "2. Abrir o Gerenciador de Dispositivos e clicar em 'Acionar > Verificar alteracoes de hardware'" -ForegroundColor White
Write-Host "3. Verificar se o cabo USB esta funcionando" -ForegroundColor White