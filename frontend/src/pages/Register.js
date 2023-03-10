import {React, useState} from 'react';
import "./css/register.css"

const Register = () => {
    const [userRole, setUserRole] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUserRoleChange = (event) => {
        setUserRole(event.target.value);
    };

    const handleUsernameChange = (event) => {
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
        console.log(userRole+" "+username+" "+email+" "+ password);
    };

    return (
        <div className="container">
        <form onSubmit={handleSubmit}>
          <h2 className="heading">Register</h2>
           <div className="form-group">
            <label htmlFor="role">You are:</label>
            
            <div className="btn-group" data-toggle="buttons" value={userRole} onChange={handleUserRoleChange} required>
              <label className="btn btn-student">
                <input type="radio" name="role" value="student" required/> Student
              </label>
              <label className="btn btn-tutor">
                <input type="radio" name="role" value="tutor"/> Tutor
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Username:</label>
            <input type="text" className="form-control" id="name" placeholder="Enter your name" value={username} onChange={handleUsernameChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} required/>
          </div>
          
          <button type="submit" className="btn btn-primary">Register</button>
          
        </form>
      </div>
    )
};

export default Register;