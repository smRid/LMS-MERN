import Course from '../models/courseModel.js';
import { getAuth } from '@clerk/express';
import { uploadToCloudinary, deleteFromCloudinary, getPublicIdFromUrl } from '../config/cloudinary.js';

// HELPER FUNCTION
const toNumber = (v, fallback = 0) => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string' && v.trim() === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const parseJSONSafe = (maybe) => {
  if (!maybe) return null;
  if (typeof maybe === 'object') return maybe;
  try {
    return JSON.parse(maybe);
  } catch {
    return null;
  }
}


/**
 * Compute derived fields (lecture totals, course totalDuration, totalLectures)
 * Mutates and returns courseObj
 */
const computeDerivedFields = (courseObj) => {
  let totalCourseMinutes = 0;
  if (!Array.isArray(courseObj.lectures)) courseObj.lectures = [];

  courseObj.lectures = courseObj.lectures.map((lec) => {
    lec = { ...lec };
    lec.duration = lec.duration || {};
    lec.chapters = Array.isArray(lec.chapters) ? lec.chapters : [];

    // normalize chapter totals
    lec.chapters = lec.chapters.map((ch) => {
      ch = { ...ch };
      ch.duration = ch.duration || {};
      const chHours = toNumber(ch.duration.hours);
      const chMins = toNumber(ch.duration.minutes);
      ch.totalMinutes = ch.totalMinutes ? toNumber(ch.totalMinutes) : chHours * 60 + chMins;

      ch.duration.hours = chHours;
      ch.duration.minutes = chMins;
      ch.name = ch.name || "";
      ch.topic = ch.topic || "";
      ch.videoUrl = ch.videoUrl || "";

      return ch;
    });

    const lecHours = toNumber(lec.duration.hours);
    const lecMins = toNumber(lec.duration.minutes);
    const lectureOwnMinutes = lecHours * 60 + lecMins;
    const chaptersMinutes = lec.chapters.reduce((s, c) => s + toNumber(c.totalMinutes, 0), 0);

    lec.totalMinutes = lectureOwnMinutes + chaptersMinutes;

    lec.duration.hours = lecHours;
    lec.duration.minutes = lecMins;

    totalCourseMinutes += lec.totalMinutes;
    lec.title = lec.title || "Untitled lecture";

    return lec;
  });

  courseObj.totalDuration = courseObj.totalDuration || {};
  courseObj.totalDuration.hours = Math.floor(totalCourseMinutes / 60);
  courseObj.totalDuration.minutes = totalCourseMinutes % 60;
  courseObj.totalLectures = Array.isArray(courseObj.lectures) ? courseObj.lectures.length : 0;

  return courseObj;
};


// create image url from stored value
const makeImageAbsolute = (rawImage, req) => {
  if (!rawImage) return "";
  const image = String(rawImage || "");
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  if (image.startsWith("/")) {
    return `${req.protocol}://${req.get("host")}${image}`;
  }
  // if file stored as "uploads/filename" or just "filename"
  if (image.startsWith("uploads/")) {
    return `${req.protocol}://${req.get("host")}/${image}`;
  }
  return `${req.protocol}://${req.get("host")}/uploads/${image}`;
};


// to get public courses
export const getPublicCourses = async (req, res) => {
  try {
    const { home, type = 'all', limit } = req.query;
    let filter = {};

    if (home === 'true') {
      filter.courseType = 'top';
    }
    else if (type === 'top') {
      filter.courseType = 'top';
    }
    else if (type === 'regular') {
      filter.courseType = 'regular';
    }

    const q = Course.find(filter).sort({ createdAt: -1 })

    if (home === 'true') {
      q.limit(Number(limit || 8));
    }
    else if (limit) {
      q.limit(Number(limit));
    }

    const courses = await q.lean();

    const mapped = courses.map((c) => {
      const imageUrl = makeImageAbsolute(c.image || "", req);
      return {
        ...c,
        image: imageUrl
      }
    })
    return res.json({
      success: true,
      items: mapped
    });

  } catch (err) {
    console.error('GetPublicCourses error:', err);
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}


// get Courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 }).lean();
    const mapped = courses.map((c) => ({
      ...c,
      image: makeImageAbsolute(c.image || "", req)
    }));
    return res.json({
      success: true,
      courses: mapped
    });
  } catch (err) {
    console.error('GetCourses error:', err);
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}


