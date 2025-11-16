---
title: "ESP32 WiFi Temperature Sensor"
date: "2024-10-15"
category: "circuits"
tags: ["ESP32", "WiFi", "IoT", "Sensors", "DHT22"]
description: "IoT temperature and humidity monitoring system using ESP32 and DHT22 sensor with web dashboard."
author: "Jose Lorenzo"

# Learning path metadata
module: "04-projects"
order: 2
prerequisites:
  - "01-fundamentals/01-dc-circuit-basics"
difficulty: "intermediate"
estimatedTime: "2.5 hours"
---

# ESP32 WiFi Temperature Sensor

## Project Overview

Build an IoT temperature and humidity monitoring system using the ESP32 microcontroller and DHT22 sensor. The data is accessible via a web dashboard and can be logged to cloud services.

## Components Required

- ESP32 Development Board
- DHT22 Temperature & Humidity Sensor
- 10kΩ Resistor (pull-up for DHT22)
- Breadboard and jumper wires
- Micro USB cable

## Wiring Diagram

| DHT22 Pin | ESP32 Pin |
|-----------|-----------|
| VCC       | 3.3V      |
| DATA      | GPIO 4    |
| GND       | GND       |

**Note:** Add a 10kΩ pull-up resistor between VCC and DATA pins.

## Code

Install the required libraries:
- DHT sensor library by Adafruit
- Adafruit Unified Sensor
- ESPAsyncWebServer

```cpp
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <DHT.h>

// WiFi credentials
const char* ssid = "YOUR_SSID";
const char* password = "YOUR_PASSWORD";

// DHT22 setup
#define DHTPIN 4
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

// Web server on port 80
AsyncWebServer server(80);

float temperature = 0;
float humidity = 0;

void setup() {
  Serial.begin(115200);
  dht.begin();
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected! IP: " + WiFi.localIP().toString());
  
  // Setup web server routes
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    String html = getHTML();
    request->send(200, "text/html", html);
  });
  
  server.on("/data", HTTP_GET, [](AsyncWebServerRequest *request){
    String json = "{\"temperature\":" + String(temperature) + 
                  ",\"humidity\":" + String(humidity) + "}";
    request->send(200, "application/json", json);
  });
  
  server.begin();
}

void loop() {
  // Read sensor every 2 seconds
  static unsigned long lastRead = 0;
  if (millis() - lastRead > 2000) {
    temperature = dht.readTemperature();
    humidity = dht.readHumidity();
    
    if (!isnan(temperature) && !isnan(humidity)) {
      Serial.printf("Temp: %.1f°C, Humidity: %.1f%%\n", temperature, humidity);
    }
    lastRead = millis();
  }
}

String getHTML() {
  return R"(
<!DOCTYPE html>
<html>
<head>
  <title>ESP32 Sensor Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: Arial; text-align: center; margin: 20px; }
    .sensor { display: inline-block; margin: 20px; padding: 20px; 
              border: 2px solid #333; border-radius: 10px; }
    .value { font-size: 48px; font-weight: bold; color: #007bff; }
  </style>
  <script>
    setInterval(function() {
      fetch('/data')
        .then(response => response.json())
        .then(data => {
          document.getElementById('temp').innerHTML = data.temperature.toFixed(1);
          document.getElementById('hum').innerHTML = data.humidity.toFixed(1);
        });
    }, 2000);
  </script>
</head>
<body>
  <h1>ESP32 Sensor Dashboard</h1>
  <div class="sensor">
    <h2>Temperature</h2>
    <div class="value"><span id="temp">--</span>°C</div>
  </div>
  <div class="sensor">
    <h2>Humidity</h2>
    <div class="value"><span id="hum">--</span>%</div>
  </div>
</body>
</html>
  )";
}
```

## Features

- **Real-time monitoring** via web dashboard
- **Auto-refresh** every 2 seconds
- **Responsive design** works on mobile devices
- **JSON API** for integration with other services

## Accessing the Dashboard

1. Upload the code to your ESP32
2. Open Serial Monitor to see the IP address
3. Open a web browser and navigate to the IP address
4. View real-time temperature and humidity data

## Enhancements

- Add data logging to SD card or cloud (ThingSpeak, Firebase)
- Implement alerts for temperature/humidity thresholds
- Add more sensors (pressure, light, etc.)
- Create historical data charts
- Add MQTT support for home automation integration

## Troubleshooting

**Sensor reading NaN?**
- Check wiring connections
- Verify pull-up resistor is installed
- Try a different GPIO pin

**Can't connect to WiFi?**
- Double-check SSID and password
- Ensure 2.4GHz WiFi (ESP32 doesn't support 5GHz)
- Check router settings

## Resources

- [ESP32 Documentation](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/)
- [DHT22 Datasheet](https://www.sparkfun.com/datasheets/Sensors/Temperature/DHT22.pdf)

