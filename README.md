
# Express.js with TypeScript Practice Project

## Overview
A focused practice project for learning Express.js backend development with TypeScript. The frontend is built with Vite + React and is already complete, so you can concentrate on building the backend server, routes, controllers, and middleware.

## Learning Objectives
- Understand Express.js server setup and structure
- Handle GET, POST, PUT, and DELETE requests
- Implement middleware for logging, validation, and error handling
- Organize code using controllers, routes, and middleware patterns
- Test APIs with Postman and the provided frontend
- Practice proper import/export patterns with ES modules

## Project Structure
```
express-practice/
├── client/                 # Vite React frontend (COMPLETE)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # App entry point
│   ├── index.html         # HTML template
│   └── package.json       # Frontend dependencies
├── server/                 # Express + TypeScript backend (YOU BUILD THIS)
│   ├── src/
│   │   ├── controllers/   # Business logic (EMPTY)
│   │   ├── routes/        # Request routing (EMPTY)
│   │   ├── middleware/    # Custom middleware (EMPTY)
│   │   ├── app.js         # Express app setup
│   │   └── server.js      # Server entry point
│   └── package.json       # Backend dependencies
└── README.md              # This file
```

## Part 1: Understanding Express.js Architecture

### The Restaurant Analogy
Think of your web server like a restaurant:
- **Customers (Frontend)** make orders (requests)
- **Hosts (Routes)** direct customers to the right table
- **Chefs (Controllers)** prepare the food (process data)  
- **Kitchen Helpers (Middleware)** help with prep work

### Core Concepts Explained

#### Routes - The Restaurant Hosts
Routes determine which code runs for which URL paths and HTTP methods.

**What routes do:**
- Listen for specific URL patterns
- Handle different HTTP methods (GET, POST, PUT, DELETE)
- Direct requests to the appropriate controller

**Example pattern:**
```javascript
// When someone visits "/users", call the getUserController
router.get('/users', getUserController);
```

#### Controllers - The Chefs
Controllers contain the main business logic for handling requests.

**What controllers do:**
- Process incoming request data
- Perform the actual work (data manipulation, etc.)
- Send responses back to the client

**Example pattern:**
```javascript
const getUserController = (req, res) => {
    // req contains the incoming request data
    // res is used to send the response
    const users = ['Alice', 'Bob', 'Charlie'];
    res.json(users); // Send data as JSON
};
```

#### Middleware - The Kitchen Helpers
Middleware functions run before your main controller logic.

**What middleware does:**
- Runs before the main controller
- Can modify requests or responses
- Can handle errors, logging, validation
- Can stop requests that don't meet criteria

**Example pattern:**
```javascript
const logRequest = (req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next(); // Continue to the next middleware/controller
};
```

### Request-Response Cycle Flow
```
Frontend Request → Express Server → Middleware → Routes → Controllers → Response → Frontend
```

### Import/Export Patterns

**Exporting functions** (making them available):
```javascript
// In controllers/userController.js
export const getUsers = (req, res) => {
    // controller logic
};
```

**Importing functions** (using them elsewhere):
```javascript
// In routes/userRoutes.js  
import { getUsers } from '../controllers/userController.js';
```

## Part 2: Testing with Postman

### Why Use Postman?
Postman lets you test your backend API without needing the frontend. This helps you isolate backend issues from frontend issues.

