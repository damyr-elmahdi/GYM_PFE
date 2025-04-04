import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";

const CartPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [formData, setFormData] = useState({
    payment_method: "credit_card",
    card_number: "",
    card_expiry: "",
    card_cvv: "",
    shipping_address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "US"
  });

  useEffect(() => {
    // Get cart data if not passed through location state
    if (!location.state || !location.state.planPrice) {
      fetchCartItems();
    } else {
      setCartTotal(location.state.planPrice);
    }
  }, [location.state]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();
      setCartItems(data.items || []);
      setCartTotal(data.total || 0);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      
      // Create shipping address string
      const shippingAddress = `${formData.shipping_address}, ${formData.city}, ${formData.state} ${formData.zip_code}, ${formData.country}`;
      
      // Determine if this is a subscription or a regular purchase
      const isSubscription = location.state && location.state.planType && location.state.planType !== 'cart-purchase';
      
      // Choose the appropriate endpoint
      const endpoint = isSubscription ? "/api/subscribe" : "/api/checkout";
      
      // Prepare the request body
      const requestBody = {
        payment_method: formData.payment_method,
        shipping_address: shippingAddress
      };
      
      // Add plan-specific data if this is a subscription
      if (isSubscription) {
        requestBody.plan_type = location.state.planType;
        requestBody.plan_name = location.state.planName;
        requestBody.plan_price = location.state.planPrice;
      }
      
      // Submit order to backend
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Payment/checkout failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Show success message
      toast.success(isSubscription 
        ? "Subscription successful! Your subscription has been activated." 
        : "Payment successful! Your order has been placed.");
      
      // Navigate to dashboard
      setTimeout(() => {
        navigate("/client/dashboard");
      }, 2000);
      
    } catch (error) {
      toast.error(`Payment/checkout error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.card_number || formData.card_number.length < 16) {
      toast.error("Please enter a valid card number");
      return false;
    }
    
    if (!formData.card_expiry || !formData.card_expiry.match(/^\d{2}\/\d{2}$/)) {
      toast.error("Please enter expiry date in MM/YY format");
      return false;
    }
    
    if (!formData.card_cvv || formData.card_cvv.length < 3) {
      toast.error("Please enter a valid CVV");
      return false;
    }
    
    if (!formData.shipping_address) {
      toast.error("Please enter your shipping address");
      return false;
    }
    
    if (!formData.city) {
      toast.error("Please enter your city");
      return false;
    }
    
    if (!formData.state) {
      toast.error("Please enter your state/province");
      return false;
    }
    
    if (!formData.zip_code) {
      toast.error("Please enter your ZIP/postal code");
      return false;
    }
    
    return true;
  };

  if (loading && !cartTotal) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-xl">Loading checkout...</p>
        </div>
      </div>
    );
  }

  // Determine if this is a subscription or regular purchase
  const isSubscription = location.state && location.state.planType && location.state.planType !== 'cart-purchase';
  const pageTitle = isSubscription ? "Subscription Checkout" : "Product Checkout";
  const paymentType = isSubscription ? location.state.planName : "Product Purchase";

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{pageTitle}</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="mt-4 flex justify-between">
              <p className="text-gray-600">{paymentType}</p>
              <p className="text-2xl font-bold">${parseFloat(cartTotal).toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Payment Method
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment_method"
                      value="credit_card"
                      checked={formData.payment_method === "credit_card"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Credit Card
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment_method"
                      value="paypal"
                      checked={formData.payment_method === "paypal"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    PayPal
                  </label>
                </div>
              </div>
              
              {formData.payment_method === "credit_card" && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="card_number">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="card_number"
                      name="card_number"
                      placeholder="1234 5678 9012 3456"
                      value={formData.card_number}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  
                  <div className="flex mb-4 space-x-4">
                    <div className="w-1/2">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="card_expiry">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="card_expiry"
                        name="card_expiry"
                        placeholder="MM/YY"
                        value={formData.card_expiry}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    
                    <div className="w-1/2">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="card_cvv">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="card_cvv"
                        name="card_cvv"
                        placeholder="123"
                        value={formData.card_cvv}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div className="mb-6 mt-8">
                <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shipping_address">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="shipping_address"
                    name="shipping_address"
                    placeholder="123 Main St"
                    value={formData.shipping_address}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                
                <div className="flex flex-wrap mb-4 -mx-2">
                  <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  
                  <div className="w-full md:w-1/2 px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                      State/Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      placeholder="NY"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap mb-4 -mx-2">
                  <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip_code">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      id="zip_code"
                      name="zip_code"
                      placeholder="10001"
                      value={formData.zip_code}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  
                  <div className="w-full md:w-1/2 px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="MX">Mexico</option>
                      <option value="UK">United Kingdom</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Back
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Processing..." : "Complete Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPayment;