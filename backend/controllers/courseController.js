import Course from '../models/courseModel.js';
import { getAuth } from '@clerk/express';

// HELPER FUNCTION
const toNumber = (v, fallback = 0) => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string' && v.trim() === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};