import React, { useState, useEffect } from 'react';
import './css/chat.css';

function Chat() {
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatHistory, setShowChatHistory] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const msg = {
      user1: user1,
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

  const handleUser1Change = (event) => {
    setUser1(event.target.value);
  };

  const handleUser2Change = (event) => {
    setUser2(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const fetchChatHistory = async () => {
    try {
      const response = await fetch(`https://y8936siadk.execute-api.us-east-2.amazonaws.com/dev/chatmessage?user1=${user1}&user2=${user2}`);
      const data = await response.json();
      setChatHistory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user1 && user2) {
      setShowChatHistory(true);
      fetchChatHistory();
    } else {
      setShowChatHistory(false);
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      fetchChatHistory();
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className="chat-container">
      <h1>Chat</h1>
      {showChatHistory && (
        <div className="chat-history-container">
          <ul className="chat-history">
            {chatHistory.map((chatMessage, index) => (
              <li className={`chat-message ${chatMessage.user1 === user1 ? 'sent' : 'received'}`} key={index}>
                <div className="chat-message-content">{chatMessage.message}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form className="chat-form" onSubmit={handleSubmit}>
        <label>
          User 1:
          <input type="text" value={user1} onChange={handleUser1Change} />
        </label>
        <label>
          User 2:
          <input type="text" value={user2} onChange={handleUser2Change} />
        </label>
        <label>
          Message:
          <input type="text" value={message} onChange={handleMessageChange} />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
