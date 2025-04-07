import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NetworkPage = () => {
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
        // Add logic to handle form submission
        setMessage('Thank you for reaching out! We will contact you soon.');
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
        navigate('/');  // Navigate to home page
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <button
                    className="absolute text-black px-4 py-2 rounded-lg transition-transform duration-300 mt-[0px] ml-[0px] hover:scale-105"
                    onClick={handleBackClick}  // Custom click handler
                > &larr; Back
                </button>
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Networking Opportunities</h1>

                <div className="text-center mb-10">
                    <p className="text-xl text-gray-700">
                        In today’s fast-paced world, building strong networks is more important than ever. Discover how networking can open doors to
                        new opportunities, partnerships, and growth.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Networking Matters</h2>
                        <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                            <li>Expand your reach and connect with industry leaders.</li>
                            <li>Build long-term relationships that can lead to growth and opportunities.</li>
                            <li>Gain insights from others' experiences and expertise.</li>
                            <li>Collaborate with like-minded professionals to innovate and create new ventures.</li>
                            <li>Leverage connections to accelerate your business success.</li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Network</h2>
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
                                    placeholder="Tell us how we can collaborate or network"
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

export default NetworkPage;
