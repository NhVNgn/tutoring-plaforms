import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './css/home.css';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const colours = ["#EDAA6C", "#EA713D", "#D83E27", "#152B53", "#1F6E8E", "#2C8B98", "#82A8A0"]
  var username = localStorage.getItem("username");

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
      <title>Bookmarks</title>
      <div className="wrapper">
        <h1>My Bookmarks</h1>
        <div className="separator"></div>
        <div className="courses-container">
          {bookmarks && bookmarks.length > 0 ?
            bookmarks.map((bookmark, index) => {
              return (
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
                      <p className="price">{bookmark.price}</p>
                      {console.log(bookmark)}
                      {console.log(bookmark.courseID)}
                      <Link className="nav-link" to="/coursedetail" state={{ from: bookmark.courseID }}>View Course</Link>
                    </div>
                  </div>
                </div>
              );
            }) :
            <p>You have no bookmarks yet.</p>
          }
        </div>
      </div>
    </>
  );
}
  
export default Bookmarks;
