document.documentElement.classList.add("js-enabled");

const WHATSAPP_NUMBER = "5219842384258";
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const header = document.querySelector(".site-header");
const leadForm = document.querySelector("#lead-form");
const currentYear = document.querySelector("#current-year");
const rotators = Array.from(document.querySelectorAll(".rotator"));
const langButtons = Array.from(document.querySelectorAll(".lang-btn"));
const metaDescription = document.querySelector('meta[name="description"]');
const heroVideoContainer = document.querySelector(".hero-video");
const heroPlayerIframe = document.querySelector("#hero-youtube-player");

const buildWhatsAppUrl = (message) => {
  const text = encodeURIComponent(message.trim());
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
};

const WA_MESSAGES = {
  es: {
    general_info: "Hola Tamara Club, quiero informacion sobre membresias.",
    hero_info: "Hola Tamara Club, quiero recibir informacion y disponibilidad de membresias.",
    plan_elite: "Hola Tamara Club, me interesa la membresia Rendimiento Elite. Quiero mas informacion.",
    plan_base: "Hola Tamara Club, me interesa la membresia Base Fuerte. Quiero mas informacion.",
    plan_inicio: "Hola Tamara Club, me interesa la membresia Inicio Comprometido. Quiero mas informacion.",
    plan_sesion: "Hola Tamara Club, me interesa la Sesion Unica. Quiero mas informacion.",
    online_program: "Hola Tamara Club, quiero informacion del programa Online Personalizado.",
    app_info: "Hola Tamara Club, quiero descargar la app de Tamara's Coach & Fitness Club.",
    visit_booking: "Hola Tamara Club, quiero agendar una visita para conocer el gimnasio.",
  },
  en: {
    general_info: "Hi Tamara Club, I would like information about memberships.",
    hero_info: "Hi Tamara Club, I would like membership info and current availability.",
    plan_elite: "Hi Tamara Club, I am interested in the Elite Performance membership. I would like more information.",
    plan_base: "Hi Tamara Club, I am interested in the Strong Base membership. I would like more information.",
    plan_inicio: "Hi Tamara Club, I am interested in the Committed Start membership. I would like more information.",
    plan_sesion: "Hi Tamara Club, I am interested in the Single Session. I would like more information.",
    online_program: "Hi Tamara Club, I would like information about the Online Personalized program.",
    app_info: "Hi Tamara Club, I want to download the Tamara's Coach & Fitness Club app.",
    visit_booking: "Hi Tamara Club, I want to schedule a visit to get to know the gym.",
  },
};

