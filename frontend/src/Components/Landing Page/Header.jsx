import React, { useContext, useState } from "react";
import "./LandingPage.css";
import logo from "../../Assets/logo.png";
import header from "../../Assets/header.png";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { useLanguage } from "../../Context/LanguageContext";
import { toast } from 'react-toastify';

const Header = () => {
  const { user, setUser, setToken } = useContext(AppContext);
  const { language, toggleLanguage, t } = useLanguage();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const navigateToDashboard = () => {
    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user.role === "client") {
      navigate("/client/dashboard");
    }
    setShowDropdown(false);
  };

  const handleJoinToday = () => {
    navigate("/pricing");
  };

  return (
    <header className="header">
      <nav>
        <div className="nav__header">
          <div className="nav__logo">
            <a href="#">
              <img src={logo} alt="logo" />
              Power
            </a>
          </div>
          <div className="nav__menu__btn" id="menu-btn">
            <span>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
        <ul className="nav__links" id="nav-links">
          <li className="link">
            <a href="#home">{t.home}</a>
          </li>
          <li className="link">
            <a href="#about">{t.about}</a>
          </li>
          <li className="link">
            <a href="#class">{t.classes}</a>
          </li>
          <li className="link">
            <a href="#trainer">{t.trainers}</a>
          </li>
          <li className="link">
            <a href="#price">{t.pricing}</a>
          </li>
          <li className="link language-toggle">
            <button 
              className="btn language-btn"
              onClick={toggleLanguage}
            >
              {language === 'en' ? 'FR' : 'EN'}
            </button>
          </li>
          <li className="link user-dropdown-container">
            {user ? (
              <div className="user-dropdown">
                <button className="btn user-btn" onClick={toggleDropdown}>
                  {t.welcome}, {user.name}
                </button>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <button className="dashboard-btn" onClick={navigateToDashboard}>
                      Dashboard
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login-register">
                <button className="btn">{t.login}</button>
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <div className="section__container header__container" id="home">
        <div className="header__image">
          <img src={header} alt="header" />
        </div>
        <div className="header__content">
          <h4>{t.buildBody}</h4>
          <h1 className="section__header">{t.shapeYourself}</h1>
          <p>{t.unleashPotential}</p>
          <div className="header__btn">
            <button className="btn" onClick={handleJoinToday}>{t.joinToday}</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;