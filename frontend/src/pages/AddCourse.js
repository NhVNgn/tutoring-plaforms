import React, { useState, useEffect } from "react";
import "./css/addcourse.css"

const AddCourse = () => {

    const [courseID, setCourseID] = useState("");
    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [tutor, setTutor] = useState("");
    const [detail, setDetail] = useState([]);
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

    const handleDetailChapterChange = idx => evt => {
        const newChapter = detail.map((rel, sidx) => {
          if (idx !== sidx) return rel;
          return { ...rel, chapter: evt.target.value };
        });
    
        setDetail(newChapter);
    };
    
    const handleDetailSubheaderChange = idx => evt => {
        const newSubheader = detail.map((rel, sidx) => {
          if (idx !== sidx) return rel;
          return { ...rel, subheader: evt.target.value };
        });
    
        setDetail(newSubheader);
    };

    const handleAddChapter = () => {
        setDetail(detail.concat([{ chapter: "", subheader: ""}]));
        // console.log("Add Chapter hi", detail)
    };
    
    const handleRemoveChapter = idx => () => {
        setDetail(detail.filter((s, sidx) => idx !== sidx));
    };

    // {"Chapter 1 - Counting":{"SS":["Combination","Permutation"]},"Chapter 2 - Logic and Quantifiers":{"SS":["De Morgan's Laws","Logical Operations"]}}

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(detail);
       
        const add = async () => {
            const newCourse = {
                action: "POST",
                courseID: courseID,
                courseName: courseName,
                description: description,
                detail: detail,
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
        setDetail([]);
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
                        <label>Course Detail:</label>

                        {detail.map((det, idx) => (
                            <div className="form-group">
                                <input type="text" className="form-control" id="chapter" placeholder="Chapter name" value={det.chapter} onChange={handleDetailChapterChange(idx)}/>
                                <input type="text" className="form-control" id="subheader" placeholder="Comma separated subsections" value={det.subheader} onChange={handleDetailSubheaderChange(idx)}/>
                                <button type="button" className="form-control" onClick={handleRemoveChapter(idx)}> Delete</button>
                                <p></p>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddChapter} className="form-control"> Add a chapter</button>
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