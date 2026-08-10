# Script para reinstalar HD usando schtasks.exe (com senha)
$taskName = "FixHDNow"
$scriptPath = "C:\Users\victor\Documents\GitHub\kanban\reinstalar-hd.ps1"
$username = "NEIL_LIMA\victor"
$password = "madara"

Write-Host "=== CRIANDO TAREFA ADMIN VIA SCHTASKS ===" -ForegroundColor Cyan

# Remover tarefa anterior se existir
schtasks /Delete /TN $taskName /F 2>$null

# Criar tarefa com privilegios maximos usando schtasks
$cmd = "powershell.exe -ExecutionPolicy Bypass -NoProfile -File `"$scriptPath`""
schtasks /Create /SC ONCE /TN $taskName /TR $cmd /RU $username /RP $password /RL HIGHEST /F

Write-Host "Tarefa criada! Executando..." -ForegroundColor Yellow

# Executar a tarefa
schtasks /Run /TN $taskName

Write-Host "Aguardando 15 segundos..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Remover tarefa
schtasks /Delete /TN $taskName /F

Write-Host "`n=== VERIFICANDO DISCOS ===" -ForegroundColor Cyan
Get-Disk | Select-Object Number, FriendlyName, OperationalStatus, Size | Format-Table -AutoSize
Get-Volume | Select-Object DriveLetter, FileSystemType, HealthStatus | Format-Table -AutoSize

$disks = Get-Disk
$external = $disks | Where-Object { $_.FriendlyName -match "ST1000LM|USB|External" -or ($_.Size -gt 500000000000 -and $_.Number -ne 0 -and $_.Number -ne 1) }
if ($external) {
    Write-Host "`nHD EXTERNO DETECTADO!" -ForegroundColor Green
    $external | Format-Table Number, FriendlyName, OperationalStatus, Size -AutoSize
} else {
    Write-Host "`nHD externo NAO detectado." -ForegroundColor Red
    Write-Host "`nTente manualmente:" -ForegroundColor Yellow
    Write-Host "1. Gerenciador de Dispositivos > Acionar > Verificar alteracoes de hardware" -ForegroundColor White
    Write-Host "2. Conecte o HD em outra porta USB" -ForegroundColor White
    Write-Host "3. Reinicie o PC com o HD conectado" -ForegroundColor White
}

Write-Host "`nFim!" -ForegroundColor Green