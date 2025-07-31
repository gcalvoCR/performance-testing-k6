INFLUX_URL=http://localhost:8086
INFLUX_ORG=k6org
INFLUX_BUCKET=k6bucket
INFLUX_TOKEN=k6pass
K6_SCRIPT=./first-test.js
INFLUX_URL_V1=http://localhost:8086/k6

.PHONY: up down run

up:
	docker compose up -d
	@echo "Waiting 10 seconds for InfluxDB and Grafana to start..."
	sleep 10
	@echo "Setup complete. Access Grafana at http://localhost:3000 (admin/admin)."

down:
	docker compose down

run:
# 	k6s needs to be installed, if not you can use docker
	k6 run --out "influxdb=${INFLUX_URL_V1}" ${K6_SCRIPT}