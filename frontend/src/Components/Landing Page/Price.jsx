import React, { useState, useEffect, useContext } from "react";
import "./LandingPage.css";
import price1 from "../../Assets/price-1.png";
import price2 from "../../Assets/price-2.png";
import price3 from "../../Assets/price-3.png";
import { AppContext } from "../../Context/AppContext";
import { toast } from 'react-toastify';

const Price = () => {
  const [plans, setPlans] = useState([]);
  const { user, token } = useContext(AppContext);

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

    try {
      const response = await fetch('/api/subscribe', {
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

      const data = await response.json();

      if (response.ok) {
        toast.success(`Successfully subscribed to ${planType} plan!`);
      } else {
        toast.error(data.message || 'Subscription failed');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('An error occurred while subscribing');
    }
  };

  return (
    <section className="section__container price__container" id="price">
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