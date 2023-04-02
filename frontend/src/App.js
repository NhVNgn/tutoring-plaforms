import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";
import Home from "./pages/Home";
import Bookmarks from "./pages/Bookmarks";
import About from "./pages/About";
import Login from "./pages/Login";
import NavBar from "./pages/NavBar";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import CourseDetail from "./pages/CourseDetail";
import ChatUsersHistory from "./pages/ChatUsersHistory";
import EnrolledCourses from "./pages/EnrolledCourses";
import MyLibrary from "./pages/MyLibrary";

export default function App() {

  const [loggedUsername, setLoggedUsername] = useState("");
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar loggedUsername={loggedUsername} setLoggedUsername={setLoggedUsername} />}>
          <Route index element={<Home />} />
          <Route path="bookmarks" element={loggedUsername ? <Bookmarks /> : <Navigate to="/login" />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login loggedUsername={loggedUsername} setLoggedUsername={setLoggedUsername} />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chat" element={<Chat />} />
          <Route path="chathistory" element={loggedUsername ? <ChatUsersHistory /> : <Navigate to="/login" />} />
          <Route path="coursedetail" element={<CourseDetail />} />
          <Route path="enrolledcourses" element={loggedUsername ? <EnrolledCourses /> : <Navigate to="/login" />} />
          <Route path="mylibrary" element={<MyLibrary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
