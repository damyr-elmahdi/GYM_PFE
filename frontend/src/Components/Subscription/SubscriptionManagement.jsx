import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";

const SubscriptionManagement = () => {
  const { user, token } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [subscription, setSubscription] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch subscription details
        const subscriptionResponse = await fetch("/api/my-subscription", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (subscriptionResponse.ok) {
          const subscriptionData = await subscriptionResponse.json();
          setSubscription(subscriptionData);
        }
        
        // Fetch available plans
        const plansResponse = await fetch("/api/plans");
        if (plansResponse.ok) {
          const plansData = await plansResponse.json();
          setPlans(Object.entries(plansData).map(([key, plan]) => ({
            ...plan,
            type: key
          })));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load subscription data");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleUpgrade = (planType) => {
    navigate('/payment', { 
      state: { 
        planType, 
        planName: plans.find(plan => plan.type === planType).name,
        planPrice: plans.find(plan => plan.type === planType).price 
      } 
    });
  };

  const handleCancelSubscription = async () => {
    try {
      const response = await fetch(`/api/admin/subscriptions/${subscription.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Subscription cancelled successfully");
        navigate("/client/dashboard");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to cancel subscription");
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast.error("An error occurred while cancelling your subscription");
    } finally {
      setCancelDialogOpen(false);
    }
  };

  const isPlanHigherTier = (planType) => {
    const tiers = { basic: 1, weekly: 2, monthly: 3 };
    return subscription ? tiers[planType] > tiers[subscription.plan_type] : true;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-xl">Loading subscription details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Manage Your Subscription</h1>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        {/* Current Subscription */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Current Subscription</h2>
          
          {subscription ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Plan Details</h3>
                <p className="text-blue-600 text-xl font-bold mb-2">
                  {subscription.plan_type.toUpperCase()} PLAN
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Price:</span> ${subscription.price}/month
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Start Date:</span> {new Date(subscription.start_date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">End Date:</span> {new Date(subscription.end_date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Status:</span> 
                  <span className={`ml-2 font-bold ${subscription.status === "active" ? "text-green-600" : "text-red-600"}`}>
                    {subscription.status.toUpperCase()}
                  </span>
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Plan Features</h3>
                <ul className="list-disc list-inside space-y-1">
                  {JSON.parse(subscription.features).map((feature, index) => (
                    <li key={index} className="text-gray-700">{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-gray-700">
              <p>You don't have an active subscription</p>
              <button
                onClick={() => navigate('/pricing')}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Subscribe Now
              </button>
            </div>
          )}
        </div>

        {/* Upgrade Options */}
        {subscription && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Upgrade Options</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div key={plan.type} className={`border rounded-lg p-4 ${subscription.plan_type === plan.type ? 'border-green-500 bg-green-50' : ''}`}>
                  <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                  <p className="text-blue-600 font-bold mb-2">${plan.price}/month</p>
                  
                  <h4 className="font-medium mb-1">Features:</h4>
                  <ul className="list-disc list-inside mb-4 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="text-gray-600">{feature}</li>
                    ))}
                  </ul>
                  
                  {subscription.plan_type === plan.type ? (
                    <div className="bg-green-500 text-white px-3 py-2 rounded text-center">
                      Current Plan
                    </div>
                  ) : (
                    <button
                      onClick={() => handleUpgrade(plan.type)}
                      className={`w-full ${isPlanHigherTier(plan.type) ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'} text-white px-3 py-2 rounded`}
                    >
                      {isPlanHigherTier(plan.type) ? 'Upgrade' : 'Downgrade'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cancel Subscription */}
        {subscription && subscription.status === 'active' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Cancel Subscription</h2>
            <p className="text-gray-700 mb-4">
              By cancelling your subscription, you will lose access to premium features at the end of your current billing period.
            </p>
            <button
              onClick={() => setCancelDialogOpen(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Cancel Subscription
            </button>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate('/client/dashboard')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Cancel Confirmation Dialog */}
        {cancelDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Confirm Cancellation</h3>
              <p className="mb-6">Are you sure you want to cancel your subscription? This action cannot be undone.</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setCancelDialogOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={handleCancelSubscription}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionManagement;