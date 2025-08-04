# Running k6 Tests in the Cloud ☁️

The k6 Cloud allows you to run large-scale load tests without overloading your local machine. It provides automatic result storage, visualization, and team collaboration.

---

## 🧾 Prerequisites

- A [k6 Cloud account](https://app.k6.io/)
- The `k6` CLI installed locally  
  → Install instructions: https://k6.io/docs/getting-started/installation/

---

## 🔐 Authenticate with the Cloud

1. Get your API token from [https://app.k6.io/account/api-token](https://app.k6.io/account/api-token)
2. Run the following command:

```bash
k6 login cloud --token YOUR_API_TOKEN
```

This stores credentials locally in ~/.config/loadimpact.

## Local vs Cloud Execution

| Feature              | Local Execution            | Cloud Execution                |
|----------------------|----------------------------|--------------------------------|
| Max VUs              | 10,000–40,000 (approx)      | 100,000+ (virtually unlimited) |
| Resource Usage       | Uses your local machine     | Fully offloaded to k6 servers  |
| Scalability          | Limited                     | High and distributed           |
| Cost                 | Free                        | Requires paid plan (after trial) |
| Ideal for            | Development & CI            | High-scale load testing        |

---

> 💡 Use **local runs** for fast feedback and dev workflows. Use **k6 Cloud** when you need scale, realism, and team-wide observability.

# Remember:


- In local tests don't scale well.
- Load is not limited by your machine.
- k6 Cloud provides a more realistic environment.
- Locally your load is not distributed.



# Notes:
- It used to be k6 cloud, not it is now Grafana Cloud k6.

OpenAPI to K6
- You can use OpenAPI to generate k6 scripts.
```bash
npx @grafana/openapi-to-k6 <OPENAPI_PATH | OPENAPI_URL> <OUTPUT_PATH> --include-sample-script
```
Then run thet tests with:
```bash
k6 cloud run <OUTPUT_PATH>/k6-script.sample.ts
```


# Commands

MacOs
```bash
brew install k6
```

Linux Sephora/CentOS
```bash
sudo dnf install https://dl.k6.io/rpm/repo.rpm
sudo dnf install k6
```

Linux Debian/Ubuntu
```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

Windows
```bash
// Using Chocolatey to install the unofficial k6 package
choco install k6
// Or download the official k6 installer: https://dl.k6.io/msi/k6-latest-amd64.msi
```
Docker
```bash
docker pull grafana/k6
```

Login
```bash
k6 login cloud --token YOUR_API_TOKEN
```

Create a test
```bash 
k6 new test.js
```

In options change
```js
export const options = {
  cloud: {
    projectID: 3788278,
    // Test runs with the same name groups test runs together
    name: 'YOUR TEST NAME'
  }
}
```
run test in cloud
```bash
k6 cloud run test.js
```