const I18N = {
  es: {
    title: "Tamara's Coaching & Fitness Club | Alto Rendimiento en Tulum",
    description:
      "Tamara's Coaching & Fitness Club: gimnasio de alto rendimiento en Tulum con coaching fitness estructurado, entrenador personal y programas presenciales y online.",
    menu: ["El Método", "Trayectoria", "Premios", "Programas", "Online", "App", "Ubicacion", "Transfórmate!"],
    heroEyebrow: "Tulum, Mexico",
    heroTitle: "Disciplina primero.<br>La <span>transformacion</span> es consecuencia.",
    heroLead:
      "Coaching de alto rendimiento en Tulum para quienes buscan resultados reales con estructura, seguimiento y compromiso.",
    heroPrimary: "Quiero informacion",
    heroSecondary: "Ver membresias",
    heroTag: "Grupos reducidos. Seguimiento real. Cupos limitados.",
    quoteTitle: "No es un gimnasio.<br>Es una cultura.",
    quoteLead: "Aqui no se entrena por moda. Se entrena con estructura, metodo y proposito.",
    methodEyebrow: "Metodo",
    methodTitle: "El Metodo Tamara",
    methodCopy1:
      "Trabajamos con un sistema estructurado que combina entrenamiento de fuerza, progresion semanal y control tecnico para que cada sesion tenga un objetivo claro.",
    methodCopy2:
      "No improvisamos rutinas. Evaluamos punto de partida, historial fisico y nivel de compromiso para construir un proceso sostenible, medible y realista.",
    methodCardsTitles: ["Cultura Mental", "Programacion Personalizada", "Enfoque Integral"],
    methodCardsTexts: [
      "Disciplina por encima de la motivacion. Compromiso sostenido con resultados medibles.",
      "Cada miembro avanza segun su objetivo, nivel actual y contexto real.",
      "Entrenamiento, nutricion y estrategia en un sistema claro y aplicable.",
    ],
    trajectoryEyebrow: "Coaching profesional",
    trajectoryTitle: "Experiencia real.<br>Resultados reales.",
    trajectoryLead:
      "Tamara trabaja como coach con un enfoque personalizado: evalua tu punto de partida, estructura una estrategia clara y ajusta cada fase para que avances con seguridad, consistencia y resultados medibles.",
    trajectoryList: [
      "Diagnostico inicial para conocer tu nivel real y tus necesidades.",
      "Programacion individual con objetivos claros por etapa.",
      "Correccion tecnica permanente para entrenar mejor y evitar estancarte.",
      "Seguimiento continuo para medir progreso y ajustar cuando sea necesario.",
    ],
    awardsEyebrow: "Logros",
    awardsTitle: "Premios que respaldan el metodo",
    awardsLead:
      "Los resultados de Tamara no son casualidad. Su trayectoria competitiva confirma que trabaja con estructura, disciplina y estandares de alto rendimiento en cada etapa del proceso.",
    awardsList: [
      "<strong>IFBB Miami Grand Prix 2025:</strong> 1er lugar en Women Bodyfitness Open.",
      "<strong>Mr. Tulum 2025:</strong> campeona en Body Fitness Master y Body Fitness Clasificadas.",
      "<strong>Seleccion nacional:</strong> clasificacion tras su rendimiento en Monterrey.",
      "<strong>Trayectoria consolidada:</strong> campeona estatal multiple y bicampeona nacional.",
    ],
    awardsStats: [
      ["+35", "Podios nacionales e internacionales"],
      ["2X", "Campeona nacional"],
      ["2025", "Oro internacional en Miami"],
    ],
    environmentEyebrow: "Entrenamiento",
    environmentTitle: "Un entorno que te empuja a cumplir",
    environmentLead:
      "El espacio del club esta pensado para entrenar con foco: equipamiento funcional, sesiones guiadas y una cultura donde cada persona entrena en serio sin importar su nivel de inicio.",
    plansEyebrow: "Programas",
    plansTitle: "Membresias",
    planKickers: ["Mas elegido", "Progreso constante", "Punto de partida", "Evaluacion inicial"],
    planTitles: ["Rendimiento Elite", "Base Fuerte", "Inicio Comprometido", "Sesion Unica"],
    planBullets: [
      [
        "5 sesiones por semana",
        "Grupo maximo 5 personas",
        "2 dietas mensuales y 2 evaluaciones",
        "Suplementacion + plataforma de seguimiento",
        "20% de descuento en fisioterapia",
      ],
      ["4 sesiones por semana", "1 dieta mensual", "1 evaluacion estructural"],
      ["3 sesiones por semana", "Plan de inicio estructurado"],
      ["110 minutos personalizados", "Diagnostico de base y ruta sugerida"],
    ],
    planMeta: [
      "Ideal si buscas cambios visibles y acompanamiento completo.",
      "Perfecta para consolidar habitos sin perder ritmo semanal.",
      "Recomendada para empezar con estructura y adherencia real.",
      "Para conocer tu nivel, corregir tecnica y definir siguientes pasos.",
    ],
    planButton: "Solicitar informacion",
    plansNotice:
      "*Por ahora no estamos gestionando alta online de membresias. Te asesoramos para elegir la mejor opcion segun tu objetivo.",
    audienceTitles: ["Si estas empezando", "Si ya entrenas", "Si compites"],
    audienceTexts: [
      "Construimos base tecnica, habitos y constancia sin frustracion.",
      "Ordenamos tu plan para salir del estancamiento y subir nivel.",
      "Aplicamos estrategia avanzada de rendimiento, composicion y pico competitivo.",
    ],
    onlineEyebrow: "Online",
    onlineTitle: "Alto rendimiento desde cualquier lugar.",
    onlineLead:
      "Si no estas en Tulum, puedes trabajar con Tamara en formato online con seguimiento semanal, ajustes de plan y contacto continuo por WhatsApp para sostener adherencia.",
    onlineList: [
      "Sesiones en vivo con seguimiento",
      "Activacion + entrenamiento guiado",
      "Material de estiramientos",
      "Adaptacion individual segun nivel",
    ],
    onlineNote:
      "Control de clases, seguimiento de progreso y ajustes semanales en una experiencia online clara y personalizada.",
    onlinePoints: ["Feedback semanal", "Ajustes segun avance", "Contacto directo por WhatsApp"],
    onlineButton: "Consultar programa online",
    appEyebrow: "App Tamara Club",
    appTitle: "Tu progreso en una sola aplicacion",
    appLead:
      "Descarga gratis la app de Tamara's Coach & Fitness Club en Apple Store para gestionar tus reservas, consultar rutinas y dar seguimiento a tu desarrollo y evolucion.",
    appList: [
      "Reserva y organiza tus clases en segundos.",
      "Accede a tus rutinas y tareas semanales.",
      "Monitorea avances fisicos y consistencia.",
      "Participa en la comunidad del gimnasio.",
      "Uso 100% gratuito para miembros del club.",
    ],
    appButton: "Quiero la app",
    communityEyebrow: "Comunidad",
    communityTitle: "Respeto. Constancia. Caracter.",
    communityLead: "El valor central es el respeto: por el cuerpo, por el proceso y por la palabra.",
    faqEyebrow: "FAQ",
    faqTitle: "Preguntas frecuentes",
    faqQuestions: [
      "¿Necesito experiencia previa?",
      "¿Y si tengo una lesion?",
      "¿Incluye plan nutricional?",
      "¿Puedo probar antes?",
    ],
    faqAnswers: [
      "No. El entrenamiento se adapta completamente a tu nivel.",
      "Se evalua y adapta con enfoque biomecanico para mantener progreso seguro.",
      "Si, segun el programa sugerido para tu objetivo.",
      "Si. Puedes iniciar con sesion unica para evaluarte y definir tu ruta.",
    ],
    urgencyEyebrow: "Cupos",
    urgencyTitle: "Aperturas limitadas por horario",
    urgencyText:
      "Trabajamos con grupos reducidos para mantener acompanamiento real. Si quieres entrenar con seguimiento directo, te recomendamos agendar tu lugar cuanto antes.",
    urgencyTags: [
      "Grupos maximo 5 personas",
      "Ingreso por evaluacion inicial",
      "Seguimiento 1 a 1 por WhatsApp",
    ],
    formEyebrow: "Aplicacion",
    formTitle: "Recibe asesoria personalizada",
    formLead: "Dejanos tus datos y te contactamos para recomendarte la membresia ideal.",
    formPlatform:
      "Nuestra plataforma digital permite control de clases, gestion y seguimiento estructurado de tus progresos.",
    objections: [
      "No necesitas experiencia previa.",
      "Adaptamos el plan a tu nivel y contexto.",
      "Respuesta por WhatsApp en 24 a 48 horas.",
    ],
    formButton: "Enviar por WhatsApp",
    formNote: "Al enviar, abriremos WhatsApp con tu mensaje listo para contactar al club.",
    locationEyebrow: "Ubicacion",
    locationTitle: "Conoce el club en persona",
    locationLead:
      "Si quieres transformar tu cuerpo con metodo, este es el mejor siguiente paso: venir a conocer el espacio, hablar con Tamara y definir una ruta real segun tu objetivo.",
    locationList: [
      "Visita el gimnasio y vive la energia del club.",
      "Recibe orientacion inicial segun tu nivel actual.",
      "Elige el programa que mejor se adapta a tu meta.",
    ],
    locationVisit: "Agendar visita",
    locationMap: "Abrir en Google Maps",
    fab: "Habla con Tamara",
    footerLine: "Tulum, Mexico | Gimnasio de alto rendimiento y coaching fitness en Tulum",
    copyrightLabel: "Copyright",
    copyrightText: "Tamara's Coach & Fitness Club | Desarrollo web y aplicacion desarrollada por",
  },
  en: {
    title: "Tamara's Coaching & Fitness Club | High Performance in Tulum",
    description:
      "Tamara's Coaching & Fitness Club: high-performance gym in Tulum with structured fitness coaching, personal training, and in-person plus online programs.",
    menu: ["Method", "Career", "Awards", "Programs", "Online", "App", "Location", "Transform Yourself!"],
    heroEyebrow: "Tulum, Mexico",
    heroTitle: "Discipline first.<br><span>Transformation</span> is the consequence.",
    heroLead:
      "High-performance coaching in Tulum for people who want real results through structure, follow-up, and commitment.",
    heroPrimary: "I want information",
    heroSecondary: "View memberships",
    heroTag: "Small groups. Real follow-up. Limited spots.",
    quoteTitle: "This is not a gym.<br>It is a culture.",
    quoteLead: "We do not train for trends. We train with structure, method, and purpose.",
    methodEyebrow: "Method",
    methodTitle: "The Tamara Method",
    methodCopy1:
      "We work with a structured system that combines strength training, weekly progression, and technical control so every session has a clear objective.",
    methodCopy2:
      "We do not improvise routines. We assess your starting point, physical history, and commitment level to build a sustainable, measurable, and realistic process.",
    methodCardsTitles: ["Mental Culture", "Personalized Programming", "Integrated Approach"],
    methodCardsTexts: [
      "Discipline over motivation. Sustainable commitment focused on measurable progress.",
      "Each member progresses according to goals, current level, and real-life context.",
      "Training, nutrition, and strategy combined into one clear and practical system.",
    ],
    trajectoryEyebrow: "Professional coaching",
    trajectoryTitle: "Real experience.<br>Real results.",
    trajectoryLead:
      "Tamara coaches with a fully personalized approach: she evaluates your starting point, builds a clear strategy, and adjusts every phase so you progress with safety, consistency, and measurable outcomes.",
    trajectoryList: [
      "Initial assessment to understand your real level and specific needs.",
      "Individual programming with clear goals for each phase.",
      "Continuous technical correction to train better and avoid plateaus.",
      "Ongoing follow-up to measure progress and adjust when needed.",
    ],
    awardsEyebrow: "Achievements",
    awardsTitle: "Awards that validate the method",
    awardsLead:
      "Tamara's results are not random. Her competitive path confirms a high-performance system built on structure, discipline, and measurable standards at every stage.",
    awardsList: [
      "<strong>IFBB Miami Grand Prix 2025:</strong> 1st place in Women Bodyfitness Open.",
      "<strong>Mr. Tulum 2025:</strong> champion in Body Fitness Master and Body Fitness Clasificadas.",
      "<strong>National team:</strong> qualification after her performance in Monterrey.",
      "<strong>Proven track record:</strong> multi-time state champion and two-time national champion.",
    ],
    awardsStats: [
      ["+35", "National and international podiums"],
      ["2X", "National champion"],
      ["2025", "International gold in Miami"],
    ],
    environmentEyebrow: "Training",
    environmentTitle: "An environment that pushes you to deliver",
    environmentLead:
      "The club is designed for focused training: functional equipment, guided sessions, and a culture where everyone trains seriously regardless of starting level.",
    plansEyebrow: "Programs",
    plansTitle: "Memberships",
    planKickers: ["Most chosen", "Steady progress", "Starting point", "Initial assessment"],
    planTitles: ["Elite Performance", "Strong Base", "Committed Start", "Single Session"],
    planBullets: [
      [
        "5 sessions per week",
        "Groups up to 5 people",
        "2 monthly meal plans and 2 assessments",
        "Supplement guidance + tracking platform",
        "20% discount on physiotherapy",
      ],
      ["4 sessions per week", "1 monthly meal plan", "1 structural assessment"],
      ["3 sessions per week", "Structured start-up plan"],
      ["110 personalized minutes", "Baseline assessment and suggested path"],
    ],
    planMeta: [
      "Ideal if you want visible changes and full coaching support.",
      "Perfect to build consistency without losing weekly momentum.",
      "Recommended to start with structure and real adherence.",
      "Great to assess your level, correct technique, and define next steps.",
    ],
    planButton: "Request information",
    plansNotice:
      "*Online checkout is not available yet. We guide you to choose the best option based on your goal.",
    audienceTitles: ["If you are just starting", "If you already train", "If you compete"],
    audienceTexts: [
      "We build technical foundations, habits, and consistency without frustration.",
      "We organize your plan to break stagnation and level up.",
      "We apply advanced strategy for performance, body composition, and peak condition.",
    ],
    onlineEyebrow: "Online",
    onlineTitle: "High performance from anywhere.",
    onlineLead:
      "If you are not in Tulum, you can work with Tamara online with weekly follow-up, plan adjustments, and continuous WhatsApp contact to keep consistency high.",
    onlineList: [
      "Live sessions with follow-up",
      "Activation + guided training",
      "Mobility and stretching material",
      "Individual adaptation by level",
    ],
    onlineNote:
      "Class control, progress tracking, and weekly plan adjustments in one clear and personalized online experience.",
    onlinePoints: ["Weekly feedback", "Adjustments based on progress", "Direct WhatsApp contact"],
    onlineButton: "Ask about online program",
    appEyebrow: "Tamara Club App",
    appTitle: "Your progress in one app",
    appLead:
      "Download the Tamara's Coach & Fitness Club app for free on the Apple Store to manage class bookings, view routines, and track your development and progress.",
    appList: [
      "Book and organize your classes in seconds.",
      "Access your routines and weekly tasks.",
      "Track physical progress and consistency.",
      "Join the gym community.",
      "100% free for club members.",
    ],
    appButton: "I want the app",
    communityEyebrow: "Community",
    communityTitle: "Respect. Consistency. Character.",
    communityLead: "Our core value is respect: for your body, your process, and your word.",
    faqEyebrow: "FAQ",
    faqTitle: "Frequently asked questions",
    faqQuestions: [
      "Do I need previous experience?",
      "What if I have an injury?",
      "Does it include nutrition guidance?",
      "Can I try before joining?",
    ],
    faqAnswers: [
      "No. Training is fully adapted to your current level.",
      "We evaluate and adapt using a biomechanical approach to keep progress safe.",
      "Yes, depending on the program recommended for your goal.",
      "Yes. You can start with a single session to assess your current level and define your path.",
    ],
    urgencyEyebrow: "Spots",
    urgencyTitle: "Limited openings by schedule",
    urgencyText:
      "We work with small groups to maintain real coaching quality. If you want direct follow-up, we recommend reserving your spot as soon as possible.",
    urgencyTags: ["Groups up to 5 people", "Entry by initial assessment", "1-to-1 WhatsApp follow-up"],
    formEyebrow: "Application",
    formTitle: "Get personalized guidance",
    formLead: "Leave your details and we will contact you to recommend the ideal membership.",
    formPlatform:
      "Our digital platform allows class control, management, and structured progress tracking.",
    objections: [
      "You do not need previous experience.",
      "We adapt your plan to your level and context.",
      "WhatsApp response within 24 to 48 hours.",
    ],
    formButton: "Send via WhatsApp",
    formNote: "When you submit, WhatsApp opens with your message ready to send to the club.",
    locationEyebrow: "Location",
    locationTitle: "Visit the club in person",
    locationLead:
      "If you want to transform your body with a proven method, this is your best next step: visit the space, talk with Tamara, and define a realistic path for your goal.",
    locationList: [
      "Visit the gym and feel the club energy.",
      "Receive initial guidance based on your current level.",
      "Choose the program that best fits your goal.",
    ],
    locationVisit: "Book a visit",
    locationMap: "Open in Google Maps",
    fab: "Talk to Tamara",
    footerLine: "Tulum, Mexico | High-performance gym and fitness coaching in Tulum",
    copyrightLabel: "Copyright",
    copyrightText: "Tamara's Coach & Fitness Club | Web and app developed by",
  },
};

