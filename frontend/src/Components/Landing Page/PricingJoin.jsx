import React, { useState, useEffect, useContext } from "react";
import "./LandingPage.css";
import price1 from "../../Assets/price-1.png";
import price2 from "../../Assets/price-2.png";
import price3 from "../../Assets/price-3.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { toast } from 'react-toastify';
import { useLanguage } from "../../Context/LanguageContext";

const PriceJoin = () => {
    const [plans, setPlans] = useState([]);
    const { user, token } = useContext(AppContext);
    const navigate = useNavigate();
    const { t, language } = useLanguage();

    const planDescriptions = {
        en: {
            basic: "Perfect for beginners who are just starting their fitness journey.",
            weekly: "Ideal for those with a busy schedule who want flexible workout times.",
            premium: "The ultimate fitness experience with full access to all amenities."
        },
        fr: {
            basic: "Parfait pour les débutants qui commencent leur parcours de remise en forme.",
            weekly: "Idéal pour ceux qui ont un emploi du temps chargé et qui souhaitent des horaires d'entraînement flexibles.",
            premium: "L'expérience de remise en forme ultime avec un accès complet à tous les équipements."
        }
    };

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await fetch('/api/plans');
                const data = await response.json();
                
                const translatedPlans = Object.entries(data).map(([key, plan]) => {
                  
                    const translatedFeatures = plan.features.map(feature => {
                       
                        return language === 'fr' && key === 'basic' ? 
                            feature.replace('Access', 'Accès').replace('classes', 'cours') : 
                            feature;
                    });

                    return {
                        ...plan,
                        type: key,
                        description: planDescriptions[language][key] || plan.description,
                        features: translatedFeatures,
                        image: key === 'basic' ? price1 : key === 'weekly' ? price2 : price3
                    };
                });
                
                setPlans(translatedPlans);
            } catch (error) {
                console.error('Error fetching plans:', error);
            }
        };

        fetchPlans();
    }, [language]);

    const handleSubscribe = async (planType) => {
        if (!user) {
            toast.error(language === 'en' ? 'Please log in to subscribe' : 'Veuillez vous connecter pour vous abonner');
            return;
        }

        
        navigate('/payment', {
            state: {
                planType,
                planName: plans.find(plan => plan.type === planType).name,
                planPrice: plans.find(plan => plan.type === planType).price
            }
        });
    };

    return (
        <section className="section__container price__container" id="price">
            <h2 className="section__header">{t.ourPricing}</h2>
            <p className="section__description">
                {t.pricingDesc}
            </p>
            <div className="price__grid">
                {plans.map((plan) => (
                    <div key={plan.type} className="price__card">
                        <div className="price__content">
                            <h4>{plan.name}</h4>
                            <img src={plan.image} alt={plan.name} />
                            <p>{plan.description}</p>
                            <hr />
                            <h4>{t.keyFeatures}</h4>
                            {plan.features.map((feature, index) => (
                                <p key={index}>{feature}</p>
                            ))}
                            <div className="text-center mt-4">
                                <h3 className="text-2xl font-bold text-blue-600">
                                    ${plan.price}/{language === 'en' ? 'month' : 'mois'}
                                </h3>
                            </div>
                        </div>
                        <button
                            onClick={() => handleSubscribe(plan.type)}
                            className="btn"
                        >
                            {t.subscribeNow}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PriceJoin;