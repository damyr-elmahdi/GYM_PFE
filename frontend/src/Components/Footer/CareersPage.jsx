import React from 'react';

const CareersPage = () => {
    const jobListings = [
        {
            id: 1,
            title: "Certified Personal Trainer",
            type: "Full-Time",
            location: "Marrakech, Morocco",
            description: "We're looking for an energetic and certified personal trainer to lead fitness sessions, develop personalized workout plans, and support client goals.",
        },
        {
            id: 2,
            title: "Front Desk Receptionist",
            type: "Part-Time",
            location: "Casablanca, Morocco",
            description: "Help welcome clients, manage appointments, and maintain a friendly, organized front desk environment at our gym location.",
        },
        {
            id: 3,
            title: "Fitness Content Creator",
            type: "Remote/Freelance",
            location: "Remote",
            description: "Create engaging workout videos, health blogs, and social media content that aligns with our gym's mission and brand.",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-6">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-10">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Careers at FitZone</h1>
                <p className="text-lg text-gray-600 text-center mb-10">
                    Join a passionate team that’s transforming lives through fitness, wellness, and motivation. Explore our current opportunities below.
                </p>

                <div className="space-y-6">
                    {jobListings.map((job) => (
                        <div key={job.id} className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition duration-300">
                            <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
                            <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500 mt-1 mb-3">
                                <span>{job.type}</span>
                                <span>{job.location}</span>
                            </div>
                            <p className="text-gray-700 mb-4">{job.description}</p>
                            <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Don’t see your role?</h2>
                    <p className="text-gray-600 mb-4">We’re always looking for great talent. Send us your resume and let us know how you can contribute!</p>
                    <a
                        href="mailto:careers@fitzone.com"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        careers@fitzone.com
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CareersPage;
