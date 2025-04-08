import React from 'react';
import { useLanguage } from '../../Context/LanguageContext';

const LanguageToggle = () => {
  const { language, setSpecificLanguage } = useLanguage();

  return (
    <div className="flex items-center px-3 py-1 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300">
      <button 
        onClick={() => setSpecificLanguage('en')}
        className={`px-2 font-medium ${language === 'en' ? 'font-bold' : 'opacity-60'}`}
      >
        EN
      </button>
      <span className="mx-1">|</span>
      <button 
        onClick={() => setSpecificLanguage('fr')}
        className={`px-2 font-medium ${language === 'fr' ? 'font-bold' : 'opacity-60'}`}
      >
        FR
      </button>
      <span className="mx-1">|</span>
      <button 
        onClick={() => setSpecificLanguage('ar')}
        className={`px-2 font-medium ${language === 'ar' ? 'font-bold' : 'opacity-60'}`}
      >
        عربي
      </button>
    </div>
  );
};

export default LanguageToggle;