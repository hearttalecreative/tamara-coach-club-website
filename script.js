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
    general_info: "Hola Tamara Club, quiero información sobre los programas y cómo empezar.",
    hero_info: "Hola Tamara Club, quiero recibir información y disponibilidad para entrenar en el club.",
    plan_inicio: "Hola Tamara Club, quiero suscribirme al Plan Inicio Comprometido ($3,500 MXN al mes). ¿Me pasas los detalles para empezar?",
    plan_base: "Hola Tamara Club, quiero suscribirme al Plan Base Fuerte ($4,000 MXN al mes). ¿Me pasas los detalles para empezar?",
    plan_elite: "Hola Tamara Club, quiero suscribirme al Plan Rendimiento Élite ($4,500 MXN al mes). ¿Me pasas los detalles para empezar?",
    plan_turistica: "Hola Tamara Club, quiero reservar una Sesión Turística Única ($700 MXN). ¿Qué horarios tienen disponibles?",
    online_program: "Hola Tamara Club, quiero información del programa Online Personalizado.",
    app_info: "Hola Tamara Club, quiero descargar la app de Tamara's Coach & Fitness Club.",
    visit_booking: "Hola Tamara Club, quiero agendar una visita para conocer el gimnasio.",
  },
  en: {
    general_info: "Hi Tamara Club, I'd like information about your programs and how to start.",
    hero_info: "Hi Tamara Club, I'd like info and availability to start training at the club.",
    plan_inicio: "Hi Tamara Club, I'd like to join the Committed Start Plan ($3,500 MXN/month). Could you share the details to get started?",
    plan_base: "Hi Tamara Club, I'd like to join the Strong Base Plan ($4,000 MXN/month). Could you share the details to get started?",
    plan_elite: "Hi Tamara Club, I'd like to join the Elite Performance Plan ($4,500 MXN/month). Could you share the details to get started?",
    plan_turistica: "Hi Tamara Club, I'd like to book a Single Visitor Session ($700 MXN). What times do you have available?",
    online_program: "Hi Tamara Club, I would like information about the Online Personalized program.",
    app_info: "Hi Tamara Club, I want to download the Tamara's Coach & Fitness Club app.",
    visit_booking: "Hi Tamara Club, I want to schedule a visit to get to know the gym.",
  },
};

const PLANS = [
  { key: "plan_inicio", price: 3500, period: "month", freq: 3, dur: "1.5h", tag: null },
  { key: "plan_base", price: 4000, period: "month", freq: 4, dur: "1.5h", tag: null },
  { key: "plan_elite", price: 4500, period: "month", freq: 5, dur: "1.5h", tag: "elite" },
  { key: "plan_turistica", price: 700, period: "once", freq: null, dur: "110 min", tag: "single" },
];

