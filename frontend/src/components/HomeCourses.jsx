import { homeCoursesStyles } from "../assets/dummyStyles";
import { coursesData } from "../assets/dummyHData";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const HomeCourses = () => {
    const navigate = useNavigate();
    const { title, course: courseFont, detail } = homeCoursesStyles.fonts;
    const visibleCourses = coursesData.slice(0, 8);
    return (
        <div className={homeCoursesStyles.container}>
            <div className={homeCoursesStyles.mainContainer}>
                <div className={homeCoursesStyles.header}>
                    <h2 className={`${title} ${homeCoursesStyles.title}`}>
                        <Star className={homeCoursesStyles.titleIcon} />
                        <Star className={homeCoursesStyles.titleIcon} />
                        Explore Top Courses
                        <Star className={homeCoursesStyles.titleIcon} />
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default HomeCourses;