import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./css/login.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const headers = {
        "Content-Type": "application/json"
    };
  
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
  
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username + " " + password);

        const login = async () => {
            console.log("login called")
            const data = {
              username: username,
              password: password
            };
            await fetch("https://mscfwoqws8.execute-api.us-east-2.amazonaws.com/dev/login", {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(data),
              redirect: 'follow'
            })
              .then(async response => {
                if (response.ok) {
                  //let response_json = await response.json();
                  //console.log(response_json);
                  navigate('/');
                } else if (response.status === 403) {
                  alert('Invalid credentials.');
                }
                else {
                  console.log('unexpected case');
                  console.log(response);
                }
              })
              .catch(error => console.log('error', error));
      
          }
          login();
    };
  
    return (
    <div className="wrapper">
        <div className="container">
            <title>Login</title>
            <form onSubmit={handleSubmit}>
            <h2 className="heading">Login</h2>
            <div className="form-group">
                <label htmlFor="name">Username:</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your name" value={username} onChange={handleUsernameChange} required />
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