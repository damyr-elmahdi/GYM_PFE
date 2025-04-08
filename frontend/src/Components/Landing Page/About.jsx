import React from "react";
import "./LandingPage.css";
import about from "../../Assets/about.png";
import dot from "../../Assets/dot-bg.png";
import { useLanguage } from "../../Context/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  return (
    <section className="section__container about__container" id="about">
      <div className="about__image">
        <img className="about__bg" src={dot} alt="bg" />
        <img src={about} alt="about" />
      </div>
      <div className="about__content">
        <h2 className="section__header">{t.ourStory}</h2>
        <p className="section__description">
          {t.classYouWillGet}
        </p>
        <div className="about__grid">
          <div className="about__card">
            <span>
              <i className="ri-open-arm-line"></i>
            </span>
            <div>
              <h4>{t.openDoorPolicy}</h4>
              <p>
                {t.openDoorDesc}
              </p>
            </div>
          </div>
          <div className="about__card">
            <span>
              <i className="ri-shield-cross-line"></i>
            </span>
            <div>
              <h4>{t.fullyInsured}</h4>
              <p>
                {t.fullyInsuredDesc}
              </p>
            </div>
          </div>
          <div className="about__card">
            <span>
              <i className="ri-p2p-line"></i>
            </span>
            <div>
              <h4>{t.personalTrainer}</h4>
              <p>
                {t.personalTrainerDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;