let currentLang = localStorage.getItem("site_lang") || "es";
if (!I18N[currentLang]) {
  currentLang = "es";
}

const setText = (selector, text, useHtml = false) => {
  const node = document.querySelector(selector);
  if (!node) return;
  if (useHtml) {
    node.innerHTML = text;
  } else {
    node.textContent = text;
  }
};

const setTextAll = (selector, values) => {
  const nodes = document.querySelectorAll(selector);
  values.forEach((value, index) => {
    if (nodes[index]) {
      nodes[index].textContent = value;
    }
  });
};

const updateWhatsAppLinks = (lang) => {
  document.querySelectorAll(".js-whatsapp-link").forEach((link) => {
    const key = link.getAttribute("data-wa-key") || "general_info";
    const message = WA_MESSAGES[lang][key] || WA_MESSAGES.es[key] || WA_MESSAGES.es.general_info;
    link.setAttribute("href", buildWhatsAppUrl(message));
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
};

const enableHeroFallback = () => {
  if (heroVideoContainer) {
    heroVideoContainer.classList.add("is-fallback");
  }
};

const initHeroVideoPlayback = () => {
  if (!heroPlayerIframe || !heroVideoContainer) return;

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isReducedMotion) {
    enableHeroFallback();
    return;
  }

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (!isIOS) {
    heroVideoContainer.classList.remove("is-fallback");
    return;
  }

  let didPlay = false;

  const fallbackTimer = window.setTimeout(() => {
    if (!didPlay) enableHeroFallback();
  }, 6000);

  const onPlaybackConfirmed = () => {
    didPlay = true;
    window.clearTimeout(fallbackTimer);
    heroVideoContainer.classList.remove("is-fallback");
  };

  const apiScriptId = "youtube-iframe-api";
  if (!document.getElementById(apiScriptId)) {
    const script = document.createElement("script");
    script.id = apiScriptId;
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  }

  const startPlayer = () => {
    if (!("YT" in window) || !window.YT.Player) return;

    const player = new window.YT.Player("hero-youtube-player", {
      events: {
        onReady: (event) => {
          event.target.mute();
          event.target.setPlaybackQuality?.("hd1080");
          event.target.playVideo();
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            onPlaybackConfirmed();
          }
        },
      },
    });

    const retryPlay = () => {
      if (didPlay) return;
      try {
        player.mute();
        player.playVideo();
      } catch (_error) {
        enableHeroFallback();
      }
    };

    window.addEventListener("pageshow", retryPlay, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") retryPlay();
    });
  };

  if ("YT" in window && window.YT.Player) {
    startPlayer();
  } else {
    window.onYouTubeIframeAPIReady = startPlayer;
  }
};

