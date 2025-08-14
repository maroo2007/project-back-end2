# Pharmacy Backend System

This project is the backend for a Pharmacy Management System, built with Node.js, Express, and MongoDB. It includes modules for managing medicines and handling user authentication.

## Table of Contents

- [Features](#features)
- [Entities and Models](#entities-and-models)
  - [Medicine](#medicine)
  - [User](#user)
- [API Routes](#api-routes)
  - [Medicine Routes](#medicine-routes)
  - [Authentication Routes](#authentication-routes)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Testing with cURL](#testing-with-curl)

## Features

-   **Medicine Management**: CRUD operations for medicines.
-   **User Authentication**: User registration (signup) and login with JWT.
-   **Role-Based Access**: User roles (`customer`, `pharmacist`, `admin`) are defined for future implementation of access control.
-   **Protected Routes**: Middleware to protect sensitive routes.

## Entities and Models

### Medicine

The `Medicine` entity was chosen as the core resource for a pharmacy system. It represents a product that can be managed by the pharmacy.

-   `name`: String (Required)
-   `description`: String (Required)
-   `price`: Number (Required)
-   `quantity`: Number (Required, Default: 0)
-   `category`: String (Required)
-   `expirationDate`: Date (Required)

### User

The `User` entity handles authentication and authorization. The following roles are available:

-   `customer`: Can browse medicines and make purchases (future).
-   `pharmacist`: Can manage the medicine inventory.
-   `admin`: Has full access to the system.

-   `name`: String (Required)
-   `email`: String (Required, Unique)
-   `password`: String (Required, Hashed)
-   `role`: String (Enum: `customer`, `pharmacist`, `admin`, Default: `customer`)

## API Routes

The base URL for all routes is `/api`.

### Medicine Routes

-   `POST /medicines`: Create a new medicine.
-   `GET /medicines`: Get all medicines.
-   `GET /medicines/:id`: Get a single medicine by its ID.
-   `PATCH /medicines/:id`: Update a medicine's details.
-   `DELETE /medicines/:id`: Delete a medicine from the database.

### Authentication Routes

-   `POST /auth/signup`: Register a new user. Returns a JWT token.
-   `POST /auth/login`: Log in an existing user. Returns a JWT token.
-   `GET /auth/me`: Get the profile of the currently logged-in user. **(Protected)**

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/en/)
-   [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <repo-folder>
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root directory and add your environment variables. Use `.env.example` as a template.
    ```env
    # MongoDB Connection String
    MONGO_URI=your_mongodb_connection_string

    # JWT Secret Key
    JWT_SECRET=your_super_secret_key
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```
    (Note: You may need to add a "start" script to `package.json`: `"start": "node server.js"`)

## Testing with cURL

Here are some examples of how to test the API endpoints using cURL.

**Create a Medicine:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"Aspirin","description":"Pain reliever","price":5.99,"quantity":100,"category":"Painkiller","expirationDate":"2025-12-31"}' http://localhost:5000/api/medicines
```

**Sign Up a User:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","password":"password123"}' http://localhost:5000/api/auth/signup
```

**Log In:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"john@example.com","password":"password123"}' http://localhost:5000/api/auth/login
```

**Access a Protected Route (Get Profile):**
_First, get the token from the login response._
```bash
TOKEN="your_jwt_token_here"
curl -X GET -H "Authorization: Bearer $TOKEN" http://localhost:5000/api/auth/me
```
