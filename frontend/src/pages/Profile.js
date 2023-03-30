// Backend notes:
// 'Python-mar-20' api gateway, 'dynamoDB-test' lambda function. The latter's code is in
// the profile_lambda.py file in the backend folder.

import React, { useState, useEffect } from "react";
import './css/profile.css';
import AddCourse from "./AddCourse";
import makeRequest from '../Utils'

const bcrypt = require('bcryptjs');

const headers = {
  "Content-Type": "application/json",
};

async function isValidUserSession(username, sessionID) {
  console.log('Checking if session valid for user ' + username);
  return await fetch("https://mscfwoqws8.execute-api.us-east-2.amazonaws.com/dev/verify", {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      username: username,
      sessionID: sessionID
    }),
    // redirect: 'follow'
  })
    .then(async response => {
      if (response.ok) {
        return true;
      } else if (response.status === 401) {
        return false;
      }
      else {
        console.log('unexpected case?');
        console.log(response);
        return false;
      }
    })
    .catch(error => console.log('error', error));
}

function isPasswordCorrect(user_input, hashed_password_from_db) {
  return bcrypt.compareSync(user_input, hashed_password_from_db);
}

const Profile = () => {
  //const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  const [showAddCourse, setShowAddCourse] = useState(false)
  // const [isTutor, setIsTutor] = useState(false)
  const [currentPasswordFromUser, setCurrentPasswordFromUser] = useState('')
  const [newpassword, setNewPassword] = useState('')
  const [currentPasswordDBHashed, setCurrentPasswordDBHashed] = useState('')
  const username = localStorage.getItem("username")
  const sessionID = localStorage.getItem("sessionID")
  const role = localStorage.getItem("role")
  const isTutor = (role === "tutor")

  useEffect(() => {
    const fetchData = async () => {
      console.log('hi')
      let is_valid_session = await isValidUserSession(username, sessionID);
      console.log('here');

      if (!is_valid_session) {
        // Continue here - maybe log the user out, reroute to home page?
        alert('invalid session');
      } else {
        console.log('valid session!');
      }

      const user_info = await makeRequest(
        `https://yuibzyvw0j.execute-api.us-east-2.amazonaws.com/dev/userinfo?username=${username}`, 'GET'
      );
      console.log(user_info);
      console.log(username);
      console.log(role);

      setCurrentPasswordDBHashed(user_info['info_on_user']['password']['S']);
    }
    fetchData();
  }, []);

  const handleClickAddCourse = (event) => {
    // toggle shown state
    setShowAddCourse(current => !current);
  };

  const currentPasswordUserInput = (event) => {
    setCurrentPasswordFromUser(event.target.value);
  };

  const newPasswordFromUser = (event) => {
    setNewPassword(event.target.value);
  };

  const onSubmit = (event) => {
    // Check if the current password entered by the user is correct.
    event.preventDefault();
    if (!isPasswordCorrect(currentPasswordFromUser, currentPasswordDBHashed)) {
      alert('not the correct current password');
      return;
    }
    console.log('correct password given');
    // Continue here - proceed with updating the password in the DB with the new password
    // the user entered. Will have to write a POST method in the lambda to do this.
    // Also make sure you hash it before storing in DB.
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
            <label htmlFor="currentPasswordFromUser">Current password:</label>
            <input type="password" className="form-control" id="current password" placeholder="Enter your current password" 
             value={currentPasswordFromUser} onChange={currentPasswordUserInput} required />
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