const I18N = {
  es: {
    title: "Gimnasio y Entrenador Personal en Tulum | Tamara's Coaching & Fitness Club",
    description:
      "Gimnasio de fitness y entrenamiento personal en Tulum, México. Entrena con Tamara, entrenadora personal y coach de alto rendimiento: fuerza, método y seguimiento real, presencial y online.",
    menu: ["Método", "Trayectoria", "Premios", "Planes", "Online", "App", "Ubicación"],
    appMenuLink: "Alumnos",
    menuCta: "Transfórmate!",
    heroAppChip: "Nueva app para iPhone: <strong>descárgala en el App Store</strong>",
    heroEyebrow: "Gimnasio y entrenamiento personal · Tulum, México",
    heroTitle: "Disciplina primero.<br>La <span>transformación</span> es consecuencia.",
    heroLead:
      "Gimnasio de alto rendimiento y entrenamiento personal en Tulum para quienes buscan resultados reales con estructura, seguimiento y compromiso.",
    heroPrimary: "Quiero información",
    heroSecondary: "Acceso alumnos",
    heroTag: "Grupos reducidos. Seguimiento real. Cupos limitados.",
    quoteTitle: "No es un gimnasio.<br>Es una cultura.",
    quoteLead: "Aquí no se entrena por moda. Se entrena con estructura, método y propósito.",
    methodEyebrow: "Método",
    methodTitle: "El Método Tamara",
    methodCopy1:
      "Trabajamos con un sistema estructurado que combina entrenamiento de fuerza, progresión semanal y control técnico para que cada sesión tenga un objetivo claro.",
    methodCopy2:
      "No improvisamos rutinas. Evaluamos punto de partida, historial físico y nivel de compromiso para construir un proceso sostenible, medible y realista.",
    methodCardsTitles: ["Cultura Mental", "Programación Personalizada", "Enfoque Integral"],
    methodCardsTexts: [
      "Disciplina por encima de la motivación. Compromiso sostenido con resultados medibles.",
      "Cada miembro avanza según su objetivo, nivel actual y contexto real.",
      "Entrenamiento, nutrición y estrategia en un sistema claro y aplicable.",
    ],
    trajectoryEyebrow: "Coaching profesional",
    trajectoryTitle: "Experiencia real.<br>Resultados reales.",
    trajectoryLead:
      "Tamara trabaja como entrenadora personal y coach en Tulum con un enfoque personalizado: evalúa tu punto de partida, estructura una estrategia clara y ajusta cada fase para que avances con seguridad, consistencia y resultados medibles.",
    trajectoryList: [
      "Diagnóstico inicial para conocer tu nivel real y tus necesidades.",
      "Programación individual con objetivos claros por etapa.",
      "Corrección técnica permanente para entrenar mejor y evitar estancarte.",
      "Seguimiento continuo para medir progreso y ajustar cuando sea necesario.",
    ],
    awardsEyebrow: "Coach de alto rendimiento",
    awardsTitle: "Premios que respaldan el método",
    awardsLead:
      "Los resultados de Tamara no son casualidad. Su trayectoria competitiva confirma que trabaja con estructura, disciplina y estándares de alto rendimiento en cada etapa del proceso.",
    awardsList: [
      "<strong>IFBB Miami Grand Prix 2025:</strong> 1er lugar en Women Bodyfitness Open.",
      "<strong>Mr. Tulum 2025:</strong> campeona en Body Fitness Master y Body Fitness Clasificadas.",
      "<strong>Selección nacional:</strong> clasificación tras su rendimiento en Monterrey.",
      "<strong>Trayectoria consolidada:</strong> campeona estatal múltiple y bicampeona nacional.",
    ],
    awardsStats: [
      ["+35", "Podios nacionales e internacionales"],
      ["2X", "Campeona nacional"],
      ["2025", "Oro internacional en Miami"],
    ],
    environmentEyebrow: "El club en Tulum",
    environmentTitle: "Un gimnasio en Tulum que te empuja a cumplir",
    environmentLead:
      "El espacio del club está pensado para entrenar con foco: equipamiento funcional, sesiones guiadas y una cultura donde cada persona entrena en serio sin importar su nivel de inicio.",
    plansEyebrow: "El proceso",
    plansTitle: "Entrenamiento personal con acompañamiento real",
    plansLead: "Cada persona entrena según su nivel, su objetivo y su contexto. Definimos tu ruta en una asesoría inicial y ajustamos el plan contigo, paso a paso, con seguimiento directo.",
    processCtaText: "Sin planes rígidos ni letras pequeñas. Cuéntanos tu objetivo y te armamos una ruta a tu medida.",
    processCtaButton: "Solicita tu asesoría",
    pricingEyebrow: "Membresías",
    pricingTitle: "Planes de entrenamiento en Tulum",
    pricingLead: "Elige el plan que se adapta a tu ritmo. Todos incluyen acompañamiento de Tamara y seguimiento real. Te suscribes por WhatsApp en un minuto.",
    pricingNote: "Precios en pesos mexicanos (MXN), cargo mensual. ¿Dudas sobre cuál elegir? Escríbenos y te asesoramos.",
    planButtonSub: "Suscribirme",
    planButtonBook: "Reservar sesión",
    planTagSingle: "Sesión única",
    planUpTo: "Hasta",
    planPerWeek: "días/sem",
    planPerSession: " por sesión",
    planPer: "mes",
    planTagMonthly: "Mensual",
    planTagElite: "Élite",
    planItems: [
      {
        name: "Plan Inicio Comprometido",
        desc: "Empieza con estructura y buenos hábitos, a tu ritmo y sin frustrarte.",
        includes: [
          "Plan de entrenamiento mensual",
          "Asesoría en suplementación",
          "1 dieta fitness por mes",
          "1 evaluación mensual",
          "Acceso a la app de Tamara Coach",
          "20% de descuento en fisioterapia",
        ],
        conditions: [
          "3 sesiones por semana (L–V)",
          "1.5 horas por sesión",
          "No reembolsable ni acumulable",
          "Asesoría en línea por viaje",
          "Sin cambios de horario",
          "Dentro del horario del gimnasio",
        ],
      },
      {
        name: "Plan Base Fuerte",
        desc: "Construye una base sólida con volumen y consistencia semanal.",
        includes: [
          "Plan mensual personalizado",
          "Asesoría en suplementación",
          "1 dieta fitness por mes",
          "1 evaluación mensual",
          "Acceso a la app de Tamara Coach",
          "20% de descuento en fisioterapia",
        ],
        conditions: [
          "4 sesiones por semana (L–V)",
          "1.5 horas por sesión",
          "No reembolsable ni acumulable",
          "Asesoría en línea por viaje",
          "Sin cambios de horario",
          "Dentro del horario del gimnasio",
        ],
      },
      {
        name: "Plan Rendimiento Élite",
        desc: "Diseñado para quienes buscan un nivel de transformación profesional.",
        includes: [
          "Programa personalizado",
          "Correcciones de técnica en tiempo real",
          "Fuerza, acondicionamiento y movilidad",
          "Ejercicios personalizados (máx. 5 personas)",
          "Asesoría en suplementación",
          "2 dietas fitness al mes",
          "2 evaluaciones mensuales",
          "Acceso a la app de Tamara Coach",
          "20% de descuento en fisioterapia",
        ],
        conditions: [
          "5 sesiones por semana (L–V)",
          "1.5 horas por sesión",
          "No reembolsable ni acumulable",
          "Asesoría en línea por viaje",
          "Hasta 2 modificaciones semanales",
          "Dentro del horario del gimnasio",
        ],
      },
      {
        name: "Sesiones Turísticas Únicas",
        desc: "Entrenamiento totalmente personalizado, ideal si estás de visita en Tulum.",
        includes: [
          "Ejercicios personalizados",
          "Correcciones en tiempo real",
          "Fuerza, acondicionamiento y movilidad",
          "Coaching individual",
          "Grupo máximo 5 personas",
        ],
        conditions: ["Disponibilidad: 7:00–14:00 h", "Disponibilidad: 18:30–22:00 h"],
      },
    ],
    planIncludesLabel: "Incluye",
    planConditionsLabel: "Ver condiciones",
    planKickers: ["Más elegido", "Progreso constante", "Punto de partida", "Evaluación inicial"],
    planTitles: ["Rendimiento Elite", "Base Fuerte", "Inicio Comprometido", "Sesión Única"],
    planBullets: [
      [
        "5 sesiones por semana",
        "Grupo máximo 5 personas",
        "2 dietas mensuales y 2 evaluaciones",
        "Suplementación + plataforma de seguimiento",
        "20% de descuento en fisioterapia",
      ],
      ["4 sesiones por semana", "1 dieta mensual", "1 evaluación estructural"],
      ["3 sesiones por semana", "Plan de inicio estructurado"],
      ["110 minutos personalizados", "Diagnóstico de base y ruta sugerida"],
    ],
    planMeta: [
      "Ideal si buscas cambios visibles y acompañamiento completo.",
      "Perfecta para consolidar hábitos sin perder ritmo semanal.",
      "Recomendada para empezar con estructura y adherencia real.",
      "Para conocer tu nivel, corregir técnica y definir siguientes pasos.",
    ],
    planButton: "Solicitar información",
    plansNotice:
      "*Por ahora no estamos gestionando alta online de membresías. Te asesoramos para elegir la mejor opción según tu objetivo.",
    audienceTitles: ["Si estás empezando", "Si ya entrenas", "Si compites"],
    audienceTexts: [
      "Construimos base técnica, hábitos y constancia sin frustración.",
      "Ordenamos tu plan para salir del estancamiento y subir nivel.",
      "Aplicamos estrategia avanzada de rendimiento, composición y pico competitivo.",
    ],
    onlineEyebrow: "Online",
    onlineTitle: "Alto rendimiento desde cualquier lugar.",
    onlineLead:
      "Si no estás en Tulum, puedes trabajar con Tamara en formato online con seguimiento semanal, ajustes de plan y contacto continuo por WhatsApp para sostener adherencia.",
    onlineList: [
      "Sesiones en vivo con seguimiento",
      "Activación + entrenamiento guiado",
      "Material de estiramientos",
      "Adaptación individual según nivel",
    ],
    onlineNote:
      "Control de clases, seguimiento de progreso y ajustes semanales en una experiencia online clara y personalizada.",
    onlinePoints: ["Feedback semanal", "Ajustes según avance", "Contacto directo por WhatsApp"],
    onlineButton: "Consultar programa online",
    appEyebrow: "App Tamara Club",
    appTitle: "Toda tu experiencia, en una sola app",
    appLead:
      "<strong>Ya disponible para iPhone en el App Store.</strong> Reserva tus clases, consulta tus rutinas y sigue tu progreso desde el móvil. También puedes entrar desde el navegador.",
    appList: [
      "Reserva y organiza tus clases en segundos.",
      "Accede a tus rutinas y tareas semanales.",
      "Monitorea avances físicos y consistencia.",
      "Participa en la comunidad del gimnasio.",
      "Uso 100% gratuito para miembros del club.",
    ],
    appButton: "Abrir en el navegador",
    storeCtaSmall: "Descárgala en el",
    appPlatformNote: "Disponible para iPhone. Gratis para miembros del club.",
    pricingAppText: "Al inscribirte, gestionas tus clases y tu progreso desde la app del club.",
    emotionalTitle: "Si alguna vez sentiste que no podías",
    emotionalLead:
      "Muchos llegan después de abandonar procesos, perder confianza o no lograr constancia. Aquí no se juzga. Se estructura. Se acompaña. Se construye.",
    communityEyebrow: "Comunidad",
    communityTitle: "Respeto. Constancia. Carácter.",
    communityLead: "El valor central es el respeto: por el cuerpo, por el proceso y por la palabra.",
    faqEyebrow: "FAQ",
    faqTitle: "Preguntas frecuentes",
    faqQuestions: [
      "¿Necesito experiencia previa?",
      "¿Y si tengo una lesión?",
      "¿Incluye plan nutricional?",
      "¿Puedo probar antes?",
      "¿Cuánto cuesta entrenar en el gimnasio?",
      "¿Dónde está el gimnasio en Tulum?",
      "¿Puedo entrenar si no vivo en Tulum?",
      "Do you speak English?",
      "¿El gimnasio tiene aplicación?",
    ],
    faqAnswers: [
      "No. El entrenamiento se adapta completamente a tu nivel.",
      "Se evalúa y adapta con enfoque biomecánico para mantener progreso seguro.",
      "Sí, según el programa sugerido para tu objetivo.",
      "Sí. Puedes iniciar con sesión única para evaluarte y definir tu ruta.",
      "Los planes mensuales van de $3,500 a $4,500 MXN según cuántos días entrenes por semana. También hay sesiones únicas de $700 MXN, ideales si estás de visita en Tulum.",
      "Estamos en Tulum, Quintana Roo. En la sección de ubicación encuentras el mapa y puedes abrir la ruta directa en Google Maps.",
      "Sí. Ofrecemos coaching online con seguimiento semanal y contacto directo por WhatsApp, y todos los planes presenciales incluyen asesoría en línea cuando estás de viaje.",
      "Yes. Coaching and follow-up are available in English and Spanish, and the whole site and app can be used in English.",
      "Sí. La app de Tamara's Coaching & Fitness Club está disponible gratis para iPhone en el App Store, y también puedes entrar desde el navegador en app.tamaracoachclub.com.",
    ],
    urgencyEyebrow: "Cupos",
    urgencyTitle: "Aperturas limitadas por horario",
    urgencyText:
      "Trabajamos con grupos reducidos para mantener acompañamiento real. Si quieres entrenar con seguimiento directo, te recomendamos agendar tu lugar cuanto antes.",
    urgencyTags: [
      "Grupos máximo 5 personas",
      "Ingreso por evaluación inicial",
      "Seguimiento 1 a 1 por WhatsApp",
    ],
    formEyebrow: "Aplicación",
    formTitle: "Recibe asesoría personalizada",
    formLead: "Déjanos tus datos y te contactamos para recomendarte la mejor opción para tu objetivo.",
    footerAppLabel: "Acceso alumnos:",
    privacyLink: "Aviso de Privacidad",
    formPlatform:
      "Nuestra plataforma digital permite control de clases, gestión y seguimiento estructurado de tus progresos.",
    objections: [
      "No necesitas experiencia previa.",
      "Adaptamos el plan a tu nivel y contexto.",
      "Respuesta por WhatsApp en 24 a 48 horas.",
    ],
    formButton: "Enviar por WhatsApp",
    formNote: "Al enviar, abriremos WhatsApp con tu mensaje listo para contactar al club.",
    locationEyebrow: "Ubicación",
    locationTitle: "Visita el gimnasio en Tulum",
    locationLead:
      "Si quieres transformar tu cuerpo con método, este es el mejor siguiente paso: venir a conocer el espacio, hablar con Tamara y definir una ruta real según tu objetivo.",
    locationList: [
      "Visita el gimnasio y vive la energía del club.",
      "Recibe orientación inicial según tu nivel actual.",
      "Elige el programa que mejor se adapta a tu meta.",
    ],
    locationVisit: "Agendar visita",
    locationMap: "Abrir en Google Maps",
    fab: "Habla con Tamara",
    footerLine: "Tulum, México | Gimnasio de alto rendimiento y coaching fitness en Tulum",
    copyrightLabel: "Copyright",
    copyrightText: "Tamara's Coach & Fitness Club | Desarrollo web y aplicación desarrollada por",
  },
  en: {
    title: "Gym & Personal Trainer in Tulum | Tamara's Coaching & Fitness Club",
    description:
      "Gym, fitness and personal training in Tulum, Mexico. Train with Tamara, a personal trainer and high-performance coach: strength, method and real follow-up, in person and online.",
    menu: ["Method", "Career", "Awards", "Plans", "Online", "App", "Location"],
    appMenuLink: "Students",
    menuCta: "Transform!",
    heroAppChip: "New iPhone app: <strong>download it on the App Store</strong>",
    heroEyebrow: "Gym & personal training · Tulum, Mexico",
    heroTitle: "Discipline first.<br><span>Transformation</span> is the consequence.",
    heroLead:
      "High-performance gym and personal training in Tulum for people who want real results through structure, follow-up, and commitment.",
    heroPrimary: "I want information",
    heroSecondary: "Student access",
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
      "Tamara works as a personal trainer and coach in Tulum with a fully personalized approach: she evaluates your starting point, builds a clear strategy, and adjusts every phase so you progress with safety, consistency, and measurable outcomes.",
    trajectoryList: [
      "Initial assessment to understand your real level and specific needs.",
      "Individual programming with clear goals for each phase.",
      "Continuous technical correction to train better and avoid plateaus.",
      "Ongoing follow-up to measure progress and adjust when needed.",
    ],
    awardsEyebrow: "High-performance coach",
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
    environmentEyebrow: "The club in Tulum",
    environmentTitle: "A gym in Tulum that pushes you to deliver",
    environmentLead:
      "The club is designed for focused training: functional equipment, guided sessions, and a culture where everyone trains seriously regardless of starting level.",
    plansEyebrow: "The process",
    plansTitle: "Personal training with real coaching support",
    plansLead: "Everyone trains according to their level, goal, and context. We map your path in an initial assessment and adjust the plan with you, step by step, with direct follow-up.",
    processCtaText: "No rigid plans, no fine print. Tell us your goal and we build a route made for you.",
    processCtaButton: "Request your assessment",
    pricingEyebrow: "Memberships",
    pricingTitle: "Training plans in Tulum",
    pricingLead: "Pick the plan that fits your pace. All include Tamara's coaching and real follow-up. You subscribe via WhatsApp in a minute.",
    pricingNote: "Prices in Mexican pesos (MXN), billed monthly. Not sure which one to pick? Message us and we'll guide you.",
    planButtonSub: "Subscribe",
    planButtonBook: "Book a session",
    planTagSingle: "Single session",
    planUpTo: "Up to",
    planPerWeek: "days/wk",
    planPerSession: " per session",
    planPer: "mo",
    planTagMonthly: "Monthly",
    planTagElite: "Elite",
    planItems: [
      {
        name: "Committed Start Plan",
        desc: "Start with structure and solid habits, at your pace, frustration-free.",
        includes: [
          "Monthly training plan",
          "Supplement guidance",
          "1 fitness meal plan per month",
          "1 monthly assessment",
          "Access to the Tamara Coach app",
          "20% off physiotherapy",
        ],
        conditions: [
          "3 sessions per week (Mon–Fri)",
          "1.5 hours per session",
          "Non-refundable, cannot roll over",
          "Online coaching while travelling",
          "No schedule changes",
          "Within gym opening hours",
        ],
      },
      {
        name: "Strong Base Plan",
        desc: "Build a strong base with weekly volume and consistency.",
        includes: [
          "Personalized monthly plan",
          "Supplement guidance",
          "1 fitness meal plan per month",
          "1 monthly assessment",
          "Access to the Tamara Coach app",
          "20% off physiotherapy",
        ],
        conditions: [
          "4 sessions per week (Mon–Fri)",
          "1.5 hours per session",
          "Non-refundable, cannot roll over",
          "Online coaching while travelling",
          "No schedule changes",
          "Within gym opening hours",
        ],
      },
      {
        name: "Elite Performance Plan",
        desc: "Built for those after a professional level of transformation.",
        includes: [
          "Personalized program",
          "Real-time technique corrections",
          "Strength, conditioning and mobility",
          "Personalized exercises (max. 5 people)",
          "Supplement guidance",
          "2 fitness meal plans per month",
          "2 monthly assessments",
          "Access to the Tamara Coach app",
          "20% off physiotherapy",
        ],
        conditions: [
          "5 sessions per week (Mon–Fri)",
          "1.5 hours per session",
          "Non-refundable, cannot roll over",
          "Online coaching while travelling",
          "Up to 2 weekly changes",
          "Within gym opening hours",
        ],
      },
      {
        name: "Single Visitor Sessions",
        desc: "Fully personalized training, ideal if you are visiting Tulum.",
        includes: [
          "Personalized exercises",
          "Real-time corrections",
          "Strength, conditioning and mobility",
          "One-to-one coaching",
          "Groups of up to 5 people",
        ],
        conditions: ["Available 7:00 AM–2:00 PM", "Available 6:30 PM–10:00 PM"],
      },
    ],
    planIncludesLabel: "Includes",
    planConditionsLabel: "View conditions",
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
    appTitle: "Your whole experience, in one app",
    appLead:
      "<strong>Now available for iPhone on the App Store.</strong> Book your classes, check your routines and track your progress from your phone. You can also log in from the browser.",
    appList: [
      "Book and organize your classes in seconds.",
      "Access your routines and weekly tasks.",
      "Track physical progress and consistency.",
      "Join the gym community.",
      "100% free for club members.",
    ],
    appButton: "Open in browser",
    storeCtaSmall: "Download on the",
    appPlatformNote: "Available for iPhone. Free for club members.",
    pricingAppText: "Once you join, you manage your classes and progress from the club app.",
    emotionalTitle: "If you have ever felt you could not",
    emotionalLead:
      "Many people arrive after dropping out of programs, losing confidence or failing to stay consistent. Here you are not judged. You get structure, support and a plan you can build on.",
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
      "How much does it cost to train at the gym?",
      "Where is the gym in Tulum?",
      "Can I train if I don't live in Tulum?",
      "Do you speak English?",
      "Does the gym have an app?",
    ],
    faqAnswers: [
      "No. Training is fully adapted to your current level.",
      "We evaluate and adapt using a biomechanical approach to keep progress safe.",
      "Yes, depending on the program recommended for your goal.",
      "Yes. You can start with a single session to assess your current level and define your path.",
      "Monthly plans range from $3,500 to $4,500 MXN depending on how many days a week you train. There are also single sessions at $700 MXN, ideal if you are visiting Tulum.",
      "We are in Tulum, Quintana Roo. The location section has the map and opens directions straight in Google Maps.",
      "Yes. We offer online coaching with weekly follow-up and direct WhatsApp contact, and every in-person plan includes online coaching while you travel.",
      "Yes. Coaching and follow-up are available in English and Spanish, and the whole site and app can be used in English.",
      "Yes. The Tamara's Coaching & Fitness Club app is free for iPhone on the App Store, and you can also log in from the browser at app.tamaracoachclub.com.",
    ],
    urgencyEyebrow: "Spots",
    urgencyTitle: "Limited openings by schedule",
    urgencyText:
      "We work with small groups to maintain real coaching quality. If you want direct follow-up, we recommend reserving your spot as soon as possible.",
    urgencyTags: ["Groups up to 5 people", "Entry by initial assessment", "1-to-1 WhatsApp follow-up"],
    formEyebrow: "Application",
    formTitle: "Get personalized guidance",
    formLead: "Leave your details and we'll contact you to recommend the best option for your goal.",
    footerAppLabel: "Student access:",
    privacyLink: "Privacy Policy",
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
    locationTitle: "Visit the gym in Tulum",
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

// Dedicated language pages (e.g. /en/) declare their language on <html>.
// The URL wins over the stored preference so each URL is stable for crawlers.
const pageLang = document.documentElement.dataset.pageLang || "";
let currentLang = pageLang || localStorage.getItem("site_lang") || "es";
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

  const dataSrc = heroPlayerIframe.getAttribute("data-src");
  if (!dataSrc) return;

  // Reduced motion: keep the static hero image, never load the YouTube embed.
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isReducedMotion) {
    enableHeroFallback();
    return;
  }

  let didPlay = false;

  const onPlaybackConfirmed = () => {
    didPlay = true;
    heroVideoContainer.classList.remove("is-fallback");
  };

  const loadVideo = () => {
    if (heroPlayerIframe.src) return;
    heroPlayerIframe.src = dataSrc;

    const fallbackTimer = window.setTimeout(() => {
      if (!didPlay) enableHeroFallback();
    }, 6000);

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
              window.clearTimeout(fallbackTimer);
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

  // Defer the third-party embed until the browser is idle so the hero image
  // (LCP) and critical content are not blocked by YouTube's network cost.
  const schedule = window.requestIdleCallback
    ? (cb) => window.requestIdleCallback(cb, { timeout: 2500 })
    : (cb) => window.setTimeout(cb, 1200);

  if (document.readyState === "complete") {
    schedule(loadVideo);
  } else {
    window.addEventListener("load", () => schedule(loadVideo), { once: true });
  }
};

