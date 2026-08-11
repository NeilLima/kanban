# ============================================================
#  Kanban - Correção do PostgreSQL + host "kanban"
#  Rode ESTE script como ADMINISTRADOR
#  Uso: setup-banco.ps1 [-Password "senha"]
# ============================================================

param(
    [string]$Password = ""
)

$hostsFile = "C:\Windows\System32\drivers\etc\hosts"
$pgService = "postgresql-x64-17"
$pgBin = "C:\Program Files\PostgreSQL\17\bin"

Write-Host "=== 1) Iniciando o servico PostgreSQL ===" -ForegroundColor Cyan
$svc = Get-Service -Name $pgService -ErrorAction SilentlyContinue
if (-not $svc) {
    Write-Host "Servico $pgService nao encontrado. Verifique a instalacao do PostgreSQL." -ForegroundColor Red
} elseif ($svc.Status -ne "Running") {
    try {
        Start-Service -Name $pgService -ErrorAction Stop
        Write-Host "Servico iniciado com sucesso." -ForegroundColor Green
    } catch {
        Write-Host "Falha ao iniciar servico: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "Servico ja esta em execucao." -ForegroundColor Green
}

Write-Host "`n=== 2) Corrigindo host 'kanban' no arquivo hosts ===" -ForegroundColor Cyan
$entry = "127.0.0.1       kanban"
$content = Get-Content $hostsFile -Raw

if ($content -match "(?m)^\s*[0-9\.:]+[\s\t]+kanban\b") {
    Write-Host "Entrada 'kanban' ja existe no hosts." -ForegroundColor Green
} else {
    Add-Content -Path $hostsFile -Value "`n$entry" -Encoding ASCII
    Write-Host "Adicionado: $entry" -ForegroundColor Green
    ipconfig /flushdns | Out-Null
    Write-Host "DNS limpo (flush)." -ForegroundColor Green
}

Write-Host "`n=== 3) Criando o banco 'kanban' (se nao existir) ===`n" -ForegroundColor Cyan
if ([string]::IsNullOrWhiteSpace($Password)) {
    $secPass = Read-Host "Digite a senha do usuario 'postgres'" -AsSecureString
    $ptr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($secPass)
    $pgPass = [System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
    [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
} else {
    $pgPass = $Password
}

$env:PGPASSWORD = $pgPass
$dbExists = & "$pgBin\psql.exe" -h localhost -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname='kanban'" 2>$null

if ($dbExists -match "1") {
    Write-Host "Banco 'kanban' ja existe." -ForegroundColor Green
} else {
    $create = & "$pgBin\psql.exe" -h localhost -U postgres -c "CREATE DATABASE kanban;" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Banco 'kanban' criado com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "Falha ao criar banco: $create" -ForegroundColor Red
    }
}

Write-Host "`n=== 4) Testando conexao no host 'kanban' ===" -ForegroundColor Cyan
$test = & "$pgBin\psql.exe" -h kanban -U postgres -d kanban -c "SELECT version();" 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "Conectado com sucesso via host 'kanban'!" -ForegroundColor Green
} else {
    Write-Host "Falha na conexao: $test" -ForegroundColor Red
}

Remove-Item Env:\PGPASSWORD -ErrorAction SilentlyContinue
Write-Host "`nConcluido. Agora use no pgAdmin:" -ForegroundColor Yellow
Write-Host "  Host = kanban | Port = 5432 | Username = postgres | DB = kanban"