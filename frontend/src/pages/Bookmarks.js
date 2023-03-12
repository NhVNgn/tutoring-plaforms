import React, { useState, useEffect } from "react";
import "./css/home.css";

const Bookmarks = () => {

  const [courses, setCourses] = useState([]);
  const colours = ["#EDAA6C", "#EA713D", "#D83E27", "#152B53", "#1F6E8E", "#2C8B98", "#82A8A0"]


  var username = 'tosrif123';

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`https://v9v2zwoza6.execute-api.us-east-2.amazonaws.com/prod/bookmarks?username=${username}`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error(error);
      }
    }


    fetchCourses();
  }, [username]);

  if (!courses) {
    return <div>Loading...</div>;
  }

  console.log(courses);

  return(
    <>
      <title>Bookmarks</title>
      <div className="wrapper">
        <h1>My Bookmarks</h1>
        <div className="separator"></div>
        <div className="courses-container">
          {/* <h2>Note: below are 2 items in a Dynamo table, fetched through Lambda function API</h2> */}
          {courses.map((course, index) => (
            <div className="course-item" key={index}>
              <div className="course-header" style={{ background: `${colours[index]}` }}></div>
              <div className="course-item-text">
                <h4>{course.courseName}</h4>
                <p className="course-desc">{course.description}</p>
                <div className="link-price">
                  <p className="price">{course.price}</p>
                  {/* <a className="link">Learn More</a> */}
                </div>
              </div>
            </div>))}
        </div>
        {/* <p>{JSON.stringify(courses)}</p> */}
      </div>
    </>
  )
  };
  
  export default Bookmarks;