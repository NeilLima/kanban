# Script para diagnosticar e tentar resolver problema com HD externo
Write-Host "=== DIAGNOSTICO DO HD EXTERNO ===" -ForegroundColor Cyan

# Listar discos fisicos
Write-Host "`nDiscos fisicos detectados:" -ForegroundColor Yellow
Get-Disk | Select-Object Number, FriendlyName, OperationalStatus, Size, PartitionStyle | Format-Table -AutoSize

# Listar volumes
Write-Host "`nVolumes:" -ForegroundColor Yellow
Get-Volume | Select-Object DriveLetter, FileSystemType, HealthStatus, SizeRemaining, Size | Format-Table -AutoSize

# Listar dispositivos DiskDrive com problema
Write-Host "`nDispositivos DiskDrive com status Unknown:" -ForegroundColor Yellow
$disks = Get-PnpDevice -Class DiskDrive | Where-Object { $_.Status -eq 'Unknown' }
foreach ($disk in $disks) {
    Write-Host "  - $($disk.FriendlyName)" -ForegroundColor Red
    Write-Host "    InstanceId: $($disk.InstanceId)" -ForegroundColor Gray
    Write-Host "    Problem: $($disk.Problem)" -ForegroundColor Gray
}

# Listar dispositivos USB com problema
Write-Host "`nDispositivos USB com problema:" -ForegroundColor Yellow
$usbDevices = Get-PnpDevice -Class USB | Where-Object { $_.Status -ne 'OK' }
foreach ($dev in $usbDevices) {
    Write-Host "  - $($dev.FriendlyName)" -ForegroundColor Red
    Write-Host "    Status: $($dev.Status)" -ForegroundColor Gray
    Write-Host "    Problem: $($dev.Problem)" -ForegroundColor Gray
    Write-Host "    InstanceId: $($dev.InstanceId)" -ForegroundColor Gray
}

# Tentar remover dispositivos fantasmas
Write-Host "`n=== TENTANDO REMOVER DISPOSITIVOS FANTASMAS ===" -ForegroundColor Cyan
$phantomDisks = Get-PnpDevice -Class DiskDrive | Where-Object { $_.Problem -eq 'CM_PROB_PHANTOM' }
foreach ($disk in $phantomDisks) {
    Write-Host "Removendo: $($disk.FriendlyName)..." -ForegroundColor Yellow
    try {
        $null = $disk | Disable-PnpDevice -Confirm:$false
        Write-Host "  -> Desabilitado com sucesso" -ForegroundColor Green
        Start-Sleep -Seconds 2
        $null = $disk | Enable-PnpDevice -Confirm:$false
        Write-Host "  -> Reabilitado com sucesso" -ForegroundColor Green
    } catch {
        Write-Host "  -> Erro: $_" -ForegroundColor Red
    }
}

# Tentar remover dispositivos USB com problema
Write-Host "`n=== TENTANDO REMOVER DISPOSITIVOS USB COM PROBLEMA ===" -ForegroundColor Cyan
$problemUsb = Get-PnpDevice -Class USB | Where-Object { $_.Status -ne 'OK' }
foreach ($dev in $problemUsb) {
    Write-Host "Removendo: $($dev.FriendlyName)..." -ForegroundColor Yellow
    try {
        $null = $dev | Disable-PnpDevice -Confirm:$false
        Write-Host "  -> Desabilitado com sucesso" -ForegroundColor Green
        Start-Sleep -Seconds 2
        $null = $dev | Enable-PnpDevice -Confirm:$false
        Write-Host "  -> Reabilitado com sucesso" -ForegroundColor Green
    } catch {
        Write-Host "  -> Erro: $_" -ForegroundColor Red
    }
}

# Forcar redeteccao
Write-Host "`n=== FORCANDO REDETECCAO DE HARDWARE ===" -ForegroundColor Cyan
$null = pnputil /scan-devices 2>&1
Write-Host "Escaneamento concluido!" -ForegroundColor Green

# Verificar resultado final
Write-Host "`n=== RESULTADO FINAL ===" -ForegroundColor Cyan
Start-Sleep -Seconds 3
Get-Disk | Select-Object Number, FriendlyName, OperationalStatus, Size | Format-Table -AutoSize
Get-Volume | Select-Object DriveLetter, FileSystemType, HealthStatus | Format-Table -AutoSize

Write-Host "`nScript concluido!" -ForegroundColor Green