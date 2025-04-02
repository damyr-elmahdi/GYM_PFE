import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const PricingManagement = () => {
  const { token } = useContext(AppContext);
  const [plans, setPlans] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    plan_type: "",
    price: "",
    features: []
  });
  const [newFeature, setNewFeature] = useState("");

  useEffect(() => {
    fetchPlans();
  }, [token]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/plans", {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch plans");
      }

      const data = await response.json();
      console.log("Fetched plans:", data);
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Failed to load subscription plans");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "price") {
      // Ensure price is a valid number
      const numValue = parseFloat(value);
      if (!isNaN(numValue) || value === "") {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      });
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const handleEdit = (planType, planDetails) => {
    setFormData({
      name: planDetails.name,
      plan_type: planType,
      price: planDetails.price.toString(),
      features: Array.isArray(planDetails.features) ? planDetails.features : []
    });
    
    setEditingPlan(planType);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setFormData({
      name: "",
      plan_type: "",
      price: "",
      features: []
    });
    
    setEditingPlan(null);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setEditingPlan(null);
    setIsCreating(false);
    setFormData({
      name: "",
      plan_type: "",
      price: "",
      features: []
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.plan_type || !formData.price) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const endpoint = isCreating 
        ? "/api/admin/plans" 
        : `/api/admin/plans/${encodeURIComponent(formData.plan_type)}`;
      
      const method = isCreating ? "POST" : "PUT";
      
      console.log(`Submitting to ${endpoint} with method ${method}`);
      console.log("Form data:", formData);
      
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          features: formData.features,
          ...(isCreating && { plan_type: formData.plan_type })
        })
      });

      const responseData = await response.json();
      console.log("Response:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to save plan");
      }

      toast.success(isCreating ? "Plan created successfully" : "Plan updated successfully");
      setIsCreating(false);
      setEditingPlan(null);
      fetchPlans();
      
    } catch (error) {
      console.error("Error saving plan:", error);
      toast.error(error.message || "Failed to save plan");
    }
  };

  const handleDelete = async (planType) => {
    if (!confirm(`Are you sure you want to delete the ${planType} plan?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/plans/${encodeURIComponent(planType)}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete plan");
      }

      toast.success("Plan deleted successfully");
      fetchPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
      toast.error(error.message || "Failed to delete plan");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Pricing Management</h1>
          <Link 
            to="/admin/dashboard" 
            className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="p-6">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Subscription Plans</h2>
            <button
              onClick={handleCreate}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Create New Plan
            </button>
          </div>

          {(editingPlan || isCreating) && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">
                {isCreating ? "Create New Plan" : `Edit ${editingPlan} Plan`}
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Plan Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="e.g. Basic Plan"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Plan Type (identifier)</label>
                    <input
                      type="text"
                      name="plan_type"
                      value={formData.plan_type}
                      onChange={handleInputChange}
                      className={`w-full p-2 border border-gray-300 rounded ${!!editingPlan ? 'bg-gray-100' : ''}`}
                      placeholder="e.g. basic"
                      disabled={!!editingPlan}
                      required
                    />
                    {!editingPlan && (
                      <p className="text-xs text-gray-500 mt-1">
                        This will be used as the plan identifier and cannot be changed later.
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Price ($)</label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="e.g. 19.99"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Features</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      className="flex-grow p-2 border border-gray-300 rounded-l"
                      placeholder="Add a feature"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddFeature();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className="mt-3">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center bg-gray-100 p-2 rounded mb-2">
                        <span className="flex-grow">{feature}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    ))}
                    {formData.features.length === 0 && (
                      <p className="text-gray-500 italic">No features added yet</p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    {isCreating ? "Create Plan" : "Update Plan"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="text-xl text-blue-600 font-semibold animate-pulse">
                Loading plans...
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(plans).map(([planType, plan]) => (
                <div key={planType} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(planType, plan)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit plan"
                      >
                        <i className="ri-edit-line text-lg"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(planType)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete plan"
                      >
                        <i className="ri-delete-bin-line text-lg"></i>
                      </button>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-blue-600 mb-4">${parseFloat(plan.price).toFixed(2)}</p>
                  <div className="divide-y">
                    {Array.isArray(plan.features) && plan.features.map((feature, index) => (
                      <div key={index} className="py-2 flex items-center">
                        <i className="ri-check-line text-green-500 mr-2"></i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingManagement;