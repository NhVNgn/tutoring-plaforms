import React, { useState, useEffect } from "react";
import './css/home.css';

const Home = () => {

  const [courses, setCourses] = useState([]);
  const colours = ["#EDAA6C", "#EA713D", "#D83E27", "#152B53", "#1F6E8E", "#2C8B98", "#82A8A0"]

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://56j70ao9r7.execute-api.us-east-1.amazonaws.com/dev", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        redirect: 'follow'
      });
      // .then(response => response.text())
      // .then(result => alert(JSON.parse(result).body))
      // .catch(error => console.log('error', error))

      const data = await response.json();
      const obj = JSON.parse(data.body);

      setCourses(obj.Items);
    }
    getData();
  }, [])

  console.log(courses);

  return (
    <>
      <title>Home</title>
      <div className="wrapper">
        <h1>Courses</h1>
        <div className="separator"></div>
        <div className="courses-container">
          {/* <h2>Note: below are 2 items in a Dynamo table, fetched through Lambda function API</h2> */}
          {courses.map((course, index) => (
            <div className="course-item" key={index}>
              <div className="course-header" style={{ background: `${colours[index]}` }}></div>
              <div className="course-item-text">
                <h4>{course.courseName.S}</h4>
                <p className="course-desc">{course.description.S}</p>
                <div className="link-price">
                  <p className="price">{course.price.S}</p>
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

export default Home;