# School Management API

This API allows users to add and retrieve school data based on geographic coordinates. The schools can be fetched and sorted by their proximity to a given location using the Haversine formula.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Libraries Used](#libraries-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Add School](#add-school)
  - [List Schools](#list-schools)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine. It's used for server-side scripting in this project.
- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js, used for building the API endpoints.
- **Prisma**: An open-source next-generation ORM. It helps in interacting with the PostgreSQL database using a simple and intuitive API.
- **PostgreSQL**: A powerful, open-source object-relational database system that uses and extends the SQL language.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, providing static type checking.
- **Zod**: A TypeScript-first schema declaration and validation library. It’s used for validating the API request payloads.

## Libraries Used

- **haversine-distance**: A library used to calculate the distance between two points on Earth specified in latitude and longitude.
- **Zod**: A TypeScript-first schema declaration and validation library. It’s used for validating the API request payloads.
- **Prisma**: Used as the ORM for database interactions.
- **Express.js**: Used to create the server and define API routes.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mavis47/School-management.git
   cd school-management-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables. Create a `.env` file in the root directory and add the following:

   ```plaintext
   DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
   ```

   Replace `username`, `password`, and `mydb` with your PostgreSQL credentials.

4. Run the Prisma migrations to set up your database:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the server:

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5001`.

## Usage

After setting up the project, you can use tools like Postman or cURL to interact with the API.

## API Endpoints

### Add School

- **Endpoint**: `POST /api/school/addSchool`
- **Description**: Adds a new school with name, address, latitude, and longitude.
- **Request Body**:

  ```json
  {
    "name": "Sample School",
    "address": "123 Main St",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
  ```

- **Response**:

  ```json
  {
    "message": "School data added successfully",
    "id": 1
  }
  ```

- **Validation**: The API validates that all fields are provided and that latitude and longitude are within valid ranges.

### List Schools

- **Endpoint**: `GET /api/school/listSchools`
- **Description**: Retrieves a list of schools sorted by proximity to a given location.
- **Query Parameters**:

  - `latitude`: Latitude of the location.
  - `longitude`: Longitude of the location.

- **Response**:

  ```json
  {
    "message": "School Data Fetched",
    "All_Schools": [
      {
        "id": 1,
        "name": "Sample School",
        "address": "123 Main St",
        "latitude": 40.7128,
        "longitude": -74.0060
      }
    ],
    "Distances": [
      {
        "id": 1,
        "name": "Sample School",
        "address": "123 Main St",
        "latitude": 40.7128,
        "longitude": -74.0060,
        "distance": 1234.56
      }
    ]
  }
  ```

- **Validation**: The API validates that latitude and longitude are provided and are valid numbers.

## Deployment

The API is deployed on Vercel and can be accessed at the following link:

- **Deployment URL**: https://school-management-bice.vercel.app/

## API Documentation

Comprehensive API documentation is available at the following link:

- **API Documentation**: https://documenter.getpostman.com/view/25343021/2sAXjF7a3D

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to add tests for any new features or bug fixes.



