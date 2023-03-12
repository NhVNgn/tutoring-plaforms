import React, { useState } from 'react';
import "./css/register.css"

const Register = () => {
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const headers = {
    "Content-Type": "application/json",

  };

  const handleUserRoleChange = (event) => {
    setUserRole(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsernameError('')
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userRole + " " + username + " " + email + " " + password);

    const register = async () => {
      console.log("register called")
      const data = {
        username: username,
        password: password,
        email: email,
        role: userRole
      };
      await fetch("https://mscfwoqws8.execute-api.us-east-2.amazonaws.com/dev/register", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
        redirect: 'follow'
      })
        .then(response => {
          if (response.ok) {
            alert("Register successful: ", response)
          } else if (response.status == 401) {
            setUsernameError("This username has already been chosen");

          }
        })
        .catch(error => console.log('error', error));

    }
    register();
  };

  return (
    <div className="container">
      <title>Register</title>
      <form onSubmit={handleSubmit}>
        <h2 className="heading">Register</h2>
        <div className="form-group">
          <label htmlFor="role">You are:</label>

          <div className="btn-group" data-toggle="buttons" value={userRole} onChange={handleUserRoleChange} required>
            <label className="btn btn-student">
              <input type="radio" name="role" value="student" required /> Student
            </label>
            <label className="btn btn-tutor">
              <input type="radio" name="role" value="tutor" /> Tutor
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <input type="text" className="form-control" id="name" placeholder="Enter your name" value={username} onChange={handleUsernameChange} required />
          {usernameError && (
            <div className="alert alert-danger">{usernameError}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} required />
        </div>

        <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>Register</button>

      </form>
    </div>
  )
};

export default Register;