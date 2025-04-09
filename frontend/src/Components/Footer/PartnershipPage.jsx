import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PartnershipPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
      
        setMessage('Thank you for your interest! We will reach out to you soon.');
        setFormData({
            name: '',
            email: '',
            company: '',
            message: '',
        });
    };

    const navigate = useNavigate();
    const handleScrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    const handleBackClick = () => {
        handleScrollToBottom();
        navigate('/');  
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <button
                    className="absolute text-black px-4 py-2 rounded-lg transition-transform duration-300 mt-[0px] ml-[0px] hover:scale-105"
                    onClick={handleBackClick}  
                > &larr; Back
                </button>
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                    Partnership Opportunities
                </h1>

                <div className="text-center mb-10">
                    <p className="text-xl text-gray-700">
                        Join forces with us! We’re looking for strategic partners to grow and enhance our offerings.
                        Explore the potential of a rewarding partnership with us.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Partner With Us?</h2>
                        <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                            <li>Collaborate with an industry leader to expand your reach.</li>
                            <li>Gain access to exclusive resources and marketing tools.</li>
                            <li>Share knowledge and expertise to enhance both businesses.</li>
                            <li>Tap into new markets and customers through joint ventures.</li>
                            <li>Grow together with a mutually beneficial business model.</li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get In Touch</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-lg font-medium text-gray-700">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Enter your company name"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-lg font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Tell us more about the partnership opportunity"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                            >
                                Submit Inquiry
                            </button>
                        </form>

                        {message && <div className="mt-4 text-center text-lg text-green-600">{message}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnershipPage;
