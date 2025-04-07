import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white shadow-lg rounded-lg">
                <button
                    className="absolute text-black px-4 py-2 rounded-lg transition-transform duration-300 mt-[-10px] ml-[0px] hover:scale-105"
                    onClick={handleBackClick}  // Custom click handler
                >
                    &larr; Back
                </button>
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Privacy Policy</h1>
                <p className="text-lg text-center text-gray-600 mb-8">Last updated: April 7, 2025</p>

                <section className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
                        <p className="flex justify-center text-center text-lg text-gray-700">
                            Your privacy is important to us. This Privacy Policy explains how we collect, use, protect, and share your personal information when you use our services. By using our website, you agree to the terms of this policy.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
                        <p className="flex justify-center text-center text-lg text-gray-700">
                            We collect various types of information to provide and improve our services. This includes:
                        </p>
                        <div className="flex justify-center items-center text-center">
                            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                                <li>Personal details, such as your name, email, and contact information.</li>
                                <li>Usage data, such as your IP address, browser type, and device information.</li>
                                <li>Information provided by you directly, such as messages submitted via contact forms.</li>
                            </ul>
                        </div>

                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
                        <p className="flex justify-center text-center text-lg text-gray-700">
                            The information we collect is used for a variety of purposes, including:
                        </p>
                        <div className="flex justify-center items-center text-center">
                            <ul className="list-disc pl-3 space-y-2 text-lg text-gray-700">
                                <li>To provide, personalize, and improve our services and website.</li>
                                <li>To communicate with you, including sending updates, offers, or responding to inquiries.</li>
                                <li>To analyze usage patterns to improve user experience.</li>
                            </ul>
                        </div>

                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Protect Your Information</h2>
                        <p className="flex justify-center items-center text-center text-lg text-gray-700">
                            We implement industry-standard security measures to protect your personal information, including:
                        </p>
                        <div className='flex justify-center items-center text-center'>
                            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                                <li>Encryption to secure sensitive data during transmission.</li>
                                <li>Regular security audits and updates to maintain the safety of our systems.</li>
                                <li>Limiting access to personal data to authorized personnel only.</li>
                            </ul>
                        </div>
                        <p className="text-lg text-gray-700 mt-4">
                            While we take every effort to protect your data, no method of online transmission is completely secure. We cannot guarantee absolute security.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
                        <p className="flex justify-center items-center text-center text-lg text-gray-700">
                            As a user, you have the following rights regarding your personal information:
                        </p>
                        <div className='flex justify-center items-center text-center'>
                            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                                <li><strong>Right to access:</strong> You can request access to the data we hold about you.</li>
                                <li><strong>Right to correction:</strong> You can request correction of any inaccuracies in your personal data.</li>
                                <li><strong>Right to deletion:</strong> You can request the deletion of your personal data under certain circumstances.</li>
                                <li><strong>Right to object:</strong> You can object to the processing of your data in certain situations.</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies and Tracking Technologies</h2>
                        <p className="text-lg text-gray-700">
                            Our website uses cookies and other tracking technologies to enhance your user experience. Cookies are small data files stored on your device. You can manage cookie settings through your browser, but disabling cookies may affect certain features of the website.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to This Privacy Policy</h2>
                        <p className="text-lg text-gray-700">
                            We reserve the right to update or modify this Privacy Policy at any time. Any changes will be reflected on this page, and the "Last updated" date will be revised. We encourage you to periodically review this page to stay informed about our privacy practices.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                        <p className="text-lg text-gray-700">
                            If you have any questions or concerns about this Privacy Policy or your personal data, please contact us at <strong>support@example.com</strong>.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
