# EDEN KITCHEN – Backend API (Express + MySQL)

This is the backend service for the **Eden Kitchen** smart stove system. Built with **Node.js**, **Express**, and **MySQL**, it supports a React-based frontend and provides core features such as user authentication, smart stove (device) registration, fuel mode logging, and service request management.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Authentication Header Format](#authentication-header-format)
- [Testing](#testing)
- [License](#license)

---

## Features

1. **User Authentication**
   - JWT-based token generation and validation
   - Login and registration endpoints
   - Middleware-protected routes

2. **Device Management**
   - Register smart stove devices
   - Retrieve devices by user or globally

3. **Mode History**
   - Track fuel mode switches (solar/biogas)
   - View historical data by device

4. **Service Requests**
   - Submit and view installation, repair, or battery replacement requests

5. **User-Device Mapping**
   - Many-to-many relationship support via `user_devices` junction table

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL (using `mysql2` with promise API)
- **Authentication**: JWT (jsonwebtoken)
- **Password Security**: bcryptjs
- **Environment Management**: dotenv
- **Dev Tooling**: Nodemon

---

## Project Structure

eden-kitchen-backend/
├── .env
├── server.js
├── package.json
├── config/
│ └── db.js
├── controllers/
│ ├── authController.js
│ ├── userController.js
│ ├── deviceController.js
│ ├── modeHistoryController.js
│ └── serviceRequestController.js
├── middleware/
│ └── authMiddleware.js
├── routes/
│ ├── authRoutes.js
│ ├── userRoutes.js
│ ├── deviceRoutes.js
│ ├── modeHistoryRoutes.js
│ └── serviceRequestRoutes.js
└── models/
├── userModel.js
├── deviceModel.js
├── modeHistory.js
├── serviceRequest.js
└── userDevice.js

---

## Setup Instructions

### 1. Prerequisites

- [Node.js](https://nodejs.org/)
- [MySQL Server](https://dev.mysql.com/)
- A REST API client (e.g., Thunder Client, Postman)

### 2. Clone the Repository

```bash
git clone https://github.com/your-org/eden-kitchen-backend.git
cd eden-kitchen-backend

### 3. Install Dependencies
npm install

### 4. Configure Environment Variables
Create a .env file in the root directory with the following content:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=eden_kitchen
JWT_SECRET=your_super_secret_key

### 5. Create the Database and Tables
Login to MySQL and run:

CREATE DATABASE eden_kitchen;
USE eden_kitchen;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE devices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_devices (
  user_id INT,
  device_id INT,
  PRIMARY KEY (user_id, device_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);

CREATE TABLE mode_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  stove_id INT,
  mode ENUM('solar', 'biogas'),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE service_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  stove_id INT,
  user_id INT,
  type VARCHAR(50),
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

### 6. Start the Server
npm start

The server will run on http://localhost:3000.

---

## API Endpoints
### Auth

POST /api/register
POST /api/login

### Users

GET    /api/users           # Get all users (protected)
PUT    /api/users/:id       # Update user
DELETE /api/users/:id       # Delete user

### Devices

GET    /api/devices                 # Get all devices
POST   /api/devices                # Register a new device
GET    /api/devices/:user_id       # Get devices associated with a user

### Mode History

POST /api/mode-history              # Log a mode switch
GET  /api/mode-history/:stove_id   # Get mode history for a stove

### Service Requests

POST /api/service-request               # Submit a request
GET  /api/service-request/:user_id     # View user’s requests

### Authentication Header Format
For protected routes, add the following header:

Authorization: Bearer <your_token>

Tokens are issued upon successful login and required for accessing secured endpoints.

### Testing
Use tools like Thunder Client or Postman to test API requests.

### Register

POST /api/register

{
  "username": "eden_user",
  "password": "password123",
  "email": "eden@example.com"
}

### Login

POST /api/login

{
  "username": "eden_user",
  "password": "password123"
}

### Add Device

POST /api/devices

{
  "name": "Main Kitchen Stove",
  "description": "Biogas + Solar hybrid stove",
  "user_id": 1
}

### License
This project is licensed under the MIT License.

---