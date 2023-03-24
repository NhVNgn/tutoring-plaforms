// Backend notes:
// 'Python-mar-20' api gateway, 'dynamoDB-test' lambda function. The latter's code is in
// the profile_lambda.py file in the backend folder.

import React, { useState, useEffect } from "react";
import './css/profile.css';
import AddCourse from "./AddCourse";

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [showAddCourse, setShowAddCourse] = useState(false)

  // test call to profile lambda
  useEffect(() => {
    const fetchData = async () => {
      console.log('hi');
      const response = await fetch(`https://c4o69qqvt1.execute-api.us-east-2.amazonaws.com/dev/profile`);
      const data = await response.json();
      console.log(data);
    }
    fetchData();
  }, []);

  const handleClickAddCourse = (event) => {
    // toggle shown state
    setShowAddCourse(current => !current);
  };

  return (
    <>
      <title>Profile</title>
      <p>lol</p>

      {/* if role === 'tutor', show AddCourse option */}
      <button type ="button" className="btn btn-primary" onClick={handleClickAddCourse}>Add a course</button>
      {showAddCourse ? (
          <AddCourse />
      ) : null}
    </>
  );
}
  
export default Profile;
