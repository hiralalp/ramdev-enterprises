param([int]$Offset = 0, [int]$Count = 5, [int]$CandidateCount = 1, [int]$CandidateStart = 0, [string]$Pattern = '*')
$ErrorActionPreference = 'Stop'
$cache = Join-Path (Split-Path $PSScriptRoot -Parent) '.photo-research'
foreach ($file in @(Get-ChildItem "$cache/$Pattern-search.json" | Select-Object -Skip $Offset -First $Count)) {
  $record = Get-Content $file.FullName -Raw -Encoding UTF8 | ConvertFrom-Json
  for ($index = $CandidateStart; $index -lt [Math]::Min($CandidateStart + $CandidateCount, $record.candidates.Count); $index++) {
    $destination = Join-Path $cache "$($record.slug)-$index.jpg"
    if (!(Test-Path $destination)) { Invoke-WebRequest -UseBasicParsing -Uri $record.candidates[$index].thumbnail -OutFile $destination }
    Write-Host "$($record.slug) / $index"
  }
}