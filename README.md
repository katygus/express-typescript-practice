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
You'll build a simple API with:
- User endpoints (GET, POST)
- Product endpoints (GET, POST) 
- Custom middleware
- Proper error handling

**No databases or complex data models needed!** We'll use simple arrays in controllers.

### Step 1: Understand the Basic Setup (5 minutes)
1. **Examine the starter code** in `server/src/app.js` and `server/src/server.js`
2. **Test the existing route** - GET `/api/status` should work already
3. **Understand the file structure** - where routes, controllers, and middleware will go

### Step 2: Build User Routes & Controllers (20 minutes)

#### 1. Create User Controller
Create `server/src/controllers/userController.js`:
```javascript
// Simple data storage - just an array in the controller
let users = [];

export const getUsers = (req, res) => {
  // TODO: Return all users from the array
};

export const createUser = (req, res) => {
  // TODO: Get data from req.body and add to users array
  // TODO: Return the new user
};
```

#### 2. Create User Routes
Create `server/src/routes/userRoutes.js`:
```javascript
import express from 'express';
// TODO: Import your user controller functions

const router = express.Router();

// TODO: Set up routes that call your controllers
// GET /api/users
// POST /api/users

export default router;
```

#### 3. Connect Routes to App
In `server/src/app.js`, add:
```javascript
// TODO: Import and use your user routes
```

### Step 3: Add Middleware (15 minutes)

#### 1. Create Logging Middleware
Create `server/src/middleware/loggingMiddleware.js`:
```javascript
export const requestLogger = (req, res, next) => {
  // TODO: Log each request (method, URL, timestamp)
  next();
};
```

#### 2. Add Middleware to App
In `server/src/app.js`, add your middleware:
```javascript
// TODO: Add your logging middleware
```

### Step 4: Build Product Routes & Controllers (15 minutes)
Repeat the same pattern for products:

#### 1. Create Product Controller
Create `server/src/controllers/productController.js` with:
- `getProducts` function
- `createProduct` function  
- Simple products array

#### 2. Create Product Routes
Create `server/src/routes/productRoutes.js` with routes for:
- GET /api/products
- POST /api/products

#### 3. Connect Product Routes
Add product routes to your app.js

### Step 5: Test Everything (5 minutes)
1. **Use Postman** to test all endpoints
2. **Use the frontend** to test the complete flow
3. **Fix any issues** you find

### Step 6: Bonus Challenges (If Time Permits)
- Add error handling middleware
- Add request validation
- Add PUT and DELETE endpoints

## Part 5: What You're Practicing

### Express Core Concepts:
- **Routes**: Mapping URLs to functions
- **Controllers**: Handling business logic
- **Middleware**: Processing requests before controllers
- **Request/Response**: Working with `req` and `res`
- **Import/Export**: Organizing code across files

### No Complex Data Storage Needed!
We're using simple arrays in controllers - no databases, no models, no file systems. Pure Express practice.

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


