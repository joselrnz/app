# Security Testing Script for DevOps Portfolio
# Tests all security implementations including headers, CSP, rate limiting, and packet analysis

param(
    [string]$BaseUrl = "http://localhost:3002"
)

Write-Host "================================================================" -ForegroundColor Magenta
Write-Host "       SECURITY TESTING SUITE - DevOps Portfolio              " -ForegroundColor Magenta
Write-Host "================================================================" -ForegroundColor Magenta
Write-Host ""

# Test 1: Security Headers
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  TEST 1: HTTP SECURITY HEADERS                               " -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri $BaseUrl -Method Head -UseBasicParsing -ErrorAction Stop
    
    $requiredHeaders = @{
        "Strict-Transport-Security" = "max-age=63072000"
        "Content-Security-Policy" = "default-src 'self'"
        "X-Frame-Options" = "SAMEORIGIN"
        "X-Content-Type-Options" = "nosniff"
        "X-XSS-Protection" = "1; mode=block"
        "Referrer-Policy" = "strict-origin-when-cross-origin"
        "Permissions-Policy" = "camera=()"
        "Cross-Origin-Opener-Policy" = "same-origin"
        "X-Permitted-Cross-Domain-Policies" = "none"
    }
    
    $passed = 0
    $failed = 0
    
    foreach ($header in $requiredHeaders.GetEnumerator()) {
        if ($response.Headers.ContainsKey($header.Key)) {
            $value = $response.Headers[$header.Key]
            if ($value -like "*$($header.Value)*") {
                Write-Host "[PASS] $($header.Key): PRESENT" -ForegroundColor Green
                $passed++
            } else {
                Write-Host "[WARN] $($header.Key): PRESENT but incorrect value" -ForegroundColor Yellow
                $failed++
            }
        } else {
            Write-Host "[FAIL] $($header.Key): MISSING" -ForegroundColor Red
            $failed++
        }
    }

    # Check for information disclosure
    if ($response.Headers.ContainsKey("X-Powered-By")) {
        Write-Host "[FAIL] X-Powered-By: EXPOSED (should be removed)" -ForegroundColor Red
        $failed++
    } else {
        Write-Host "[PASS] X-Powered-By: NOT PRESENT" -ForegroundColor Green
        $passed++
    }
    
    Write-Host "`nHeaders Test: $passed passed, $failed failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Yellow" })

} catch {
    Write-Host "[FAIL] Failed to connect to $BaseUrl" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 2: Rate Limiting
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  TEST 2: API RATE LIMITING                                   " -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan

Write-Host "Making 31 rapid requests to /api/health..." -ForegroundColor Yellow

$rateLimitTriggered = $false
$requestCount = 0

for ($i = 1; $i -le 31; $i++) {
    try {
        $null = Invoke-WebRequest -Uri "$BaseUrl/api/health" -UseBasicParsing -ErrorAction Stop
        $requestCount++
    } catch {
        if ($_.Exception.Response.StatusCode.value__ -eq 429) {
            $rateLimitTriggered = $true
            Write-Host "[PASS] Rate limit triggered after $requestCount requests" -ForegroundColor Green

            # Check rate limit headers
            $stream = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($stream)
            $body = $reader.ReadToEnd()

            if ($body -like "*Too many requests*") {
                Write-Host "[PASS] Proper error message returned" -ForegroundColor Green
            }

            break
        }
    }
}

if (-not $rateLimitTriggered) {
    Write-Host "[FAIL] Rate limiting NOT working (all 31 requests succeeded)" -ForegroundColor Red
} else {
    Write-Host "[PASS] Rate limiting is WORKING correctly" -ForegroundColor Green
}

Write-Host ""

# Test 3: Content Security Policy
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  TEST 3: CONTENT SECURITY POLICY (CSP)                       " -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan

$response = Invoke-WebRequest -Uri $BaseUrl -Method Head -UseBasicParsing
$csp = $response.Headers['Content-Security-Policy']

if ($csp) {
    Write-Host "[PASS] CSP Header Present" -ForegroundColor Green

    # Check for unsafe directives
    if ($csp -like "*unsafe-inline*" -or $csp -like "*unsafe-eval*") {
        Write-Host "[FAIL] CSP contains 'unsafe-inline' or 'unsafe-eval'" -ForegroundColor Red
    } else {
        Write-Host "[PASS] No 'unsafe-inline' or 'unsafe-eval' directives" -ForegroundColor Green
    }

    # Check for important directives
    $directives = @("default-src", "script-src", "style-src", "object-src", "base-uri", "frame-ancestors")
    foreach ($directive in $directives) {
        if ($csp -like "*$directive*") {
            Write-Host "[PASS] $directive directive present" -ForegroundColor Green
        } else {
            Write-Host "[WARN] $directive directive missing" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "[FAIL] CSP Header Missing" -ForegroundColor Red
}

Write-Host ""

# Test 4: API Health Check
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  TEST 4: API HEALTH ENDPOINT                                 " -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan

# Wait a bit for rate limit to reset
Start-Sleep -Seconds 2

try {
    $response = Invoke-WebRequest -Uri "$BaseUrl/api/health" -UseBasicParsing
    $json = $response.Content | ConvertFrom-Json

    Write-Host "[PASS] Health endpoint accessible" -ForegroundColor Green
    Write-Host "    Status: $($json.status)" -ForegroundColor Cyan
    Write-Host "    Service: $($json.service)" -ForegroundColor Cyan
    Write-Host "    Version: $($json.version)" -ForegroundColor Cyan
    Write-Host "    Environment: $($json.environment)" -ForegroundColor Cyan

} catch {
    Write-Host "[FAIL] Health endpoint failed" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Green
Write-Host "                SECURITY TESTS COMPLETE                        " -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green

