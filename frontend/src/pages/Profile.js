// Backend notes:
// 'Python-mar-20' api gateway, 'dynamoDB-test' lambda function. The latter's code is in
// the profile_lambda.py file in the backend folder.

import React, { useState, useEffect } from "react";
import './css/profile.css';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

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

  return (
    <>
      <title>Profile</title>
      <p>lol</p>
    </>
  );
}
  
export default Profile;
