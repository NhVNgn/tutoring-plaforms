import React, { useState, useEffect } from 'react';
import './css/chat.css';

function ChatUsersHistory() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      var currentUserId = localStorage.getItem("username");
      const response = await fetch(
        `https://y8936siadk.execute-api.us-east-2.amazonaws.com/dev/uniquechatusers?user1=${currentUserId}`
      );
      const data = await response.json();
      setUserList(data.users_list);
    }
    fetchData();
  }, []);

  function handleUserClick(user2) {
    // Code to display chat history between the current user and the clicked user
    window.location.href = `/chat?user2=${user2}`;
  }

  return (
    <>
        <div className="chat-container">
            <h1>Chat History</h1>
        </div>
        <div className="separator"></div>
            <div className="chat-container">
            <div className="user-list">
                {userList.map((user) => (
                <div key={user} className="user-item" onClick={() => handleUserClick(user)}>
                    {user}
                </div>
                ))}
            </div>
        </div>
    </>
    );
}


export default ChatUsersHistory;
