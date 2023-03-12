import React, {useState} from 'react';
import { Link } from "react-router-dom";
import "./css/login.css";

const Login = () => {
    const [userRole, setUserRole] = useState('');
    const [userNEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUserRoleChange = (event) => {
        setUserRole(event.target.value);
    };
  
    const handleUserEmailChange = (event) => {
        setUserEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
  
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userRole+" "+userNEmail+" "+password);
    };
  
    return (
    <div className="wrapper">
        <div className="container">
            <title>Login</title>
            <form onSubmit={handleSubmit}>
            <h2 className="heading">Login</h2>
            <div className="form-group">
                <label htmlFor="role">You are:</label>
                
                <div className="btn-group" data-toggle="buttons" value={userRole} onChange={handleUserRoleChange} required>
                    <label className="btn btn-student">
                        <input type="radio" name="role" value="student" required/>Student
                    </label>
                    <label className="btn btn-tutor">
                        <input type="radio" name="role" value="tutor"/>Tutor
                    </label>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="name">Username or email:</label>
                <input type="text" className="form-control" id="name_email" placeholder="Enter your name/email" value={userNEmail} onChange={handleUserEmailChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} required />
            </div>
            
            <button type="submit" className="btn btn-primary">Login</button>
            <br/><br/>
            <Link to="/register">Or Sign Up</Link>
            </form>
        </div>
    </div>
    );
};
  
export default Login;