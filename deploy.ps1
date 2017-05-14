# Deploy files in 'static' to GitHub Pages
# at http://mattsegal.github.io/turing
$ErrorActionPreference = "Stop"

# Get build script
$fileUrl = 'https://raw.githubusercontent.com/MattSegal/mattsegal.github.io/master/build.py'
$fileText = (New-Object System.Net.WebClient).DownloadString($fileUrl)
$targetFile = (Join-Path $PSScriptRoot 'build.py')
[System.IO.File]::WriteAllLines($targetFile, $fileText)

# Run build script
py build.py sort static

# Clean up
Remove-Item build.py
Remove-Item C:/tmp/github_page_deploy -Recurse -Force