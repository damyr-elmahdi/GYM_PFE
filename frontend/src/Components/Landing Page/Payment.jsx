import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { toast } from 'react-toastify';

// SVG Icons for credit cards
const CardIcons = {
  visa: (
    <svg className="w-10 h-10" viewBox="0 0 780 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 0H740C762.1 0 780 17.9 780 40V460C780 482.1 762.1 500 740 500H40C17.9 500 0 482.1 0 460V40C0 17.9 17.9 0 40 0Z" fill="#0066B2" />
      <path d="M330 350L375 149H434L389 350H330Z" fill="white" />
      <path d="M556 149C541 149 526 154 519 166L445 350H508L517 323H584L591 350H649L608 149H556ZM535 277L562 196L578 277H535Z" fill="white" />
      <path d="M223 149L171 289L164 260C155 233 132 204 106 190L156 350H221L310 149H223Z" fill="white" />
      <path d="M131 149H32L31 154C98 170 145 208 164 260L150 175C148 165 140 150 131 149Z" fill="#FAA61A" />
    </svg>
  ),
  mastercard: (
    <svg className="w-10 h-10" viewBox="0 0 780 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 0H740C762.1 0 780 17.9 780 40V460C780 482.1 762.1 500 740 500H40C17.9 500 0 482.1 0 460V40C0 17.9 17.9 0 40 0Z" fill="white" />
      <path d="M449 250C449 182 502 126 568 126C634 126 688 182 688 250C688 318 634 374 568 374C502 374 449 318 449 250Z" fill="#FF5F00" />
      <path d="M305 250C305 182 358 126 424 126C490 126 544 182 544 250C544 318 490 374 424 374C358 374 305 318 305 250Z" fill="#EB001B" />
      <path d="M424 374C391 374 361 360 339 337C361 314 391 301 424 301C457 301 487 314 509 337C487 360 457 374 424 374Z" fill="#F79E1B" />
    </svg>
  ),
};

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
  const [selectedCard, setSelectedCard] = useState('');

  // Redirect if no plan selected
  if (!planType) {
    navigate('/pricing');
    return null;
  }

  // Detect card type from number
  useEffect(() => {
    const cardNumber = formData.cardNumber.replace(/\s/g, '');

    if (/^4/.test(cardNumber)) {
      setSelectedCard('visa');
    } else if (/^5[1-5]/.test(cardNumber)) {
      setSelectedCard('mastercard');
    } else {
      setSelectedCard('');
    }
  }, [formData.cardNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value
        .replace(/\s/g, '')
        .match(/.{1,4}/g)
        ?.join(' ') || '';

      setFormData({
        ...formData,
        [name]: formatted
      });
    } else if (name === 'expiryDate') {
      // Format expiry date with slash
      const cleaned = value.replace(/\D/g, '');
      let formatted = cleaned;

      if (cleaned.length > 2) {
        formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
      }

      setFormData({
        ...formData,
        [name]: formatted
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
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

  const nav = useNavigate();
  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleBackClick = () => {
    handleScrollToBottom();
    nav('/');  // Navigate to home page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <button
          className="absolute text-black px-4 py-2 rounded-lg transition-transform duration-300 mt-[-30px] ml-[-420px] hover:scale-105"
          onClick={handleBackClick}  // Custom click handler
        > &larr; Back
        </button>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Payment Details</h2>
          <p className="mt-2 text-gray-600">
            Subscribe to {planName} for ${planPrice}/month
          </p>

          {/* Card Icons */}
          <div className="flex justify-center space-x-3 mt-4">
            <div className={`transition-opacity ${selectedCard === 'visa' ? 'opacity-100' : 'opacity-40'}`}>
              {CardIcons.visa}
            </div>
            <div className={`transition-opacity ${selectedCard === 'mastercard' ? 'opacity-100' : 'opacity-40'}`}>
              {CardIcons.mastercard}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
            <div className="mt-1 relative">
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength="19"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {selectedCard && (
                <div className="absolute right-3 top-1/3 transform -translate-y-1/2 w-8 h-7">
                  {CardIcons[selectedCard]}
                </div>
              )}
            </div>
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
                maxLength="5"
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
                maxLength="4"
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