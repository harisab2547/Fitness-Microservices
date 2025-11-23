# Fitness Microservices

A comprehensive fitness tracking application built with microservices architecture, featuring Spring Boot backend services and a modern React frontend.

## Architecture Overview

This project consists of the following components:

### Backend Services

- **eureka**: Service discovery server (Netflix Eureka)
- **userservices**: User management microservice
- **activity-service**: Activity tracking microservice

### Frontend

- **fitness-webapp**: React-based web application for user interface

## Tech Stack

### Backend
- Java Spring Boot
- Spring Cloud Netflix Eureka
- Maven

### Frontend
- React 18
- Vite
- Axios
- Modern CSS3

## Project Structure

```
Fitness-Microservices/
├── eureka/                  # Service Discovery Server
├── userservices/            # User Management Service
├── activity-service/        # Activity Tracking Service
└── fitness-webapp/          # React Frontend Application
```

## Getting Started

### Prerequisites

- **Java**: JDK 11 or higher
- **Maven**: 3.6 or higher
- **Node.js**: 16.x or higher
- **npm**: 7.x or higher

### Running the Backend Services

1. **Start Eureka Server** (Service Discovery):
   ```bash
   cd eureka
   ./mvnw spring-boot:run
   ```
   Eureka will run on `http://localhost:8761`

2. **Start User Service**:
   ```bash
   cd userservices
   ./mvnw spring-boot:run
   ```
   User service will run on `http://localhost:8081`

3. **Start Activity Service**:
   ```bash
   cd activity-service
   ./mvnw spring-boot:run
   ```
   Activity service will run on `http://localhost:8082`

### Running the Frontend

1. **Navigate to the webapp directory**:
   ```bash
   cd fitness-webapp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment** (copy and edit .env):
   ```bash
   cp .env.example .env
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## Features

- **User Management**: Create, update, delete, and view user profiles
- **Activity Tracking**: Log fitness activities (running, cycling, swimming, etc.)
- **Service Discovery**: Automatic service registration and discovery via Eureka
- **Microservices Architecture**: Scalable and maintainable service-oriented design
- **Modern UI**: Responsive React-based interface with beautiful design

## API Endpoints

### User Service (Port 8081)
- `GET /users` - Get all users
- `GET /users/{id}` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

### Activity Service (Port 8082)
- `GET /activities` - Get all activities
- `GET /activities/user/{userId}` - Get activities by user
- `GET /activities/{id}` - Get activity by ID
- `POST /activities` - Create new activity
- `PUT /activities/{id}` - Update activity
- `DELETE /activities/{id}` - Delete activity

## Development

### Backend Development

Each microservice can be developed independently. They use Maven for dependency management and Spring Boot for rapid development.

### Frontend Development

The frontend uses Vite for fast development with Hot Module Replacement (HMR). See `fitness-webapp/README.md` for detailed frontend documentation.

## Deployment

1. Build all backend services:
   ```bash
   cd eureka && ./mvnw clean package
   cd ../userservices && ./mvnw clean package
   cd ../activity-service && ./mvnw clean package
   ```

2. Build the frontend:
   ```bash
   cd fitness-webapp && npm run build
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is a demonstration of microservices architecture for fitness tracking.

## Support

For issues and questions, please create an issue in the repository.
