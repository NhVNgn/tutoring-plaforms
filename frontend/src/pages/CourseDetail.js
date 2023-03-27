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

    // order by chapter
    function compareFn(a, b) {
        a = a.charAt(8);
        b = b.charAt(8);
        const aNum = parseInt(a);
        const bNum = parseInt(b);
        if (aNum < bNum) {
            return -1;
        } else if (aNum > bNum) {
            return 1;
        } else {
            return 0;
        }
    }

    return (
        <div>
            {console.log(coursesLocal)}
            {coursesLocal.map(course => {
                console.log(course.detail.M);
                const detailKeys = Object.keys(course.detail.M);
                const detailValues = Object.values(course.detail.M);
                return (
                    <div key={course} className="cwrapper">
                        <h1>{course.courseName.S}</h1>
                        <p className="cdescription">{course.description.S}</p>
                        <div>
                            <h4 className="content-heading">Course Content</h4>
                            {detailKeys.sort(compareFn).map((key, index) => {
                                return (
                                    <div key={key}>
                                        <h5>{key}</h5>
                                        <ul>
                                            {detailValues[index].SS.map((value, index) => {
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