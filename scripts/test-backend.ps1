$ErrorActionPreference = "Stop"

$root = Resolve-Path "$PSScriptRoot/.."
$env:GOCACHE = Join-Path $root ".cache/go-build"
$env:GOMODCACHE = Join-Path $root ".cache/go-mod"
New-Item -ItemType Directory -Force -Path $env:GOCACHE | Out-Null
New-Item -ItemType Directory -Force -Path $env:GOMODCACHE | Out-Null

$services = @(
  "auth",
  "profile",
  "ingredient",
  "recipe",
  "meal-plan",
  "progress",
  "notification"
)

foreach ($service in $services) {
  Push-Location "services/$service"
  try {
    go test ./...
  }
  finally {
    Pop-Location
  }
}
