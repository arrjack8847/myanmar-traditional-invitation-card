$ErrorActionPreference = "Stop"

$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$PublicDir = Join-Path $ProjectRoot "public"
$TempDir = Join-Path $ProjectRoot ".remotion-tmp"
$ClipPath = Join-Path $TempDir "luxury-bg-white-remotion-clip.mp4"
$TargetPath = Join-Path $PublicDir "luxury-bg.mp4"
$BackupPath = Join-Path $PublicDir "luxury-bg-gold-original.mp4"

New-Item -ItemType Directory -Force -Path $TempDir | Out-Null
$env:TEMP = $TempDir
$env:TMP = $TempDir

$browserCandidates = @(
  "C:\Program Files\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
  "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
)

$browser = $browserCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
$browserArg = @()
if ($browser) {
  $browserArg = @("--browser-executable=$browser")
}

$remotionBin = Join-Path $ProjectRoot "node_modules\.bin\remotion.cmd"
& $remotionBin render remotion/index.ts WhiteLuxuryBackground $ClipPath --codec h264 --pixel-format yuv420p --crf=20 --concurrency=2 --overwrite @browserArg

if ((Test-Path -LiteralPath $TargetPath) -and !(Test-Path -LiteralPath $BackupPath)) {
  Copy-Item -LiteralPath $TargetPath -Destination $BackupPath
}

$ffmpeg = Get-ChildItem -LiteralPath (Join-Path $ProjectRoot "node_modules\@remotion") -Recurse -Filter ffmpeg.exe -ErrorAction SilentlyContinue |
  Select-Object -First 1 -ExpandProperty FullName

if (!$ffmpeg) {
  $ffmpeg = "ffmpeg"
}

& $ffmpeg -y -hide_banner -loglevel error -stream_loop -1 -i $ClipPath -t 51.04 -an -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart $TargetPath
Remove-Item -LiteralPath $ClipPath -Force -ErrorAction SilentlyContinue
