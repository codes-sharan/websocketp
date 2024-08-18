import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Establish a WebSocket connection
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.send(input);
      setInput('');
    }
  };

  return (
    <div>
      <h1>WebSocket Example</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a message"
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        <h2>Messages:</h2>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
};

export default WebSocketComponent;
