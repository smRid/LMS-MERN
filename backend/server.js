import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express'
import connectDB from './config/db.js';
import courseRouter from './routes/courseRouter.js';
import bookingRouter from './routes/bookingRouter.js';

const app = express();
const port = 4000;

// MIDDLEWARES
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? [process.env.FRONTEND_URL, process.env.ADMIN_URL]
        : ['http://localhost:5173', "http://localhost:5174"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware());

app.use('/uploads', express.static('uploads'));

// REQUEST LOGGING MIDDLEWARE
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// ROUTES
app.use('/api/course', courseRouter);
app.use('/api/booking', bookingRouter);

//Database Connection
connectDB();


// APP PORT AND LISTEN
app.get('/', (req, res) => {
    res.send('API WORKING');
});

// Only start the server if not in serverless environment (Vercel)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server Started on http://localhost:${port}`)
    });
}

// Export the app for Vercel serverless functions
export default app;
