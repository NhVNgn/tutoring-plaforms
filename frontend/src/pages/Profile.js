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

async function checkIsValidUserSession(username, sessionID) {
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

function hashPassword(password) {
  return bcrypt.hashSync(password.trim(), 10);
}

const Profile = () => {
  const [email, setEmail] = useState('');
  const [showAddCourse, setShowAddCourse] = useState(false)
  const [currentPasswordFromUser, setCurrentPasswordFromUser] = useState('')
  const [newpassword, setNewPassword] = useState('')
  const [currentPasswordDBHashed, setCurrentPasswordDBHashed] = useState('')
  const [isValidUserSession, setIsValidUserSession] = useState(true)
  const username = localStorage.getItem("username")
  const sessionID = localStorage.getItem("sessionID")
  const role = localStorage.getItem("role")
  const isTutor = (role === "tutor")

  useEffect(() => {
    const fetchData = async () => {
      let is_valid_session = await checkIsValidUserSession(username, sessionID);

      if (!is_valid_session) {
        alert('invalid session');
        setIsValidUserSession(false);
        return;
      } else {
        console.log('valid session!');
      }

      const user_info = await makeRequest(
        `https://yuibzyvw0j.execute-api.us-east-2.amazonaws.com/dev/userinfo?username=${username}`, 'GET'
      );
      console.log(user_info);
      console.log(username);
      console.log(role);

      setCurrentPasswordDBHashed(user_info.data['info_on_user']['password']['S']);
      setEmail(user_info.data['info_on_user']['email']['S']);
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

  const onSubmit = async (event) => {
    // Check if the current password entered by the user is correct.
    event.preventDefault();
    if (!isPasswordCorrect(currentPasswordFromUser, currentPasswordDBHashed)) {
      alert('not the correct current password');
      return;
    }
    console.log('correct current password given');
    const newPasswordHashed = hashPassword(newpassword);
    const response = await makeRequest(
      `https://yuibzyvw0j.execute-api.us-east-2.amazonaws.com/dev/userinfo`, 'PUT',
      undefined, {username: username, newPasswordHashed: newPasswordHashed}
    );
    console.log(response);
    if (response.status == 200) {
      setCurrentPasswordDBHashed(newPasswordHashed);
      alert('Updated password!');
    }
  };

  return (
    <div className="wrapper">
      {isTutor && (
      <div>
        <button type ="button" className="btn btn-primary" onClick={handleClickAddCourse}>Add a course</button>
        {showAddCourse ? ( <AddCourse /> ) : null}
      </div>
      )}
      {isValidUserSession && email && (
      <div className="container">
      <title>Profile</title>
        <form onSubmit={onSubmit}>
          <h2 className="heading" style={{ textAlign: 'left' }}>Profile</h2>
          <div className="form-group profile_info">
            <label htmlFor="role">Your username: {username}</label>
          </div>
          <div className="form-group profile_info">
            <label htmlFor="role">Your role: {role}</label>
          </div>
          <div className="form-group profile_info">
            <label htmlFor="role">Your email: {email}</label>
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
      </div>
      )}
    </div>
  );
}

export default Profile;
