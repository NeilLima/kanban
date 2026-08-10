# Script final - Executa reinstalacao do HD como ADMIN via ScheduledTask
$taskName = "FixHDRestore"
$scriptPath = "C:\Users\victor\Documents\GitHub\kanban\reinstalar-hd.ps1"

Write-Host "=== CRIANDO TAREFA ADMIN PARA REINSTALAR HD ===" -ForegroundColor Cyan

# 1. Criar a acao (executar PowerShell como Admin)
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-ExecutionPolicy Bypass -NoProfile -File `"$scriptPath`""

# 2. Criar o principal com privilegio maximo e suas credenciais
$principal = New-ScheduledTaskPrincipal -UserId "NEIL_LIMA\victor" -RunLevel Highest -Password "madara"

# 3. Configuracoes
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

# 4. Criar e registrar a tarefa
$task = New-ScheduledTask -Action $action -Principal $principal -Settings $settings
Register-ScheduledTask -TaskName $taskName -InputObject $task -Force

Write-Host "Tarefa '$taskName' registrada com sucesso!" -ForegroundColor Green

# 5. Executar a tarefa
Write-Host "Executando tarefa como ADMIN..." -ForegroundColor Yellow
Start-ScheduledTask -TaskName $taskName

Write-Host "Aguardando execucao (15 segundos)..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# 6. Remover a tarefa
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
Write-Host "Tarefa removida." -ForegroundColor Gray

# 7. Verificar resultado
Write-Host "`n=== VERIFICANDO DISCOS ===" -ForegroundColor Cyan
Get-Disk | Select-Object Number, FriendlyName, OperationalStatus, Size | Format-Table -AutoSize
Get-Volume | Select-Object DriveLetter, FileSystemType, HealthStatus | Format-Table -AutoSize

$disks = Get-Disk
$found = $disks | Where-Object { $_.FriendlyName -match "ST1000LM|USB|External" -or $_.Size -gt 500000000000 }
if ($found) {
    Write-Host "HD EXTERNO DETECTADO!" -ForegroundColor Green
    $found | Format-Table Number, FriendlyName, OperationalStatus, Size -AutoSize
} else {
    Write-Host "HD externo ainda nao detectado." -ForegroundColor Red
    Write-Host "`nSolucoes manuais:" -ForegroundColor Yellow
    Write-Host "1. Abra Gerenciador de Dispositivos (Win+X > Gerenciador de Dispositivos)" -ForegroundColor White
    Write-Host "2. Menu Acionar > Verificar alteracoes de hardware" -ForegroundColor White
    Write-Host "3. Conecte o HD em outra porta USB" -ForegroundColor White
    Write-Host "4. Reinicie o PC com o HD conectado" -ForegroundColor White
}

Write-Host "`nScript concluido!" -ForegroundColor Green