const plansGrid = document.querySelector("#plans-grid");

const renderPlans = (lang) => {
  if (!plansGrid) return;
  const t = I18N[lang] || I18N.es;
  const messages = WA_MESSAGES[lang] || WA_MESSAGES.es;
  const locale = lang === "en" ? "en-US" : "es-MX";

  const cards = PLANS.map((plan, index) => {
    const copy = (t.planItems && t.planItems[index]) || {};
    const href = buildWhatsAppUrl(messages[plan.key] || messages.general_info);

    const card = document.createElement("article");
    card.className = "plan-card" + (plan.tag === "elite" ? " is-featured" : "");

    const head = document.createElement("div");
    head.className = "plan-card-head";
    const title = document.createElement("h3");
    title.textContent = copy.name || "";
    const tag = document.createElement("span");
    tag.className = "plan-card-tag" + (plan.tag ? " is-" + plan.tag : "");
    tag.textContent =
      plan.tag === "elite" ? t.planTagElite : plan.period === "once" ? t.planTagSingle : t.planTagMonthly;
    head.append(title, tag);

    const desc = document.createElement("p");
    desc.className = "plan-card-desc";
    desc.textContent = copy.desc || "";

    const priceRow = document.createElement("p");
    priceRow.className = "plan-card-price";
    const amount = document.createElement("span");
    amount.className = "plan-card-amount";
    amount.textContent = "$" + plan.price.toLocaleString(locale);
    const currency = document.createElement("span");
    currency.className = "plan-card-currency";
    currency.textContent = "MXN" + (plan.period === "once" ? "" : " / " + t.planPer);
    priceRow.append(amount, currency);

    const specs = document.createElement("ul");
    specs.className = "plan-card-specs";
    const specTexts = [];
    if (plan.freq) specTexts.push(plan.freq + " " + t.planPerWeek);
    specTexts.push(plan.period === "once" ? t.planUpTo + " " + plan.dur : plan.dur + t.planPerSession);
    specTexts.forEach((text) => {
      const li = document.createElement("li");
      const dot = document.createElement("span");
      dot.className = "plan-spec-dot";
      dot.setAttribute("aria-hidden", "true");
      li.append(dot, document.createTextNode(text));
      specs.appendChild(li);
    });

    const includesWrap = document.createElement("div");
    includesWrap.className = "plan-card-includes";
    const includesLabel = document.createElement("p");
    includesLabel.className = "plan-card-includes-label";
    includesLabel.textContent = t.planIncludesLabel;
    const includesList = document.createElement("ul");
    (copy.includes || []).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      includesList.appendChild(li);
    });
    includesWrap.append(includesLabel, includesList);

    const conditions = document.createElement("details");
    conditions.className = "plan-card-conditions";
    const summary = document.createElement("summary");
    summary.textContent = t.planConditionsLabel;
    const condList = document.createElement("ul");
    (copy.conditions || []).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      condList.appendChild(li);
    });
    conditions.append(summary, condList);

    const cta = document.createElement("a");
    cta.className = "btn " + (plan.tag === "elite" ? "btn-primary" : "btn-ghost") + " plan-card-btn";
    cta.href = href;
    cta.target = "_blank";
    cta.rel = "noopener noreferrer";
    cta.textContent = plan.period === "once" ? t.planButtonBook : t.planButtonSub;
    cta.setAttribute("aria-label", cta.textContent + " — " + (copy.name || ""));

    card.append(head, desc, priceRow, specs, includesWrap, conditions, cta);
    return card;
  });

  plansGrid.replaceChildren(...cards);
};

