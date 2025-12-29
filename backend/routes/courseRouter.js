import express from 'express';
import multer from 'multer';
import { createCourse, deleteCourse, getCourseById, getCourses, getMyRating, getPublicCourses, rateCourse, updateCourse } from '../controllers/courseController.js';

// MULTER SETUP - Using memory storage for Cloudinary uploads
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only accept image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

const courseRouter = express.Router();

courseRouter.get('/public', getPublicCourses);
courseRouter.get('/', getCourses);
courseRouter.get('/:id', getCourseById);

courseRouter.post('/', upload.single('image'), createCourse);
courseRouter.put('/:id', upload.single('image'), updateCourse);
courseRouter.delete('/:id', deleteCourse);

courseRouter.post('/:courseId/rate', rateCourse);
courseRouter.get('/:courseId/rating', getMyRating);

export default courseRouter;