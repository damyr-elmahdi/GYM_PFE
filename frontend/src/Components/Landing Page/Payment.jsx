import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { toast } from 'react-toastify';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext);
  const { planType, planName, planPrice } = location.state || {};
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
  });
  
  const [loading, setLoading] = useState(false);
  
  if (!planType) {
    navigate('/pricing');
    return null;
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Step 1: Process payment
      const paymentResponse = await fetch('/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          cardDetails: formData,
          amount: planPrice
        })
      });
      
      const paymentData = await paymentResponse.json();
      
      if (!paymentResponse.ok) {
        throw new Error(paymentData.message || 'Payment processing failed');
      }
      
      // Step 2: Create subscription
      const subscriptionResponse = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          plan_type: planType,
          user_id: user.id
        })
      });
      
      const subscriptionData = await subscriptionResponse.json();
      
      if (!subscriptionResponse.ok) {
        throw new Error(subscriptionData.message || 'Subscription failed');
      }
      
      toast.success(`Successfully subscribed to ${planName}!`);
      
      // Fixed navigation - directly navigate without setTimeout
      navigate('/client/dashboard', { replace: true });
      
    } catch (error) {
      console.error('Payment/subscription error:', error);
      toast.error(error.message || 'An error occurred during payment processing');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Payment Details</h2>
          <p className="mt-2 text-gray-600">
            Subscribe to {planName} for ${planPrice}/month
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">Cardholder Name</label>
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              placeholder="John Doe"
              value={formData.cardholderName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700">Billing Address</label>
            <textarea
              id="billingAddress"
              name="billingAddress"
              rows="3"
              value={formData.billingAddress}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/pricing')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : 'Complete Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;