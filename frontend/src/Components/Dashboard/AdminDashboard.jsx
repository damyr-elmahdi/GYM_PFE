import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const { user, token, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalClients: 0,
    numberSubscriptions: 0,
    numberSales: 0,
  });
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscriptionsLoading, setSubscriptionsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch dashboard stats
        const statsResponse = await fetch("/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });

        if (!statsResponse.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const statsData = await statsResponse.json();

        if (statsData.data) {
          setStats({
            totalClients: statsData.data.totalClients || 0,
            numberSubscriptions: statsData.data.numberSubscriptions || 0,
            numberSales: statsData.data.numberSales || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    const fetchSubscriptions = async () => {
      try {
        setSubscriptionsLoading(true);
        // Fetch subscriptions
        const response = await fetch("/api/admin/subscriptions", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch subscriptions");
        }

        const data = await response.json();
        console.log("Fetched subscriptions:", data);
        setSubscriptions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
        toast.error("Failed to load subscription data");
      } finally {
        setSubscriptionsLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
      fetchSubscriptions();
    }
  }, [token]);

  const handleCancelSubscription = async (subscriptionId) => {
    try {
      const response = await fetch(`/api/admin/subscriptions/${subscriptionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Subscription cancelled successfully");
        // Remove the cancelled subscription from the list
        setSubscriptions(subscriptions.filter(sub => sub.id !== subscriptionId));
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to cancel subscription");
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast.error("An error occurred while cancelling the subscription");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        logout();
        navigate("/login-register");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Link 
            to="/" 
            className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Return to Home
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-lg">Welcome, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="p-6">
        {/* Stats Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Clients</h3>
            {loading ? (
              <div className="animate-pulse h-8 w-16 bg-gray-200 rounded"></div>
            ) : (
              <p className="text-3xl font-bold text-blue-600">
                {stats.totalClients}
              </p>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Number of Subscriptions</h3>
            {loading ? (
              <div className="animate-pulse h-8 w-16 bg-gray-200 rounded"></div>
            ) : (
              <p className="text-3xl font-bold text-green-600">
                {stats.numberSubscriptions}
              </p>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Number of Sales
            </h3>
            {loading ? (
              <div className="animate-pulse h-8 w-16 bg-gray-200 rounded"></div>
            ) : (
              <p className="text-3xl font-bold text-purple-600">
                {stats.numberSales}
              </p>
            )}
          </div>
        </div>

        {/* Subscriptions Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Subscriptions Management</h2>
          {subscriptionsLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="text-xl text-blue-600 font-semibold animate-pulse">
                Loading subscriptions...
              </div>
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
              <p className="text-yellow-700">No subscriptions found. Subscriptions will appear here once users subscribe to plans.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">User</th>
                    <th className="p-3 text-left">Plan</th>
                    <th className="p-3 text-left">Start Date</th>
                    <th className="p-3 text-left">End Date</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((subscription) => (
                    <tr key={subscription.id} className="border-b">
                      <td className="p-3">{subscription.user?.name || 'Unknown User'}</td>
                      <td className="p-3 capitalize">{subscription.plan_type} Plan</td>
                      <td className="p-3">{new Date(subscription.start_date).toLocaleDateString()}</td>
                      <td className="p-3">{new Date(subscription.end_date).toLocaleDateString()}</td>
                      <td className="p-3">
                        <span className={`
                          px-2 py-1 rounded-full text-xs font-bold
                          ${subscription.status === 'active' ? 'bg-green-100 text-green-800' : 
                            subscription.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}
                        `}>
                          {subscription.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3">
                        {subscription.status === 'active' && (
                          <button 
                            onClick={() => handleCancelSubscription(subscription.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Admin Tools */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Admin Controls
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-700">
                User Management
              </h3>
              <p className="text-gray-600 mt-2">
                Create, update, or delete user accounts
              </p>
              <Link
                to="/admin/users"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
              >
                Manage Users
              </Link>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-700">
                Exercise Management
              </h3>
              <p className="text-gray-600 mt-2">
                Create and manage fitness exercises
              </p>
              <Link
                to="/admin/exercises"
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
              >
                Manage Exercises
              </Link>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-700">
                Product Management
              </h3>
              <p className="text-gray-600 mt-2">
                Create and manage store products
              </p>
              <div className="flex space-x-2 mt-4">
                <Link
                  to="/admin/products"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
                >
                  Manage Products
                </Link>
                <Link
                  to="/admin/products/create"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
                >
                  Create Product
                </Link>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-700">
                Pricing Management
              </h3>
              <p className="text-gray-600 mt-2">
                Modify subscription plans and pricing
              </p>
              <Link
                to="/admin/pricing"
                className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
              >
                Manage Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;