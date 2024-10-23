import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './HandleResponseRequest.css'; // Import CSS file

const HandleResponseRequest = () => {
  const [responseRequests, setResponseRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch initial response requests
    fetchResponseRequests();
  }, []);

  const fetchResponseRequests = async () => {
    try {
      const response = await axios.get('/api/response-requests');
      setResponseRequests(response.data);
    } catch (error) {
      console.error('Error fetching response requests:', error);
      alert('Failed to fetch response requests. Please try again later.');
    }
  };

  const handleSendReply = async (requestId) => {
    if (!replyMessage.trim()) {
      alert('Please enter a reply message.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`/api/response-requests/${requestId}/reply`, {
        message: replyMessage,
      });

      setResponseRequests(prevRequests => 
        prevRequests.filter(request => request.id !== requestId)
      );

      alert('Reply sent successfully!');
      setReplyMessage(''); // Clear the reply input
    } catch (error) {
      alert('Error sending reply. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="page">
      <div className="back-btn" onClick={handleGoBack}>
        <i className="fas fa-arrow-left"></i>
      </div>
      <h2 className="section-title">Response Requests</h2>
      {loading && <div className="loading">Processing...</div>}
      {responseRequests.length === 0 ? (
        <div className="no-requests">No response requests available.</div>
      ) : (
        responseRequests.map((request) => (
          <div key={request.id} className="response-request">
            <p><strong>From:</strong> {request.sellerUsername}</p>
            <p><strong>Message:</strong> {request.message}</p>
            <div className="reply-section">
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply here..."
              ></textarea>
              <button 
                className="primary-btn" 
                onClick={() => handleSendReply(request.id)}
              >
                Reply
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HandleResponseRequest;