const applyLanguage = (lang) => {
  const t = I18N[lang];
  if (!t) return;

  document.documentElement.lang = lang;
  document.title = t.title;
  if (metaDescription) {
    metaDescription.setAttribute("content", t.description);
  }

  setTextAll(".menu a", t.menu);
  setText(".hero-copy .eyebrow", t.heroEyebrow);
  setText(".hero-copy h1", t.heroTitle, true);
  setText(".hero-copy .lead", t.heroLead);
  setText(".hero-copy .btn", t.heroPrimary);
  setText(".hero-copy .text-link", t.heroSecondary);
  setText(".hero-copy .tagline", t.heroTag);

  setText(".section-quote h2", t.quoteTitle, true);
  setText(".section-quote .lead", t.quoteLead);

  setText("#metodo .section-header .eyebrow", t.methodEyebrow);
  setText("#metodo .section-header h2", t.methodTitle);
  setTextAll("#metodo .method-copy", [t.methodCopy1, t.methodCopy2]);
  setTextAll("#metodo .card h3", t.methodCardsTitles);
  setTextAll("#metodo .card p", t.methodCardsTexts);

  setText("#trayectoria .trayectoria-copy .eyebrow", t.trajectoryEyebrow);
  setText("#trayectoria .trayectoria-copy h2", t.trajectoryTitle, true);
  setText("#trayectoria .trayectoria-copy .lead", t.trajectoryLead);
  setTextAll("#trayectoria .trayectoria-copy .list li", t.trajectoryList);

  setText("#premios .awards-copy .eyebrow", t.awardsEyebrow);
  setText("#premios .awards-copy h2", t.awardsTitle);
  setText("#premios .awards-copy .lead", t.awardsLead);
  const awardItems = document.querySelectorAll("#premios .awards-copy .list li");
  t.awardsList.forEach((item, index) => {
    if (awardItems[index]) awardItems[index].innerHTML = item;
  });
  const awardStats = document.querySelectorAll(".awards-stat");
  t.awardsStats.forEach((stat, index) => {
    if (awardStats[index]) {
      const span = awardStats[index].querySelector("span");
      const small = awardStats[index].querySelector("small");
      if (span) span.textContent = stat[0];
      if (small) small.textContent = stat[1];
    }
  });

  setText("#entorno .section-header .eyebrow", t.environmentEyebrow);
  setText("#entorno .section-header h2", t.environmentTitle);
  setText("#entorno .container > .lead", t.environmentLead);

  setText("#membresias .section-header .eyebrow", t.plansEyebrow);
  setText("#membresias .section-header h2", t.plansTitle);
  setTextAll("#membresias .plan-kicker", t.planKickers);
  setTextAll("#membresias .plan h3", t.planTitles);
  const planItems = document.querySelectorAll("#membresias .plan");
  t.planBullets.forEach((list, index) => {
    const lis = planItems[index] ? planItems[index].querySelectorAll("ul li") : [];
    list.forEach((item, itemIndex) => {
      if (lis[itemIndex]) lis[itemIndex].textContent = item;
    });
  });
  setTextAll("#membresias .plan-meta", t.planMeta);
  setTextAll("#membresias .plan .btn", [t.planButton, t.planButton, t.planButton, t.planButton]);
  setText("#membresias > .container > .form-note", t.plansNotice);
  setTextAll("#membresias .audience-card h3", t.audienceTitles);
  setTextAll("#membresias .audience-card p", t.audienceTexts);

  setText("#online .container > div:first-child .eyebrow", t.onlineEyebrow);
  setText("#online .container > div:first-child h2", t.onlineTitle);
  setText("#online .container > div:first-child .lead", t.onlineLead);
  setTextAll("#online .container > div:first-child .list li", t.onlineList);
  setText("#online .online-note", t.onlineNote);
  setTextAll("#online .online-points li", t.onlinePoints);
  setText("#online .online-content .btn", t.onlineButton);

  setText("#app .app-section-copy .app-eyebrow", t.appEyebrow);
  setText("#app .app-section-copy h2", t.appTitle);
  setText("#app .app-section-copy .app-lead", t.appLead);
  setTextAll("#app .app-section-list li", t.appList);
  setText("#app .app-section-copy .btn", t.appButton);

  setText("#comunidad .section-header .eyebrow", t.communityEyebrow);
  setText("#comunidad .section-header h2", t.communityTitle);
  setText("#comunidad .container.content-layer > .lead", t.communityLead);

  setText("#faq .section-header .eyebrow", t.faqEyebrow);
  setText("#faq .section-header h2", t.faqTitle);
  setTextAll("#faq summary", t.faqQuestions);
  setTextAll("#faq details p", t.faqAnswers);

  setText("#aplicar .urgency-banner .eyebrow", t.urgencyEyebrow);
  setText("#aplicar .urgency-banner h3", t.urgencyTitle);
  setText("#aplicar .urgency-banner .urgency-text", t.urgencyText);
  setTextAll("#aplicar .urgency-tags span", t.urgencyTags);

  setText("#aplicar .section-header .eyebrow", t.formEyebrow);
  setText("#aplicar .section-header h2", t.formTitle);
  setText("#aplicar .section-header .form-sublead", t.formLead);
  setText("#aplicar .form-benefits > .form-note", t.formPlatform);
  setTextAll("#aplicar .objections-list p", t.objections);
  setText("#lead-form button", t.formButton);
  setText("#lead-form > .form-note", t.formNote);

  setText("#ubicacion .visit-copy .eyebrow", t.locationEyebrow);
  setText("#ubicacion .visit-copy h2", t.locationTitle);
  setText("#ubicacion .visit-copy .lead", t.locationLead);
  setTextAll("#ubicacion .visit-copy .list li", t.locationList);
  setText("#ubicacion .visit-copy .btn.btn-primary", t.locationVisit);
  setText("#ubicacion .visit-copy .btn.btn-ghost", t.locationMap);

  setText(".whatsapp-fab span:last-child", t.fab);
  setText(".site-footer p:nth-child(2)", t.footerLine);
  setText(".copyright-text", `${t.copyrightLabel} ${new Date().getFullYear()} ${t.copyrightText} `);

  const copyright = document.querySelector(".copyright-text");
  if (copyright) {
    const link = document.createElement("a");
    link.href = "https://hearttalecreative.com/";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Hearttale Creative";
    copyright.appendChild(link);
  }

  const labels = leadForm ? leadForm.querySelectorAll("label") : [];
  if (labels.length >= 5) {
    labels[0].childNodes[0].nodeValue = lang === "es" ? "Nombre" : "Name";
    labels[1].childNodes[0].nodeValue = "WhatsApp";
    labels[2].childNodes[0].nodeValue = lang === "es" ? "Correo" : "Email";
    labels[3].childNodes[0].nodeValue = lang === "es" ? "Objetivo principal" : "Main goal";
    labels[4].childNodes[0].nodeValue = lang === "es" ? "Mensaje (opcional)" : "Message (optional)";
  }

  const select = leadForm ? leadForm.querySelector('select[name="objetivo"]') : null;
  if (select) {
    const optionsEs = ["Selecciona una opcion", "Bajar grasa", "Ganar masa muscular", "Mejorar rendimiento", "Recomposicion corporal"];
    const optionsEn = ["Choose an option", "Lose fat", "Gain muscle", "Improve performance", "Body recomposition"];
    const options = lang === "es" ? optionsEs : optionsEn;
    options.forEach((optionLabel, index) => {
      if (select.options[index]) {
        select.options[index].textContent = optionLabel;
      }
    });
  }

  const textarea = leadForm ? leadForm.querySelector('textarea[name="mensaje"]') : null;
  if (textarea) {
    textarea.placeholder =
      lang === "es"
        ? "Cuentanos brevemente tu situacion actual"
        : "Tell us briefly about your current situation";
  }

  setTextAll(".lang-btn", ["ES", "EN"]);
  langButtons.forEach((btn) => btn.classList.toggle("is-active", btn.dataset.lang === lang));

  updateWhatsAppLinks(lang);
};

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    if (!I18N[lang]) return;
    currentLang = lang;
    localStorage.setItem("site_lang", currentLang);
    applyLanguage(currentLang);
  });
});

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const initRotator = (rotator, intervalMs) => {
  const slides = Array.from(rotator.querySelectorAll("img"));
  if (slides.length < 2 || reduceMotion) {
    return;
  }

  let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
  if (activeIndex < 0) {
    activeIndex = 0;
    slides[0].classList.add("is-active");
  }

  window.setInterval(() => {
    slides[activeIndex].classList.remove("is-active");
    activeIndex = (activeIndex + 1) % slides.length;
    slides[activeIndex].classList.add("is-active");
  }, intervalMs);
};

