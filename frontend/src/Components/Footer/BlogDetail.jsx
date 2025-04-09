import React from 'react';
import { useParams, Link } from 'react-router-dom';

const blogPosts = [
    {
        id: '1',
        title: "5 Essential Gym Tips for Beginners",
        date: "April 5, 2025",
        content:
            "Getting started at the gym can be intimidating. These 5 tips will help you ease into a routine, stay consistent, and avoid injuries...",
        image: "https://images.pexels.com/photos/2261482/pexels-photo-2261482.jpeg",
    },
    {
        id: '2',
        title: "Top 10 Exercises to Build Muscle Fast",
        date: "March 28, 2025",
        content:
            "Building muscle effectively means focusing on compound lifts, proper form, and a progressive overload strategy...",
        image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
    },
    {
        id: '3',
        title: "The Importance of Nutrition in Fitness",
        date: "March 15, 2025",
        content:
            "Nutrition fuels your workouts and recovery. This article explains macronutrients, timing, and common mistakes people make...",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    },
];

const BlogDetail = () => {
    const { id } = useParams();
    const post = blogPosts.find((p) => p.id === id);

    if (!post) return <div className="text-center p-8">Blog post not found.</div>;

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-md mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
                <p className="text-sm text-gray-500 mb-6">{post.date}</p>
                <p className="text-lg text-gray-700 leading-relaxed">{post.content}</p>
                <Link to="/blog-page">
                    <button className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        ← Back to Blog
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BlogDetail;
