import React, { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../../../utlis/constant';

const PaymentForm = () => {
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState('');
    const [notification, setNotification] = useState('');

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setNotification('');

        try {
            const response = await axios.post(
                `${serverUrl}pay/pays`, {
                    amount,
                    email,
                    phone,
                    firstName,
                    lastName,
                }
            );

            // Redirect to the payment URL from Chapa's response
            setPaymentUrl(response.data.data.authorization_url);
            window.location.href = response.data.data.authorization_url;

            // After redirection, you can implement a check for payment status or success
            // For demonstration purposes, we assume payment is successful:
            handlePaymentSuccess();
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment initialization failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSuccess = async () => {
        try {
            const emailResponse = await axios.post(
                `${serverUrl}email/send`, {
                    to: email,
                    subject: 'Payment Successful',
                    body: `Dear ${firstName} ${lastName},\n\nYour payment of ${amount} ETB has been successfully processed.\n\nThank you for your payment!\n\nBest regards,\nYour Company Name`,
                }
            );

            // Update notification state
            setNotification('Payment successful! A confirmation email has been sent.');
        } catch (error) {
            console.error('Error sending email:', error);
            setNotification('Payment successful, but failed to send confirmation email.');
        }
    };

    return (
        <div>
            <h2>Make a Payment</h2>
            <form onSubmit={handlePayment}>
                <div>
                    <label>Amount (ETB): </label>
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Email: </label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Phone: </label>
                    <input 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>First Name: </label>
                    <input 
                        type="text" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Last Name: </label>
                    <input 
                        type="text" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </form>

            {notification && (
                <div className="notification">
                    <p>{notification}</p>
                </div>
            )}
        </div>
    );
};

export default PaymentForm;