const applyLanguage = (lang) => {
  const t = I18N[lang];
  if (!t) return;

  document.documentElement.lang = lang;
  document.title = t.title;
  if (metaDescription) {
    metaDescription.setAttribute("content", t.description);
  }

  setTextAll(".menu a.nav-link", t.menu);
  setText(".menu .app-link .app-link-label", t.appMenuLink);
  setText(".menu .cta-link", t.menuCta);
  setText(".hero-copy .eyebrow", t.heroEyebrow);
  setText(".hero-copy h1", t.heroTitle, true);
  setText(".hero-copy .lead", t.heroLead);
  setText(".hero-copy .actions .btn-primary", t.heroPrimary);
  setText(".hero-copy .btn-app .btn-app-label", t.heroSecondary);
  setText(".hero-copy .tagline", t.heroTag);
  setText(".hero-app-chip .hero-app-chip-text", t.heroAppChip, true);

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
  setText("#membresias > .container > .lead", t.plansLead);
  setTextAll("#membresias .audience-card h3", t.audienceTitles);
  setTextAll("#membresias .audience-card p", t.audienceTexts);
  setText("#membresias .process-cta-text", t.processCtaText);
  setText("#membresias .process-cta .btn", t.processCtaButton);

  setText("#planes .section-header .eyebrow", t.pricingEyebrow);
  setText("#planes .section-header h2", t.pricingTitle);
  setText("#planes .pricing-lead", t.pricingLead);
  setText("#planes .pricing-note", t.pricingNote);
  renderPlans(lang);

  setText("#online .container > div:first-child .eyebrow", t.onlineEyebrow);
  setText("#online .container > div:first-child h2", t.onlineTitle);
  setText("#online .container > div:first-child .lead", t.onlineLead);
  setTextAll("#online .container > div:first-child .list li", t.onlineList);
  setText("#online .online-note", t.onlineNote);
  setTextAll("#online .online-points li", t.onlinePoints);
  setText("#online .online-content .btn", t.onlineButton);

  setText("#app .app-section-copy .app-eyebrow", t.appEyebrow);
  setText("#app .app-section-copy h2", t.appTitle);
  setText("#app .app-section-copy .app-lead", t.appLead, true);
  setTextAll("#app .app-section-list li", t.appList);
  setText("#app .btn-app .btn-app-label", t.appButton);
  setText("#app .app-platform-note", t.appPlatformNote);
  setText("#planes .pricing-app-text", t.pricingAppText);
  setTextAll(".store-cta-small", [t.storeCtaSmall, t.storeCtaSmall, t.storeCtaSmall]);

  setText("#comunidad .section-header .eyebrow", t.communityEyebrow);
  setText("#comunidad .section-header h2", t.communityTitle);
  setText("#comunidad .container.content-layer > .lead", t.communityLead);

  setText("#empezar h2", t.emotionalTitle);
  setText("#empezar .lead", t.emotionalLead);

  setText("#faq .section-header .eyebrow", t.faqEyebrow);
  setText("#faq .section-header h2", t.faqTitle);
  setTextAll("#faq summary", t.faqQuestions);
  setTextAll("#faq details p", t.faqAnswers);

  setText("#aplicar .urgency-banner .eyebrow", t.urgencyEyebrow);
  setText("#aplicar .urgency-banner .urgency-title", t.urgencyTitle);
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
  setText(".footer-app-label", t.footerAppLabel);
  setText(".footer-legal-link", t.privacyLink);
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
    const optionsEs = ["Selecciona una opción", "Bajar grasa", "Ganar masa muscular", "Mejorar rendimiento", "Recomposición corporal"];
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
        ? "Cuéntanos brevemente tu situación actual"
        : "Tell us briefly about your current situation";
  }

  setTextAll(".lang-btn", ["ES", "EN"]);
  langButtons.forEach((btn) => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  updateWhatsAppLinks(lang);
};

