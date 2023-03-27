// Backend notes:
// 'Python-mar-20' api gateway, 'dynamoDB-test' lambda function. The latter's code is in
// the profile_lambda.py file in the backend folder.

import React, { useState, useEffect } from "react";
import './css/profile.css';
import AddCourse from "./AddCourse";
import makeRequest from '../Utils'

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [showAddCourse, setShowAddCourse] = useState(false)
  const [isTutor, setIsTutor] = useState(false)

  // test call to profile lambda
  useEffect(() => {
    const fetchData = async () => {
      const allProfiles = await makeRequest(
        `https://c4o69qqvt1.execute-api.us-east-2.amazonaws.com/dev/profile`, 'GET'
      );
      console.log(allProfiles);

      const username = localStorage.getItem("username");
      const sessionID = localStorage.getItem("sessionID");
      const role = localStorage.getItem("role");

      setIsTutor(role === "tutor");
      console.log(isTutor);

      console.log(username);
      console.log(sessionID);
      console.log(role);

      const verifyUser = await makeRequest(
        'https://mscfwoqws8.execute-api.us-east-2.amazonaws.com/dev/verify',
        'POST',
        undefined,
        {
          username: username,
          sessionID: sessionID
        }
      );
      console.log(verifyUser);
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
      <p>

      </p>
      {isTutor && (
        <div>
          <button type ="button" className="btn btn-primary" onClick={handleClickAddCourse}>Add a course</button>
          {showAddCourse ? (
            <AddCourse />
          ) : null}
        </div>
      )}
    </>
  );
}

export default Profile;
