# Script final v2 - Executa comandos como Admin
$username = "NEIL_LIMA\victor"
$password = "madara"

Write-Host "=== EXECUTANDO COMANDOS COMO ADMIN ===" -ForegroundColor Cyan

# Obter horario atual + 1 minuto para agendar
$time = (Get-Date).AddMinutes(1)
$timeStr = $time.ToString("HH:mm")

# Criar tarefa que executa pnputil scan como admin
$taskName = "FixHDScan"
schtasks /Delete /TN $taskName /F 2>$null

schtasks /Create /SC ONCE /TN $taskName /TR "pnputil /scan-devices" /ST $timeStr /RU $username /RP $password /RL HIGHEST /F
Write-Host "Tarefa agendada para $timeStr" -ForegroundColor Yellow

# Aguardar ate o horario
$waitSeconds = [math]::Max(0, (New-TimeSpan -End $time).TotalSeconds + 10)
Write-Host "Aguardando $waitSeconds segundos..." -ForegroundColor Yellow
Start-Sleep -Seconds $waitSeconds

schtasks /Run /TN $taskName
Start-Sleep -Seconds 10

# Limpar
schtasks /Delete /TN $taskName /F 2>$null

# Verificar resultado
Write-Host "`n=== VERIFICANDO DISCOS ===" -ForegroundColor Cyan
Get-Disk | Select-Object Number, FriendlyName, OperationalStatus, Size | Format-Table -AutoSize

$external = Get-Disk | Where-Object { $_.Size -gt 500000000000 -and $_.Number -gt 1 }
if ($external) {
    Write-Host "`nHD EXTERNO DETECTADO!" -ForegroundColor Green
    $external | Format-Table -AutoSize
} else {
    Write-Host "`nHD ainda nao detectado nesta sessao." -ForegroundColor Red
    Write-Host "`nPor favor, tente estas acoes manualmente:" -ForegroundColor Yellow
    Write-Host "1. Abra o Gerenciador de Dispositivos (Win+X > Gerenciador de Dispositivos)" -ForegroundColor White
    Write-Host "2. Clique em Acionar > Verificar alteracoes de hardware" -ForegroundColor White
    Write-Host "3. Se aparecer algo com alerta amarelo, clique direito > Atualizar driver" -ForegroundColor White
    Write-Host "4. Tente outra porta USB" -ForegroundColor White
    Write-Host "5. Reinicie o PC com o HD conectado" -ForegroundColor White
}

Write-Host "`nScript finalizado!" -ForegroundColor Green