import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BuyerInformationCard = () => {
    const { propertyId } = useParams(); // Get property ID from URL
    const [buyers, setBuyers] = useState([]);

    useEffect(() => {
        // Fetch buyer information based on propertyId
        fetchBuyers(propertyId);
    }, [propertyId]);

    const fetchBuyers = async (id) => {
        // Simulating an API call to fetch buyer information
        const fetchedBuyers = [
            { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
        ];
        setBuyers(fetchedBuyers); // Replace this with actual API call
    };

    return (
        <div className="buyer-information-container">
            <h1>Interested Buyers for Property ID: {propertyId}</h1>
            {buyers.length > 0 ? (
                <ul>
                    {buyers.map(buyer => (
                        <li key={buyer.id}>
                            <h3>{buyer.name}</h3>
                            <p>Email: {buyer.email}</p>
                            <p>Phone: {buyer.phone}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No buyers information available.</p>
            )}
        </div>
    );
};

export default BuyerInformationCard;