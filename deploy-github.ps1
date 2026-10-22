$ErrorActionPreference = 'Stop'
$gitExe = 'C:\Users\86155\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe'
if (-not (Test-Path -LiteralPath $gitExe)) { throw 'Bundled Git was not found.' }
Push-Location $PSScriptRoot
try {
    $remote = & $gitExe remote get-url origin
    if ($LASTEXITCODE -ne 0 -or $remote.Trim() -ne 'https://github.com/bj766/bjpersonnal.git') {
        throw 'Unexpected remote. Deployment stopped.'
    }
    $branch = & $gitExe branch --show-current
    if ($branch.Trim() -ne 'main') { throw 'The current branch must be main.' }
    Write-Host 'Pushing the prepared website to main...'
    & $gitExe -c http.version=HTTP/1.1 push origin main
    if ($LASTEXITCODE -ne 0) { throw 'Git push failed. Pages settings were not changed.' }

    # Capture credentials in memory; never write or print the credential response.
    $credentialRequest = "protocol=https`nhost=github.com`nusername=bj766`n`n"
    $credentialLines = $credentialRequest | & $gitExe credential fill
    if ($LASTEXITCODE -ne 0) { throw 'Git credential lookup failed.' }
    $credentialValues = @{}
    foreach ($line in $credentialLines) {
        $parts = $line -split '=', 2
        if ($parts.Count -eq 2) { $credentialValues[$parts[0]] = $parts[1] }
    }
    if (-not $credentialValues['password']) { throw 'No GitHub credential was returned.' }
    $headers = @{
        Authorization = 'Bearer ' + $credentialValues['password']
        Accept = 'application/vnd.github+json'
        'X-GitHub-Api-Version' = '2022-11-28'
        'User-Agent' = 'bjpersonnal-deployment'
    }
    $endpoint = 'https://api.github.com/repos/bj766/bjpersonnal/pages'
    $method = 'PUT'
    try {
        $existing = Invoke-RestMethod -Uri $endpoint -Headers $headers -Method Get -TimeoutSec 30
    } catch {
        if ($_.Exception.Response -and [int]$_.Exception.Response.StatusCode -eq 404) {
            $method = 'POST'
        } else { throw }
    }
    if (-not $existing -or $existing.build_type -ne 'legacy' -or $existing.source.branch -ne 'main' -or $existing.source.path -ne '/docs') {
        $body = @{build_type='legacy';source=@{branch='main';path='/docs'}} | ConvertTo-Json -Depth 3
        $null = Invoke-RestMethod -Uri $endpoint -Headers $headers -Method $method -ContentType 'application/json' -Body $body -TimeoutSec 30
    }
    $pages = Invoke-RestMethod -Uri $endpoint -Headers $headers -Method Get -TimeoutSec 30
    if ($pages.source.branch -ne 'main' -or $pages.source.path -ne '/docs' -or $pages.build_type -ne 'legacy') {
        throw 'Pages configuration verification failed.'
    }
    Write-Host 'Verified: GitHub Pages deploys from main /docs.' -ForegroundColor Green
    Write-Host ('Website: ' + $pages.html_url)
    Write-Host 'The first publication can take a few minutes.'
} finally {
    $headers = $null
    $credentialLines = $null
    $credentialValues = $null
    Pop-Location
}
