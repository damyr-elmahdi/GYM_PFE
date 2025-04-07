import React, { useState } from 'react';
import './ContactUs.css';
import { Link, useNavigate } from 'react-router-dom';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setError('All fields are required');
            setSuccess('');
        } else {
            setError('');
            setSuccess('Your message has been sent successfully!');
            // Add API call to send the message
        }
    };

    // Scroll to bottom function
    const handleScrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    // Handle "Back" button click with scroll to bottom and navigation
    const handleBackClick = () => {
        handleScrollToBottom();
        navigate('/');  // Navigate to home page
    };

    return (
        <div className="contact-container">
            <div className="contact-form">
                <h2>Contact Us</h2>
                {/* Update the back button to trigger the scroll and navigation */}
                <button
                    className="absolute text-black px-4 py-2 rounded-lg transition-transform duration-300 mt-[-58px] ml-[-20px] hover:scale-105"
                    onClick={handleBackClick}  // Custom click handler
                >
                    &larr; Back
                </button>

                {success && <div className="success-message">{success}</div>}
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <button className="button-send" type="submit">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
