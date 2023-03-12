import React, { useState, useEffect } from "react";

const Bookmarks = () => {

  const [bookmarks, setBookmarks] = useState({});

  // get item from Courses table by id ["0", "1", "2"]
  const raw = JSON.stringify({"action": "GET", "id": "1"});

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://56j70ao9r7.execute-api.us-east-1.amazonaws.com/dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: raw,
        redirect: "follow"
      });
      // .then(response => response.text())
      // .then(result => alert(JSON.parse(result).body))
      // .catch(error => console.log("error", error))

      const data = await response.json();
      const obj = JSON.parse(data.body);
      console.log(obj)
      setBookmarks(obj.Item);
    }
    getData();
  }, [])

  return(
    <>
      <title>Bookmarks</title>
      <h1>My Bookmarks</h1>
      <h4>{bookmarks.courseName}</h4>
      <h5>{bookmarks.category}</h5>
      <h5>{bookmarks.price}</h5>
    </>
  )
  };
  
  export default Bookmarks;