// get course by id
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).lean();
    if (!course) return res.status(404).json({
      success: false,
      error: 'Not found'
    });

    course.image = makeImageAbsolute(course.image || "", req);
    return res.json({
      success: true,
      course
    });

  } catch (err) {
    console.error('GetCourseById error:', err);
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}


// to create a course
export const createCourse = async (req, res) => {
  try {
    const body = req.body || {};

    // image handling: upload to Cloudinary if file provided
    let imagePath = body.image || "";
    if (req.file && req.file.buffer) {
      try {
        console.log('📤 Uploading image to Cloudinary...');
        console.log('📁 File size:', req.file.size, 'bytes');
        console.log('📁 File type:', req.file.mimetype);
        const cloudinaryResult = await uploadToCloudinary(req.file.buffer, 'courses');
        imagePath = cloudinaryResult.url;
        console.log('✅ Image uploaded:', imagePath);
      } catch (uploadErr) {
        console.error('❌ Cloudinary upload failed:', uploadErr);
        console.error('❌ Error details:', JSON.stringify(uploadErr, null, 2));

        // Provide specific error messages
        let errorMessage = 'Failed to upload image';
        if (uploadErr.message) {
          if (uploadErr.message.includes('Must supply api_key')) {
            errorMessage = 'Cloudinary not configured. Add CLOUDINARY_URL to environment variables.';
          } else if (uploadErr.message.includes('Invalid')) {
            errorMessage = 'Invalid Cloudinary credentials. Check CLOUDINARY_URL.';
          } else {
            errorMessage = `Image upload error: ${uploadErr.message}`;
          }
        }

        return res.status(500).json({
          success: false,
          error: errorMessage
        });
      }
    }

    // parse price
    const priceParsed = parseJSONSafe(body.price) ?? (body.price || {});
    const price = {
      original: toNumber(priceParsed.original ?? body["price.original"] ?? 0),
      sale: toNumber(priceParsed.sale ?? body["price.sale"] ?? 0),
    };

    // lectures
    let lectures = parseJSONSafe(body.lectures) ?? body.lectures ?? [];
    if (!Array.isArray(lectures)) lectures = [];

    // normalize lectures & chapters
    lectures = lectures.map((lec) => {
      const lecture = { ...lec };
      lecture.duration = lecture.duration || {};
      lecture.duration.hours = toNumber(lecture.duration.hours);
      lecture.duration.minutes = toNumber(lecture.duration.minutes);

      lecture.chapters = Array.isArray(lecture.chapters) ? lecture.chapters : [];
      lecture.chapters = lecture.chapters.map((ch) => ({
        ...ch,
        duration: {
          hours: toNumber(ch.duration?.hours),
          minutes: toNumber(ch.duration?.minutes),
        },
        totalMinutes: toNumber(ch.totalMinutes, 0),
        videoUrl: ch.videoUrl || "",
        name: ch.name || "",
        topic: ch.topic || "",
      }));

      return {
        ...lecture,
        title: lecture.title || "Untitled lecture",
        totalMinutes: toNumber(lecture.totalMinutes, 0),
      };
    });

    const courseObj = {
      name: body.name || "",
      teacher: body.teacher || "",
      image: imagePath,
      rating: toNumber(body.rating, 0),
      pricingType: body.pricingType || "free",
      price,
      overview: body.overview || body.description || "",
      totalDuration:
        parseJSONSafe(body.totalDuration) ??
        { hours: toNumber(body["totalDuration.hours"]), minutes: toNumber(body["totalDuration.minutes"]) },
      totalLectures: toNumber(body.totalLectures, lectures.length),
      lectures,
      courseType: body.courseType || "regular",
      category: body.category || null,
      createdBy: body.createdBy || null,
    };

    computeDerivedFields(courseObj);
    const course = new Course(courseObj);
    await course.save();

    const returned = course.toObject();
    // No need to transform image URL - Cloudinary URLs are already absolute
    return res.status(201).json({
      success: true,
      course: returned
    })
  } catch (err) {
    console.error('CreateCourse error:', err);
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}


// to delete a course by id
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({
      success: false,
      error: 'Not found'
    });

    // Delete image from Cloudinary if it exists
    if (course.image && course.image.includes('cloudinary.com')) {
      const publicId = getPublicIdFromUrl(course.image);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
    }

    await course.deleteOne();
    return res.json({
      success: true,
      message: 'Course deleted successfully'
    });

  } catch (err) {
    console.error('deleteCourse error:', err);
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}