### Getting Started with Postman
1. **Download Postman** from [postman.com](https://www.postman.com/downloads/)
2. **Create a new request**
3. **Set the HTTP method** (GET, POST, PUT, DELETE)
4. **Enter your URL** (http://localhost:3000/api/users)
5. **Send the request**
6. **Check the response**

### Testing Different Request Types

#### GET Requests - Reading Data
- Used to retrieve information
- No body data needed
- Example: Getting all users

#### POST Requests - Creating Data
- Used to send new data to the server
- Requires a request body
- **In Postman:** Go to "Body" tab → "raw" → "JSON"
```json
{
    "name": "John Doe",
    "email": "john@example.com"
}
```

#### PUT Requests - Updating Data
- Used to update existing data
- Similar to POST but indicates updating

#### DELETE Requests - Removing Data
- Used to delete resources
- Usually includes an ID in the URL

## Part 3: Project Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- VS Code
- Postman
- Git

### Installation Steps

#### 1. Clone and Install Dependencies
```bash
# Clone the repository
git clone [your-repo-url]
cd express-practice

# Install all dependencies (both client and server)
npm run install:all
```

#### 2. Start the Development Servers

**Option A: Run both together (recommended)**
```bash
npm run dev
```

**Option B: Run separately in different terminals**
```bash
# Terminal 1 - Backend Server
npm run dev:server

# Terminal 2 - Frontend Server  
npm run dev:client
```

- Backend runs on: http://localhost:3000
- Frontend runs on: http://localhost:5173

#### 3. Verify Setup
- Backend: Visit http://localhost:3000/api/status in browser or Postman
- Frontend: Visit http://localhost:5173 in browser

## Part 4: Practice Exercise - Step by Step Guide

### Practice Goals
You'll build a simple user management system with:
- User CRUD operations (Create, Read, Update, Delete)
- Product management endpoints
- Custom middleware
- Proper error handling

### Step 1: Understand the Data Structure
**Users will have:**
- id (auto-generated)
- name (string)
- email (string)
- createdAt (date)

**Products will have:**
- id (auto-generated)  
- name (string)
- price (number)
- category (string)

### Step 2: Build in This Order

#### Phase 1: Basic Server Setup (15 minutes)
1. **Examine the starter code** in `server/src/app.js` and `server/src/server.js`
2. **Understand the existing routes** - start with `/api/status`
3. **Test the basic setup** with Postman

**Think about:**
- How does the Express app get created?
- What middleware is already set up?
- How does the server start listening for requests?

#### Phase 2: Create Data Models (10 minutes)
1. **Create in-memory data storage** in `models/` folder
2. **Set up initial data arrays** for users and products
3. **Add helper functions** for generating IDs, finding items, etc.

**Think about:**
- How will you store data temporarily (since we're not using a database)?
- What helper functions will make your controllers cleaner?
- How will you handle unique IDs?

#### Phase 3: Build User Routes & Controllers (15 minutes)
1. **Create user routes** in `routes/userRoutes.js`
2. **Implement user controllers** in `controllers/userController.js`
3. **Start with GET /api/users** - return all users
4. **Then add POST /api/users** - create new user

**Think about:**
- How do routes connect to controllers?
- What should the response format be?
- How do you handle errors?

#### Phase 4: Add Middleware (10 minutes)
1. **Create logging middleware** that logs each request
2. **Add validation middleware** for user creation
3. **Implement error handling middleware**

**Think about:**
- What information is useful to log?
- How can middleware prevent invalid data?
- Where should error handling middleware be placed?

#### Phase 5: Build Product Routes & Controllers (10 minutes)
1. **Repeat the pattern** for products
2. **Create product routes and controllers**
3. **Test all endpoints** with Postman

#### Phase 6: Test with Frontend (5 minutes)
1. **Use the provided frontend** to test your API
2. **Verify all functionality works**
3. **Fix any issues** found during testing

### Step 3: Practice Tasks Checklist

#### Required Endpoints
- [ ] `GET /api/status` - Server status check
- [ ] `GET /api/users` - Get all users
- [ ] `POST /api/users` - Create new user
- [ ] `GET /api/products` - Get all products  
- [ ] `POST /api/products` - Create new product

#### Bonus Challenges (if time permits)
- [ ] `PUT /api/users/:id` - Update user
- [ ] `DELETE /api/users/:id` - Delete user
- [ ] Add request validation middleware
- [ ] Implement proper error responses
- [ ] Add data filtering or searching

### Step 4: Key Concepts to Focus On

#### 1. Request Object (`req`)
- `req.params` - URL parameters (`/users/:id`)
- `req.query` - Query string parameters (`/users?name=john`)
- `req.body` - Request body data (for POST/PUT)
- `req.method` - HTTP method used
- `req.url` - Request URL

#### 2. Response Object (`res`)
- `res.json()` - Send JSON response
- `res.status()` - Set HTTP status code
- `res.send()` - Send various types of responses
- `res.sendStatus()` - Send status code with message

#### 3. Middleware Pattern
```javascript
const middleware = (req, res, next) => {
    // Do something with req or res
    next(); // Call next() to continue
    // OR res.send() to end the request
};
```

#### 4. Error Handling
- Always provide meaningful error messages
- Use appropriate HTTP status codes
- Consider both client and server errors

## Part 5: Common Patterns & Best Practices

### File Organization
- **Routes**: Define URL endpoints and HTTP methods
- **Controllers**: Contain business logic for each endpoint  
- **Middleware**: Reusable functions for cross-cutting concerns
- **Models**: Data structures and storage logic

### Response Standards
```javascript
// Success response
res.status(200).json({
    success: true,
    data: yourData,
    message: 'Operation completed successfully'
});

// Error response  
res.status(400).json({
    success: false,
    error: 'Invalid input data',
    message: 'Please check your request'
});
```

### Middleware Order Matters
```javascript
// Correct order:
app.use(express.json());     // Parse JSON bodies
app.use(loggingMiddleware);  // Custom logging
app.use('/api', routes);     // Your routes
app.use(errorMiddleware);    // Error handling (last!)
app.use('*', catchAll);      // 404 handler (very last!)
```

## Troubleshooting Guide

### Common Issues

#### "Cannot GET /api/users"
- Check if route is properly defined
- Verify the route is mounted in app.js
- Ensure controller function is exported/imported correctly

#### "req.body is undefined"
- Make sure `app.use(express.json())` is included
- Check that Postman is sending JSON format
- Verify Content-Type header is application/json

#### Frontend can't connect to backend
- Confirm backend is running on port 3000
- Check CORS is configured in Express
- Verify no typos in API URLs

#### Import errors
- Ensure files use `.js` extension in imports
- Check export/import names match
- Verify file paths are correct

### Debugging Tips
1. **Use console.log** to trace request flow
2. **Test with Postman** before using frontend
3. **Check server logs** for error messages
4. **Verify each step** works before moving to next

## Next Steps After Completion

Once you complete this practice project, you should feel comfortable with:
- ✅ Setting up an Express server with TypeScript
- ✅ Creating routes for different HTTP methods
- ✅ Implementing controller logic
- ✅ Writing custom middleware
- ✅ Testing APIs with Postman
- ✅ Understanding the request-response cycle
- ✅ Organizing Express applications properly

This foundation will prepare you for more complex backend challenges and assessments!

---

**Happy Coding!** Remember to test each step as you go and don't hesitate to use console.log for debugging. The goal is understanding the patterns, not just getting it working.
```

