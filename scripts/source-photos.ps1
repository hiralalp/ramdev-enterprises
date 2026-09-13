param([ValidateSet('Search')][string]$Action = 'Search', [int]$Offset = 0, [int]$Count = 5, [string]$SearchTerm, [string]$SearchId)
$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$cache = Join-Path $root '.photo-research'
[IO.Directory]::CreateDirectory($cache) | Out-Null
$queries = [ordered]@{
  'railings-turnkey-solutions' = 'stainless steel railing'
  'stainless-steel-benches' = 'stainless steel bench'
  'stainless-steel-dustbins' = 'stainless steel waste bin'
  'stainless-steel-bicycle-stands' = 'stainless steel bicycle rack'
  'stainless-steel-bollards' = 'stainless steel bollards'
  'stainless-steel-bus-shelters' = 'steel bus shelter'
  'stainless-steel-design-furniture' = 'steel chair furniture'
  'stainless-steel-safety-doors-frames' = 'steel door frame'
  'ss-drywall-stone-cladding-clamps' = 'stone cladding anchor'
  'stainless-steel-gratings' = 'steel grating'
  'turnkey-project-fabrication' = 'steel fabrication workshop'
  'expansion-joints' = 'expansion joint bridge'
  'custom-stainless-steel-fabrication' = 'stainless steel welding'
  'stainless-steel-corner-guards' = 'metal corner guard'
  'cable-trays' = 'cable tray'
  'stainless-steel-planters' = 'steel planter'
  'residential-stainless-steel-railings' = 'stainless steel handrail stairs'
  'stainless-steel-cladding' = 'stainless steel cladding'
  'pvd-stainless-steel-design-furniture' = 'metal furniture chair'
  'metal-wall-art' = 'metal wall art'
  'waterjet-cut-steel-designs' = 'water jet cutting metal'
  'ss-pvd-coated-screens-partitions' = 'metal screen architecture'
  'stainless-steel-facades' = 'stainless steel facade'
  'stainless-steel-canopies' = 'steel entrance canopy'
  'stainless-steel-pergolas' = 'metal pergola'
  'stainless-steel-swings' = 'metal swing seat'
  'custom-metal-arts-sculptures' = 'abstract stainless steel sculpture'
}
if ($SearchTerm) { if (!$SearchId -or $SearchId -notmatch '^[a-z0-9-]+$') { throw 'A safe search ID is required' }; $queries = [ordered]@{ $SearchId = $SearchTerm } }
if ($Action -eq 'Search') {
  foreach ($entry in @($queries.GetEnumerator() | Select-Object -Skip $Offset -First $Count)) {
    $resultPath = Join-Path $cache "$($entry.Key)-search.json"
    if (Test-Path $resultPath) { Write-Host "Cached $($entry.Key)"; continue }
    $query = [uri]::EscapeDataString($entry.Value + ' filetype:bitmap')
    $url = "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=$query&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url%7Cextmetadata%7Csize&iiurlwidth=1280&format=json"
    $response = Invoke-RestMethod -Uri $url
    $candidates = @($response.query.pages.PSObject.Properties.Value | Sort-Object index | ForEach-Object {
      $info = $_.imageinfo[0]
      [ordered]@{ title = $_.title; url = $info.url; thumbnail = $info.thumburl; source = $info.descriptionurl; width = $info.width; height = $info.height; metadata = $info.extmetadata }
    })
    $result = [ordered]@{ slug = $entry.Key; query = $entry.Value; candidates = $candidates }
    [IO.File]::WriteAllText($resultPath, (ConvertTo-Json $result -Depth 15), [Text.UTF8Encoding]::new($false))
    Write-Host "$($entry.Key): $($candidates.Count) candidates"
  }
}