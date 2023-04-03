import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/chat.css';

function Chat() {
  const [user2, setUser2] = useState('');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const location = useLocation();
  var username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    if(location.state) {
      const { from } = location.state;
      var tutorUsername = from;
      console.log("From CourseDetails!");
      setUser2(tutorUsername);
    }
    else{
      // const searchParams = new URLSearchParams(window.location.search);
      const user2 = localStorage.getItem("user2");
      setUser2(user2);
    }
  }, []);


  useEffect(() => {
    // Check if user is logged in by checking if username exists in localStorage
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      navigate('/login'); // redirect to login page if not logged in
    }
  }, [navigate]);



  // send the message after submitting
  const handleSubmit = async (event) => {
    event.preventDefault();

    const msg = {
      user1: username,
      user2: user2,
      message: message
    };

    try {
      await fetch('https://y8936siadk.execute-api.us-east-2.amazonaws.com/dev/chatmessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(msg)
      });
      console.log("Message sent");
      setMessage('');
      setChatHistory([...chatHistory, msg]); // add new message to chat history
    } catch (error) {
      console.log(error);
    }
  };


  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const fetchChatHistory = async () => {
    try {
      const response = await fetch(`https://y8936siadk.execute-api.us-east-2.amazonaws.com/dev/chatmessage?user1=${username}&user2=${user2}`);
      const data = await response.json();
      setChatHistory(data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (username && user2) {
      setShowChatHistory(true);
      fetchChatHistory();
    } else {
      setShowChatHistory(false);
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      fetchChatHistory();
    }, 10000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <div className="chat-container">
        <h1>Chat</h1>
      </div>
      
      <div className="separator"></div>
      
      <div className="chat-container">
        {showChatHistory && (
          <div className="chat-history-container">
            <ul className="chat-history">
              {chatHistory.map((chatMessage, index) => (
                <li className={`chat-message ${chatMessage.user1 === username ? 'sent' : 'received'}`} key={index}>
                  <div className="chat-message-content">{chatMessage.message}</div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form className="chat-form" onSubmit={handleSubmit}>
          <label>
            Message:
            <input type="text" value={message} onChange={handleMessageChange} />
          </label>
          <button type="submit">Send</button>
        </form>
      </div> 
    </>
  );
}

export default Chat;
