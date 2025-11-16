---
title: "IoT Platform Setup Guide"
date: "2024-10-18"
category: "linux"
module: "01-iot-platforms"
order: 1
tags: ["IoT", "MQTT", "Node-RED", "InfluxDB", "Linux"]
description: "Complete guide to setting up an IoT platform with MQTT, Node-RED, and InfluxDB on Linux."
author: "Jose Lorenzo"
estimatedTime: "30 min"
difficulty: "intermediate"
prerequisites: []
---

# IoT Platform Setup Guide

## Introduction

This guide walks you through setting up a complete IoT platform on Linux using MQTT for messaging, Node-RED for automation, and InfluxDB for time-series data storage.

## Prerequisites

- Linux server (Ubuntu 20.04+ or Raspberry Pi OS)
- Root or sudo access
- Basic command line knowledge

## Architecture Overview

```
IoT Devices → MQTT Broker (Mosquitto) → Node-RED → InfluxDB → Grafana
```

## Step 1: Install Mosquitto MQTT Broker

```bash
sudo apt update
sudo apt install -y mosquitto mosquitto-clients

# Enable and start the service
sudo systemctl enable mosquitto
sudo systemctl start mosquitto
```

### Configure Mosquitto

Edit `/etc/mosquitto/mosquitto.conf`:

```
listener 1883
allow_anonymous false
password_file /etc/mosquitto/passwd
```

Create a user:

```bash
sudo mosquitto_passwd -c /etc/mosquitto/passwd iotuser
sudo systemctl restart mosquitto
```

## Step 2: Install Node-RED

```bash
bash <(curl -sL https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered)

# Enable and start
sudo systemctl enable nodered
sudo systemctl start nodered
```

Access Node-RED at `http://your-server-ip:1880`

## Step 3: Install InfluxDB

```bash
wget -q https://repos.influxdata.com/influxdata-archive_compat.key
echo '393e8779c89ac8d958f81f942f9ad7fb82a25e133faddaf92e15b16e6ac9ce4c influxdata-archive_compat.key' | sha256sum -c && cat influxdata-archive_compat.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/influxdata-archive_compat.gpg > /dev/null

echo 'deb [signed-by=/etc/apt/trusted.gpg.d/influxdata-archive_compat.gpg] https://repos.influxdata.com/debian stable main' | sudo tee /etc/apt/sources.list.d/influxdata.list

sudo apt update
sudo apt install -y influxdb2
sudo systemctl enable influxdb
sudo systemctl start influxdb
```

Setup InfluxDB at `http://your-server-ip:8086`

## Step 4: Configure Node-RED

Install required nodes:

```bash
cd ~/.node-red
npm install node-red-contrib-influxdb
npm install node-red-contrib-mqtt-broker
sudo systemctl restart nodered
```

## Example Flow

Create a flow in Node-RED:

1. **MQTT In** node → Subscribe to `sensors/temperature`
2. **Function** node → Parse JSON data
3. **InfluxDB Out** node → Store in database

Function node code:

```javascript
msg.payload = {
    temperature: msg.payload.value,
    location: msg.payload.location,
    time: new Date()
};
return msg;
```

## Step 5: Install Grafana (Optional)

```bash
sudo apt install -y software-properties-common
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
sudo apt update
sudo apt install -y grafana

sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Access Grafana at `http://your-server-ip:3000` (default login: admin/admin)

## Testing the Setup

Publish a test message:

```bash
mosquitto_pub -h localhost -t "sensors/temperature" -u iotuser -P yourpassword -m '{"value":22.5,"location":"living_room"}'
```

## Security Best Practices

1. **Use TLS/SSL** for MQTT connections
2. **Enable authentication** on all services
3. **Use firewall** to restrict access
4. **Regular updates** of all components
5. **Strong passwords** for all services

## Firewall Configuration

```bash
sudo ufw allow 1883/tcp  # MQTT
sudo ufw allow 1880/tcp  # Node-RED
sudo ufw allow 8086/tcp  # InfluxDB
sudo ufw allow 3000/tcp  # Grafana
sudo ufw enable
```

## Troubleshooting

**MQTT connection refused?**
- Check if Mosquitto is running: `sudo systemctl status mosquitto`
- Verify firewall rules
- Check authentication credentials

**Node-RED not accessible?**
- Verify service status: `sudo systemctl status nodered`
- Check logs: `sudo journalctl -u nodered -f`

## Next Steps

- Set up SSL/TLS certificates
- Configure data retention policies in InfluxDB
- Create Grafana dashboards
- Add more IoT devices
- Implement alerting rules

## Resources

- [Mosquitto Documentation](https://mosquitto.org/documentation/)
- [Node-RED Guide](https://nodered.org/docs/)
- [InfluxDB Docs](https://docs.influxdata.com/)

