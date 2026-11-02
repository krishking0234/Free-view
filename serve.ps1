$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add('http://localhost:4173/')
$listener.Start()
Write-Host 'Toolora server running at http://localhost:4173/'
while ($listener.IsListening) {
  $context = $listener.GetContext()
  $relative = $context.Request.Url.AbsolutePath.TrimStart('/')
  if ([string]::IsNullOrWhiteSpace($relative)) { $relative = 'index.html' }
  $path = Join-Path $root $relative
  if (Test-Path -LiteralPath $path -PathType Leaf) {
    $contentType = switch ([IO.Path]::GetExtension($path).ToLowerInvariant()) {
      '.html' { 'text/html; charset=utf-8' }
      '.css' { 'text/css; charset=utf-8' }
      '.js' { 'text/javascript; charset=utf-8' }
      '.xml' { 'application/xml; charset=utf-8' }
      '.txt' { 'text/plain; charset=utf-8' }
      default { 'application/octet-stream' }
    }
    $bytes = [IO.File]::ReadAllBytes($path)
    $context.Response.ContentType = $contentType
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $context.Response.StatusCode = 404
  }
  $context.Response.Close()
}
