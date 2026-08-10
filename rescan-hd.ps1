# Script para forçar redetecção de hardware (reinstalar driver do HD)
Write-Host "=== FORCANDO REDETECCAO DE HARDWARE ===" -ForegroundColor Cyan

# Metodo 1: Usando WMI para escanear hardware
Write-Host "`nMetodo 1: Escaneando via WMI..." -ForegroundColor Yellow
try {
    $null = (Get-WmiObject -Class Win32_PnPEntity | Where-Object { $_.Name -like "*USB*" -or $_.Name -like "*Mass Storage*" }).ScanHardware()
    Write-Host "  OK" -ForegroundColor Green
} catch {
    Write-Host "  Erro: $_" -ForegroundColor Red
}

# Metodo 2: Usando devcon se disponivel
Write-Host "`nMetodo 2: Verificando se devcon existe..." -ForegroundColor Yellow
$devconPaths = @(
    "$env:SystemRoot\System32\devcon.exe",
    "$env:ProgramFiles\Windows Kits\10\Tools\x64\devcon.exe",
    "${env:ProgramFiles(x86)}\Windows Kits\10\Tools\x64\devcon.exe"
)
$found = $false
foreach ($path in $devconPaths) {
    if (Test-Path $path) {
        Write-Host "  devcon encontrado em: $path" -ForegroundColor Green
        $found = $true
        break
    }
}
if (-not $found) {
    Write-Host "  devcon nao encontrado" -ForegroundColor Gray
}

# Metodo 3: Tentar pnputil scan (pode falhar sem admin)
Write-Host "`nMetodo 3: Tentando pnputil scan..." -ForegroundColor Yellow
$result = pnputil /scan-devices 2>&1
Write-Host "  Resultado: $result" -ForegroundColor Gray

# Metodo 4: Desabilitar e reabilitar controladora USB via WMI
Write-Host "`nMetodo 4: Reiniciando controladoras USB..." -ForegroundColor Yellow
$usbControllers = Get-WmiObject Win32_USBController
foreach ($ctrl in $usbControllers) {
    try {
        Write-Host "  Reiniciando: $($ctrl.Name)" -ForegroundColor Gray
        $null = $ctrl.Disable()
        Start-Sleep -Seconds 2
        $null = $ctrl.Enable()
        Write-Host "    OK" -ForegroundColor Green
    } catch {
        Write-Host "    Erro: $_" -ForegroundColor Red
    }
}

# Aguardar e verificar resultado
Write-Host "`nAguardando deteccao..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "`n=== VERIFICANDO DISCOS DETECTADOS ===" -ForegroundColor Cyan
Get-Disk | Select-Object Number, FriendlyName, OperationalStatus, Size | Format-Table -AutoSize
Get-Volume | Select-Object DriveLetter, FileSystemType, HealthStatus | Format-Table -AutoSize

Write-Host "`n=== FINALIZADO ===" -ForegroundColor Green
Write-Host "Se o HD ainda nao aparecer, tente:" -ForegroundColor Cyan
Write-Host "1. Desconecte o HD da porta USB" -ForegroundColor White
Write-Host "2. Espere 10 segundos" -ForegroundColor White
Write-Host "3. Conecte em OUTRA porta USB" -ForegroundColor White
Write-Host "4. Se possivel, use outro cabo USB" -ForegroundColor White