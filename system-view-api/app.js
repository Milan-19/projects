const http = require("http");
const os = require("os");
const process = require("process");
const url = require("url");

//! Format bytes to human-readable format
const formatBytes = (bytes, decimal = 2) => {
  if (bytes === 0) return "0 Bytes";
  // Set base unit
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimal)) + " " + sizes[i];
};

//! Format seconds to human-readable time
const formatTime = (seconds) => {
  const days = Math.floor(seconds / (24 * 3600));
  const hours = Math.floor((seconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
};

// Get cpu info
const getCpuInfo = () => {
  return {
    model: os.cpus()[0].model,
    cores: os.cpus().length,
    architecture: os.arch(),
    loadAverage: os.loadavg(),
  };
};

// GEt memory info
const getMemoryInfo = () => {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const usedPercentage = ((usedMemory / totalMemory) * 100).toFixed(2) + "%";
  return {
    total: formatBytes(totalMemory),
    free: formatBytes(freeMemory),
    used: formatBytes(usedMemory),
    usedPercentage,
  };
};

// Get os info
const getOsInfo = () => {
  return {
    platform: os.platform(),
    type: os.type(),
    release: os.release(),
    hostname: os.hostname(),
    uptime: formatTime(os.uptime()),
  };
};

// Get user info
const getUserInfo = () => {
  return os.userInfo();
};

// Get network info
const getNetworkInfo = () => {
  return os.networkInterfaces();
};

// Get process
const getProcessInfo = () => {
  const pid = process.pid;
  const title = process.title;
  const version = process.version;
  const platform = process.platform;
  const arch = process.arch;
  const uptime = formatTime(process.uptime());
  const memoryUsage = {
    rss: formatBytes(process.memoryUsage().rss),
    heapTotal: formatBytes(process.memoryUsage().heapTotal),
    heapUsed: formatBytes(process.memoryUsage().heapUsed),
    external: formatBytes(process.memoryUsage().external),
  };
  return {
    pid,
    title,
    version,
    platform,
    arch,
    uptime,
    memoryUsage,
  };
};

//! HTTP Server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  res.setHeader("Content-Type", "application/json");
  //   switch (parsedUrl.pathname) {
  //     case "/cpu":
  //       res.end(JSON.stringify(getCpuInfo()));
  //       break;
  //     case "/memory":
  //       res.end(JSON.stringify(getMemoryInfo()));
  //       break;
  //     case "/os":
  //       res.end(JSON.stringify(getOsInfo()));
  //       break;
  //     case "/user":
  //       res.end(JSON.stringify(getUserInfo()));
  //       break;
  //     case "/network":
  //       res.end(JSON.stringify(getNetworkInfo()));
  //       break;
  //     case "/process":
  //       res.end(JSON.stringify(getProcessInfo()));
  //       break;
  //     default:
  //       res.statusCode = 404;
  //       res.end(JSON.stringify({ error: "Not Found" }));
  //   }
  if (parsedUrl.pathname === "/") {
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        name: "System View API",
        description: "A simple API to view system information",
        //version: "1.0.0",
        routes: ["/cpu", "/memory", "/os", "/user", "/network", "/process"],
      })
    );
  } else if (parsedUrl.pathname === "/cpu") {
    res.statusCode = 200;
    res.end(JSON.stringify(getCpuInfo(), null, 2));
  } else if (parsedUrl.pathname === "/memory") {
    res.statusCode = 200;
    res.end(JSON.stringify(getMemoryInfo(), null, 2));
  } else if (parsedUrl.pathname === "/os") {
    res.statusCode = 200;
    res.end(JSON.stringify(getOsInfo(), null, 2));
  } else if (parsedUrl.pathname === "/user") {
    res.statusCode = 200;
    res.end(JSON.stringify(getUserInfo(), null, 2));
  } else if (parsedUrl.pathname === "/network") {
    res.statusCode = 200;
    res.end(JSON.stringify(getNetworkInfo(), null, 2));
  } else if (parsedUrl.pathname === "/process") {
    res.statusCode = 200;
    res.end(JSON.stringify(getProcessInfo(), null, 2));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

//! Start the server
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
