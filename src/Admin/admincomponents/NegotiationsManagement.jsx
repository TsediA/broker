import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const NegotiationsManagement = () => {
  const { negotiationId } = useParams();
  const [negotiation, setNegotiation] = useState(null);
  const [offers, setOffers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch the negotiation data from the server
    const fetchNegotiationData = async () => {
      try {
        const response = await fetch(`/api/negotiations/${negotiationId}`);
        const data = await response.json();
        setNegotiation(data.negotiation);
        setOffers(data.offers);
        setMessages(data.messages);
      } catch (error) {
        console.error('Error fetching negotiation data:', error);
      }
    };

    fetchNegotiationData();
  }, [negotiationId]);

  const handleOfferSubmit = async (offer) => {
    try {
      const response = await fetch(`/api/negotiations/${negotiationId}/offers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(offer),
      });
      const data = await response.json();
      setOffers([...offers, data.offer]);
    } catch (error) {
      console.error('Error submitting offer:', error);
    }
  };

  const handleMessageSend = async (message) => {
    try {
      const response = await fetch(`/api/negotiations/${negotiationId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      const data = await response.json();
      setMessages([...messages, data.message]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleNegotiationSuggestion = async (suggestion) => {
    try {
      const response = await fetch(`/api/negotiations/${negotiationId}/suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(suggestion),
      });
      const data = await response.json();
      // Update the UI with the new suggestion
    } catch (error) {
      console.error('Error submitting suggestion:', error);
    }
  };

  if (!negotiation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="negotiations-management">
      <h1>Negotiate: {negotiation.title}</h1>
      <div className="negotiations-content">
        <div className="offers-section">
          <h2>Offers</h2>
          {offers.map((offer) => (
            <div key={offer.id} className="offer-item">
              <p>Offered price: {offer.price}</p>
              <p>Offered by: {offer.buyer.name}</p>
              <p>Offer date: {offer.createdAt}</p>
            </div>
          ))}
          <div className="offer-form">
            <h3>Submit New Offer</h3>
            {/* Add form fields and handle offer submission */}
            <button onClick={() => handleOfferSubmit({ price: 100, buyer: { name: 'John Doe' } })}>
              Submit Offer
            </button>
          </div>
        </div>
        <div className="messages-section">
          <h2>Communication</h2>
          {messages.map((message) => (
            <div key={message.id} className="message-item">
              <p>
                {message.sender.name}: {message.content}
              </p>
              <p>Sent: {message.createdAt}</p>
            </div>
          ))}
          <div className="message-form">
            <h3>Send Message</h3>
            {/* Add message input field and handle message submission */}
            <button onClick={() => handleMessageSend({ content: 'Hello, how can I assist you?' })}>
              Send Message
            </button>
          </div>
        </div>
        <div className="suggestion-section">
          <h2>Negotiation Suggestions</h2>
          {/* Display any existing suggestions */}
          <div className="suggestion-form">
            <h3>Provide Negotiation Suggestion</h3>
            {/* Add suggestion input field and handle suggestion submission */}
            <button
              onClick={() => handleNegotiationSuggestion({ content: 'Consider a compromise on the price.' })}
            >
              Submit Suggestion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NegotiationsManagement;