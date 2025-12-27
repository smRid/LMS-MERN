import express from 'express';
import { checkBooking, confirmPayment, createBooking, getBookings, getStats, getUserBookings, toggleProgress } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.get('/', getBookings);
bookingRouter.get('/stats', getStats);

bookingRouter.post('/create', createBooking);
bookingRouter.get('/check', checkBooking);
bookingRouter.get('/confirm', confirmPayment);
bookingRouter.post('/progress', toggleProgress);

bookingRouter.get('/my', getUserBookings);

export default bookingRouter;