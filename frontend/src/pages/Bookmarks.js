import React, { useState, useEffect } from "react";
import './css/home.css';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const colours = ["#EDAA6C", "#EA713D", "#D83E27", "#152B53", "#1F6E8E", "#2C8B98", "#82A8A0"]

  // fetch bookmarks on mount
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://v9v2zwoza6.execute-api.us-east-2.amazonaws.com/prod/bookmarks?username=tosrif123`);
      const data = await response.json();
      setBookmarks(data);
    }
    fetchData();
  }, []);

  // delete bookmark
    const deleteBookmark = async (courseID) => {
    const existingBookmark = {
      username: "tosrif123",
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
                    <button className="delete" onClick={() => deleteBookmark(bookmark.courseID)}> 
                      <i className="fa fa-bookmark fa-3x"></i>
                    </button>
                  </div>
                  <div className="course-item-text">
                    <h4>{bookmark.courseName}</h4>
                    <p className="course-desc">{bookmark.description}</p>
                    <div className="link-price">
                      <p className="price">{bookmark.price}</p>
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
