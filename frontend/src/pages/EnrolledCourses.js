import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './css/home.css';

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const colours = ["#EDAA6C", "#EA713D", "#D83E27", "#152B53", "#1F6E8E", "#2C8B98", "#82A8A0"];
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch courses
        const response = await fetch("https://56j70ao9r7.execute-api.us-east-1.amazonaws.com/dev", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ "action": "SCAN" }),
          redirect: 'follow'
        });
        const data = await response.json();
        const obj = JSON.parse(data.body);
        setCourses(obj.Items);
        console.log(obj.Items)

        // fetch enrolled courses
        const enrolledResponse = await fetch(`https://nn8vlbbju7.execute-api.us-east-2.amazonaws.com/dev/enrolledcourses?username=${username}`);
        const coursesEnrolled = await enrolledResponse.json();
        console.log(coursesEnrolled);
        setEnrolledCourses(coursesEnrolled.map(b => b.courseID));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <title>My Courses</title>
      <div className="wrapper">
        <h1>My Courses</h1>
        <div className="separator"></div>
        <div className="courses-container">
        {enrolledCourses.length > 0 ? (
          courses
            .filter((course) => enrolledCourses.includes(course.courseID.S))
            .map((course, index) => (
              <div className="course-item" key={index}>
                <div className="course-header" style={{ background: `${colours[index % colours.length]}` }}>
                </div>
                <div className="course-item-text">
                  <h4>{course.courseName.S}</h4>
                  <p className="course-desc">{course.description.S}</p>
                  <div className="link-price">
                    <p className="price">${course.price.S}</p>
                    <Link className="nav-link" to="/coursedetail" state={{ from: course.courseID.S }}>View Course</Link>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p>You have no enrolled courses yet.</p>
        )}
        </div>
      </div>
    </>
  );

};

export default EnrolledCourses;
