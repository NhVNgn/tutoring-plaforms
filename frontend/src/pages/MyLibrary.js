import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './css/home.css';

const MyLibrary = () => {
  const [courses, setCourses] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const colours = ["#EDAA6C", "#EA713D", "#D83E27", "#152B53", "#1F6E8E", "#2C8B98", "#82A8A0"];
  const username = localStorage.getItem("username");

  //----------------------------------------------ENROLLED COURSES-----------------------------------------------------------------
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


  //-----------------------------------------------BOOKMARKS------------------------------------------------------
  useEffect(() => {
    // Check if user is logged in by checking if username exists in localStorage
    if (username) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [username]);

  // fetch bookmarks on mount
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://v9v2zwoza6.execute-api.us-east-2.amazonaws.com/prod/bookmarks?username=${username}`);
      const data = await response.json();
      setBookmarks(data);
    }
    fetchData();
  }, [username]);

  // delete bookmark
    const deleteBookmark = async (courseID) => {
    const existingBookmark = {
      username: username,
      courseID: courseID
    };

    try {
      await fetch(`https://v9v2zwoza6.execute-api.us-east-2.amazonaws.com/prod/bookmarks/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(existingBookmark)
      });
      console.log("Bookmark deleted");
      setBookmarks(bookmarks.filter(b => b.courseID !== courseID));
    } catch (error) {
      console.error(error);
      alert("Failed to delete bookmark. Please try again later.");
    }
  };

  return (
    <>
      <title>My Library</title>
        <div className="wrapper library">
            <h1>My Library</h1>
            <div className="separator lib-separator"></div>

            <div className="bookmarked_courses">
                <h3>My Bookmarks</h3>
                <div className="separator"></div>
                <div className="courses-container">
                    {bookmarks && bookmarks.length > 0 ?
                        bookmarks.map((bookmark, index) => {
                        return (
                            (index <= 3) ? (
                                <div className="course-item" key={index}>
                                    <div className="course-header" style={{ background: `${colours[index % colours.length]}` }}>
                                        {isLoggedIn ? 
                                        <button className="delete" onClick={() => deleteBookmark(bookmark.courseID)}> 
                                        <i className="fa fa-bookmark fa-3x"></i>
                                        </button>
                                        : <span></span>
                                        }
                                    </div>
                                    <div className="course-item-text">
                                        <h4>{bookmark.courseName}</h4>
                                        <p className="course-desc">{bookmark.description}</p>
                                        <div className="link-price">
                                        <p className="price">${bookmark.price}</p>
                                        {console.log(bookmark)}
                                        {console.log(bookmark.courseID)}
                                        <Link className="nav-link" to="/coursedetail" state={{ from: bookmark.courseID }}>View Course</Link>
                                        </div>
                                    </div>
                                </div>
                            ) :
                                <Link className="nav-link" to="/bookmarks">View More Bookmarks</Link>
                        );
                        }) :
                        <p>You have no bookmarks yet.</p>
                    }
                </div>
            </div>

            <div className="enrolled_courses">
                <h3>My Courses</h3>
                <div className="separator"></div>
                <div className="courses-container">
                    {enrolledCourses.length > 0 ? (
                    courses
                        .filter((course) => enrolledCourses.includes(course.courseID.S))
                        .map((course, index) => (
                            (index <= 3) ? (
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
                            ) :
                            <Link className="nav-link" to="/enrolledcourses">View More Enrolled Courses</Link>
                        ))
                    ) : (
                    <p>You have no enrolled courses yet.</p>
                    )}
                </div>
            </div>
        </div>
    </>
  );

};

export default MyLibrary;
