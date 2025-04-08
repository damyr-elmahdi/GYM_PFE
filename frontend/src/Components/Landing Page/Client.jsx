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
  const { t, language } = useLanguage();

  // Sample client testimonials data with multi-language support
  const clientData = [
    {
      name: {
        en: "Jane Smith",
        fr: "Jane Smith",
        ar: "جين سميث"
      },
      role: {
        en: "Marketing Manager",
        fr: "Responsable Marketing",
        ar: "مدير تسويق"
      },
      testimonial: {
        en: "The trainers here customized a plan that balanced my work-life demands, and I've seen remarkable progress in my fitness journey.",
        fr: "Les entraîneurs ici ont personnalisé un plan qui équilibre mes exigences professionnelles, et j'ai constaté des progrès remarquables dans mon parcours de remise en forme.",
        ar: "قام المدربون هنا بتخصيص خطة توازن بين متطلبات عملي وحياتي، وقد شهدت تقدمًا ملحوظًا في رحلة لياقتي."
      },
      image: client1
    },
    {
      name: {
        en: "Emily Carter",
        fr: "Emily Carter",
        ar: "إميلي كارتر"
      },
      role: {
        en: "Registered Nurse",
        fr: "Infirmière Diplômée",
        ar: "ممرضة مسجلة"
      },
      testimonial: {
        en: "The trainers' expertise and the gym's commitment to cleanliness during these times have made it a safe haven.",
        fr: "L'expertise des entraîneurs et l'engagement de la salle de sport en matière de propreté en ont fait un havre de paix.",
        ar: "خبرة المدربين والتزام الصالة الرياضية بالنظافة خلال هذه الأوقات جعلتها ملاذًا آمنًا."
      },
      image: client2
    },
    {
      name: {
        en: "John Davis",
        fr: "John Davis",
        ar: "جون ديفيس"
      },
      role: {
        en: "Teacher",
        fr: "Enseignant",
        ar: "مدرس"
      },
      testimonial: {
        en: "The variety of classes and the supportive community have kept me motivated. I've shed pounds and gained confidence.",
        fr: "La variété des cours et la communauté solidaire m'ont gardé motivé. J'ai perdu du poids et gagné en confiance.",
        ar: "تنوع الفصول والمجتمع الداعم أبقاني متحمسًا. لقد فقدت الوزن واكتسبت الثقة."
      },
      image: client3
    },
    {
      name: {
        en: "David Martinez",
        fr: "David Martinez",
        ar: "ديفيد مارتينيز"
      },
      role: {
        en: "Entrepreneur", 
        fr: "Entrepreneur",
        ar: "رائد أعمال"
      },
      testimonial: {
        en: "This gym's 24/7 access has been a lifesaver. The convenience here is unbeatable.",
        fr: "L'accès 24/7 à cette salle de sport a été une bouée de sauvetage. La commodité ici est imbattable.",
        ar: "كان الوصول على مدار الساعة طوال أيام الأسبوع إلى هذه الصالة الرياضية بمثابة منقذ للحياة. الراحة هنا لا مثيل لها."
      },
      image: client4
    }
  ];

  // Safely access language-specific content with fallback to English
  const getLocalizedContent = (item, field) => {
    if (item && item[field] && item[field][language]) {
      return item[field][language];
    }
    // Fallback to English if the translation isn't available
    return item && item[field] ? item[field].en : "";
  };

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
          {clientData.map((client, index) => (
            <div className="swiper-slide" key={index}>
              <div className="client__card">
                <img src={client.image} alt={getLocalizedContent(client, "name")} />
                <div className="client__ratings">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      <i
                        className={i < 4 ? "ri-star-fill" : "ri-star-line"}
                      ></i>
                    </span>
                  ))}
                </div>
                <p>{getLocalizedContent(client, "testimonial")}</p>
                <h4>{getLocalizedContent(client, "name")}</h4>
                <h5>{getLocalizedContent(client, "role")}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Client;