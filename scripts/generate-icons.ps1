$ErrorActionPreference = 'Stop'

$icons = "public/icons"
if (!(Test-Path $icons)) { New-Item -ItemType Directory -Path $icons | Out-Null }

Add-Type -AssemblyName System.Drawing

function New-IconPng([string]$path, [int]$size) {
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'HighQuality'

  $bg = [System.Drawing.Color]::FromArgb(17,24,39)       # slate-900
  $accent = [System.Drawing.Color]::FromArgb(110,231,183) # emerald-300
  $g.Clear($bg)

  $brush = New-Object System.Drawing.SolidBrush($accent)
  $margin = [int]($size * 0.2)
  $diam = [int]($size * 0.6)
  $g.FillEllipse($brush, $margin, $margin, $diam, $diam)

  $font = New-Object System.Drawing.Font('Arial', [int]($size * 0.22), [System.Drawing.FontStyle]::Bold)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = 'Center'
  $sf.LineAlignment = 'Center'
  $rect = New-Object System.Drawing.RectangleF(0, 0, $size, $size)
  $g.DrawString('ZY', $font, [System.Drawing.Brushes]::White, $rect, $sf)

  $g.Dispose()
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

New-IconPng "public/icons/icon-192.png" 192
New-IconPng "public/icons/icon-512.png" 512
Write-Output "icons generated"


