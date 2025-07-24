const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

// define the port
const PORT = 3000;

// file paths
const usersDataPath = path.join(__dirname, "data", "users.json");
const postsDataPath = path.join(__dirname, "data", "posts.json");

//  helper function to read JSON files
function readJSONFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error(`Error reading file ${filePath}:${error.message}`);
    return null;
  }
}

// create the server
const server = http.createServer((req, res) => {
  // Set response headers
  res.setHeader("Content-Type", "application/json");
  // parse the request URL
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, ""); // remove leading and trailing slashes
  // get query parameters
  const queryParams = parsedUrl.query;

  switch (trimmedPath) {
    case "users":
      // return user data
      const userData = readJSONFile(usersDataPath);
      if (userData) {
        // check if we need to filter by ID
        if (queryParams.id) {
          const userId = parseInt(queryParams.id);
          const user = userData.users.find((user) => user.id === userId);
          if (user) {
            res.statusCode = 200;
            res.end(JSON.stringify(user));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "User not found" }));
          }
        } else {
          res.statusCode = 200;
          res.end(JSON.stringify(userData));
        }
      } else {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Could not read user data" }));
      }
      break;

    case "posts":
      // return posts data
      const postsData = readJSONFile(postsDataPath);
      if (postsData) {
        // check if we need to filter by user ID
        if (queryParams.id) {
          const postId = parseInt(queryParams.id);
          const post = postsData.posts.find((post) => post.id === postId);
          if (post) {
            res.statusCode = 200;
            res.end(JSON.stringify(post));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Post not found" }));
          }
        } else {
          res.statusCode = 200;
          res.end(JSON.stringify(postsData));
        }
      } else {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Could not read posts data" }));
      }
      break;

    case "status":
      // return server status
      const uptime = process.uptime();
      const status = {
        status: "online",
        timestamp: new Date().toISOString(),
        uptime,
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
        node_version: process.version,
        routes: ["/users", "/posts", "/status"],
      };
      res.statusCode = 200;
      res.end(JSON.stringify(status));
      break;

    default:
      // return available endpoints
      const endpoints = {
        endpoints: [
          {
            path: "/users",
            description:
              "Returns list of users or a specific user with ?id=<user_id>",
            method: "GET",
          },
          {
            path: "/posts",
            description:
              "Returns list of posts or a specific post with ?id=<post_id>",
            method: "GET",
          },
          {
            path: "/status",
            description: "Returns current server status and metrics",
            method: "GET",
          },
        ],
      };
      res.statusCode = 200;
      res.end(JSON.stringify(endpoints));
  }
});

// start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`available routes:`);
  console.log(`http://localhost:${PORT}/users`);
  console.log(`http://localhost:${PORT}/posts`);
  console.log(`http://localhost:${PORT}/status`);
});
