import React, { useEffect, useState } from "react";
import { myCoursesStyles, myCoursesCustomStyles } from "../assets/dummyStyles";

import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, Play, Star } from "lucide-react";

const API_BASE = "https://lms-smrid.vercel.app";

// Helper to get full image URL (handles relative paths from backend)
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder-course.svg';
  // If it's already an absolute URL, return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // Prepend API_BASE for relative paths (e.g., /uploads/...)
  return `${API_BASE}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

const MyCourses = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userRatings, setUserRatings] = useState(() => {
    try {
      const raw = localStorage.getItem("userCourseRatings");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [hoverRatings, setHoverRatings] = useState({});

  useEffect(() => {
    try {
      localStorage.setItem("userCourseRatings", JSON.stringify(userRatings));
    } catch { }
  }, [userRatings]);


  //Fetch
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchMyCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        // If user isn't signed in, don't call the protected endpoint.
        if (!isSignedIn) {
          if (mounted) {
            setCourses([]);
            setLoading(false);
          }
          return;
        }
        // Prepare headers and attempt to include Clerk token.
        // Optimization: Fetch token once and reuse for all sub-requests
        const headers = { "Content-Type": "application/json" };
        let mainToken = null;
        try {
          mainToken = await getToken().catch(() => null);
          if (mainToken) headers.Authorization = `Bearer ${mainToken}`;
        } catch (e) {
          // ignore token acquisition failure
        }
        const bookingsRes = await fetch(`${API_BASE}/api/booking/my`, {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
          headers,
        });

        // explicit handling for unauthorized
        if (bookingsRes.status === 401) {
          throw new Error(
            "Unauthorized — please sign in to view your bookings."
          );
        }

        if (!bookingsRes.ok) {
          const text = await bookingsRes.text().catch(() => "");
          throw new Error(
            text || `Failed to fetch bookings (${bookingsRes.status})`
          );
        }

        const bookingsJson = await bookingsRes.json();
        if (!bookingsJson || bookingsJson.success === false) {
          throw new Error(
            (bookingsJson && bookingsJson.message) || "Failed to load bookings"
          );
        }
        const bookings = bookingsJson.bookings || [];

        // Parallel fetch for each booking
        const combined = await Promise.all(
          bookings.map(async (b) => {
            const courseId = b.course ?? b.courseId ?? null;
            if (!courseId) return null;

            try {
              const cHeaders = { "Content-Type": "application/json" };
              // reuse mainToken
              if (mainToken) cHeaders.Authorization = `Bearer ${mainToken}`;

              const courseRes = await fetch(
                `${API_BASE}/api/course/${courseId}`,
                {
                  method: "GET",
                  credentials: "include",
                  signal: controller.signal,
                  headers: cHeaders,
                }
              );

              if (!courseRes.ok) {
                // Silently skip missing courses
                return null;
              }

              const courseJson = await courseRes.json().catch(() => null);
              if (!courseJson || !courseJson.success || !courseJson.course) {
                return null;
              }

              const courseData = courseJson.course;

              return {
                booking: b,
                course: {
                  ...courseData,
                  image: courseData.image || null,
                  avgRating:
                    typeof courseData.avgRating !== "undefined"
                      ? courseData.avgRating
                      : courseData.rating ?? 0,
                  totalRatings:
                    typeof courseData.totalRatings !== "undefined"
                      ? courseData.totalRatings
                      : courseData.ratingCount ?? 0,
                },
              };
            } catch (err) {
              if (controller.signal.aborted) return null;
              return null;
            }
          })
        );

        if (!mounted) return;
        const valid = combined.filter(Boolean);
        // Deduplicate by course ID
        const uniqueCoursesMap = new Map();
        valid.forEach(({ booking, course }) => {
          const cId = course._id ?? course.id ?? booking.course ?? booking.courseId;
          if (cId && !uniqueCoursesMap.has(cId)) {
            uniqueCoursesMap.set(cId, { booking, course });
          }
        });

        const uiCourses = Array.from(uniqueCoursesMap.values()).map(({ booking, course }) => ({
          booking,
          id: course._id ?? course.id ?? booking.course ?? booking.courseId,
          name: course.name ?? booking.courseName ?? "Untitled Course",
          teacher: course.teacher ?? booking.teacherName ?? "",
          image: course.image ?? null,
          avgRating: course.avgRating ?? 0,
          totalRatings: course.totalRatings ?? 0,
          isFree: !!(
            course.pricingType === "free" ||
            !course.price ||
            (course.price.sale == null && course.price.original == null) ||
            (course.price &&
              (course.price.sale === 0 || course.price.original === 0))
          ),
          price: course.price ?? {
            original: booking.price ?? 0,
            sale: booking.price ?? 0,
          },
          overview: course.overview ?? "",
          lectures: course.lectures ?? [],
          rawCourse: course,
          rawBooking: booking,
        }));
        setCourses(uiCourses);
        // fetch user's per-course rating using reused token
        if (isSignedIn && uiCourses.length > 0) {
          const ratingPromises = uiCourses.map(async (c) => {
            if (!c.id) return null;
            try {
              const rHeaders = { "Content-Type": "application/json" };
              if (mainToken) rHeaders.Authorization = `Bearer ${mainToken}`;

              const res = await fetch(
                `${API_BASE}/api/course/${c.id}/rating`,
                {
                  method: "GET",
                  headers: rHeaders,
                  credentials: "include",
                }
              );
              const data = await res.json().catch(() => null);
              if (res.ok && data && data.success && data.myRating) {
                return { courseId: c.id, myRating: data.myRating.rating };
              }
            } catch (err) { }
            return null;
          });

          const results = await Promise.all(ratingPromises);
          const ratingsMap = {};
          results.forEach((r) => {
            if (r && r.courseId) ratingsMap[r.courseId] = r.myRating;
          });
          if (mounted && Object.keys(ratingsMap).length) {
            setUserRatings((prev) => ({ ...prev, ...ratingsMap }));
          }
        }
      } catch (err) {
        if (mounted) setError(err.message || "Failed to load your courses");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchMyCourses();
    return () => {
      mounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  // To submit rating to server 
  // Helper: optimistic submit rating to server
  const submitRatingToServer = async (courseId, ratingValue) => {
    try {
      const headers = { "Content-Type": "application/json" };
      try {
        if (getToken) {
          const token = await getToken().catch(() => null);
          if (token) headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        // ignore token failure
      }
      const res = await fetch(`${API_BASE}/api/course/${courseId}/rate`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({ rating: ratingValue }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok && !data.success) {
        const msg =
          (data && (data.message || data.error)) ||
          `Failed to rate (${res.status})`;
        throw new Error(msg);
      }

      const avg =
        data.avgRating ?? data.course?.avgRating ?? data.avgRating ?? null;
      const total =
        data.totalRatings ??
        data.course?.ratingCount ??
        data.totalRatings ??
        null;

      if (avg !== null || total !== null) {
        setCourses((prev) =>
          prev.map((c) =>
            c.id === courseId
              ? {
                ...c,
                avgRating: typeof avg === "number" ? avg : c.avgRating,
                totalRatings:
                  typeof total === "number" ? total : c.totalRatings,
              }
              : c
          )
        );
      }
      setUserRatings((prev) => ({ ...prev, [courseId]: ratingValue }));
      toast.success("Thanks for rating!");
      return { success: true };
    } catch (err) {
      console.error("submitRatingToServer:", err);
      toast.error(err.message || "Failed to submit rating");
      return { success: false, error: err };
    }
  };

  const handleSetRating = async (e, courseId, rating) => {
    e.stopPropagation();
    const { isSignedIn: signed } = { isSignedIn };
    if (!signed) {
      toast("Please sign in to submit a rating", { icon: "⭐" });
      return;
    }
    setUserRatings((prev) => ({
      ...prev,
      [courseId]: rating,
    }));
    await submitRatingToServer(courseId, rating);
  };

  const handleViewCourse = (courseId) => {
    if (!courseId) return;
    navigate(`/course/${courseId}`);
  };

  // for stars
  const renderInteractiveStars = (c) => {
    const userRating = userRatings[c.id] || 0;
    const hover = hoverRatings[c.id] || 0;
    const baseDisplay = userRating || Math.round(c.avgRating || 0);
    const displayRating = hover || baseDisplay;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ display: "flex", gap: 4, alignItems: "center" }}
        >
          {Array.from({ length: 5 }).map((_, i) => {
            const idx = i + 1;
            const filled = idx <= displayRating;
            return (
              <button
                key={i}
                aria-label={`Rate ${idx} stars`}
                onClick={(e) => handleSetRating(e, c.id, idx)}
                onMouseEnter={() =>
                  setHoverRatings((s) => ({ ...s, [c.id]: idx }))
                }
                onMouseLeave={() =>
                  setHoverRatings((s) => ({ ...s, [c.id]: 0 }))
                }
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 2,
                  cursor: "pointer",
                }}
              >
                <Star
                  size={16}
                  fill={filled ? "currentColor" : "none"}
                  stroke="currentColor"
                  style={{
                    color: filled ? "#f59e0b" : "#d1d5db",
                  }}
                />
              </button>
            );
          })}
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", marginLeft: 6 }}
        >
          <div style={{ fontWeight: 700, fontSize: 13 }}>
            {(c.avgRating || 0).toFixed(1)}
          </div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            ({c.totalRatings || 0})
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={myCoursesStyles.pageContainer}>
        <div className={myCoursesStyles.mainContainer}>
          <h1 className={myCoursesStyles.header}>My Courses...</h1>
          <p className={myCoursesStyles.emptyText}>Loading your courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={myCoursesStyles.pageContainer}>
        <div className={myCoursesStyles.mainContainer}>
          <h1 className={myCoursesStyles.header}>My Courses...</h1>
          <p className={myCoursesStyles.emptyText} style={{
            color: 'red'
          }}>{error}</p>
        </div>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className={myCoursesStyles.pageContainer}>
        <div className={myCoursesStyles.mainContainer}>
          <h1 className={myCoursesStyles.header}>My Courses</h1>

          {/* Beautiful empty state */}
          <div className="flex flex-col items-center justify-center py-16 px-4">
            {/* Illustration */}
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="absolute -bottom-1 -left-3 w-4 h-4 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
              <div className="absolute top-1/2 -right-6 w-3 h-3 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Text content */}
            <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
              No Courses Yet
            </h2>
            <p className="text-gray-500 text-center max-w-md mb-8 leading-relaxed">
              Start your learning journey today! Explore our catalog of expert-led courses
              and unlock new skills that will transform your career.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => navigate('/courses')}
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Courses
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Additional help text */}
            <p className="mt-6 text-sm text-gray-400">
              Already enrolled? It may take a moment to sync.
            </p>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className={myCoursesStyles.pageContainer}>
      <div className={myCoursesStyles.mainContainer}>
        <h1 className={myCoursesStyles.header}>My Courses</h1>

        <div className={myCoursesStyles.grid}>
          {courses.map((course, index) => (
            <div key={course.id ?? index} className={myCoursesStyles.courseCard}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleViewCourse(course.id);
              }}
              onClick={() => handleViewCourse(course.id)}
            >
              <div className={myCoursesStyles.imageContainer}>
                <img
                  src={getImageUrl(course.image)}
                  alt={course.name}
                  className={myCoursesStyles.courseImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-course.svg';
                  }}
                />
              </div>
              <div className={myCoursesStyles.courseContent}>
                <h3 className={myCoursesStyles.courseName}>{course.name}</h3>
                <div className={myCoursesStyles.infoContainer}>
                  <div className={myCoursesStyles.ratingContainer}>
                    {renderInteractiveStars(course)}
                  </div>
                  <div className={myCoursesStyles.teacherContainer}>
                    <User className={myCoursesStyles.teacherIcon} />
                    <span className={myCoursesStyles.teacherText}>
                      {course.teacher}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewCourse(course.id);
                  }}
                  className={myCoursesStyles.viewButton}
                >
                  <Play className={myCoursesStyles.buttonIcon} />
                  <span>View Course</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
      <style jsx>{myCoursesCustomStyles}</style>
    </div>
  );
};

export default MyCourses;
