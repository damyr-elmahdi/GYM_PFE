import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PricingManagement = () => {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Basic Plan",
      price: 19.99,
      features: ["Smart workout plan", "At home workouts"]
    },
    {
      id: 2,
      name: "Weekly Plan",
      price: 49.99,
      features: ["PRO Gyms", "Smart workout plan", "At home workouts"]
    },
    {
      id: 3,
      name: "Monthly Plan",
      price: 99.99,
      features: ["ELITE Gyms & Classes", "PRO Gyms", "Smart workout plan", "At home workouts", "Personal Training"]
    }
  ]);

  const navigate = useNavigate();

  const handleUpdatePlan = (planId) => {
    // Logic to update a specific plan
    console.log(`Updating plan ${planId}`);
  };

  const handleCreatePlan = () => {
    // Logic to create a new plan
    console.log("Creating new plan");
  };

  const handleDeletePlan = (planId) => {
    // Logic to delete a plan
    setPlans(plans.filter(plan => plan.id !== planId));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Pricing Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div key={plan.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
              <p className="text-3xl font-bold text-blue-600 mb-4">${plan.price}/month</p>
              
              <h3 className="font-semibold mb-2">Features:</h3>
              <ul className="mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">• {feature}</li>
                ))}
              </ul>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleUpdatePlan(plan.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeletePlan(plan.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <button 
            onClick={handleCreatePlan}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Create New Plan
          </button>
        </div>
        
        <div className="mt-8">
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingManagement;