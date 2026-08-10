# Script para reinstalar o driver do HD externo
# EXECUTAR COMO ADMINISTRADOR

# Verificar se esta rodando como admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "EXECUTE ESTE SCRIPT COMO ADMINISTRADOR!" -ForegroundColor Red
    Write-Host "Clique com o direito neste arquivo e selecione 'Executar com PowerShell'" -ForegroundColor Yellow
    Write-Host "OU abra o PowerShell como Admin e digite:" -ForegroundColor Yellow
    Write-Host "  powershell -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Pressione qualquer tecla para sair..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

Write-Host "=== REINSTALANDO DRIVER DO HD EXTERNO ===" -ForegroundColor Cyan
Write-Host "Executando como Administrador..." -ForegroundColor Green

# Passo 1: Remover dispositivos fantasmas
Write-Host "`n[1/4] Removendo dispositivos restantes..." -ForegroundColor Yellow
$devices = pnputil /enum-devices 2>&1 | Out-String
if ($devices -match "ST1000LM|RTL9201|Mass Storage") {
    Write-Host "  Dispositivos antigos encontrados, removendo..." -ForegroundColor Gray
    pnputil /remove-device "USBSTOR\DISK&VEN_REALTEK&PROD_RTL9201&REV_1.002\012345679219&0" 2>&1 | Out-Null
    pnputil /remove-device "USB\VID_14CD&PID_6116\116AC2101219" 2>&1 | Out-Null
} else {
    Write-Host "  Nenhum dispositivo fantasma pendente" -ForegroundColor Green
}

# Passo 2: Escanear por novos dispositivos
Write-Host "`n[2/4] Escaneando por novo hardware..." -ForegroundColor Yellow
$result = pnputil /scan-devices 2>&1
Write-Host "  Resultado: $result" -ForegroundColor Gray

# Passo 3: Aguardar deteccao
Write-Host "`n[3/4] Aguardando Windows reconhecer o HD..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Passo 4: Verificar resultado
Write-Host "`n[4/4] Verificando resultado..." -ForegroundColor Yellow
$disks = Get-Disk | Select-Object Number, FriendlyName, OperationalStatus, Size | Format-Table -AutoSize | Out-String
Write-Host "$disks" -ForegroundColor White

if ($disks -match "ST1000LM" -or $disks -match "1TB" -or $disks -match "1000") {
    Write-Host "HD EXTERNO DETECTADO COM SUCESSO!" -ForegroundColor Green
} else {
    Write-Host "HD externo ainda nao detectado." -ForegroundColor Red
    Write-Host "`nTente as seguintes opcoes manualmente:" -ForegroundColor Cyan
    Write-Host "1. Abra o GERENCIADOR DE DISPOSITIVOS (Win+X > Gerenciador de Dispositivos)" -ForegroundColor White
    Write-Host "2. Clique em 'Acionar' no menu superior > 'Verificar alteracoes de hardware'" -ForegroundColor White
    Write-Host "3. Se aparecer um dispositivo com alerta amarelo, clique com direito > 'Atualizar driver'" -ForegroundColor White
    Write-Host "4. Tente conectar o HD em OUTRA porta USB" -ForegroundColor White
    Write-Host "5. Reinicie o computador com o HD conectado" -ForegroundColor White
}

Write-Host "`nScript concluido!" -ForegroundColor Green
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")