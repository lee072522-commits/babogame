$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8000/")
try {
    $listener.Start()
    Write-Host "서버가 시작되었습니다: http://localhost:8000/"
    Write-Host "종료하려면 이 태스크를 종료하거나 창을 닫으세요."
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/") { $urlPath = "/index.html" }
        
        if ($urlPath -eq "/api/team-images") {
            $imagesDir = Join-Path (Get-Location) "images"
            $json = "[]"
            if (Test-Path $imagesDir) {
                $files = Get-ChildItem -Path $imagesDir -Filter "team-*" | Where-Object { $_.Extension -match "jpg|jpeg|png" } | Select-Object -ExpandProperty Name
                if ($null -ne $files) {
                    if ($files -is [string]) {
                        $json = "[`"$files`"]"
                    } else {
                        $json = $files | ConvertTo-Json -Compress
                    }
                }
            }
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentType = "application/json; charset=utf-8"
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } elseif ($urlPath -eq "/api/common-images") {
            $imagesDir = Join-Path (Get-Location) "images"
            $json = "[]"
            if (Test-Path $imagesDir) {
                $files = Get-ChildItem -Path $imagesDir -Filter "common-*" | Where-Object { $_.Extension -match "jpg|jpeg|png" } | Select-Object -ExpandProperty Name
                if ($null -ne $files) {
                    if ($files -is [string]) {
                        $json = "[`"$files`"]"
                    } else {
                        $json = $files | ConvertTo-Json -Compress
                    }
                }
            }
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentType = "application/json; charset=utf-8"
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $filePath = Join-Path (Get-Location) $urlPath
            if (Test-Path $filePath -PathType Leaf) {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                
                # Content-Type 설정
                if ($filePath.EndsWith(".html")) { $response.ContentType = "text/html; charset=utf-8" }
                elseif ($filePath.EndsWith(".js")) { $response.ContentType = "application/javascript; charset=utf-8" }
                elseif ($filePath.EndsWith(".css")) { $response.ContentType = "text/css; charset=utf-8" }
                elseif ($filePath.EndsWith(".png")) { $response.ContentType = "image/png" }
                elseif ($filePath.EndsWith(".jpg") -or $filePath.EndsWith(".jpeg")) { $response.ContentType = "image/jpeg" }
                elseif ($filePath.EndsWith(".ico")) { $response.ContentType = "image/x-icon" }
                
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $response.StatusCode = 404
                $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            }
        }
        $response.Close()
    }
} catch {
    Write-Error $_
} finally {
    $listener.Close()
}
