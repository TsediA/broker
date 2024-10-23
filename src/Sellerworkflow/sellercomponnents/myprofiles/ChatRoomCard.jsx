import React, { useEffect, useState } from 'react';
import './ChatRoom.css'; // Import your CSS for styling
import Cookies from 'js-cookie'; // Import js-cookie
import { serverUrl } from '../../../utlis/constant';
import { useNavigate } from 'react-router-dom';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]); // State for chat messages
  const [inputMessage, setInputMessage] = useState(''); // State for input field
  const [username, setUsername] = useState('John Doe'); // Replace with dynamic username if necessary
  const [requests, setRequests] = useState([]); // State to hold requests
  const [error, setError] = useState(null); // State to hold error messages
  const navigate = useNavigate();

  // Fetch seller requests
  useEffect(() => {
    const fetchRequests = async () => {
      const token = Cookies.get('token'); // Get the token from cookies
      console.log("Token:", token); // Log the token to verify

      if (!token) {
        setError('No token found. Please login.');
        return;
      }

      try {
        const response = await fetch(`${serverUrl}notif/allRequest`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Set the token in the headers
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          throw new Error(`Error: ${errorData.message || 'Failed to fetch requests'}`);
        }

        const data = await response.json();
        console.log('response:', data);
        setRequests(data); // Set the requests in state
      } catch (error) {
        console.error('Error fetching requests:', error);
        setError('Error fetching requests. Please try again later.');
      }
    };

    fetchRequests(); // Call the fetch function
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const message = {
        username: username,
        text: inputMessage,
        timestamp: new Date().toISOString(),
      };
      // Here, you would typically send the message to a server or store it locally
      setMessages((prevMessages) => [...prevMessages, message]); // Store message locally for display
      setInputMessage(''); // Clear input field
    }
  };
  const handleGoBack = () => {
    navigate(-1);
};
  return (
    <div className="chat-room">
      <div className="back-btn" onClick={handleGoBack}>
                <i className="fas fa-arrow-left"></i>
            </div>
      <h1>See Notification</h1>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.username}:</strong> {msg.text}
            <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
      </div>
      <div className="requests-container">
        <h2>Requests</h2>
        {error && <p className="error-message">{error}</p>} {/* Display any errors */}
        {requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          requests.map((request, index) => (
            <div key={index} className="request">
              <p><strong>Request ID:</strong> {request._id}</p>
              <p><strong>Buyer ID:</strong> {request.buyerId}</p> {/* Display buyerId */}
              <p><strong>Property ID:</strong> {request.propertyId}</p> {/* Display propertyId */}
              <p><strong>Name:</strong> {request.name}</p> {/* Display name */}
              <p><strong>Phone:</strong> {request.phone}</p> {/* Display phone */}
              <p><strong>Email:</strong> {request.email}</p> {/* Display email */}
              <p><strong>Description:</strong> {request.description}</p> {/* Display description */}
              <p><strong>Payment Method:</strong> {request.paymentMethod}</p> {/* Display payment method */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
