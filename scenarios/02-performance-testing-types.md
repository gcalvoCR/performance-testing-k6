# performance-base

# Performance Testing Types

---

### **Smoke Test**
- **Purpose**: Perform a quick verification to ensure the system can handle basic operations under minimal load without crashing.
- **Key Goals**:
  - Validate that core functionalities respond without failure.
  - Detect show-stopper bugs early in the testing pipeline.
  - Confirm that the environment is correctly configured before running heavier tests.
- **Example**: Run a single request to each critical API endpoint and confirm it returns a 2xx status code within acceptable time.

---

### **Load Test**
- **Purpose**: Assess system performance under expected user load to ensure it meets performance requirements.
- **Key Goals**:
  - Measure response time, throughput, and resource consumption under realistic traffic conditions.
  - Identify performance bottlenecks and scalability limits within the expected usage range.
  - Validate SLAs (Service Level Agreements) for performance.
- **Example**: Simulate 100–500 concurrent users making standard requests over 10 minutes and verify that the API maintains <500ms average response time.

---

### **Stress Test**
- **Purpose**: Determine the system’s robustness by pushing it beyond its expected capacity until it fails.
- **Key Goals**:
  - Identify the system’s breaking point.
  - Observe system behavior under overload conditions.
  - Evaluate how well the system recovers after failure.
- **Example**: Continuously increase the number of Virtual Users (VU) until the API returns HTTP 500 errors or latency degrades significantly.

---

### **Spike Test**
- **Purpose**: Evaluate how the system handles sudden, extreme changes in load followed by rapid drops.
- **Key Goals**:
  - Simulate unexpected traffic surges.
  - Test how quickly the system can scale up and down.
  - Identify transient failures or recovery lags.
- **Example**: Jump from 10 to 1000 VUs in a few seconds, hold briefly, and then drop back to 10.

---

### **Soak Test (Endurance Test)**
- **Purpose**: Assess the long-term stability and performance of the system under sustained load.
- **Key Goals**:
  - Detect memory leaks, slow resource leaks, or degradation over time.
  - Confirm that the system remains stable over prolonged usage.
  - Identify issues that may only surface after hours of activity.
- **Example**: Simulate 200 VUs making regular requests for 8 hours and monitor CPU, memory usage, and response times throughout.

---

## When to Use Each Test

## When to Use Each Test Type

Choosing the right type of performance test depends on the stage of development and the performance risks you want to uncover:

| Test Type   | When to Use                                                                 |
|-------------|------------------------------------------------------------------------------|
| **Smoke**   | After deploying new builds to verify basic functionality and stability.      |
| **Load**    | Before release, to ensure the system can handle expected production traffic. |
| **Stress**  | During performance tuning or pre-launch to find system limits and failure modes. |
| **Spike**   | To simulate promotional events, flash sales, or viral usage spikes.          |
| **Soak**    | To validate long-term system stability, especially for always-on services.   |
---

# 🔧 Public & Mock APIs for Practicing Performance Testing

Use these APIs and tools to safely practice Load, Spike, Stress, and Soak Testing with tools like **K6**, **JMeter**, or **Locust**.

> ⚠️ Most public APIs have **rate limits**. Use low to moderate load unless explicitly allowed.

---

## 🌐 Public APIs

### 1. **JSONPlaceholder**
- **URL**: https://jsonplaceholder.typicode.com/
- **Description**: Fake REST API for testing and prototyping.
- **Endpoints**: `/posts`, `/users`, `/comments`, etc.
- **Limitations**: Read-only; no data persistence.

---

### 2. **ReqRes**
- **URL**: https://reqres.in/
- **Description**: Hosted API simulating user data and login flows.
- **Endpoints**: `/api/users`, `/api/login`, etc.
- **Supports**: `GET`, `POST`, `PUT`, `DELETE`.
- **Good for**: Testing authentication, CRUD operations.

---

### 3. **httpbin**
- **URL**: https://httpbin.org/
- **Description**: Test HTTP behaviors like headers, delays, and error codes.
- **Endpoints**: `/get`, `/post`, `/status/{code}`, `/delay/{n}`, etc.
- **Good for**: Latency simulation, error handling, request inspection.

---

### 4. **Open-Meteo**
- **URL**: https://open-meteo.com/
- **Description**: Free weather forecast API without authentication.
- **Endpoint**: `/v1/forecast`
- **Good for**: Real-world JSON data, query param stress testing.

---

### 5. **API Ninjas**
- **URL**: https://api-ninjas.com/
- **Description**: Offers multiple public APIs (quotes, jokes, finance, etc.).
- **API Key**: Required (free tier available).
- **Good for**: Random data testing, varying response payloads.

---

## 🧪 Mock APIs / Local Tools

### 6. **Mockoon**
- **URL**: https://mockoon.com/
- **Description**: Build and run local mock APIs with full control.
- **Good for**: Custom latency, failure simulation, safe heavy testing.

---

### 7. **Postman Mock Server**
- **URL**: https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/
- **Description**: Create mock servers with Postman collections.
- **Good for**: Team collaboration and simulating specific behaviors.

---

### 8. **WireMock Cloud**
- **URL**: https://www.wiremock.io/
- **Description**: Hosted mock API platform with templating and delay simulation.
- **Free Tier**: Available.
- **Good for**: Advanced mocking and integration testing.

---

## ⚙️ Local Custom Servers

### 9. **json-server**
- **URL**: https://github.com/typicode/json-server
- **Description**: Create a full fake REST API using a simple JSON file.
- **Install**: `npm install -g json-server`
- **Command**: `json-server --watch db.json --port 3000`
- **Good for**: End-to-end mock testing, complete CRUD simulation.

---

## Comparison Table

| API/Tool          | Safe for Load Testing | Customizable | Use Case                                  |
|-------------------|-----------------------|--------------|--------------------------------------------|
| JSONPlaceholder   | ✅ Light loads only    | ❌           | Read-only endpoints                        |
| ReqRes            | ✅ Light loads only    | ❌           | Simulating login / user data               |
| httpbin           | ✅ Moderate loads      | ✅ Some       | Status codes, headers, artificial latency  |
| Open-Meteo        | ✅ Light loads only    | ❌           | Public data APIs                           |
| API Ninjas        | ✅ Limited by key      | ❌           | Random or public data                      |
| Mockoon           | ✅ Yes                 | ✅ Full       | Fully controlled local mock API            |
| Postman Mock      | ✅ Yes                 | ✅ Medium     | Collaborative test scenarios               |
| WireMock Cloud    | ✅ Yes                 | ✅ Advanced   | Dynamic responses, fault injection         |
| json-server       | ✅ Yes                 | ✅ Full       | Full CRUD API for local stress testing     |

---