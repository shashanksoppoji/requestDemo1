# LogiKal / vercel-form-excel — install, build, initial git commit
# Run from project root: PowerShell -ExecutionPolicy Bypass -File .\scripts\setup-all.ps1
$ErrorActionPreference = "Stop"
$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Set-Location $root

$npm = "C:\Program Files\nodejs\npm.cmd"
if (-not (Test-Path $npm)) { $npm = "npm.cmd" }

Write-Host "==> npm install" -ForegroundColor Cyan
& $npm install
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "==> npm run build" -ForegroundColor Cyan
& $npm run build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

if (-not (Test-Path .git)) {
  Write-Host "==> git init" -ForegroundColor Cyan
  git init
  git branch -M main
}

Write-Host "==> git add + commit" -ForegroundColor Cyan
git add .
$committed = $false
try {
  git commit -m "Initial commit: LogiKal Control Tower landing and form" 2>&1 | Out-Null
  if ($LASTEXITCODE -eq 0) { $committed = $true }
} catch { }

if (-not $committed) {
  Write-Host "Note: no new commit (already committed or no git / no changes)." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Done. Next: create GitHub repo, then:" -ForegroundColor Green
Write-Host "  git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git"
Write-Host "  git push -u origin main"
Write-Host "  Vercel: https://vercel.com/new — add EXPORT_SECRET + Upstash Redis"
Write-Host ""
