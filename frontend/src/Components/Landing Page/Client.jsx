import React, { useEffect } from "react";
import "./LandingPage.css";
import client1 from "../../Assets/client-1.jpg";
import client2 from "../../Assets/client-2.jpg";
import client3 from "../../Assets/client-3.jpg";
import client4 from "../../Assets/client-4.jpg";
import ScrollReveal from "scrollreveal";
import Swiper from "swiper";
import { useLanguage } from "../../Context/LanguageContext";

const Client = () => {
  const { t } = useLanguage();

  const testimonials = {
    en: [
      "The trainers here customized a plan that balanced my work-life demands, and I've seen remarkable progress in my fitness journey.",
      "The trainers' expertise and the gym's commitment to cleanliness during these times have made it a safe haven.",
      "The variety of classes and the supportive community have kept me motivated. I've shed pounds and gained confidence.",
      "This gym's 24/7 access has been a lifesaver. The convenience here is unbeatable."
    ],
    fr: [
      "Les entraîneurs ici ont personnalisé un plan qui équilibre mes exigences professionnelles, et j'ai constaté des progrès remarquables dans mon parcours de remise en forme.",
      "L'expertise des entraîneurs et l'engagement de la salle de sport en matière de propreté en ont fait un havre de paix.",
      "La variété des cours et la communauté solidaire m'ont gardé motivé. J'ai perdu du poids et gagné en confiance.",
      "L'accès 24/7 à cette salle de sport a été une bouée de sauvetage. La commodité ici est imbattable."
    ]
  };

  const names = {
    en: ["Jane Smith", "Emily Carter", "John Davis", "David Martinez"],
    fr: ["Jane Smith", "Emily Carter", "John Davis", "David Martinez"]
  };

  const professions = {
    en: ["Marketing Manager", "Registered Nurse", "Teacher", "Entrepreneur"],
    fr: ["Responsable Marketing", "Infirmière Diplômée", "Enseignant", "Entrepreneur"]
  };

  const { language } = useLanguage();

  useEffect(() => {
    const scrollRevealOption = {
      distance: "50px",
      origin: "bottom",
      duration: 1000,
    };

    ScrollReveal().reveal(".header__image img", scrollRevealOption);
    ScrollReveal().reveal(
      ".header__content h4, .header__content .section__header",
      {
        ...scrollRevealOption,
        delay: 500,
      }
    );
    ScrollReveal().reveal(".header__content p", {
      ...scrollRevealOption,
      delay: 1000,
    });
    ScrollReveal().reveal(".header__btn", {
      ...scrollRevealOption,
      delay: 1500,
    });

    ScrollReveal().reveal(".about__image img", {
      ...scrollRevealOption,
      origin: "left",
    });
    ScrollReveal().reveal(".about__content .section__header", {
      ...scrollRevealOption,
      delay: 500,
    });
    ScrollReveal().reveal(".about__content .section__description", {
      ...scrollRevealOption,
      delay: 1000,
    });
    ScrollReveal().reveal(".about__card", {
      ...scrollRevealOption,
      delay: 1500,
      interval: 500,
    });

    ScrollReveal().reveal(".price__card", {
      ...scrollRevealOption,
      interval: 500,
    });

    new Swiper(".swiper", {
      loop: true,
      slidesPerView: "auto",
      spaceBetween: 20,
    });
  }, []);

  return (
    <section className="section__container client__container" id="client">
      <h2 className="section__header">{t.whatPeopleSay}</h2>
      <p className="section__description">
        {t.testimonialsDesc}
      </p>
      <div className="swiper">
        <div className="swiper-wrapper">
          {[client1, client2, client3, client4].map((client, index) => (
            <div className="swiper-slide" key={index}>
              <div className="client__card">
                <img src={client} alt={`client-${index + 1}`} />
                <div className="client__ratings">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      <i
                        className={i < 4 ? "ri-star-fill" : "ri-star-line"}
                      ></i>
                    </span>
                  ))}
                </div>
                <p>
                  {testimonials[language][index]}
                </p>
                <h4>
                  {names[language][index]}
                </h4>
                <h5>
                  {professions[language][index]}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Client;