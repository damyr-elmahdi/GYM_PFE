import React from "react";
import "./LandingPage.css";
import trainer1 from "../../Assets/trainer-1.jpg";
import trainer2 from "../../Assets/trainer-2.jpg";
import trainer3 from "../../Assets/trainer-3.jpg";
import { useLanguage } from "../../Context/LanguageContext";

const Trainer = () => {
  const { t } = useLanguage();
  
  return (
    <section className="section__container trainer__container" id="trainer">
      <h2 className="section__header">{t.ourTrainers}</h2>
      <p className="section__description">
        {t.trainersDesc}
      </p>
      <div className="trainer__grid">
        <div className="trainer__card">
          <img src={trainer1} alt="trainer" />
        </div>
        <div className="trainer__card">
          <div className="trainer__content">
            <h4>{t.jamesRodriguez}</h4>
            <h5>{t.strengthConditioning}</h5>
            <hr />
            <p>
              {t.jamesDesc}
            </p>
            <div className="trainer__socials">
              <a href="#">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="#">
                <i className="ri-google-fill"></i>
              </a>
              <a href="#">
                <i className="ri-instagram-line"></i>
              </a>
              <a href="#">
                <i className="ri-twitter-fill"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="trainer__card">
          <img src={trainer2} alt="trainer" />
        </div>
        <div className="trainer__card">
          <div className="trainer__content">
            <h4>{t.markHarris}</h4>
            <h5>{t.hiitFunctional}</h5>
            <hr />
            <p>
              {t.markDesc}
            </p>
            <div className="trainer__socials">
              <a href="#">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="#">
                <i className="ri-google-fill"></i>
              </a>
              <a href="#">
                <i className="ri-instagram-line"></i>
              </a>
              <a href="#">
                <i className="ri-twitter-fill"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="trainer__card">
          <img src={trainer3} alt="trainer" />
        </div>
        <div className="trainer__card">
          <div className="trainer__content">
            <h4>{t.emilyDavis}</h4>
            <h5>{t.yogaMindfulness}</h5>
            <hr />
            <p>
              {t.emilyDesc}
            </p>
            <div className="trainer__socials">
              <a href="#">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="#">
                <i className="ri-google-fill"></i>
              </a>
              <a href="#">
                <i className="ri-instagram-line"></i>
              </a>
              <a href="#">
                <i className="ri-twitter-fill"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trainer;