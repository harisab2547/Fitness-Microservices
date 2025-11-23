# Fitness Tracker Web Application

A modern React-based web application for managing fitness activities and users, built with Vite and integrated with Spring Boot microservices.

## Features

- **User Management**: Create, read, update, and delete user profiles
- **Activity Tracking**: Log and manage fitness activities (running, cycling, swimming, etc.)
- **Responsive Design**: Beautiful, mobile-friendly interface
- **Real-time Updates**: Dynamic data fetching and updates
- **Microservices Integration**: Connects to separate user and activity microservices

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Axios**: HTTP client for API communication
- **CSS3**: Custom styling with responsive design

## Project Structure

```
fitness-webapp/
├── src/
│   ├── components/          # React components
│   │   ├── UserList.jsx
│   │   ├── UserForm.jsx
│   │   ├── ActivityList.jsx
│   │   └── ActivityForm.jsx
│   ├── pages/               # Page components
│   │   └── Dashboard.jsx
│   ├── services/            # API service layer
│   │   ├── api.js
│   │   ├── userService.js
│   │   └── activityService.js
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── .env.example             # Environment variables template
└── package.json             # Dependencies and scripts
```

## Prerequisites

- **Node.js**: Version 16.x or higher
- **npm**: Version 7.x or higher
- **Backend Services**: Running microservices (user-service, activity-service)

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   cd fitness-webapp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and update the API URLs to match your backend configuration:
   ```env
   VITE_USER_SERVICE_URL=http://localhost:8081
   VITE_ACTIVITY_SERVICE_URL=http://localhost:8082
   VITE_API_BASE_URL=http://localhost:8080
   ```

## Running the Application

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Backend Integration

This application requires the following microservices to be running:

### User Service (Port 8081)
- `GET /users` - Get all users
- `GET /users/{id}` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

### Activity Service (Port 8082)
- `GET /activities` - Get all activities
- `GET /activities/user/{userId}` - Get activities by user ID
- `GET /activities/{id}` - Get activity by ID
- `POST /activities` - Create new activity
- `PUT /activities/{id}` - Update activity
- `DELETE /activities/{id}` - Delete activity

## Usage Guide

### Managing Users

1. Click on the **Users** tab in the dashboard
2. Click **Create User** to add a new user
3. Fill in the user details (name, email, password)
4. Click **Edit** to modify existing users
5. Click **Delete** to remove users

### Tracking Activities

1. Click on the **Activities** tab in the dashboard
2. Click **Log Activity** to record a new activity
3. Select activity type (Running, Cycling, Swimming, etc.)
4. Enter duration, calories, distance, and notes
5. Click **Edit** to modify existing activities
6. Click **Delete** to remove activities

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

This project uses ESLint for code quality. The configuration can be found in `eslint.config.js`.

## API Service Layer

The application uses a centralized API service layer:

- **api.js**: Configures axios instances with interceptors for authentication and error handling
- **userService.js**: User-related API calls
- **activityService.js**: Activity-related API calls

Authentication tokens are stored in localStorage and automatically included in requests.

## Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure your backend services have CORS enabled:

```java
@CrossOrigin(origins = "http://localhost:5173")
```

### Connection Refused

If the API calls fail with connection errors:
1. Verify backend services are running
2. Check the port numbers in your `.env` file
3. Ensure no firewall is blocking the connections

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual port number.

## Future Enhancements

- User authentication and authorization
- Activity statistics and charts
- Profile pictures and avatars
- Activity sharing and social features
- Mobile application
- Progressive Web App (PWA) support

## License

This project is part of the Fitness Microservices application.

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## Support

For issues and questions, please create an issue in the repository.
