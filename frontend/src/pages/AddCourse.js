import React, { useState, useEffect } from "react";

const AddCourse = () => {
    const [courseID, setCourseID] = useState("");
    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const addCourse = async () => {
        const newCourse = {
        action: "POST",
        courseID: window.prompt("courseID"),
        courseName: courseName,
        description: description,
        category: category,
        price: price,
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

        console.log(JSON.stringify(newCourse))
    };

    return (
        <>
            <button onClick={addCourse}>Add a Course</button>
        </>
    );
}

export default AddCourse;