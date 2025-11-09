// Main Express application setup file
import express from 'express';
import cors from 'cors';

const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// Basic health check route
app.get('/api/status', (req, res) => {
    // TODO: You'll replace this with a proper controller later
    res.json({ 
        success: true,
        message: 'Server is running!',
        timestamp: new Date().toISOString()
    });
});

// TODO: Import and use your user routes
// import userRoutes from './routes/userRoutes.js';
// app.use('/api/users', userRoutes);

// TODO: Import and use your product routes  
// import productRoutes from './routes/productRoutes.js';
// app.use('/api/products', productRoutes);

// TODO: Add error handling middleware
app.use((err, req, res, next) => {
    console.error('🚨 Error:', err.stack);
    res.status(500).json({ 
        success: false,
        error: 'Something went wrong on the server!' 
    });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false,
        error: 'Route not found' 
    });
});

export default app;