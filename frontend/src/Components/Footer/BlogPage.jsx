import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BlogPage = () => {
    const blogPosts = [
        {
            id: 1,
            title: "5 Essential Gym Tips for Beginners",
            date: "April 5, 2025",
            description:
                "New to the gym? Learn how to get started the right way with these 5 essential tips for beginners.",
            image: "https://images.pexels.com/photos/2261482/pexels-photo-2261482.jpeg",
        },
        {
            id: 2,
            title: "Top 10 Exercises to Build Muscle Fast",
            date: "March 28, 2025",
            description:
                "Discover the most effective exercises that will help you build muscle and improve strength quickly.",
            image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
        },
        {
            id: 3,
            title: "The Importance of Nutrition in Fitness",
            date: "March 15, 2025",
            description:
                "Training hard is only part of the journey. Learn why nutrition plays a key role in your fitness success.",
            image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        },
    ];

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
                    className="absolute text-black px-4 py-2 rounded-lg transition-transform duration-300 mt-[-0px] ml-[-0px] hover:scale-105"
                    onClick={handleBackClick} 
                > &larr; Back
                </button>
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Gym Blog</h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                src={post.image}
                                alt={post.title}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                                <p className="text-sm text-gray-500 mb-4">{post.date}</p>
                                <p className="text-gray-700 mb-4">{post.description}</p>
                                <Link to={`/blog/${post.id}`} className="text-blue-600 font-semibold hover:underline">
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
