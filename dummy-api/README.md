# Simple Node.js REST API Server

A lightweight Node.js HTTP server that serves user and post data with a horror/dark humor theme.

## Features

- No external dependencies - built with Node.js native modules
- JSON data storage
- RESTful API endpoints
- Server status monitoring
- Query parameter support
- Error handling

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Make sure you have Node.js installed
3. Start the server:

```bash
node server.js
```

The server will start on `http://localhost:3000`

## API Endpoints

### 1. List All Users

```
GET /users
```

Returns a list of all users from the system.

### 2. Get Single User

```
GET /users?id=<user_id>
```

Returns a specific user by their ID.

### 3. List All Posts

```
GET /posts
```

Returns a collection of dark humor tech posts.

### 4. Get Single Post

```
GET /posts?id=<post_id>
```

Returns a specific post by its ID.

### 5. Server Status

```
GET /status
```

Returns server metrics including:

- Uptime
- Memory usage
- CPU usage
- Node.js version
- Available routes

## Data Structure

### Users

```json
{
  "id": number,
  "name": string,
  "email": string,
  "age": number,
  "role": string,
  "hobby": string
}
```

### Posts

```json
{
  "id": number,
  "title": string,
  "author": string,
  "content": string,
  "date": string,
  "tags": string[]
}
```

## Error Handling

The API returns appropriate HTTP status codes:

- 200: Success
- 404: Resource not found
- 500: Server error

## Project Structure

```
/
├── server.js        # Main server file
├── data/
│   ├── users.json   # Users data
│   └── posts.json   # Posts data
└── README.md        # Documentation
```

## Requirements

- Node.js (Latest LTS version recommended)
- Windows/Linux/MacOS

## Development

To run the server in development mode:

```bash
node server.js
```

The server will output available routes:

- http://localhost:3000/users
- http://localhost:3000/posts
- http://localhost:3000/status

## License

[Add your license here]

## Author

[Add your name/contact info here]
