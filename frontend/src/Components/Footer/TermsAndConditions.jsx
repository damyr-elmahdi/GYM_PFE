import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
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
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white shadow-lg rounded-lg text-center">
                <button
                    className="absolute text-black px-4 py-2 rounded-lg transition-transform duration-300 mt-[0px] ml-[-610px] hover:scale-105"
                    onClick={handleBackClick}  
                >
                    &larr; Back
                </button>
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Terms & Conditions</h1>
                <p className="text-lg text-gray-600 mb-8">Last updated: April 7, 2025</p>

                <section className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
                        <p className="text-lg text-gray-700">
                            Welcome to our website! By accessing or using our services, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully before using our services. If you do not agree to these terms, you may not access or use our services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceptance of Terms</h2>
                        <p className="text-lg text-gray-700">
                            By accessing or using our services, you accept and agree to be bound by these Terms and Conditions. These terms govern your use of the website, services, and any content provided by us. If you disagree with any part of these terms, please do not use our website or services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Responsibilities</h2>
                        <p className="text-lg text-gray-700">
                            As a user, you agree to use our services responsibly and in compliance with applicable laws. You will not:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                            <li>Engage in any illegal activity using our services.</li>
                            <li>Attempt to hack, damage, or disrupt the functioning of our website or services.</li>
                            <li>Violate the rights of others, including privacy or intellectual property rights.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intellectual Property</h2>
                        <p className="text-lg text-gray-700">
                            All content and materials provided on this website, including text, images, logos, and software, are the property of our company or our content providers and are protected by intellectual property laws. You may not copy, reproduce, or distribute any part of the content without prior written permission.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Privacy and Data Protection</h2>
                        <p className="text-lg text-gray-700">
                            Your privacy is important to us. We collect and process your personal data in accordance with our Privacy Policy. By using our services, you consent to the collection, use, and sharing of your personal data as described in our Privacy Policy.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
                        <p className="text-lg text-gray-700">
                            To the fullest extent permitted by law, we are not liable for any damages, losses, or expenses arising from your use or inability to use our services. This includes, but is not limited to, any direct, indirect, incidental, or consequential damages.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Termination</h2>
                        <p className="text-lg text-gray-700">
                            We may suspend or terminate your access to our services at any time, without notice, for any reason, including but not limited to violation of these Terms and Conditions. Upon termination, your right to use our services will immediately cease.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to Terms</h2>
                        <p className="text-lg text-gray-700">
                            We reserve the right to modify or update these Terms and Conditions at any time. Any changes will be reflected on this page with the updated "Last updated" date. We encourage you to review these terms periodically to stay informed about any changes.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Governing Law</h2>
                        <p className="text-lg text-gray-700">
                            These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in which our company is based. Any disputes arising from these terms will be resolved in the appropriate courts located in our jurisdiction.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                        <p className="text-lg text-gray-700">
                            If you have any questions about these Terms and Conditions or any other matters, please contact us at <strong>support@example.com</strong>.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TermsAndConditions;
