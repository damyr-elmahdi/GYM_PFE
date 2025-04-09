import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BMICalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };

    const handleHeightChange = (e) => {
        setHeight(e.target.value);
    };

    const calculateBMI = (e) => {
        e.preventDefault();
        if (!weight || !height) {
            alert('Please enter both weight and height');
            return;
        }

        
        const heightInMeters = height / 100;
       
        const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

       
        let bmiCategory = '';
        if (calculatedBmi < 18.5) {
            bmiCategory = 'Underweight';
        } else if (calculatedBmi >= 18.5 && calculatedBmi < 24.9) {
            bmiCategory = 'Normal weight';
        } else if (calculatedBmi >= 25 && calculatedBmi < 29.9) {
            bmiCategory = 'Overweight';
        } else {
            bmiCategory = 'Obesity';
        }

        setBmi(calculatedBmi);
        setCategory(bmiCategory);
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
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <button
                className="absolute text-black px-4 py-2 rounded-lg transition-transform duration-300 mt-[-570px] ml-[-1200px] hover:scale-105"
                onClick={handleBackClick}  
            > &larr; Back
            </button>
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">


                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">BMI Calculator</h1>
                <form onSubmit={calculateBMI} className="space-y-6">
                    <div>
                        <label htmlFor="weight" className="block text-lg font-medium text-gray-700">Weight (kg)</label>
                        <input
                            type="number"
                            id="weight"
                            name="weight"
                            value={weight}
                            onChange={handleWeightChange}
                            className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                            placeholder="Enter weight in kilograms"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="height" className="block text-lg font-medium text-gray-700">Height (cm)</label>
                        <input
                            type="number"
                            id="height"
                            name="height"
                            value={height}
                            onChange={handleHeightChange}
                            className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                            placeholder="Enter height in centimeters"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Calculate BMI
                    </button>
                </form>

                {bmi && (
                    <div className="mt-8 text-center">
                        <h2 className="text-xl font-semibold text-gray-800">Your BMI: {bmi}</h2>
                        <p className="text-lg text-gray-600 mt-2">Category: {category}</p>
                    </div>
                )}
            </div>

           
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 mt-12 mx-4">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">What is BMI?</h2>
                <p className="text-lg text-gray-700">
                    Body Mass Index (BMI) is a measure of body fat based on your weight in relation to your height.
                    It is a useful tool to determine whether you are underweight, at a healthy weight, overweight,
                    or obese. The BMI is calculated by dividing your weight in kilograms by the square of your height in meters.
                </p>
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800">BMI Categories:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                        <li><strong>Underweight:</strong> A BMI of less than 18.5.</li>
                        <li><strong>Normal weight:</strong> A BMI between 18.5 and 24.9.</li>
                        <li><strong>Overweight:</strong> A BMI between 25 and 29.9.</li>
                        <li><strong>Obesity:</strong> A BMI of 30 or higher.</li>
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default BMICalculator;
