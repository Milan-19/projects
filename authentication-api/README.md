# Authentication API

A simple REST API for user authentication built with Node.js, Express, and MongoDB.

## Features

- User registration with password hashing
- User login with JWT authentication
- Protected route for user profile
- Error handling middleware
- MongoDB integration

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

## API Routes

### Register User

- **URL**: `/api/users/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Login

- **URL**: `/api/users/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Get Profile

- **URL**: `/api/users/profile`
- **Method**: `GET`
- **Headers**:
  ```
  Authorization: Bearer JWT_TOKEN
  ```

## Project Structure

```
.
├── app.js              # Entry point
├── controller/         # Route controllers
├── middlewares/       # Custom middleware functions
├── model/            # Database models
├── routes/           # Route definitions
└── package.json      # Project dependencies
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing

## Error Handling

The API includes a global error handling middleware that returns errors in the following format:

```json
{
  "message": "Error message",
  "stack": "Error stack trace (development only)"
}
```
