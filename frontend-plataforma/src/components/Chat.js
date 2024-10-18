import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Pusher from 'pusher-js';
import './Chat.css';

const Chat = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  let allMessages = [];

  useEffect(() => {
    if (isAuthenticated) {
      const pusher = new Pusher('2eb329b9cdae48c4a636', {
        cluster: 'us2',
        useTLS: true,
      });

      const channel = pusher.subscribe('chat');
      channel.bind('message', function (data) {
        allMessages.push(data);
        setMessages([...allMessages]);
      });
    }
  }, [isAuthenticated]);

  const submit = async e => {
    e.preventDefault();

    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    await fetch('http://localhost:8000/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user.name, // usa el nombre del usuario autenticado
        message,
      }),
    });

    setMessage('');
  };

  return (
    <div className="container">
      {!isAuthenticated ? (
        <button onClick={loginWithRedirect}>Login</button>
      ) : (
        <>
          <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
            <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
              <span className="fs-5 fw-semibold">{user.name}</span>
              <button onClick={() => logout({ returnTo: window.location.origin })}>
                Logout
              </button>
            </div>
            <div className="list-group list-group-flush border-bottom scrollarea">
              {messages.map((message, index) => (
                <div key={index} className="list-group-item list-group-item-action py-3 lh-tight">
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <strong className="mb-1">{message.username}</strong>
                  </div>
                  <div className="col-10 mb-1 small">{message.message}</div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={e => submit(e)}>
            <input
              className="form-control"
              placeholder="Write a message"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </form>
        </>
      )}
    </div>
  );
};

export default Chat;
