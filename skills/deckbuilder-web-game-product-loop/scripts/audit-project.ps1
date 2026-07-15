param(
  [Parameter(Mandatory = $false)]
  [string]$ProjectRoot = "."
)

$ErrorActionPreference = "Stop"
$root = (Resolve-Path -LiteralPath $ProjectRoot).Path
$failures = [System.Collections.Generic.List[string]]::new()
$passes = [System.Collections.Generic.List[string]]::new()

function Pass([string]$message) { $passes.Add($message) }
function Fail([string]$message) { $failures.Add($message) }

foreach ($name in @("index.html", "styles.css", "game.js")) {
  $path = Join-Path $root $name
  if (Test-Path -LiteralPath $path) { Pass "Found $name" } else { Fail "Missing $name" }
}

$node = Get-Command node -ErrorAction SilentlyContinue
$gamePath = Join-Path $root "game.js"
if ($node -and (Test-Path -LiteralPath $gamePath)) {
  & $node.Source --check $gamePath 2>$null
  if ($LASTEXITCODE -eq 0) { Pass "game.js syntax" } else { Fail "game.js syntax" }
} elseif (-not $node) {
  Fail "Node.js unavailable; JavaScript syntax not checked"
}

$runtimeFiles = @("index.html", "styles.css", "game.js") | ForEach-Object { Join-Path $root $_ } | Where-Object { Test-Path -LiteralPath $_ }
$runtimeText = ($runtimeFiles | ForEach-Object { Get-Content -Raw -LiteralPath $_ }) -join "`n"
if ($runtimeText -match "file://|[A-Za-z]:\\Users\\|localhost:\d+") {
  Fail "Runtime contains a local-only path"
} else {
  Pass "No local-only runtime paths"
}

$assetPattern = '(?:src=|url\(|[''"])(assets/[A-Za-z0-9_./ -]+\.(?:png|webp|jpg|jpeg|gif|svg|mp3|ogg|wav))'
$assetRefs = [regex]::Matches($runtimeText, $assetPattern, "IgnoreCase") | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
foreach ($ref in $assetRefs) {
  $assetPath = Join-Path $root ($ref -replace "/", "\")
  if (Test-Path -LiteralPath $assetPath) { Pass "Asset $ref" } else { Fail "Missing asset $ref" }
}

$smoke = Join-Path $root "tools\game_logic_smoke.mjs"
if ($node -and (Test-Path -LiteralPath $smoke)) {
  foreach ($group in @("story", "reward", "healing", "route", "combat", "visual", "hardware", "xp", "compatibility")) {
    & $node.Source $smoke $group *> $null
    if ($LASTEXITCODE -eq 0) { Pass "Smoke $group" } else { Fail "Smoke $group" }
  }
}

$portable = Join-Path $root "潮痕航路-Demo.html"
if (Test-Path -LiteralPath $portable) {
  $portableText = Get-Content -Raw -LiteralPath $portable
  if ($portableText -match '(?:src|href)=[''"]assets/') { Fail "Portable HTML has external asset references" } else { Pass "Portable HTML assets embedded" }
  if ($portableText -match "file://|[A-Za-z]:\\Users\\") { Fail "Portable HTML has local-only paths" } else { Pass "Portable HTML has no local-only paths" }
}

Write-Output "PASS=$($passes.Count)"
$passes | ForEach-Object { Write-Output "[PASS] $_" }
Write-Output "FAIL=$($failures.Count)"
$failures | ForEach-Object { Write-Output "[FAIL] $_" }

if ($failures.Count -gt 0) { exit 1 }