// Update a course - Simplified and Robust
export const updateCourse = async (req, res) => {
  const startTime = Date.now();
  console.log("\n" + "=".repeat(60));
  console.log("🔄 COURSE UPDATE REQUEST RECEIVED");
  console.log("=".repeat(60));

  try {
    const { id } = req.params;
    console.log("📋 Course ID:", id);

    if (!id) {
      console.log("❌ ERROR: No course ID provided");
      return res.status(400).json({
        success: false,
        error: 'Course ID is required'
      });
    }

    // Find the course
    const course = await Course.findById(id);
    if (!course) {
      console.log("❌ ERROR: Course not found");
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    console.log("✅ Found course:", course.name);
    console.log("📝 Updating fields...");

    // Handle image update - upload to Cloudinary
    if (req.file && req.file.buffer) {
      console.log("🖼️  New image uploaded, uploading to Cloudinary...");

      try {
        // Delete old image from Cloudinary if it exists
        if (course.image && course.image.includes('cloudinary.com')) {
          const oldPublicId = getPublicIdFromUrl(course.image);
          if (oldPublicId) {
            await deleteFromCloudinary(oldPublicId);
            console.log("🗑️  Deleted old image from Cloudinary");
          }
        }

        // Upload new image to Cloudinary
        const cloudinaryResult = await uploadToCloudinary(req.file.buffer, 'courses');
        course.image = cloudinaryResult.url;
        console.log("✅ New image uploaded:", course.image);
      } catch (uploadErr) {
        console.error("❌ Cloudinary upload failed:", uploadErr);
        return res.status(500).json({
          success: false,
          error: 'Failed to upload image'
        });
      }
    }

    // Update basic fields - direct assignment for reliability
    const { body } = req;

    if (body.name !== undefined) {
      course.name = body.name;
      console.log("   name:", body.name);
    }

    if (body.teacher !== undefined) {
      course.teacher = body.teacher;
      console.log("   teacher:", body.teacher);
    }

    if (body.overview !== undefined) {
      course.overview = body.overview;
      console.log("   overview: [", body.overview.length, "chars]");
    }

    if (body.courseType !== undefined) {
      course.courseType = body.courseType;
      console.log("   courseType:", body.courseType);
    }

    if (body.pricingType !== undefined) {
      course.pricingType = body.pricingType;
      console.log("   pricingType:", body.pricingType);
    }

    // Update price - parse if JSON string
    if (body.price !== undefined) {
      const priceData = typeof body.price === 'string'
        ? JSON.parse(body.price)
        : body.price;

      course.price = {
        original: Number(priceData.original) || 0,
        sale: Number(priceData.sale) || 0
      };
      console.log("   price:", course.price);
    }

    // Update lectures - parse if JSON string
    if (body.lectures !== undefined) {
      const lecturesData = typeof body.lectures === 'string'
        ? JSON.parse(body.lectures)
        : body.lectures;

      if (Array.isArray(lecturesData)) {
        course.lectures = lecturesData;
        console.log("   lectures:", lecturesData.length, "items");
      }
    }

    // Update totals - parse if JSON string
    if (body.totalDuration !== undefined) {
      const durationData = typeof body.totalDuration === 'string'
        ? JSON.parse(body.totalDuration)
        : body.totalDuration;

      course.totalDuration = {
        hours: Number(durationData.hours) || 0,
        minutes: Number(durationData.minutes) || 0
      };
      console.log("   totalDuration:", course.totalDuration);
    }

    if (body.totalLectures !== undefined) {
      course.totalLectures = Number(body.totalLectures) || 0;
      console.log("   totalLectures:", course.totalLectures);
    }

    // Save to database
    console.log("\n💾 Saving to database...");
    const savedCourse = await course.save();

    const duration = Date.now() - startTime;
    console.log("✅ SUCCESS! Course saved in", duration, "ms");
    console.log("=".repeat(60) + "\n");

    // Return success response
    const returnCourse = savedCourse.toObject();
    returnCourse.image = makeImageAbsolute(returnCourse.image || "", req);

    return res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      course: returnCourse
    });

  } catch (err) {
    const duration = Date.now() - startTime;
    console.log("\n" + "❌".repeat(30));
    console.log("💥 UPDATE FAILED after", duration, "ms");
    console.log("Error Type:", err.name);
    console.log("Error Message:", err.message);
    console.log("Stack Trace:");
    console.log(err.stack);
    console.log("❌".repeat(30) + "\n");

    return res.status(500).json({
      success: false,
      error: 'Failed to update course',
      message: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}


// for rate course by user
export const rateCourse = async (req, res) => {
  try {
    const { userId } = getAuth(req) || {};
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    const { courseId } = req.params;
    const { rating: rawRating, comment = "" } = req.body;
    const rating = Number(rawRating);

    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be a number between 1 and 5'
      });
    }


    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.'
      });
    }
    // Find existing rating by this Clerk userId (ratings store userId as string)
    const idx = (course.ratings || []).findIndex(r => String(r.userId) === String(userId));

    if (idx >= 0) {
      // update existing rating
      course.ratings[idx].rating = rating;
      if (typeof comment === "string" && comment.trim().length) {
        course.ratings[idx].comment = comment.trim();
      }
      course.ratings[idx].updatedAt = new Date();
    } else {
      // push new rating object — ensure userId present
      course.ratings.push({
        userId,
        rating,
        comment: typeof comment === "string" ? comment.trim() : ""
      });
    }

    // Recompute aggregates (avgRating, totalRatings)
    const ratingsArr = course.ratings || [];
    const totalRatings = ratingsArr.length;
    const sum = ratingsArr.reduce((s, r) => s + (Number(r.rating) || 0), 0);
    const avgRating = totalRatings === 0 ? 0 : Number((sum / totalRatings).toFixed(2));

    course.totalRatings = totalRatings;
    course.avgRating = avgRating;

    await course.save();
    return res.json({
      success: true,
      avgRating: course.avgRating,
      totalRatings: course.totalRatings,
      myRating: { userId, rating }
    });
  }

  catch (err) {
    console.error("rateCourse error:", err);
    // if a mongoose validation error includes path ratings.0.userId you can surface it
    if (err && err.name === "ValidationError") {
      return res.status(400).json({ success: false, message: err.message });
    }
    return res.status(500).json({ success: false, message: "Server error" });
  }
}



// get myRating
export const getMyRating = async (req, res) => {
  try {
    const { userId } = getAuth(req) || {};
    if (!userId) return res.status(401).json({
      success: false,
      message: 'Authentication required.'
    });

    const { courseId } = req.params;
    const course = await Course.findById(courseId).lean();
    if (!course) return res.status(404).json({
      success: false,
      message: "Course not found"
    });

    const my = (course.ratings || []).find(r => String(r.userId) === String(userId)) || null;
    return res.json({
      success: true,
      myRating: my ? { rating: my.rating, comment: my.comment } : null
    });

  }
  catch (err) {
    console.error('getmyRating errpr:', err);
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
}