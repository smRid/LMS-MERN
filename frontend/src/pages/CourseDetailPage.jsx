import React, { useEffect, useMemo, useState } from 'react'
import { courseDetailStyles } from '../assets/dummyStyles'
import coursesData from '../assets/dummyData'
import { ArrowLeft, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const fmtMinutes = (mins) => {
  const h = Math.floor((mins || 0) / 60);
  const m = (mins || 0) % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
};

const Toast = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  
// To get the url from anywhere and convert it to embed url

  const toEmbedUrl = (url) => {
  if (!url) return "";
  try {
    const trimmed = String(url).trim();
    if (/\/embed\//.test(trimmed)) return trimmed;

    const watchMatch = trimmed.match(/[?&]v=([^&#]+)/);
    if (watchMatch && watchMatch[1]) {
      return `https://www.youtube.com/embed/${watchMatch[1]}`;
    }

    const shortMatch = trimmed.match(/youtu\.be\/([^?&#/]+)/);
    if (shortMatch && shortMatch[1]) {
      return `https://www.youtube.com/embed/${shortMatch[1]}`;
    }

    if (/drive\.google\.com/.test(trimmed)) {
      const fileMatch = trimmed.match(/\/file\/d\/([^/]+)(?:\/|$)/);
      if (fileMatch && fileMatch[1]) {
        return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;
      }

      const idMatch = trimmed.match(/[?&]id=([^&#]+)/);
      if (idMatch && idMatch[1]) {
        return `https://drive.google.com/file/d/${idMatch[1]}/preview`;
      }

      const ucMatch = trimmed.match(/[?&]export=download.*[?&]id=([^&#]+)/);
      if (ucMatch && ucMatch[1]) {
        return `https://drive.google.com/file/d/${ucMatch[1]}/preview`;
      }

      return trimmed;
    }
    const lastSeg = trimmed.split("/").filter(Boolean).pop();
    if (lastSeg && lastSeg.length === 11 && /^[a-zA-Z0-9_-]+$/.test(lastSeg)) {
      return `https://www.youtube.com/embed/${lastSeg}`;
    }

    return trimmed;
  } catch (e) {
    return url;
  }
};


const appendAutoplay = (embedUrl, autoplay = true) => {
  if (!embedUrl) return "";
  if (!autoplay) return embedUrl;
  return embedUrl.includes("?")
    ? `${embedUrl}&autoplay=1`
    : `${embedUrl}?autoplay=1`;
};

// helper: detect direct video file URLs (.mp4/.webm/.ogg)
const isDirectVideoFile = (url) => {
  if (!url) return false;
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
};

  return (
    <div
      className={`${courseDetailStyles.toast} ${
        type === "error" ? courseDetailStyles.toastError : courseDetailStyles.toastInfo
      }`}
    >
      <div className={courseDetailStyles.toastContent}>
        <span>{message}</span>
        <button onClick={onClose} className={courseDetailStyles.toastClose}>
          <X className={courseDetailStyles.toastCloseIcon} />
        </button>
      </div>
    </div>
  );
};


const CourseDetailPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = parseInt(id, 10);

  const [isLoggedIn] = useState(true);
  // Initialize enrollment based on whether course is free
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const [toast, setToast] = useState(null);
  const [expandedLectures, setExpandedLectures] = useState(new Set());
  const [completedChapters, setCompletedChapters] = useState(new Set());
  const [isTeacherAnimating, setIsTeacherAnimating] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // find course from dummy data
  const course = coursesData.find((c) => c.id === courseId);

  // Check if course is free
  const isCourseFree = course?.isFree || !course?.price;


  // initialize enrollment state based on course type
    useEffect(() => {
    if (isCourseFree) {
        setIsEnrolled(true); //auto-enroll for free course.
    } else {
        setIsEnrolled(false);
    }
    }, [isCourseFree]);

    useEffect(() => {
        setIsTeacherAnimating(true);
        const timer = setTimeout(() => setIsTeacherAnimating(false), 1000);
        return () => clearTimeout(timer);
      }, [course]);
    
      useEffect(() => {
        setIsPageLoaded(true);
      }, []);

    // selected content is null by default — user must click to select
    const [selectedContent, setSelectedContent] = useState({
    type: null, // 'lecture' or 'chapter'
    lectureId: null,
    chapterId: null,
    });

    const selectedLecture = useMemo(() => {
    if (!selectedContent.lectureId) return null;
    return (
        (course?.lectures || []).find(
        (l) => l.id === selectedContent.lectureId
        ) || null
    );
    }, [course, selectedContent.lectureId]);


    const selectedChapter = useMemo(() => {
    if (!selectedContent.chapterId || !selectedLecture) return null;
    return (
        (selectedLecture.chapters || []).find(
        (ch) => ch.id === selectedContent.chapterId
        ) || null
    );
    }, [selectedLecture, selectedContent.chapterId]);

    const currentVideoContent = useMemo(() => {
    if (selectedContent.type === "chapter" && selectedChapter) {
        return selectedChapter;
    }
    if (selectedContent.type === "lecture" && selectedLecture) {
        return selectedLecture;
    }
    return null;
    }, [selectedContent, selectedLecture, selectedChapter]);


    const totalMinutes = useMemo(() => {
    return (course?.lectures || []).reduce(
        (sum, l) => sum + (l.durationMin || 0),
        0
    );
    }, [course]);


// --- Pricing: handle course.price as object { original, sale } ---
  const priceObj = course?.price;
  const hasPriceObj = !!(
    priceObj &&
    (priceObj.sale != null || priceObj.original != null)
  );
  const salePrice =
    hasPriceObj && priceObj.sale != null ? Number(priceObj.sale) : null;
  const originalPrice =
    hasPriceObj && priceObj.original != null ? Number(priceObj.original) : null;
  const formatCurrency = (n) => {
    if (n == null || Number.isNaN(n)) return "";
    return `₹${n}`;
  };
  const priceLabel =
    salePrice != null
      ? formatCurrency(salePrice)
      : originalPrice != null
      ? formatCurrency(originalPrice)
      : "Free";
  const hasDiscount =
    originalPrice != null && salePrice != null && originalPrice > salePrice;



  // --- Handlers --- //
  const onLectureHeaderClick = (lectureId) => {
    if (!isLoggedIn) {
      setToast({
        message: "Please login to access course content",
        type: "error",
      });
      return;
    }
    if (!isCourseFree && !isEnrolled) {
      setToast({
        message: "Please enroll in the course to access content",
        type: "error",
      });
      return;
    }
    setExpandedLectures((prev) => {
      const next = new Set(prev);
      if (next.has(lectureId)) next.delete(lectureId);
      else next.add(lectureId);
      return next;
    });
  };; //it will check for user is logged in or not
    // then it will check for is the course is free or not


        // For paid courses when not enrolled, show enroll toast
    if (!isCourseFree && !isEnrolled) {
      setToast({
        message: "Please enroll in the course to access this content",
        type: "error",
      });
      return;
    }
  };

  const handleEnroll = async () => {
        if (!isLoggedIn) {
        setToast({
            message: "Please login to enroll in the course",
            type: "error",
        });
        return;
        }

        setIsEnrolling(true);
        // Simulate enrollment process
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsEnrolled(true);
        setIsEnrolling(false);
        setToast({
        message:
            " Successfully enrolled in the course! You can now access all content.",
        type: "info",
        });
    };

    const handleBackToHome = () => {
        navigate("/");
    };



    // clicking a chapter selects it (plays) and ensures its lecture is expanded
    const handleContentSelect = (lectureId, chapterId = null) => {
    if (!isLoggedIn) {
      setToast({
        message: "Please login to access course content",
        type: "error",
      });
      return;
    }

    // For free courses OR enrolled paid courses, allow access
    if (isCourseFree || isEnrolled) {
      setSelectedContent({
        type: chapterId ? "chapter" : "lecture",
        lectureId,
        chapterId,
      });

      setExpandedLectures((prev) => {
        const next = new Set(prev);
        next.add(lectureId);
        return next;
      });
      return;
    }



    // this fuction helps in toggling chapter completion
    const toggleChapterCompletion = (chapterId, e) => {
        if (e) e.stopPropagation();

        if (!isLoggedIn || !isEnrolled) {
        setToast({
            message: "Please enroll and login to track progress",
            type: "error",
        });
        return;
        }

        setCompletedChapters((prev) => {
        const next = new Set(prev);
        if (next.has(chapterId)) next.delete(chapterId);
        else next.add(chapterId);
        return next;
        });
    };



    //if no course found
    if(!course) {
        return (
            <div className={courseDetailStyles.notFoundContainer}>
                <div className={courseDetailStyles.notFoundContent}>
                    <h2 className={courseDetailStyles.notFoundTitle}>Course not found</h2>
                    <p className={courseDetailStyles.notFoundText}>
                        Go back to courses list
                    </p>
                    <button
                        onClick={() => navigate("/courses")}
                        className={courseDetailStyles.notFoundButton}
                        >
                        Back to courses
                    </button>
                </div>
            </div>
        )
    }

    // Compute an embeddable URL for the currently selected content (if any)
    const currentRawUrl = currentVideoContent?.videoUrl || null;
    const currentEmbedUrl = currentRawUrl ? toEmbedUrl(currentRawUrl) : null;
    const currentIsDirectVideo = isDirectVideoFile(currentEmbedUrl);





  return (
    <div className={courseDetailStyles.container}>
    {toast && (
        <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(null)}
        />
    )}

    <div 
    className={`${courseDetailStyles.mainContainer} ${
        isPageLoaded
        ? courseDetailStyles.containerVisible
        : courseDetailStyles.containerHidden
    }`}
    >
    <div className=" flex items-center justify-between">
        <button onClick={() => navigate('/courses')} className={courseDetailStyles.backButton}>
        <ArrowLeft className={courseDetailStyles.backIcon} />
        <span className={courseDetailStyles.backText}>Back to Home</span>
        </button>
    </div>
    </div>
    </div>
  )
}

export default CourseDetailPage