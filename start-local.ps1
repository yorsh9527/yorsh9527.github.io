$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
$env:PWD = $PSScriptRoot
$env:NEXT_TELEMETRY_DISABLED = '1'
node .yarn/releases/yarn-3.6.1.cjs dev --hostname 127.0.0.1