const LANG_URLS = { es: "/", en: "/en/" };

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    if (!I18N[lang]) return;
    localStorage.setItem("site_lang", lang);

    // On a dedicated language page, switching language means changing URL so
    // each language keeps its own indexable address.
    if (pageLang && lang !== pageLang) {
      window.location.href = LANG_URLS[lang] || "/";
      return;
    }

    currentLang = lang;
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
            "Hola Tamara Club, quiero recibir información:",
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

const scrollProgressBar = document.querySelector(".scroll-progress span");

if (header || scrollProgressBar) {
  let ticking = false;

  const updateOnScroll = () => {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 18);
    }
    if (scrollProgressBar) {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      scrollProgressBar.style.transform = `scaleX(${ratio})`;
    }
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  };

  updateOnScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
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

const initStatCountUp = () => {
  const stats = document.querySelectorAll(".awards-stat span");
  if (!stats.length || reduceMotion || !("IntersectionObserver" in window)) return;

  const animate = (el) => {
    const raw = el.textContent.trim();
    const match = raw.match(/^(\D*)(\d+)(.*)$/);
    if (!match) return;
    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr, 10);
    const duration = 1300;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = raw;
      }
    };

    window.requestAnimationFrame(step);
  };

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  stats.forEach((stat) => statObserver.observe(stat));
};

applyLanguage(currentLang);
initHeroVideoPlayback();
initStatCountUp();

// One-page scroll spy: highlights the section currently in view.
const initScrollSpy = () => {
  const links = Array.from(document.querySelectorAll(".menu .nav-link"));
  if (!links.length) return;

  const targets = links
    .map((link) => {
      const id = (link.getAttribute("href") || "").replace("#", "");
      const section = id ? document.getElementById(id) : null;
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!targets.length) return;

  let current = null;
  let ticking = false;

  const update = () => {
    ticking = false;
    // The section that owns the point just below the sticky header wins.
    const line = window.scrollY + window.innerHeight * 0.3;
    let active = null;

    targets.forEach(({ section }) => {
      const top = section.offsetTop;
      if (top <= line) active = section;
    });

    // Near the page bottom the last linked section should stay highlighted.
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
      active = targets[targets.length - 1].section;
    }

    if (active === current) return;
    current = active;

    targets.forEach(({ link, section }) => {
      if (section === active) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
};

initScrollSpy();
