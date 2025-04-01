import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";

const ClientDashboard = () => {
  const { user, setToken, setUser, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    completedWorkouts: 0,
    favoriteExercises: 0,
    streakDays: 0,
  });

  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        // Placeholder for other stats - replace with actual API calls
        setStats({
          completedWorkouts: 12,
          favoriteExercises: 8,
          streakDays: 5,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
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
          <h1 className="text-2xl font-bold">Client Dashboard</h1>
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
        {/* Subscription Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your Subscription
          </h2>
          {loading ? (
            <div className="animate-pulse">Loading subscription...</div>
          ) : subscription ? (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold">Current Plan</h3>
                <p className="text-blue-600 text-xl">
                  {subscription.plan_type.toUpperCase()} PLAN
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Subscription Details</h3>
                <p>
                  Start Date:{" "}
                  {new Date(subscription.start_date).toLocaleDateString()}
                </p>
                <p>
                  End Date:{" "}
                  {new Date(subscription.end_date).toLocaleDateString()}
                </p>
                <p>
                  Status:{" "}
                  <span
                    className={`font-bold ${
                      subscription.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {subscription.status.toUpperCase()}
                  </span>
                </p>
              </div>
              <div className="md:col-span-2">
                <Link
                  to="/client/subscription"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
                >
                  Manage Subscription
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <p>No active subscription</p>
              <Link
                to="/pricing"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 inline-block mt-4"
              >
                Subscribe Now
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Workouts Completed
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {stats.completedWorkouts}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Favorite Exercises
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {stats.favoriteExercises}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Day Streak</h3>
            <p className="text-3xl font-bold text-purple-600">
              {stats.streakDays}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-700">
                Exercise Library
              </h3>
              <p className="text-gray-600 mt-2">
                Browse and discover new exercises
              </p>
              <Link
                to="/client/exercises"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
              >
                View Exercises
              </Link>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-700">
                My Workouts
              </h3>
              <p className="text-gray-600 mt-2">
                View and track your workout progress
              </p>
              <Link
                to="/client/workouts"
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
              >
                My Workouts
              </Link>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-700">Store</h3>
              <p className="text-gray-600 mt-2">
                Browse and purchase fitness products
              </p>
              <Link
                to="/client/products"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
              >
                Visit Store
              </Link>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-700">
                Profile Settings
              </h3>
              <p className="text-gray-600 mt-2">
                Update your profile and preferences
              </p>
              <Link
                to="/client/profile"
                className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Workout Progress */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Recent Activity
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-100 text-left text-gray-600 font-semibold">
                    Date
                  </th>
                  <th className="py-2 px-4 bg-gray-100 text-left text-gray-600 font-semibold">
                    Workout
                  </th>
                  <th className="py-2 px-4 bg-gray-100 text-left text-gray-600 font-semibold">
                    Duration
                  </th>
                  <th className="py-2 px-4 bg-gray-100 text-left text-gray-600 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4">Mar 17, 2025</td>
                  <td className="py-3 px-4">Full Body Workout</td>
                  <td className="py-3 px-4">45 minutes</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Mar 15, 2025</td>
                  <td className="py-3 px-4">Arm Day</td>
                  <td className="py-3 px-4">30 minutes</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Mar 14, 2025</td>
                  <td className="py-3 px-4">Leg Day</td>
                  <td className="py-3 px-4">50 minutes</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommended Workouts */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Recommended Workouts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="h-40 bg-gray-300"></div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">Core Strength</h3>
                <p className="text-gray-600 text-sm mt-1">
                  20 minutes • Beginner
                </p>
                <p className="mt-2 text-sm">
                  Focus on building core strength with this quick workout
                </p>
                <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600">
                  Start Workout
                </button>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="h-40 bg-gray-300"></div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">Upper Body Power</h3>
                <p className="text-gray-600 text-sm mt-1">
                  30 minutes • Intermediate
                </p>
                <p className="mt-2 text-sm">
                  Build strength in your upper body with these exercises
                </p>
                <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600">
                  Start Workout
                </button>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="h-40 bg-gray-300"></div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">Full Body HIIT</h3>
                <p className="text-gray-600 text-sm mt-1">
                  45 minutes • Advanced
                </p>
                <p className="mt-2 text-sm">
                  High intensity interval training for maximum results
                </p>
                <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600">
                  Start Workout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
