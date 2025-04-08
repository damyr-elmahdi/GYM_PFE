import React from 'react';
import { useLanguage } from '../../Context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center px-3 py-1 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
    >
      <span className={`mr-2 font-medium ${language === 'en' ? 'font-bold' : 'opacity-60'}`}>EN</span>
      <span className="mx-1">|</span>
      <span className={`ml-2 font-medium ${language === 'fr' ? 'font-bold' : 'opacity-60'}`}>FR</span>
    </button>
  );
};

export default LanguageToggle;