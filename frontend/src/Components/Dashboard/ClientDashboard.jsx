import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";
import Calculator from "../CalorieCalculator/Calculator";
import Food from "../Food/Food";
import ClientExerciseList from "../Exercises/ClientExerciseList";
import ClientProductList from "../Product/ClientProductList ";
import 'react-tabs/style/react-tabs.css';


const ClientDashboard = () => {
  const { user, setToken, setUser, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    subscriptionDaysLeft: 0,
    favoriteExercises: 0,
    purchasedProducts: 0,
  });

  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [cartItemCount, setCartItemCount] = useState(0);

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
          
          // Calculate days left in subscription
          if (subscriptionData.end_date) {
            const endDate = new Date(subscriptionData.end_date);
            const today = new Date();
            const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
            setStats(prev => ({ ...prev, subscriptionDaysLeft: daysLeft > 0 ? daysLeft : 0 }));
          }
        }

        // Fetch cart items count
        const cartResponse = await fetch("/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (cartResponse.ok) {
          const cartData = await cartResponse.json();
          setCartItemCount(cartData.items?.length || 0);
        }

        // Fetch favorite exercises count
        const favoritesResponse = await fetch("/api/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (favoritesResponse.ok) {
          const favoritesData = await favoritesResponse.json();
          setStats(prev => ({ ...prev, favoriteExercises: favoritesData.length || 0 }));
        }

        // Fetch purchased products count
        const ordersResponse = await fetch("/api/order-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          // Calculate total purchased products across all orders
          let totalPurchases = 0;
          ordersData.forEach(order => {
            order.items?.forEach(item => {
              totalPurchases += item.quantity;
            });
          });
          setStats(prev => ({ ...prev, purchasedProducts: totalPurchases }));
        }
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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

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

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };
  
  const navigateToProfile = () => {
    navigate("/client/profile");
    setShowProfileDropdown(false);
  };

  const navigateToCart = () => {
    navigate("/client/cart");
  };

  // Custom tab renderer to avoid HeaderBody duplication
  const renderTabContent = (index) => {
    switch(index) {
      case 1: 
        return <div className="calculator-container"><Calculator noHeader={true} /></div>;
      case 2:
        return <div className="food-container"><Food noHeader={true} /></div>;
      case 3:
        return <div className="exercise-container"><ClientExerciseList /></div>;
      case 4:
        return <div className="store-container"><ClientProductList /></div>;
      default:
        return renderDashboardContent();
    }
  };

  const renderDashboardContent = () => (
    <>
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
            Days Left in Subscription
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats.subscriptionDaysLeft}
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
          <h3 className="text-lg font-semibold text-gray-700">Products Purchased</h3>
          <p className="text-3xl font-bold text-purple-600">
            {stats.purchasedProducts}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-700">
              Exercise Library
            </h3>
            <p className="text-gray-600 mt-2">
              Browse and discover new exercises
            </p>
            <button
              onClick={() => setActiveTab(3)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
            >
              View Exercises
            </button>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-700">Store</h3>
            <p className="text-gray-600 mt-2">
              Browse and purchase fitness products
            </p>
            <button
              onClick={() => setActiveTab(4)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
            >
              Visit Store
            </button>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-700">
              Shopping Cart
            </h3>
            <p className="text-gray-600 mt-2">
              View your cart and checkout items
            </p>
            <button
              onClick={navigateToCart}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
            >
              Go to Cart {cartItemCount > 0 && `(${cartItemCount})`}
            </button>
          </div>
        </div>
      </div>
    </>
  );

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
          {/* Cart Button */}
          <button
            onClick={navigateToCart}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition duration-300 flex items-center space-x-2"
          >
            <i className="ri-shopping-cart-2-line"></i>
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          
          {/* Profile Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={toggleProfileDropdown}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors">
                <span className="text-lg font-bold">{user?.name?.charAt(0) || 'U'}</span>
              </div>
            </button>
            
            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg w-64 z-50">
                <div className="p-4 border-b">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-xl font-bold text-blue-600">{user?.name?.charAt(0) || 'U'}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button
                    onClick={navigateToProfile}
                    className="w-full text-left p-2 hover:bg-gray-100 text-black rounded transition-colors"
                  >
                    Profile Settings
                  </button>
                  <Link
                    to="/client/subscription"
                    className="block w-full text-left p-2 hover:bg-gray-100 text-black rounded transition-colors"
                  >
                    Subscription Details
                  </Link>
                  <Link
                    to="/client/cart"
                    className="block w-full text-left p-2 hover:bg-gray-100 text-black rounded transition-colors"
                  >
                    Shopping Cart {cartItemCount > 0 && `(${cartItemCount})`}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left p-2 text-red-600 hover:bg-gray-100 rounded transition-colors mt-2 border-t pt-3"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* TabMenu Navigation */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <ul className="flex border-b">
            <li className={`mr-1 ${activeTab === 0 ? 'border-b-2 border-blue-500' : ''}`}>
              <button
                className={`bg-white inline-block py-2 px-4 font-semibold ${activeTab === 0 ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
                onClick={() => setActiveTab(0)}
              >
                Dashboard
              </button>
            </li>
            <li className={`mr-1 ${activeTab === 1 ? 'border-b-2 border-blue-500' : ''}`}>
              <button
                className={`bg-white inline-block py-2 px-4 font-semibold ${activeTab === 1 ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
                onClick={() => setActiveTab(1)}
              >
                Calorie Calculator
              </button>
            </li>
            <li className={`mr-1 ${activeTab === 2 ? 'border-b-2 border-blue-500' : ''}`}>
              <button
                className={`bg-white inline-block py-2 px-4 font-semibold ${activeTab === 2 ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
                onClick={() => setActiveTab(2)}
              >
                Food Library
              </button>
            </li>
            <li className={`mr-1 ${activeTab === 3 ? 'border-b-2 border-blue-500' : ''}`}>
              <button
                className={`bg-white inline-block py-2 px-4 font-semibold ${activeTab === 3 ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
                onClick={() => setActiveTab(3)}
              >
                Exercise Library
              </button>
            </li>
            <li className={`mr-1 ${activeTab === 4 ? 'border-b-2 border-blue-500' : ''}`}>
              <button
                className={`bg-white inline-block py-2 px-4 font-semibold ${activeTab === 4 ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
                onClick={() => setActiveTab(4)}
              >
                Store
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        {renderTabContent(activeTab)}
      </div>
    </div>
  );
};

// Profile component for editing user information
const ProfileSettings = () => {
  const { user, token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    height: "",
    weight: "",
    fitnessGoal: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile data
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const profileData = await response.json();
          setFormData({
            name: profileData.name || user?.name || "",
            email: profileData.email || user?.email || "",
            phone: profileData.phone || "",
            address: profileData.address || "",
            height: profileData.height || "",
            weight: profileData.weight || "",
            fitnessGoal: profileData.fitnessGoal || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating profile");
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
      {loading ? (
        <div className="animate-pulse">Loading profile data...</div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Fitness Goal</label>
              <select
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select a goal</option>
                <option value="weightLoss">Weight Loss</option>
                <option value="muscleGain">Muscle Gain</option>
                <option value="endurance">Endurance</option>
                <option value="flexibility">Flexibility</option>
                <option value="general">General Fitness</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ClientDashboard;