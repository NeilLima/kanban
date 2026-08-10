$username = "NEIL_LIMA\victor"
$password = "madara"
$secpass = ConvertTo-SecureString $password -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential ($username, $secpass)

Start-Process -FilePath "powershell.exe" -ArgumentList "-ExecutionPolicy Bypass -File C:\Users\victor\Documents\GitHub\kanban\reinstalar-hd.ps1" -Credential $cred -WindowStyle Normal

Write-Host "Script iniciado como Administrador!" -ForegroundColor Green