rotators.forEach((rotator, index) => {
  const duration = index === 0 ? 4600 : 3800;
  initRotator(rotator, duration);
});

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menu.classList.toggle("is-open", !expanded);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(leadForm);
    const nombre = formData.get("nombre") || "";
    const telefono = formData.get("telefono") || "";
    const correo = formData.get("correo") || (currentLang === "es" ? "No indicado" : "Not provided");
    const objetivo = formData.get("objetivo") || (currentLang === "es" ? "No indicado" : "Not provided");
    const mensaje = formData.get("mensaje") || "";

    const text =
      currentLang === "es"
        ? [
            "Hola Tamara Club, quiero recibir informacion:",
            `Nombre: ${nombre}`,
            `WhatsApp: ${telefono}`,
            `Correo: ${correo}`,
            `Objetivo: ${objetivo}`,
            `Mensaje: ${mensaje || "Sin mensaje adicional"}`,
          ].join("\n")
        : [
            "Hi Tamara Club, I would like more information:",
            `Name: ${nombre}`,
            `WhatsApp: ${telefono}`,
            `Email: ${correo}`,
            `Goal: ${objetivo}`,
            `Message: ${mensaje || "No additional message"}`,
          ].join("\n");

    window.open(buildWhatsAppUrl(text), "_blank", "noopener,noreferrer");
  });
}

if (header) {
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("is-visible"));
}

applyLanguage(currentLang);
initHeroVideoPlayback();
