import React from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessPage = () => {
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

        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <button
                    className="absolute text-black px-4 py-2 rounded-lg transition-transform duration-300 mt-[0px] ml-[-30px] hover:scale-105"
                    onClick={handleBackClick}  // Custom click handler
                > &larr; Back
                </button>
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Partner with M-Power</h1>
                <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                    M-Power is not just a gym — it’s a thriving fitness ecosystem. We work with businesses, trainers, and health brands to promote a culture of wellness and peak performance. Join us in our mission to make fitness accessible and impactful.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Corporate Wellness Programs</h2>
                        <p className="text-gray-600 mb-4">
                            Give your employees the gift of health. Our corporate wellness packages include on-site training, virtual sessions, and personalized fitness plans that boost productivity and morale.
                        </p>
                        <ul className="list-disc pl-5 text-gray-500 space-y-2">
                            <li>Custom fitness plans for teams</li>
                            <li>Health challenges and workshops</li>
                            <li>Discounted memberships</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Partnership Opportunities</h2>
                        <p className="text-gray-600 mb-4">
                            We collaborate with brands, trainers, and fitness startups to co-create value. Whether you're launching a health product or promoting wellness events, we offer a powerful platform and active community.
                        </p>
                        <ul className="list-disc pl-5 text-gray-500 space-y-2">
                            <li>Product placement in our gyms</li>
                            <li>Sponsored fitness events</li>
                            <li>Cross-promotional campaigns</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Franchise & Investment</h2>
                        <p className="text-gray-600 mb-4">
                            Interested in owning a fitness business? M-Power offers franchising opportunities with a proven model and full operational support. Let’s grow together.
                        </p>
                        <ul className="list-disc pl-5 text-gray-500 space-y-2">
                            <li>Established brand recognition</li>
                            <li>Full training & onboarding</li>
                            <li>Marketing and management support</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why M-Power?</h2>
                        <p className="text-gray-600 mb-4">
                            Trusted by thousands of clients, M-Power combines innovative fitness strategies with community-centered values. Whether you're a local business or a global brand, we’re here to make fitness your business.
                        </p>
                        <ul className="list-disc pl-5 text-gray-500 space-y-2">
                            <li>Strong community presence</li>
                            <li>Innovative training approach</li>
                            <li>Results-driven and data-backed</li>
                        </ul>
                    </div>
                </div>

                <div className="text-center mt-16">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Let’s Build Something Strong Together</h3>
                    <p className="text-gray-600 mb-6">
                        Have an idea or proposal? We’re always open to new collaborations that make a difference in the fitness world.
                    </p>
                    <a
                        href="mailto:business@fitzone.com"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Contact Our Business Team
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BusinessPage;
