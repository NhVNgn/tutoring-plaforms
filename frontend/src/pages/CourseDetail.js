import { set } from "mongoose";
import React, { useState, useEffect } from "react";
import { json, useLocation } from 'react-router-dom'
import { Link, useNavigate } from "react-router-dom";
import './css/coursedetails.css';

const CourseDetail = () => {
    const location = useLocation()
    const { from } = location.state;
    console.log(from);

    const [coursesLocal, setCoursesLocal] = useState([]);

    // fetch courses
    useEffect(() => {
        const fetchData = async () => {
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
            let filtered = obj.Items.find(course => {
                return course.courseID.S === from
            });
            setCoursesLocal([filtered]);
        }
        fetchData();

    }, []);

    // split subheadings
    function splitString(str) {
        str = str.split(",");
        return str;
    }

    return (
        <div>
            {console.log(coursesLocal)}
            {coursesLocal.map(course => {
                let courseContent = course.detail.L;
                return (
                    <div key={course} className="cwrapper">
                        <h1>{course.courseName.S}</h1>
                        <p className="cdescription">{course.description.S}</p>
                        <div>
                            <h4 className="content-heading">Course Content</h4>
                            {courseContent.map((content,index) => {
                                let contentArr = content.M;
                                let subheadingArr = splitString(contentArr.subheader.S);
                                return (
                                    <div key={index}>
                                        <h5>Chapter {index + 1}: {contentArr.chapter.S}</h5>
                                        <ul>
                                            {subheadingArr.map((value, index) => {
                                                return (
                                                    <li key={index}>{value}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                        <Link className="nav-link chat-button" to="/chat" state={{ }}>Chat with Tutor</Link>
                        <div className="price-wrapper">
                            <h4>Price: ${course.price.S}</h4>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CourseDetail;