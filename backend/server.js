import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';
import connectDB from './config/db.js';
import courseRouter from './routes/courseRouter.js';
import bookingRouter from './routes/bookingRouter.js';

const app = express();
const port = 4000;

// Allowed origins for CORS
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://shikhohub.vercel.app',
    'https://skhub-admin.vercel.app'
];


// CORS Configuration
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// CORS middleware already handles preflight OPTIONS requests

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Clerk auth middleware - required for authenticated routes
app.use(clerkMiddleware());

app.use('/uploads', express.static('uploads'));

// REQUEST LOGGING MIDDLEWARE
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Health check endpoint - placed BEFORE routes to ensure it always works
app.get('/', (req, res) => {
    res.send('API WORKING');
});

// ROUTES
app.use('/api/course', courseRouter);
app.use('/api/booking', bookingRouter);

// Global Error Handler - ensures CORS headers are sent even on errors
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err);

    // Set CORS headers manually for error responses
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Internal Server Error'
    });
});

// Handle 404 - Route not found
app.use((req, res) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Database Connection
connectDB();

// Only start the server if not in serverless environment (Vercel)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server Started on http://localhost:${port}`)
    });
}

// Export the app for Vercel serverless functions
export default app;
