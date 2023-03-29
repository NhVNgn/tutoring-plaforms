// Backend notes:
// 'Python-mar-20' api gateway, 'dynamoDB-test' lambda function. The latter's code is in
// the profile_lambda.py file in the backend folder.

import React, { useState, useEffect } from "react";
import './css/profile.css';
import AddCourse from "./AddCourse";
import makeRequest from '../Utils'

const bcrypt = require('bcryptjs');

const Profile = () => {
  //const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  const [showAddCourse, setShowAddCourse] = useState(false)
  // const [isTutor, setIsTutor] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newpassword, setNewPassword] = useState('')
  var username = localStorage.getItem("username")
  var sessionID = localStorage.getItem("sessionID")
  var role = localStorage.getItem("role")
  var isTutor = (role === "tutor")

  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const fetchData = async () => {
      const allProfiles = await makeRequest(
        `https://c4o69qqvt1.execute-api.us-east-2.amazonaws.com/dev/profile`, 'GET'
      );
      console.log(allProfiles);

      console.log(username);
      console.log(sessionID);
      console.log(role);

      console.log("is tutor: " + isTutor);

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

  const currentPasswordFromUser = (event) => {
    console.log("event:");
    console.log(event.target.value);
    setCurrentPassword(event.target.value);
  };

  const newPasswordFromUser = (event) => {
    setNewPassword(event.target.value);
  };

  const onSubmit = (event) => {
    // Check if the current password entered by the user is correct.
    event.preventDefault();

    const checkPassword = async () => {
      console.log("checkPassword called")
      console.log("username: " + username)
      console.log("currentPassword: " + currentPassword)
      const data = {
        username: username,
        password: currentPassword
      };

      console.log(data);


      const verifyPassword = await makeRequest(
        "https://c4o69qqvt1.execute-api.us-east-2.amazonaws.com/dev/verifypassword",
        "POST",
        undefined,
        data
      );

      console.log(verifyPassword);

      console.log('new try done');

      await fetch("https://c4o69qqvt1.execute-api.us-east-2.amazonaws.com/dev/verifypassword", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
        redirect: 'follow'
      })
        .then(async response => {
          if (response.ok) {
            let response_json = await response.json();
            alert('success!');
            console.log(response_json);
          } else if (response.status === 403) {
            alert('Invalid credentials.');
          }
          else {
            console.log('unexpected case');
            console.log(response);
            alert(response.status);
          }
        })
        .catch(error => console.log('error', error));

    }
    checkPassword();
  };

  const hashPassword = (password) => {
    return bcrypt.hashSync(password.trim(), 10);
  };

  return (
    <div className="wrapper">
      <div className="container">
      <title>Profile</title>
        <form onSubmit={onSubmit}>
          <h2 className="heading">Profile</h2>
          <div className="form-group">
            <label htmlFor="role">You are:</label>
          </div>

          <div className="form-group">
            <label htmlFor="currentPassword">Current password:</label>
            <input type="password" className="form-control" id="current password" placeholder="Enter your current password" 
             value={currentPassword} onChange={currentPasswordFromUser} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">New password:</label>
            <input type="password" className="form-control" id="new password" placeholder="Enter your new password" 
             value={newpassword} onChange={newPasswordFromUser} required />
          </div>

          <button type="submit" className="btn btn-primary" onSubmit={onSubmit}>Update password</button>

        </form>

        {isTutor && (
          <div>
            <button type ="button" className="btn btn-primary" onClick={handleClickAddCourse}>Add a course</button>
            {showAddCourse ? (
              <AddCourse />
            ) : null}
          </div>
        )}
        </div>
    </div>
  );
}

export default Profile;
