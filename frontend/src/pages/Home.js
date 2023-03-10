import { useState, useEffect } from "react";

const Home = () => {

  const [courses, setCourses] = useState([]);

  const headers = {
    "Content-Type": "application/json"
  }

    useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://56j70ao9r7.execute-api.us-east-1.amazonaws.com/dev", {
        method: 'POST',
        headers: headers,
        redirect: 'follow'
      });

      const data = await response.json()
      const obj = JSON.parse(data.body);

      setCourses(obj.Items)
        // .then(response => response.text())
        // .then(result => alert(JSON.parse(result).body))
        // .catch(error => console.log('error', error))
    }
    getData();
    console.log(courses)
  })
  
  return(
    <>
      <title>Home</title>
      <h1>Courses</h1>
      <h2>Note: below are 2 items in a Dynamo table, fetched through Lambda function API</h2>
      {courses.map(course => <h4>{course.courseName.S}</h4>)}
      <p>{JSON.stringify(courses)}</p>
    </>
  )
};

  export default Home;