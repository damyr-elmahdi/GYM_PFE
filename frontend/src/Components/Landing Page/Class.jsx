import React from "react";
import "./LandingPage.css";
import dot from "../../Assets/dot-bg.png";
import class1 from "../../Assets/class-1.jpg";
import class2 from "../../Assets/class-2.jpg";
import class3 from "../../Assets/class-3.jpg";
import class4 from "../../Assets/class-4.jpg";
import { useLanguage } from "../../Context/LanguageContext";

const Class = () => {
  const { t } = useLanguage();
  
  return (
    <section className="section__container class__container" id="class">
      <h2 className="section__header">{t.ourClasses}</h2>
      <p className="section__description">
        {t.classesDesc}
      </p>
      <div className="class__grid">
        <div className="class__card">
          <img src={dot} alt="bg" className="class__bg" />
          <img src={class1} alt="class" />
          <div className="class__content">
            <h4>{t.strengthTraining}</h4>
            <p>{t.resistanceTraining}</p>
          </div>
        </div>
        <div className="class__card">
          <img src={dot} alt="bg" className="class__bg" />
          <img src={class2} alt="class" />
          <div className="class__content">
            <h4>{t.flexibilityMobility}</h4>
            <p>{t.yogaPilates}</p>
          </div>
        </div>
        <div className="class__card">
          <img src={dot} alt="bg" className="class__bg" />
          <img src={class3} alt="class" />
          <div className="class__content">
            <h4>{t.hiit}</h4>
            <p>{t.circuitTraining}</p>
          </div>
        </div>
        <div className="class__card">
          <img src={dot} alt="bg" className="class__bg" />
          <img src={class4} alt="class" />
          <div className="class__content">
            <h4>{t.groupFitness}</h4>
            <p>{t.zumbaOrDance}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Class;