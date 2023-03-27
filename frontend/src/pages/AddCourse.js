import React, { useState, useEffect } from "react";
import "./css/addcourse.css"

const AddCourse = () => {

    const [courseID, setCourseID] = useState("");
    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [tutor, setTutor] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleCourseIDChange = (event) => {
        setCourseID(event.target.value);
    };

    const handleCourseNameChange = (event) => {
        setCourseName(event.target.value);
    };

    const handleCourseDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleTutorChange = (event) => {
        setTutor(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
       
        const add = async () => {
            const newCourse = {
                action: "POST",
                courseID: courseID,
                courseName: courseName,
                description: description,
                category: category,
                price: price,
                tutor: tutor,
                startDate: startDate,
                endDate: endDate
            };
            const response = await fetch("https://56j70ao9r7.execute-api.us-east-1.amazonaws.com/dev", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCourse)
            });
            const data = await response.json();
            const obj = JSON.parse(data.body);
            // console.log(obj)
            alert("Successfully added: " + obj)
        }
        add();
        setCourseID("");
        setCourseName("");
        setDescription("");
        setPrice("");
        setTutor("");
    };

    return (
        <div className="wrapper">
            <div className="container">
                <title>Add Course</title>
                <form onSubmit={handleSubmit}>
                    <h2 className="heading">Add a New Course</h2>
                    <div className="form-group">
                        <label>Course ID:</label>
                        <input type="text" className="form-control" id="courseID" placeholder="Enter a course ID: MATH308, MATH445" value={courseID} onChange={handleCourseIDChange} required />
                    </div>
                    <div className="form-group">
                        <label>Course Name:</label>
                        <input type="text" className="form-control" id="courseName" placeholder="Enter a course name: Linear Optimization, Graph Theory" value={courseName} onChange={handleCourseNameChange} required />
                    </div>
                    <div className="form-group">
                        <label>Course Description:</label>
                        <input type="text" className="form-control" id="description" placeholder="Enter a course description" value={description} onChange={handleCourseDescriptionChange} required />
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <input type="text" className="form-control" id="category" placeholder="Enter a category: Mathematics, Statistics, Chemistry" value={category} onChange={handleCategoryChange} required />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input type="text" className="form-control" id="price" placeholder="Enter a number: 60, 40.99" value={price} onChange={handlePriceChange} required />
                    </div>
                    <div className="form-group">
                        <label>Tutor:</label>
                        <input type="text" className="form-control" id="tutor" placeholder="Enter tutor's name: Tony Stark, Steve Rogers" value={tutor} onChange={handleTutorChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>Add Course</button>
                </form>
            </div>
        </div>
    );
}

export default AddCourse;