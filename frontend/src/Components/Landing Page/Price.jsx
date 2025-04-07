import React, { useState, useEffect, useContext } from "react";
import "./LandingPage.css";
import price1 from "../../Assets/price-1.png";
import price2 from "../../Assets/price-2.png";
import price3 from "../../Assets/price-3.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { toast } from 'react-toastify';

const Price = () => {
  const [plans, setPlans] = useState([]);
  const { user, token } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/plans');
        const data = await response.json();
        setPlans(Object.entries(data).map(([key, plan]) => ({
          ...plan,
          type: key,
          image: key === 'basic' ? price1 : key === 'weekly' ? price2 : price3
        })));
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async (planType) => {
    if (!user) {
      toast.error('Please log in to subscribe');
      return;
    }

    // Navigate to payment page with plan information
    navigate('/payment', {
      state: {
        planType,
        planName: plans.find(plan => plan.type === planType).name,
        planPrice: plans.find(plan => plan.type === planType).price
      }
    });
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
    <section className="section__container price__container" id="price">
      <button
        className="absolute text-black px-4 py-2 rounded-lg transition-transform duration-300 mt-[0px] ml-[0px] hover:scale-105"
        onClick={handleBackClick}  // Custom click handler
      > &larr; Back
      </button>
      <h2 className="section__header">Our Pricing</h2>
      <p className="section__description">
        Our pricing plan comes with various membership tiers, each tailored to
        cater to different preferences and fitness aspirations.
      </p>
      <div className="price__grid">
        {plans.map((plan) => (
          <div key={plan.type} className="price__card">
            <div className="price__content">
              <h4>{plan.name}</h4>
              <img src={plan.image} alt={plan.name} />
              <p>{plan.description || 'Fitness plan tailored to your needs.'}</p>
              <hr />
              <h4>Key Features</h4>
              {plan.features.map((feature, index) => (
                <p key={index}>{feature}</p>
              ))}
              <div className="text-center mt-4">
                <h3 className="text-2xl font-bold text-blue-600">${plan.price}/month</h3>
              </div>
            </div>
            <button
              onClick={() => handleSubscribe(plan.type)}
              className="btn"
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Price;