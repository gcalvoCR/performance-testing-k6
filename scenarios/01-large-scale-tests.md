# Running Large-Scale Performance Tests Locally

The goal is to simulate an environment that closely matches production in terms of hardware and user load. With tools like **K6**, it's possible to reach up to **30,000–40,000 Virtual Users (VUs)**, which can generate around **300,000 requests per second (RPS)**.

---

## 🧠 System Requirements for Scaling Locally

Before running massive tests, ensure your machine meets the following criteria:

- **Memory (RAM)**:
  - Each VU consumes **1–5 MB of RAM**.
  - Example: 10,000 VUs → 10–15 GB of free RAM needed.
- **CPU**:
  - Should be **under 20% idle load** to avoid skewing test results.
- **Network Throughput**:
  - For example, AWS EC2 limits bandwidth to **125 Mb/s**.
  - Simulate this by observing how your test behaves under similar constraints.
- **Network Limits**:
  - Remove local port and connection limits to maximize bandwidth during the test.

---

## ⚙️ System Tuning Commands

Use these system tuning commands to optimize port usage and network settings. These are especially useful when running **large-scale tests locally**.

### 🐧 Linux

```bash
# Allow more open file descriptors
ulimit -n 1048576

# Increase the number of available local ports
sudo sysctl -w net.ipv4.ip_local_port_range="1024 65535"

# Reuse TCP connections
sudo sysctl -w net.ipv4.tcp_tw_reuse=1

# Reduce TIME_WAIT delay
sudo sysctl -w net.ipv4.tcp_fin_timeout=30

# Apply permanently (optional: /etc/sysctl.conf)
````


### MacOS

```bash
# Check current limits
ulimit -n

# Temporarily increase file descriptor limits
ulimit -n 1048576

# Modify port range
sudo sysctl -w net.inet.ip.portrange.first=1024
sudo sysctl -w net.inet.ip.portrange.last=65535

# Enable TCP reuse
sudo sysctl -w net.inet.tcp.msl=15000
```
For persistent changes on macOS, use /etc/sysctl.conf or configure using launchctl with a .plist file.


### Windows

```powershell
# View current ephemeral port range
netsh int ipv4 show dynamicport tcp

# Increase port range
netsh int ipv4 set dynamicport tcp start=1024 num=64511

# Enable TCP reuse and reduce TIME_WAIT
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" -Name "TcpTimedWaitDelay" -PropertyType DWord -Value 30 -Force
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" -Name "MaxUserPort" -PropertyType DWord -Value 65534 -Force
```
⚠️ A system restart may be required after registry changes.


## 🛠️ Resource Monitoring Tools

To monitor your machine during test execution:

| Tool                             | Platform     | Description                                |
|----------------------------------|--------------|--------------------------------------------|
| `htop`                           | Linux/macOS  | Real-time CPU, RAM, and load monitoring     |
| `iftop`                          | Linux/macOS  | Bandwidth usage per connection              |
| Task Manager / Resource Monitor  | Windows      | Built-in performance and network monitors   |

# Risks of Running System Tuning Commands

Running system tuning commands to increase file descriptors, change port ranges, or adjust TCP parameters can carry certain risks:

- **Increasing open file descriptors (`ulimit -n`)**:  
  Setting this value too high without adequate system resources may lead to resource exhaustion, causing system instability or crashes.

- **Modifying port ranges and TCP parameters (`sysctl` / `netsh`)**:  
  Improper changes can:  
  - Disrupt normal network functionality, causing connection failures.  
  - Leave unnecessary ports open, potentially increasing security risks.  
  - Affect other applications that depend on default TCP behaviors.

- **Editing Windows Registry**:  
  Incorrect edits can cause system instability or even prevent the system from booting. Always back up the registry before making changes.

- **General considerations**:  
  - These commands require administrative privileges and often a system reboot.  
  - Applying changes on production or critical systems without thorough testing can cause downtime or degraded performance.

---

## Best Practices

- Apply these changes **only on test or dedicated machines**.  
- Document original settings before modifying so you can revert if needed.  
- Test changes incrementally and monitor system behavior closely.  
- Avoid applying configurations globally unless you fully understand their impact.

