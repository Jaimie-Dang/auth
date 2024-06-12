import { useQuery } from "@tanstack/react-query";
import React from "react";
import { studentDashboardAPI } from "../../services/users/userServices";
import { useSelector } from "react-redux";

const StudentDashboard = () => {
  // Use Selector
  const userData = useSelector((state) => state?.auth?.user);
  const token = userData?.token;
  const { data: courseData, error } = useQuery({
    queryKey: ["student-dashboard"],
    queryFn: () => studentDashboardAPI(token),
  });

  return (
    <div className="p-20 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Course Progress Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3 gap-8">
        {courseData?.courseProgress?.map((course) => (
          <CourseCard key={course.courseId} course={course} />
        ))}
      </div>
    </div>
  );
};
// Course card component
function CourseCard({ course }) {
  return (
    <div className="bg-white transform hover:scale-105 transition duration-500 rounded-2xl overflow-hidden shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {course?.courseTitle}
        </h2>
        {/* Progress Component */}
        <ProgressBar
          completed={course?.completed}
          total={course?.totalSections}
          ongoing={course?.ongoing}
          notStarted={course?.notStarted}
        />
      </div>
    </div>
  );
}
//Progress component
function ProgressBar({ completed, total, ongoing, notStarted }) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  console.log(percentage);
  return (
    <div className="mt-4">
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-gray-600 mt-2 text-sm">
        Completed: {completed} / {total}
      </div>
      <div className="text-gray-600 mt-2 text-sm">Ongoing: {ongoing}</div>
      <div className="text-gray-600 mt-2 text-sm">
        Not Started: {notStarted}
      </div>
    </div>
  );
}

export default StudentDashboard;
