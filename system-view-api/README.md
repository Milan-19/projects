# System View API

A simple Node.js API that provides system information endpoints for monitoring CPU, memory, OS, network, and process details.

## Features

- CPU information (model, cores, architecture, load average)
- Memory statistics (total, free, used, usage percentage)
- Operating system details (platform, type, release, hostname, uptime)
- User information
- Network interface details
- Process statistics (memory usage, uptime, version info)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
node app.js
```

4. Access the API at `http://localhost:3000`

## API Endpoints

### Root endpoint

- `GET /` - API information and available routes

### System Information

- `GET /cpu` - CPU details and load average
- `GET /memory` - Memory usage statistics
- `GET /os` - Operating system information
- `GET /user` - Current user details
- `GET /network` - Network interfaces information
- `GET /process` - Node.js process statistics

## Response Examples

### CPU Information

```json
{
  "model": "Intel(R) Core(TM) i7",
  "cores": 8,
  "architecture": "x64",
  "loadAverage": [1.2, 1.4, 1.5]
}
```

### Memory Information

```json
{
  "total": "16 GB",
  "free": "8.2 GB",
  "used": "7.8 GB",
  "usedPercentage": "48.75%"
}
```

### OS Information

```json
{
  "platform": "win32",
  "type": "Windows_NT",
  "release": "10.0.19045",
  "hostname": "Desktop-PC",
  "uptime": "2d 5h 30m 15s"
}
```

## Features

- Human-readable formatting for bytes and time durations
- Real-time system information
- JSON formatted responses
- Simple and lightweight implementation

## Dependencies

- Node.js built-in modules only:
  - `http`
  - `os`
  - `process`
  - `url`

## License

ISC
