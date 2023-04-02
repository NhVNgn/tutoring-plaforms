import { set } from "mongoose";
import React, { useState, useEffect } from "react";
import { json, useLocation } from 'react-router-dom'
import { Link, useNavigate } from "react-router-dom";
import './css/coursedetails.css';

const CourseDetail = () => {
    const location = useLocation()
    const { from } = location.state;
    var username = localStorage.getItem("username");

    const [coursesLocal, setCoursesLocal] = useState([]);
    const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [enrolled, setEnrolled] = useState(false);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check if user is logged in by checking if username exists in localStorage
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }, []);

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

            // fetch bookmarked courses
            const bookmarkResponse = await fetch(`https://v9v2zwoza6.execute-api.us-east-2.amazonaws.com/prod/bookmarks?username=${username}`);
            const bookmarks = await bookmarkResponse.json();
            setBookmarkedCourses(bookmarks.map(b => b.courseID));
        }
        fetchData();

    }, [username]);

    // toggle bookmark
    const toggleBookmark = async (course) => {
        const bookmark = {
            username: username,
            courseID: course.courseID.S,
            courseName: course.courseName.S,
            description: course.description.S,
            price: course.price.S
        };

    if (bookmarkedCourses.includes(bookmark.courseID)) {
      // if bookmark is already saved, delete it
      try {
        const existingBookmark = {
          username: bookmark.username,
          courseID: bookmark.courseID
        };
        await fetch(`https://v9v2zwoza6.execute-api.us-east-2.amazonaws.com/prod/bookmarks`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(existingBookmark)
        });
        console.log("Bookmark deleted");
        setBookmarkedCourses(bookmarkedCourses.filter(id => id !== bookmark.courseID));
      } catch (error) {
        console.error(error);
        alert("Failed to delete bookmark. Please try again later.");
      }
    } else {
      // if bookmark is not saved yet, save it
      try {
        await fetch('https://v9v2zwoza6.execute-api.us-east-2.amazonaws.com/prod/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookmark)
        });
        console.log("Bookmark saved");
        setBookmarkedCourses([...bookmarkedCourses, bookmark.courseID]);
      } catch (error) {
        console.error(error);
        alert("Failed to save bookmark. Please try again later.");
      }
    }
  };

    // split subheadings
    function splitString(str) {
        str = str.split(",");
        return str;
    }

    // enroll feature starts here
    useEffect(() => {
      // Check if the course is already in the database
      const fetchData = async () => {
        // setLoading(true);
        try {
          const response = await fetch(`https://nn8vlbbju7.execute-api.us-east-2.amazonaws.com/dev/enrolstudents?username=${username}&courseID=${from}`);
          if (response.ok) {
            setEnrolled(true);
          }
        } catch (error) {
          console.error(error);
        }
        // setLoading(false);
      };
      fetchData();
    }, [from, username]);

    const handleEnrollments = async () => {
      // setLoading(true);
      try {
        await fetch('https://nn8vlbbju7.execute-api.us-east-2.amazonaws.com/dev/enrolstudents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            courseID: from
          })
        });
        setEnrolled(true);
      } catch (error) {
        console.error(error);
      }
      // setLoading(false);
    };
  
    // if (loading) {
    //   return <button disabled>Loading...</button>;
    // }
  
    // if (enrolled) {
    //   return <button disabled>Enrolled</button>;
    // }

    return (
        <div>
            {console.log(coursesLocal)}
            {coursesLocal.map(course => {
                let courseContent = course.detail.L;
                const isBookmarked = bookmarkedCourses.includes(course.courseID.S);
                return (
                    <div key={course} className="cwrapper">
                        <div className="detail-heading">
                            { isLoggedIn ?
                                <button className="bookmark-detail-pg" onClick={() => toggleBookmark(course)}> 
                                    <i className={`fa ${isBookmarked ? "fa-bookmark" : "fa-bookmark-o"} fa-3x`}></i>
                                </button> 
                                : <span></span>
                            }
                            <h1>{course.courseName.S}</h1>
                        </div>
                        <p className="cdescription">{course.description.S}</p>
                        <h5 className="tutor-text">📝 Tutor: {course.tutor.S}</h5>
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
                        { username != null ? 
                          !enrolled ?
                            <button className="nav-link chat-button" onClick={handleEnrollments}>Enroll Now</button>
                            : <button className="nav-link chat-button enrolled" disabled>Enrolled</button>
                        : ""
                        }
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