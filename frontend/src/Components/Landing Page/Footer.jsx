import React from "react";
import "./LandingPage.css";
import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";
import { useLanguage } from "../../Context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="section__container footer__container">
        <div className="footer__col">
          <div className="footer__logo">
            <a href="#">
              <img src={logo} alt="logo" />
              Power
            </a>
          </div>
          <p>
            {t.footerTagline}
          </p>
          <div className="footer__socials">
            <a href="#">
              <i className="ri-facebook-fill"></i>
            </a>

            <a href="#">
              <i className="ri-instagram-fill"></i>
            </a>
            <a href="#">
              <i className="ri-twitter-fill"></i>
            </a>
          </div>
        </div>
        <div className="footer__col">
          <h4>{t.company}</h4>
          <div className="footer__links">
            <Link to={"business-page"}>{t.business}</Link>
            <Link to={"/franchise-page"}>{t.franchise}</Link>
            <Link to={"/partnership-page"}>{t.partnership}</Link>
            <Link to={"/netwok-page"}>{t.network}</Link>
          </div>
        </div>
        <div className="footer__col">
          <h4>{t.aboutUs}</h4>
          <div className="footer__links">
            <Link to={"/blog-page"}>{t.blogs}</Link>
            <Link to={"/security-page"}>{t.security}</Link>
            <Link to={"career-page"}>{t.careers}</Link>
          </div>
        </div>
        <div className="footer__col">
          <h4>{t.contact}</h4>
          <div className="footer__links">
            <Link to={"/contact-us"}>{t.contactUs}</Link>
            <Link to={"/privacy-policy"}>{t.privacyPolicy}</Link>
            <Link to={"/terms-conditions"}>{t.termsConditions}</Link>
            <Link to={"/bmi-calculator"}>{t.bmiCalculator}</Link>
          </div>
        </div>
      </div>
      <div className="footer__bar">
        {t.copyright}
      </div>
    </footer>
  );
};

export default Footer;