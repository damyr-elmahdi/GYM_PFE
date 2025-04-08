import React, { createContext, useState, useContext } from 'react';

// Create the translations object with all text content in both languages
export const translations = {
  en: {
    // Header
    home: "Home",
    about: "About",
    classes: "Classes",
    trainers: "Trainers",
    pricing: "Pricing",
    login: "Login",
    welcome: "Welcome",
    joinToday: "Join Today",
    buildBody: "Build Your Body &",
    shapeYourself: "Shape Yourself!",
    unleashPotential: "Unleash your potential and embark on a journey towards a stronger, fitter, and more confident you. Sign up for 'Make Your Body Shape' now and witness the incredible transformation your body is capable of!",
    
    // About
    ourStory: "Our Story",
    classYouWillGet: "Led by our team of expert and motivational instructors, \"The Class You Will Get Here\" is a high-energy, results-driven session that combines a perfect blend of cardio, strength training, and functional exercises.",
    openDoorPolicy: "Open Door Policy",
    openDoorDesc: "We believe in providing unrestricted access to all individuals, regardless of their fitness level, age, or background.",
    fullyInsured: "Fully Insured",
    fullyInsuredDesc: "Your peace of mind is our top priority, and our commitment to your safety extends to every aspect of your fitness journey.",
    personalTrainer: "Personal Trainer",
    personalTrainerDesc: "With personalized workout plans tailored to your needs, we will ensure that you get the most out of your gym experience.",
    
    // Classes
    ourClasses: "Our Classes",
    classesDesc: "Discover a diverse range of exhilarating classes at our gym designed to cater to all fitness levels and interests. Whether you're a seasoned athlete or just starting your fitness journey, our classes offer something for everyone.",
    strengthTraining: "Strength Training",
    resistanceTraining: "Resistance Training",
    flexibilityMobility: "Flexibility & Mobility",
    yogaPilates: "Yoga & Pilates",
    hiit: "HIIT",
    circuitTraining: "Circuit Training",
    groupFitness: "Group Fitness",
    zumbaOrDance: "Zumba or Dance",
    
    // Trainers
    ourTrainers: "Our Trainers",
    trainersDesc: "Our trainers are more than just experts in exercise; they are passionate about helping you achieve your health and fitness goals. Our trainers are equipped to tailor workout programs to meet your unique needs.",
    jamesRodriguez: "James Rodriguez",
    strengthConditioning: "Strength and Conditioning",
    jamesDesc: "With a background in competitive sports, he's dedicated to helping you reach your peak physical performance.",
    markHarris: "Mark Harris",
    hiitFunctional: "HIIT and Functional",
    markDesc: "His energetic and dynamic workouts are designed to push your limits, boost metabolism, and torch calories.",
    emilyDavis: "Emily Davis",
    yogaMindfulness: "Yoga and Mindfulness",
    emilyDesc: "Emily's sessions are about physical postures and also about cultivating inner peace and mindfulness.",
    
    // Pricing
    ourPricing: "Our Pricing",
    pricingDesc: "Our pricing plan comes with various membership tiers, each tailored to cater to different preferences and fitness aspirations.",
    keyFeatures: "Key Features",
    subscribeNow: "Subscribe Now",
    
    // Client Testimonials
    whatPeopleSay: "What People Say About Us?",
    testimonialsDesc: "These testimonials serve as a testament to our commitment to helping individuals achieve their fitness goals, and fostering a supportive environment for everyone who walks through our doors.",
    
    // Footer
    company: "Company",
    business: "Business",
    franchise: "Franchise",
    partnership: "Partnership",
    network: "Network",
    aboutUs: "About Us",
    blogs: "Blogs",
    security: "Security",
    careers: "Careers",
    contact: "Contact",
    contactUs: "Contact Us",
    privacyPolicy: "Privacy Policy",
    termsConditions: "Terms & Conditions",
    bmiCalculator: "BMI Calculator",
    copyright: "Copyright © 2025 Web Design Mastery. All rights reserved.",
    footerTagline: "Take the first step towards a healthier, stronger you with our unbeatable pricing plans. Let's sweat, achieve, and conquer together!"
  },
  fr: {
    // Header
    home: "Accueil",
    about: "À Propos",
    classes: "Cours",
    trainers: "Entraîneurs",
    pricing: "Tarifs",
    login: "Connexion",
    welcome: "Bienvenue",
    joinToday: "Rejoignez-nous",
    buildBody: "Construisez Votre Corps &",
    shapeYourself: "Sculptez-Vous!",
    unleashPotential: "Libérez votre potentiel et embarquez pour un voyage vers un vous plus fort, plus en forme et plus confiant. Inscrivez-vous à 'Façonnez Votre Corps' maintenant et soyez témoin de l'incroyable transformation dont votre corps est capable!",
    
    // About
    ourStory: "Notre Histoire",
    classYouWillGet: "Dirigés par notre équipe d'instructeurs experts et motivants, \"Les Cours Que Vous Obtiendrez Ici\" sont des séances énergiques et axées sur les résultats qui combinent un mélange parfait de cardio, de musculation et d'exercices fonctionnels.",
    openDoorPolicy: "Politique Portes Ouvertes",
    openDoorDesc: "Nous croyons en l'accès sans restriction pour tous les individus, quel que soit leur niveau de forme physique, leur âge ou leur origine.",
    fullyInsured: "Entièrement Assuré",
    fullyInsuredDesc: "Votre tranquillité d'esprit est notre priorité absolue, et notre engagement envers votre sécurité s'étend à tous les aspects de votre parcours de remise en forme.",
    personalTrainer: "Entraîneur Personnel",
    personalTrainerDesc: "Avec des plans d'entraînement personnalisés adaptés à vos besoins, nous vous assurons de tirer le meilleur parti de votre expérience en salle de sport.",
    
    // Classes
    ourClasses: "Nos Cours",
    classesDesc: "Découvrez une gamme diversifiée de cours exaltants dans notre salle de sport, conçus pour répondre à tous les niveaux de forme physique et à tous les intérêts. Que vous soyez un athlète chevronné ou que vous commenciez tout juste votre parcours de mise en forme, nos cours offrent quelque chose pour tout le monde.",
    strengthTraining: "Entraînement de Force",
    resistanceTraining: "Entraînement de Résistance",
    flexibilityMobility: "Flexibilité & Mobilité",
    yogaPilates: "Yoga & Pilates",
    hiit: "HIIT",
    circuitTraining: "Entraînement en Circuit",
    groupFitness: "Fitness de Groupe",
    zumbaOrDance: "Zumba ou Danse",
    
    // Trainers
    ourTrainers: "Nos Entraîneurs",
    trainersDesc: "Nos entraîneurs sont plus que de simples experts en exercice; ils sont passionnés par l'aide qu'ils vous apportent pour atteindre vos objectifs de santé et de forme physique. Nos entraîneurs sont équipés pour adapter les programmes d'entraînement à vos besoins uniques.",
    jamesRodriguez: "James Rodriguez",
    strengthConditioning: "Force et Conditionnement",
    jamesDesc: "Avec une expérience dans les sports de compétition, il est déterminé à vous aider à atteindre votre performance physique maximale.",
    markHarris: "Mark Harris",
    hiitFunctional: "HIIT et Fonctionnel",
    markDesc: "Ses entraînements énergiques et dynamiques sont conçus pour repousser vos limites, stimuler le métabolisme et brûler des calories.",
    emilyDavis: "Emily Davis",
    yogaMindfulness: "Yoga et Pleine Conscience",
    emilyDesc: "Les séances d'Emily portent sur les postures physiques mais aussi sur la culture de la paix intérieure et de la pleine conscience.",
    
    // Pricing
    ourPricing: "Nos Tarifs",
    pricingDesc: "Notre plan tarifaire comprend différents niveaux d'abonnement, chacun adapté pour répondre à différentes préférences et aspirations de remise en forme.",
    keyFeatures: "Caractéristiques Principales",
    subscribeNow: "S'abonner Maintenant",
    
    // Client Testimonials
    whatPeopleSay: "Ce Que Les Gens Disent De Nous?",
    testimonialsDesc: "Ces témoignages sont la preuve de notre engagement à aider les individus à atteindre leurs objectifs de forme physique et à favoriser un environnement de soutien pour tous ceux qui franchissent nos portes.",
    
    // Footer
    company: "Entreprise",
    business: "Affaires",
    franchise: "Franchise",
    partnership: "Partenariat",
    network: "Réseau",
    aboutUs: "À Propos de Nous",
    blogs: "Blogs",
    security: "Sécurité",
    careers: "Carrières",
    contact: "Contact",
    contactUs: "Contactez-Nous",
    privacyPolicy: "Politique de Confidentialité",
    termsConditions: "Termes et Conditions",
    bmiCalculator: "Calculateur IMC",
    copyright: "Copyright © 2025 Web Design Mastery. Tous droits réservés.",
    footerTagline: "Faites le premier pas vers un vous plus sain et plus fort avec nos forfaits imbattables. Transpirons, réalisons et conquérons ensemble!"
  }
};

// Create the context
export const LanguageContext = createContext();

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Language provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default language is English
  
  // Function to toggle between languages
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'fr' : 'en');
  };
  
  // Get translations for the current language
  const t = translations[language];
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};