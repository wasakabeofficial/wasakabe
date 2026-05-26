/* ==================================================================
   WASAKA BE — Traducciones completas (6 idiomas)
   ================================================================== */

export type LanguageCode = "es" | "en" | "zh" | "ko" | "ru" | "ja";

export const LANGUAGE_ORDER: LanguageCode[] = [
  "es",
  "en",
  "zh",
  "ko",
  "ru",
  "ja",
];

export interface TranslationSet {
  common: {
    loading: string;
  };
  navbar: {
    logoFull: string;
    links: { label: string; href: string }[];
    cta: string;
  };
  hero: {
    badge: string;
    title: string;
    titleGold: string;
    titleWhite: string;
    titleGold2: string;
    desc: string;
    btnPrimary: string;
    btnSecondary: string;
    statProjects: string;
    statYears: string;
  };
  about: {
    eyebrow: string;
    headingStart: string;
    headingGold: string;
    headingEnd: string;
    pullQuote: string;
    text1: string;
    text2: string;
    text3Start: string;
    text3Link: string;
    text3End: string;
    brand: string;
    badgesTech: string[];
    badgesCreative: string[];
  };
  services: {
    eyebrow: string;
    titleStart: string;
    titleGold: string;
    sub: string;
    cards: {
      id: string;
      title: string;
      desc: string;
      cta: string;
    }[];
  };
  experience: {
    eyebrow: string;
    titleStart: string;
    titleGold: string;
    sub: string;
    entries: {
      period: string;
      role: string;
      highlights: string[];
      tags: string[];
    }[];
  };
  canal: {
    eyebrow: string;
    titleStart: string;
    titleGold: string;
    sub: string;
    channels: {
      handle: string;
      description: string;
      stats: string[];
      label: string;
    }[];
  };
  contact: {
    eyebrow: string;
    titleStart: string;
    titleGold: string;
    sub: string;
    formLabels: {
      name: string;
      email: string;
      subject: string;
      message: string;
    };
    placeholders: {
      name: string;
      email: string;
      message: string;
    };
    subjects: string[];
    directText: string;
    btnSend: string;
    btnSending: string;
    feedbackOk: string;
    feedbackErr: string;
    emailErrors: {
      empty: string;
      tooLong: string;
      invalidFormat: string;
      noTld: string;
      localNotAllowed: string;
      invalidTld: string;
    };
    emailWarning: string;
  };
  footer: {
    tagline: string;
    links: { label: string; href: string }[];
    copyright: string;
    legal: string;
  };
}

const es: TranslationSet = {
  common: { loading: "Cargando…" },
  navbar: {
    logoFull: "WASAKABE",
    links: [
      { label: "Inicio", href: "#" },
      { label: "Servicios", href: "#services" },
      { label: "Experiencia", href: "#experience" },
      { label: "Canal", href: "#canal" },
    ],
    cta: "CONTACTO",
  },
  hero: {
    badge: "FULLSTACK · IA · CREATIVO",
    title: "INTELIGENCIA",
    titleGold: "HÍBRIDA",
    titleWhite: "&",
    titleGold2: "PRODUCCIÓN CREATIVA",
    desc: "Estudio multidisciplinario donde la ingeniería en IA y full-stack convergen con el arte cinematográfico y la producción musical.",
    btnPrimary: "INICIAR PROYECTO",
    btnSecondary: "EXPLORAR TRABAJO",
    statProjects: "Proyectos",
    statYears: "Años",
  },
  about: {
    eyebrow: "SOBRE MÍ",
    headingStart: "ARQUITECTURA",
    headingGold: "DETRÁS",
    headingEnd: "DEL CÓDIGO",
    pullQuote: '"El mejor software no solo funciona, también se siente bien."',
    text1: "Arquitecto de software e ingeniero multidisciplinario con experiencia en IA, full-stack y DevOps. Mi enfoque combina pensamiento sistémico con sensibilidad creativa.",
    text2: "Detrás de cada línea de código hay una decisión de diseño. Ya sea construyendo agentes de IA en Neuropoint.ai, desarrollando aplicaciones móviles en XTI Like Capital, o produciendo piezas audiovisuales y música, aplico el mismo principio: la arquitectura importa.",
    text3Start: "Ingeniero en Desarrollo y Gestión de Software titulado de la ",
    text3Link: "UTHH",
    text3End: "Creador de la marca personal ",
    brand: "WasakaBe",
    badgesTech: ["AI Agents", "Fullstack", "DevOps", "LLMs", "Mobile"],
    badgesCreative: ["Film", "Beatmaker", "Photography", "Direction"],
  },
  services: {
    eyebrow: "SERVICIOS",
    titleStart: "QUÉ PUEDO",
    titleGold: "HACER POR TI",
    sub: "Cuatro áreas donde combino ingeniería de alto nivel con producción creativa para entregar resultados medibles.",
    cards: [
      {
        id: "01",
        title: "Software Engineering",
        desc: "Arquitectura y desarrollo de sistemas complejos con IA, full-stack, DevOps y mobile. Construyo productos escalables desde el concepto hasta el deploy.",
        cta: "Saber más →",
      },
      {
        id: "02",
        title: "Creative Direction",
        desc: "Dirección creativa para proyectos visuales y audiovisuales. Concepto, narrativa y ejecución con mirada técnica y sensibilidad artística.",
        cta: "Saber más →",
      },
      {
        id: "03",
        title: "Audiovisual",
        desc: "Producción musical, beatmaking, edición de video y postproducción. Del storyboard al master final con estándar profesional.",
        cta: "Saber más →",
      },
      {
        id: "04",
        title: "Mentorship",
        desc: "Guía y asesoría para equipos técnicos y profesionales emergentes. Estrategia de carrera, arquitectura de software y adopción de IA.",
        cta: "Saber más →",
      },
    ],
  },
  experience: {
    eyebrow: "TRAYECTORIA",
    titleStart: "DONDE HE",
    titleGold: "TRABAJADO",
    sub: "Experiencia profesional en empresas tecnológicas, combinando ingeniería de software con inteligencia artificial.",
    entries: [
      {
        period: "MAY 2025 — PRESENTE",
        role: "Full Stack AI Engineer",
        highlights: [
          "Ecosistemas de Agentes de IA — Ingeniería y despliegue en producción de agentes conversacionales autónomos (voz y texto) para automatización de flujos de trabajo y atención 24/7 en sectores médico, hospitalario y de eventos.",
          "Monitoreo Autonómico de Infraestructura — Arquitectura de un sistema inteligente de alertas mediante la integración de agentes de IA con Zabbix y GNS3, incluyendo un motor de enrutamiento de alta precisión para gestión autónoma de incidentes.",
          "Arquitectura para Logística y Automatización B2B — Diseño backend de plataformas de IA para optimización de operaciones aduaneras complejas. Orquestación de pipelines de web scraping y agentes de IA para prospección automatizada en LinkedIn y cribado inteligente de candidatos en procesos de Recursos Humanos.",
        ],
        tags: ["AI Agents", "n8n", "LLMs", "Automation", "Zabbix", "GNS3"],
      },
      {
        period: "ENE — ABR 2025",
        role: "Mobile Developer",
        highlights: [
          "Ingeniería Mobile End-to-End — Responsable único del ciclo completo de desarrollo, desde la arquitectura hasta la publicación en App Store y Google Play, utilizando React Native.",
          "Pasarelas de Pago — Integración de infraestructura de pagos segura y recurrente con Stripe, gestionando lógica transaccional compleja bajo cumplimiento PCI.",
          'Módulos de Impacto Social — Desarrollo de un ecosistema de red privada ("Connect") con feeds en tiempo real y un sistema ciudadano de reporte de incidentes urbanos.',
        ],
        tags: ["React Native", "Stripe", "Mobile", "iOS", "Android"],
      },
      {
        period: "SEP 2023 — DIC 2024",
        role: "Full Stack Software Engineer",
        highlights: [
          "Arquitectura Hexagonal Backend — Desarrollo de APIs robustas y desacopladas en Python (Flask) bajo principios de Arquitectura Hexagonal para asegurar mantenibilidad y flexibilidad.",
          "Ecosistema Multiplataforma — Líder de arquitectura para una red unificada utilizando React.js + Vite (TypeScript) en web y Flutter para dispositivos móviles y wearables (Smartwatches).",
          "Integración de Voz (Alexa) — Desarrollo de una skill de Amazon Alexa para la consulta en tiempo real de registros académicos mediante procesamiento de lenguaje natural.",
          "Identidad Digital y DevOps — Diseño de control de acceso perimetral mediante credenciales digitales e implementación de pipelines de CI/CD para automatización de pruebas y despliegue.",
        ],
        tags: ["Flask", "React", "Flutter", "Alexa", "CI/CD", "Python"],
      },
      {
        period: "FEB — ABR 2024",
        role: "Software Engineer",
        highlights: [
          "Optimización y Mantenimiento Evolutivo — Corrección de fallos críticos en plataformas empresariales basadas en Java (Spring Boot) y PHP (Laravel).",
          "Motores de Notificación y Datos — Diseño de un sistema de alertas institucionales bajo la convención de nomenclatura DSD-Core y liderazgo en la migración y limpieza de bases de datos legadas para asegurar la integridad de caracteres especiales.",
        ],
        tags: ["Java", "Spring Boot", "PHP", "Laravel", "Databases"],
      },
    ],
  },
  canal: {
    eyebrow: "CANAL & COMUNIDAD",
    titleStart: "MIRA MI",
    titleGold: "CONTENIDO",
    sub: "Sígueme en YouTube, Facebook, Instagram y LinkedIn para contenido semanal sobre IA, desarrollo, música y tecnología.",
    channels: [
      {
        handle: "Canal WasakaBe",
        description: "Contenido técnico sobre IA, desarrollo de software, arquitectura de sistemas y tecnología en general. Tutoriales, análisis y proyectos en vivo.",
        stats: ["Tutoriales", "Proyectos", "Semanales"],
        label: "SUSCRIBIRSE",
      },
      {
        handle: "WasakaBe Oficial",
        description: "Comunidad activa donde comparto contenido exclusivo, detrás de cámaras, música y conexión directa con la audiencia.",
        stats: ["Contenido diario", "Comunidad", "Exclusivo"],
        label: "SEGUIR",
      },
      {
        handle: "@wasakabeofficial",
        description: "Detrás de cámaras, fotografías, adelantos de proyectos y estilo de vida como ingeniero y creador multidisciplinario.",
        stats: ["Historias", "Detrás de cámaras", "Directos"],
        label: "SEGUIR",
      },
      {
        handle: "WasakaBe Official",
        description: "Red profesional donde comparto experiencia en IA, arquitectura de software, proyectos tecnológicos y crecimiento profesional.",
        stats: ["Red profesional", "Proyectos", "Artículos"],
        label: "CONECTAR",
      },
    ],
  },
  contact: {
    eyebrow: "CONTACTO",
    titleStart: "¿TIENES UN",
    titleGold: "PROYECTO?",
    sub: "Estoy abierto a colaboraciones, consultorías y nuevos retos. Cuéntame sobre tu proyecto y te responderé a la brevedad.",
    formLabels: {
      name: "Nombre",
      email: "Correo electrónico",
      subject: "Asunto",
      message: "Mensaje",
    },
    placeholders: {
      name: "Tu nombre",
      email: "tu@correo.com",
      message: "Cuéntame sobre tu proyecto...",
    },
    subjects: [
      "Proyecto de software",
      "Consultoría en IA",
      "Colaboración creativa",
      "Mentoría",
      "Otro",
    ],
    directText: "¿Prefieres un contacto más directo? Escríbeme directamente a",
    btnSend: "ENVIAR MENSAJE",
    btnSending: "ENVIANDO…",
    feedbackOk: "Mensaje enviado con éxito. Te responderé pronto.",
    feedbackErr: "Hubo un error al enviar. Intenta de nuevo más tarde.",
    emailErrors: {
      empty: "El correo no puede estar vacío.",
      tooLong: "El correo es demasiado largo.",
      invalidFormat: "El formato del correo no es válido. Ej: usuario@dominio.com",
      noTld: "El dominio debe tener un TLD válido (ej: .com, .mx, .org).",
      localNotAllowed: "No se permiten correos locales.",
      invalidTld: "El TLD del correo no es válido.",
    },
    emailWarning: "No se pudo verificar el correo completamente.",
  },
  footer: {
    tagline: "Ingeniería · IA · Creatividad",
    links: [
      { label: "Inicio", href: "#" },
      { label: "Servicios", href: "#services" },
      { label: "Experiencia", href: "#experience" },
      { label: "Contacto", href: "#contact" },
      { label: "Términos", href: "/terminos-y-condiciones" },
      { label: "Privacidad", href: "/aviso-de-privacidad" },
    ],
    copyright: "© {year} Wasaka Be. Todos los derechos reservados.",
    legal: "Ing. Alan de Jesús Martínez Hernández",
  },
};

const en: TranslationSet = {
  common: { loading: "Loading…" },
  navbar: {
    logoFull: "WASAKABE",
    links: [
      { label: "Home", href: "#" },
      { label: "Services", href: "#services" },
      { label: "Experience", href: "#experience" },
      { label: "Channel", href: "#canal" },
    ],
    cta: "CONTACT",
  },
  hero: {
    badge: "FULLSTACK · AI · CREATIVE",
    title: "HYBRID",
    titleGold: "INTELLIGENCE",
    titleWhite: "&",
    titleGold2: "CREATIVE PRODUCTION",
    desc: "A multidisciplinary studio where AI engineering and full-stack converge with cinematic art and music production.",
    btnPrimary: "START PROJECT",
    btnSecondary: "EXPLORE WORK",
    statProjects: "Projects",
    statYears: "Years",
  },
  about: {
    eyebrow: "ABOUT ME",
    headingStart: "ARCHITECTURE",
    headingGold: "BEHIND",
    headingEnd: "THE CODE",
    pullQuote: '"The best software doesn\'t just work — it feels right."',
    text1: "Software architect and multidisciplinary engineer with experience in AI, full-stack and DevOps. My approach combines systemic thinking with creative sensitivity.",
    text2: "Behind every line of code lies a design decision. Whether building AI agents at Neuropoint.ai, developing mobile apps at XTI Like Capital, or producing audiovisual pieces and music, I apply the same principle: architecture matters.",
    text3Start: "Software Development & Management Engineer graduated from ",
    text3Link: "UTHH",
    text3End: "Creator of the personal brand ",
    brand: "WasakaBe",
    badgesTech: ["AI Agents", "Fullstack", "DevOps", "LLMs", "Mobile"],
    badgesCreative: ["Film", "Beatmaker", "Photography", "Direction"],
  },
  services: {
    eyebrow: "SERVICES",
    titleStart: "WHAT I CAN",
    titleGold: "DO FOR YOU",
    sub: "Four areas where I combine high-level engineering with creative production to deliver measurable results.",
    cards: [
      {
        id: "01",
        title: "Software Engineering",
        desc: "Architecture and development of complex systems with AI, full-stack, DevOps and mobile. I build scalable products from concept to deployment.",
        cta: "Learn more →",
      },
      {
        id: "02",
        title: "Creative Direction",
        desc: "Creative direction for visual and audiovisual projects. Concept, narrative and execution with a technical eye and artistic sensitivity.",
        cta: "Learn more →",
      },
      {
        id: "03",
        title: "Audiovisual",
        desc: "Music production, beatmaking, video editing and post-production. From storyboard to final master with professional standards.",
        cta: "Learn more →",
      },
      {
        id: "04",
        title: "Mentorship",
        desc: "Guidance and advisory for technical teams and emerging professionals. Career strategy, software architecture and AI adoption.",
        cta: "Learn more →",
      },
    ],
  },
  experience: {
    eyebrow: "EXPERIENCE",
    titleStart: "WHERE I'VE",
    titleGold: "WORKED",
    sub: "Professional experience at technology companies, combining software engineering with artificial intelligence.",
    entries: [
      {
        period: "MAY 2025 — PRESENT",
        role: "Full Stack AI Engineer",
        highlights: [
          "AI Agent Ecosystems — Engineering and production deployment of autonomous conversational agents (voice and text) for workflow automation and 24/7 support in medical, hospital and event sectors.",
          "Autonomic Infrastructure Monitoring — Architecture of an intelligent alert system by integrating AI agents with Zabbix and GNS3, including a high-precision routing engine for autonomous incident management.",
          "Logistics & B2B Automation Architecture — Backend design of AI platforms for optimizing complex customs operations. Orchestration of web scraping pipelines and AI agents for automated LinkedIn prospecting and intelligent candidate screening in HR processes.",
        ],
        tags: ["AI Agents", "n8n", "LLMs", "Automation", "Zabbix", "GNS3"],
      },
      {
        period: "JAN — APR 2025",
        role: "Mobile Developer",
        highlights: [
          "End-to-End Mobile Engineering — Sole responsible for the complete development cycle, from architecture to publication on App Store and Google Play, using React Native.",
          "Payment Gateways — Integration of secure and recurring payment infrastructure with Stripe, managing complex transactional logic under PCI compliance.",
          'Social Impact Modules — Development of a private network ecosystem ("Connect") with real-time feeds and a citizen urban incident reporting system.',
        ],
        tags: ["React Native", "Stripe", "Mobile", "iOS", "Android"],
      },
      {
        period: "SEP 2023 — DEC 2024",
        role: "Full Stack Software Engineer",
        highlights: [
          "Hexagonal Backend Architecture — Development of robust, decoupled APIs in Python (Flask) under Hexagonal Architecture principles to ensure maintainability and flexibility.",
          "Multiplatform Ecosystem — Architecture lead for a unified network using React.js + Vite (TypeScript) for web and Flutter for mobile devices and wearables (Smartwatches).",
          "Voice Integration (Alexa) — Development of an Amazon Alexa skill for real-time academic record queries through natural language processing.",
          "Digital Identity & DevOps — Design of perimeter access control using digital credentials and implementation of CI/CD pipelines for test automation and deployment.",
        ],
        tags: ["Flask", "React", "Flutter", "Alexa", "CI/CD", "Python"],
      },
      {
        period: "FEB — APR 2024",
        role: "Software Engineer",
        highlights: [
          "Optimization & Evolutionary Maintenance — Critical bug fixing in enterprise platforms based on Java (Spring Boot) and PHP (Laravel).",
          "Notification & Data Engines — Design of an institutional alert system under DSD-Core naming convention and leadership in legacy database migration and cleanup to ensure special character integrity.",
        ],
        tags: ["Java", "Spring Boot", "PHP", "Laravel", "Databases"],
      },
    ],
  },
  canal: {
    eyebrow: "CHANNEL & COMMUNITY",
    titleStart: "VIEW MY",
    titleGold: "CONTENT",
    sub: "Follow me on YouTube, Facebook, Instagram and LinkedIn for weekly content on AI, development, music and technology.",
    channels: [
      {
        handle: "WasakaBe Channel",
        description: "Technical content about AI, software development, systems architecture and technology in general. Tutorials, analysis and live projects.",
        stats: ["Tutorials", "Projects", "Weekly"],
        label: "SUBSCRIBE",
      },
      {
        handle: "WasakaBe Official",
        description: "Active community where I share exclusive content, behind the scenes, music and direct connection with the audience.",
        stats: ["Daily content", "Community", "Exclusive"],
        label: "FOLLOW",
      },
      {
        handle: "@wasakabeofficial",
        description: "Behind the scenes, photography, project previews and lifestyle as an engineer and multidisciplinary creator.",
        stats: ["Stories", "Behind the scenes", "Lives"],
        label: "FOLLOW",
      },
      {
        handle: "WasakaBe Official",
        description: "Professional network where I share experience in AI, software architecture, technology projects and professional growth.",
        stats: ["Network", "Projects", "Articles"],
        label: "CONNECT",
      },
    ],
  },
  contact: {
    eyebrow: "CONTACT",
    titleStart: "HAVE A",
    titleGold: "PROJECT?",
    sub: "I'm open to collaborations, consulting and new challenges. Tell me about your project and I'll get back to you shortly.",
    formLabels: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
    },
    placeholders: {
      name: "Your name",
      email: "you@email.com",
      message: "Tell me about your project...",
    },
    subjects: [
      "Software project",
      "AI consulting",
      "Creative collaboration",
      "Mentorship",
      "Other",
    ],
    directText: "Prefer a more direct contact? Write to me directly at",
    btnSend: "SEND MESSAGE",
    btnSending: "SENDING…",
    feedbackOk: "Message sent successfully. I'll get back to you soon.",
    feedbackErr: "There was an error sending. Please try again later.",
    emailErrors: {
      empty: "Email cannot be empty.",
      tooLong: "Email is too long.",
      invalidFormat: "Invalid email format. E.g.: user@domain.com",
      noTld: "Domain must have a valid TLD (e.g.: .com, .mx, .org).",
      localNotAllowed: "Local emails are not allowed.",
      invalidTld: "Email TLD is not valid.",
    },
    emailWarning: "Could not fully verify the email.",
  },
  footer: {
    tagline: "Engineering · AI · Creativity",
    links: [
      { label: "Home", href: "#" },
      { label: "Services", href: "#services" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" },
      { label: "Terms", href: "/terminos-y-condiciones" },
      { label: "Privacy", href: "/aviso-de-privacidad" },
    ],
    copyright: "© {year} Wasaka Be. All rights reserved.",
    legal: "Eng. Alan de Jesús Martínez Hernández",
  },
};

const zh: TranslationSet = {
  common: { loading: "加载中…" },
  navbar: {
    logoFull: "WASAKABE",
    links: [
      { label: "首页", href: "#" },
      { label: "服务", href: "#services" },
      { label: "经验", href: "#experience" },
      { label: "频道", href: "#canal" },
    ],
    cta: "联系我",
  },
  hero: {
    badge: "全栈 · AI · 创意",
    title: "混合",
    titleGold: "智能",
    titleWhite: "&",
    titleGold2: "创意制作",
    desc: "一个多学科工作室，AI工程和全栈开发与电影艺术和音乐制作在这里交汇。",
    btnPrimary: "启动项目",
    btnSecondary: "探索作品",
    statProjects: "项目",
    statYears: "年",
  },
  about: {
    eyebrow: "关于我",
    headingStart: "架构",
    headingGold: "代码背后",
    headingEnd: "的设计",
    pullQuote: '"最好的软件不仅能用，而且感觉良好。"',
    text1: "软件架构师和多学科工程师，在AI、全栈和DevOps领域拥有丰富经验。我的方法将系统性思维与创造性感知相结合。",
    text2: "每一行代码背后都蕴含着设计决策。无论是在Neuropoint.ai构建AI智能体，在XTI Like Capital开发移动应用，还是制作视听作品和音乐，我都遵循同样的原则：架构至关重要。",
    text3Start: "毕业于",
    text3Link: "UTHH",
    text3End: "的软件开发与管理工程师。个人品牌",
    brand: "WasakaBe",
    badgesTech: ["AI智能体", "全栈", "DevOps", "大语言模型", "移动开发"],
    badgesCreative: ["电影", "音乐制作", "摄影", "导演"],
  },
  services: {
    eyebrow: "服务",
    titleStart: "我能为你",
    titleGold: "做什么",
    sub: "四个领域，我将高水平工程与创意制作相结合，交付可衡量的成果。",
    cards: [
      {
        id: "01",
        title: "软件工程",
        desc: "使用AI、全栈、DevOps和移动技术进行复杂系统的架构和开发。从概念到部署，构建可扩展的产品。",
        cta: "了解更多 →",
      },
      {
        id: "02",
        title: "创意指导",
        desc: "为视觉和视听项目提供创意指导。以技术眼光和艺术敏感性进行概念构思、叙事和执行。",
        cta: "了解更多 →",
      },
      {
        id: "03",
        title: "视听制作",
        desc: "音乐制作、节拍制作、视频编辑和后期制作。从故事板到最终母带，达到专业标准。",
        cta: "了解更多 →",
      },
      {
        id: "04",
        title: "导师指导",
        desc: "为技术团队和新兴专业人士提供指导和咨询。职业策略、软件架构和AI应用。",
        cta: "了解更多 →",
      },
    ],
  },
  experience: {
    eyebrow: "工作经历",
    titleStart: "我的",
    titleGold: "职业轨迹",
    sub: "在科技公司的专业经验，将软件工程与人工智能相结合。",
    entries: [
      {
        period: "2025年5月 — 至今",
        role: "全栈AI工程师",
        highlights: [
          "AI智能体生态系统 — 自主对话智能体（语音和文本）的工程和投产部署，用于医疗、医院和活动领域的工作流自动化和全天候支持。",
          "自主基础设施监控 — 通过将AI智能体与Zabbix和GNS3集成，构建智能警报系统架构，包括用于自主事件管理的高精度路由引擎。",
          "物流与B2B自动化架构 — AI平台的后端设计，用于优化复杂海关操作。协调网络爬取管道和AI智能体，实现LinkedIn自动潜在客户发掘和HR流程中的智能候选人筛选。",
        ],
        tags: ["AI智能体", "n8n", "大语言模型", "自动化", "Zabbix", "GNS3"],
      },
      {
        period: "2025年1月 — 4月",
        role: "移动开发工程师",
        highlights: [
          "端到端移动工程 — 独立负责完整的开发周期，从架构到在App Store和Google Play上发布，使用React Native。",
          "支付网关 — 使用Stripe集成安全和定期支付基础设施，在PCI合规下管理复杂交易逻辑。",
          '社会影响模块 — 开发私有网络生态系统（"Connect"），具有实时动态和市民城市事件报告系统。',
        ],
        tags: ["React Native", "Stripe", "移动开发", "iOS", "Android"],
      },
      {
        period: "2023年9月 — 2024年12月",
        role: "全栈软件工程师",
        highlights: [
          "六边形后端架构 — 在Python（Flask）中根据六边形架构原则开发健壮、解耦的API，确保可维护性和灵活性。",
          "多平台生态系统 — 领导统一网络的架构设计，使用React.js + Vite（TypeScript）用于Web，Flutter用于移动设备和可穿戴设备（智能手表）。",
          "语音集成（Alexa） — 开发Amazon Alexa技能，通过自然语言处理实现实时学术记录查询。",
          "数字身份与DevOps — 使用数字凭证设计外围访问控制，实施CI/CD管道实现测试自动化和部署。",
        ],
        tags: ["Flask", "React", "Flutter", "Alexa", "CI/CD", "Python"],
      },
      {
        period: "2024年2月 — 4月",
        role: "软件工程师",
        highlights: [
          "优化与演进维护 — 修复基于Java（Spring Boot）和PHP（Laravel）的企业平台的关键故障。",
          "通知与数据引擎 — 根据DSD-Core命名约定设计机构警报系统，领导遗留数据库迁移和清理以确保特殊字符完整性。",
        ],
        tags: ["Java", "Spring Boot", "PHP", "Laravel", "数据库"],
      },
    ],
  },
  canal: {
    eyebrow: "频道与社区",
    titleStart: "观看我的",
    titleGold: "内容",
    sub: "在YouTube、Facebook、Instagram和LinkedIn上关注我，获取关于AI、开发、音乐和技术的每周内容。",
    channels: [
      {
        handle: "WasakaBe频道",
        description: "关于AI、软件开发、系统架构和一般技术的技术内容。教程、分析和直播项目。",
        stats: ["教程", "项目", "每周更新"],
        label: "订阅",
      },
      {
        handle: "WasakaBe官方",
        description: "活跃社区，我在这里分享独家内容、幕后花絮、音乐以及与观众的直连互动。",
        stats: ["每日内容", "社区", "独家"],
        label: "关注",
      },
      {
        handle: "@wasakabeofficial",
        description: "幕后花絮、摄影、项目预览以及作为工程师和多元创客的生活方式。",
        stats: ["故事", "幕后", "直播"],
        label: "关注",
      },
      {
        handle: "WasakaBe官方",
        description: "专业网络，我在这里分享AI、软件架构、技术项目和职业成长方面的经验。",
        stats: ["社交网络", "项目", "文章"],
        label: "连接",
      },
    ],
  },
  contact: {
    eyebrow: "联系",
    titleStart: "有",
    titleGold: "项目？",
    sub: "我对合作、咨询和新挑战持开放态度。告诉我你的项目，我会尽快回复。",
    formLabels: {
      name: "姓名",
      email: "邮箱",
      subject: "主题",
      message: "留言",
    },
    placeholders: {
      name: "你的姓名",
      email: "you@email.com",
      message: "告诉我你的项目...",
    },
    subjects: [
      "软件项目",
      "AI咨询",
      "创意合作",
      "导师指导",
      "其他",
    ],
    directText: "想要更直接的联系？直接写信给我",
    btnSend: "发送留言",
    btnSending: "发送中…",
    feedbackOk: "留言发送成功。我会尽快回复你。",
    feedbackErr: "发送时出现错误。请稍后重试。",
    emailErrors: {
      empty: "邮箱不能为空。",
      tooLong: "邮箱地址太长。",
      invalidFormat: "邮箱格式无效。例如：user@domain.com",
      noTld: "域名必须有有效的顶级域（如：.com, .mx, .org）。",
      localNotAllowed: "不允许使用本地邮箱。",
      invalidTld: "邮箱顶级域无效。",
    },
    emailWarning: "无法完全验证该邮箱。",
  },
  footer: {
    tagline: "工程 · AI · 创意",
    links: [
      { label: "首页", href: "#" },
      { label: "服务", href: "#services" },
      { label: "经验", href: "#experience" },
      { label: "联系", href: "#contact" },
      { label: "条款", href: "/terminos-y-condiciones" },
      { label: "隐私", href: "/aviso-de-privacidad" },
    ],
    copyright: "© {year} Wasaka Be. 保留所有权利。",
    legal: "工程师 Alan de Jesús Martínez Hernández",
  },
};

const ko: TranslationSet = {
  common: { loading: "로딩 중…" },
  navbar: {
    logoFull: "WASAKABE",
    links: [
      { label: "홈", href: "#" },
      { label: "서비스", href: "#services" },
      { label: "경력", href: "#experience" },
      { label: "채널", href: "#canal" },
    ],
    cta: "연락처",
  },
  hero: {
    badge: "풀스택 · AI · 크리에이티브",
    title: "하이브리드",
    titleGold: "지능",
    titleWhite: "&",
    titleGold2: "크리에이티브 프로덕션",
    desc: "AI 엔지니어링과 풀스택 개발이 영화 예술 및 음악 제작과 만나는 multidisciplinary 스튜디오입니다.",
    btnPrimary: "프로젝트 시작",
    btnSecondary: "작업 살펴보기",
    statProjects: "프로젝트",
    statYears: "년",
  },
  about: {
    eyebrow: "소개",
    headingStart: "아키텍처",
    headingGold: "코드",
    headingEnd: "뒤의 설계",
    pullQuote: '"최고의 소프트웨어는 단지 작동할 뿐만 아니라, 느낌이 좋아야 합니다."',
    text1: "AI, 풀스택 및 DevOps 경험을 갖춘 소프트웨어 아키텍트이자 multidisciplinary 엔지니어입니다. 시스템적 사고와 창의적 감각을 결합합니다.",
    text2: "모든 코드 라인 뒤에는 디자인 결정이 있습니다. Neuropoint.ai에서 AI 에이전트를 구축하든, XTI Like Capital에서 모바일 앱을 개발하든, 영상과 음악을 제작하든, 저는 동일한 원칙을 적용합니다: 아키텍처가 중요합니다.",
    text3Start: "",
    text3Link: "UTHH",
    text3End: "에서 소프트웨어 개발 및 관리 공학을 전공했습니다. 개인 브랜드 ",
    brand: "WasakaBe",
    badgesTech: ["AI 에이전트", "풀스택", "DevOps", "LLMs", "모바일"],
    badgesCreative: ["영화", "비트메이킹", "사진", "디렉션"],
  },
  services: {
    eyebrow: "서비스",
    titleStart: "제가",
    titleGold: "도와드릴 일",
    sub: "높은 수준의 엔지니어링과 창의적 프로덕션을 결합하여 측정 가능한 결과를 제공하는 네 가지 영역입니다.",
    cards: [
      {
        id: "01",
        title: "소프트웨어 엔지니어링",
        desc: "AI, 풀스택, DevOps 및 모바일을 사용한 복잡한 시스템의 아키텍처 및 개발. 컨셉부터 배포까지 확장 가능한 제품을 구축합니다.",
        cta: "더 알아보기 →",
      },
      {
        id: "02",
        title: "크리에이티브 디렉션",
        desc: "시각 및 영상 프로젝트를 위한 크리에이티브 디렉션. 기술적 안목과 예술적 감각을 갖춘 컨셉, 내러티브 및 실행.",
        cta: "더 알아보기 →",
      },
      {
        id: "03",
        title: "영상 제작",
        desc: "음악 제작, 비트메이킹, 비디오 편집 및 후반 작업. 스토리보드부터 최종 마스터까지 전문적 기준으로 작업합니다.",
        cta: "더 알아보기 →",
      },
      {
        id: "04",
        title: "멘토링",
        desc: "기술 팀과 신진 전문가를 위한 지도 및 조언. 경력 전략, 소프트웨어 아키텍처 및 AI 도입.",
        cta: "더 알아보기 →",
      },
    ],
  },
  experience: {
    eyebrow: "경력",
    titleStart: "제가",
    titleGold: "일했던 곳",
    sub: "소프트웨어 엔지니어링과 인공지능을 결합한 기술 기업에서의 전문 경력.",
    entries: [
      {
        period: "2025년 5월 — 현재",
        role: "풀스택 AI 엔지니어",
        highlights: [
          "AI 에이전트 생태계 — 의료, 병원 및 이벤트 분야에서 워크플로 자동화 및 24/7 지원을 위한 자율 대화형 에이전트(음성 및 텍스트)의 엔지니어링 및 프로덕션 배포.",
          "자율 인프라 모니터링 — Zabbix 및 GNS3와 AI 에이전트를 통합한 지능형 알림 시스템 아키텍처, 자율 사고 관리를 위한 고정밀 라우팅 엔진 포함.",
          "물류 및 B2B 자동화 아키텍처 — 복잡한 통관 작업 최적화를 위한 AI 플랫폼 백엔드 설계. 자동 LinkedIn 잠재 고객 발굴 및 HR 프로세스의 지능형 후보자 선별을 위한 웹 스크래핑 파이프라인 및 AI 에이전트 오케스트레이션.",
        ],
        tags: ["AI 에이전트", "n8n", "LLMs", "자동화", "Zabbix", "GNS3"],
      },
      {
        period: "2025년 1월 — 4월",
        role: "모바일 개발자",
        highlights: [
          "엔드투엔드 모바일 엔지니어링 — React Native를 사용하여 아키텍처부터 App Store 및 Google Play 출시까지 전체 개발 주기를 단독 담당.",
          "결제 게이트웨이 — Stripe를 통한 안전하고 정기적인 결제 인프라 통합, PCI 규정 준수 하에 복잡한 트랜잭션 로직 관리.",
          '사회 영향 모듈 — 실시간 피드와 시민 도시 사건 신고 시스템을 갖춘 사설 네트워크 생태계("Connect") 개발.',
        ],
        tags: ["React Native", "Stripe", "모바일", "iOS", "Android"],
      },
      {
        period: "2023년 9월 — 2024년 12월",
        role: "풀스택 소프트웨어 엔지니어",
        highlights: [
          "헥사고날 백엔드 아키텍처 — 유지보수성과 유연성을 보장하기 위해 헥사고날 아키텍처 원칙에 따라 Python(Flask)으로 견고하고 분리된 API 개발.",
          "멀티플랫폼 생태계 — 웹용 React.js + Vite(TypeScript)와 모바일 기기 및 웨어러블(스마트워치)용 Flutter를 사용한 통합 네트워크 아키텍처 리드.",
          "음성 통합(Alexa) — 자연어 처리를 통한 실시간 학업 기록 조회를 위한 Amazon Alexa 스킬 개발.",
          "디지털 아이덴티티 및 DevOps — 디지털 자격 증명을 통한 경계 접근 제어 설계 및 테스트 자동화와 배포를 위한 CI/CD 파이프라인 구현.",
        ],
        tags: ["Flask", "React", "Flutter", "Alexa", "CI/CD", "Python"],
      },
      {
        period: "2024년 2월 — 4월",
        role: "소프트웨어 엔지니어",
        highlights: [
          "최적화 및 진화적 유지보수 — Java(Spring Boot) 및 PHP(Laravel) 기반 엔터프라이즈 플랫폼의 중요 버그 수정.",
          "알림 및 데이터 엔진 — DSD-Core 명명 규칙에 따른 기관 알림 시스템 설계 및 특수 문자 무결성을 보장하기 위한 레거시 데이터베이스 마이그레이션 및 정리 주도.",
        ],
        tags: ["Java", "Spring Boot", "PHP", "Laravel", "데이터베이스"],
      },
    ],
  },
  canal: {
    eyebrow: "채널 및 커뮤니티",
    titleStart: "내",
    titleGold: "콘텐츠 보기",
    sub: "YouTube, Facebook, Instagram 및 LinkedIn에서 AI, 개발, 음악 및 기술에 대한 주간 콘텐츠를 팔로우하세요.",
    channels: [
      {
        handle: "WasakaBe 채널",
        description: "AI, 소프트웨어 개발, 시스템 아키텍처 및 일반 기술에 대한 기술 콘텐츠. 튜토리얼, 분석 및 라이브 프로젝트.",
        stats: ["튜토리얼", "프로젝트", "주간"],
        label: "구독",
      },
      {
        handle: "WasakaBe 공식",
        description: "독점 콘텐츠, 비하인드, 음악 및 청중과의 직접 소통을 공유하는 활성 커뮤니티.",
        stats: ["일일 콘텐츠", "커뮤니티", "독점"],
        label: "팔로우",
      },
      {
        handle: "@wasakabeofficial",
        description: "엔지니어이자 multidisciplinary 크리에이터로서의 비하인드, 사진, 프로젝트 미리보기 및 라이프스타일.",
        stats: ["스토리", "비하인드", "라이브"],
        label: "팔로우",
      },
      {
        handle: "WasakaBe 공식",
        description: "AI, 소프트웨어 아키텍처, 기술 프로젝트 및 전문적 성장에 대한 경험을 공유하는 전문 네트워크.",
        stats: ["네트워크", "프로젝트", "아티클"],
        label: "연결",
      },
    ],
  },
  contact: {
    eyebrow: "연락처",
    titleStart: "프로젝트가",
    titleGold: "있으신가요?",
    sub: "협업, 컨설팅 및 새로운 도전에 열려 있습니다. 프로젝트에 대해 알려주시면 곧 답변드리겠습니다.",
    formLabels: {
      name: "이름",
      email: "이메일",
      subject: "제목",
      message: "메시지",
    },
    placeholders: {
      name: "이름을 입력하세요",
      email: "you@email.com",
      message: "프로젝트에 대해 알려주세요...",
    },
    subjects: [
      "소프트웨어 프로젝트",
      "AI 컨설팅",
      "크리에이티브 협업",
      "멘토링",
      "기타",
    ],
    directText: "더 직접적인 연락을 원하시나요? 다음 주소로 직접 이메일 보내기",
    btnSend: "메시지 보내기",
    btnSending: "보내는 중…",
    feedbackOk: "메시지가 성공적으로 전송되었습니다. 곧 답변드리겠습니다.",
    feedbackErr: "전송 중 오류가 발생했습니다. 나중에 다시 시도해주세요.",
    emailErrors: {
      empty: "이메일을 입력해주세요.",
      tooLong: "이메일 주소가 너무 깁니다.",
      invalidFormat: "이메일 형식이 잘못되었습니다. 예: user@domain.com",
      noTld: "도메인에 유효한 TLD가 있어야 합니다 (예: .com, .mx, .org).",
      localNotAllowed: "로컬 이메일은 허용되지 않습니다.",
      invalidTld: "이메일 TLD가 유효하지 않습니다.",
    },
    emailWarning: "이메일을 완전히 확인할 수 없습니다.",
  },
  footer: {
    tagline: "엔지니어링 · AI · 크리에이티브",
    links: [
      { label: "홈", href: "#" },
      { label: "서비스", href: "#services" },
      { label: "경력", href: "#experience" },
      { label: "연락처", href: "#contact" },
      { label: "약관", href: "/terminos-y-condiciones" },
      { label: "개인정보", href: "/aviso-de-privacidad" },
    ],
    copyright: "© {year} Wasaka Be. 모든 권리 보유.",
    legal: "공학사 Alan de Jesús Martínez Hernández",
  },
};

const ru: TranslationSet = {
  common: { loading: "Загрузка…" },
  navbar: {
    logoFull: "WASAKABE",
    links: [
      { label: "Главная", href: "#" },
      { label: "Услуги", href: "#services" },
      { label: "Опыт", href: "#experience" },
      { label: "Канал", href: "#canal" },
    ],
    cta: "КОНТАКТЫ",
  },
  hero: {
    badge: "ФУЛСТАК · ИИ · КРЕАТИВ",
    title: "ГИБРИДНЫЙ",
    titleGold: "ИНТЕЛЛЕКТ",
    titleWhite: "&",
    titleGold2: "КРЕАТИВНОЕ ПРОИЗВОДСТВО",
    desc: "Мультидисциплинарная студия, где инженерия ИИ и фулстак объединяются с киноискусством и музыкальным продакшеном.",
    btnPrimary: "НАЧАТЬ ПРОЕКТ",
    btnSecondary: "ИЗУЧИТЬ РАБОТЫ",
    statProjects: "Проектов",
    statYears: "Лет",
  },
  about: {
    eyebrow: "ОБО МНЕ",
    headingStart: "АРХИТЕКТУРА",
    headingGold: "ЗА",
    headingEnd: "КОДОМ",
    pullQuote: '"Лучшее программное обеспечение не просто работает — оно ощущается правильно."',
    text1: "Архитектор ПО и мультидисциплинарный инженер с опытом в ИИ, фулстак и DevOps. Мой подход сочетает системное мышление с творческой чуткостью.",
    text2: "За каждой строкой кода стоит дизайнерское решение. Будь то создание ИИ-агентов в Neuropoint.ai, разработка мобильных приложений в XTI Like Capital или производство видео и музыки — я применяю один принцип: архитектура имеет значение.",
    text3Start: "Инженер по разработке и управлению ПО, выпускник ",
    text3Link: "UTHH",
    text3End: "Создатель персонального бренда ",
    brand: "WasakaBe",
    badgesTech: ["ИИ-агенты", "Фулстак", "DevOps", "LLM", "Мобайл"],
    badgesCreative: ["Кино", "Битмейкер", "Фотография", "Режиссура"],
  },
  services: {
    eyebrow: "УСЛУГИ",
    titleStart: "ЧТО Я МОГУ",
    titleGold: "ДЛЯ ВАС СДЕЛАТЬ",
    sub: "Четыре направления, где я сочетаю высокоуровневую инженерию с креативным продакшеном для достижения измеримых результатов.",
    cards: [
      {
        id: "01",
        title: "Программная инженерия",
        desc: "Архитектура и разработка сложных систем с ИИ, фулстак, DevOps и мобайл. Создаю масштабируемые продукты от концепции до развертывания.",
        cta: "Узнать больше →",
      },
      {
        id: "02",
        title: "Креативное руководство",
        desc: "Креативное руководство визуальными и аудиовизуальными проектами. Концепция, нарратив и реализация с техническим взглядом и художественной чуткостью.",
        cta: "Узнать больше →",
      },
      {
        id: "03",
        title: "Аудиовизуальное",
        desc: "Музыкальное производство, битмейкинг, видеомонтаж и постпродакшн. От раскадровки до финального мастера с профессиональным стандартом.",
        cta: "Узнать больше →",
      },
      {
        id: "04",
        title: "Наставничество",
        desc: "Руководство и консультирование технических команд и начинающих профессионалов. Карьерная стратегия, архитектура ПО и внедрение ИИ.",
        cta: "Узнать больше →",
      },
    ],
  },
  experience: {
    eyebrow: "ОПЫТ",
    titleStart: "ГДЕ Я",
    titleGold: "РАБОТАЛ",
    sub: "Профессиональный опыт в технологических компаниях, сочетающий программную инженерию с искусственным интеллектом.",
    entries: [
      {
        period: "МАЙ 2025 — Н.В.",
        role: "Фулстак AI-инженер",
        highlights: [
          "Экосистемы ИИ-агентов — Разработка и производственное развертывание автономных диалоговых агентов (голос и текст) для автоматизации рабочих процессов и круглосуточной поддержки в медицинском, больничном и событийном секторах.",
          "Автономный мониторинг инфраструктуры — Архитектура интеллектуальной системы оповещения путем интеграции ИИ-агентов с Zabbix и GNS3, включая высокоточный механизм маршрутизации для автономного управления инцидентами.",
          "Архитектура для логистики и B2B-автоматизации — Бэкенд-дизайн платформ ИИ для оптимизации сложных таможенных операций. Оркестровка пайплайнов веб-скрапинга и ИИ-агентов для автоматизированного поиска в LinkedIn и интеллектуального отбора кандидатов в HR-процессах.",
        ],
        tags: ["ИИ-агенты", "n8n", "LLM", "Автоматизация", "Zabbix", "GNS3"],
      },
      {
        period: "ЯНВ — АПР 2025",
        role: "Мобильный разработчик",
        highlights: [
          "Сквозная мобильная разработка — Единственный ответственный за полный цикл разработки от архитектуры до публикации в App Store и Google Play с использованием React Native.",
          "Платежные шлюзы — Интеграция безопасной и регулярной платежной инфраструктуры со Stripe, управление сложной транзакционной логикой в соответствии с PCI.",
          'Модули социального воздействия — Разработка экосистемы частной сети ("Connect") с лентами в реальном времени и системой отчетности о городских инцидентах.',
        ],
        tags: ["React Native", "Stripe", "Мобайл", "iOS", "Android"],
      },
      {
        period: "СЕН 2023 — ДЕК 2024",
        role: "Фулстак-инженер ПО",
        highlights: [
          "Гексагональная архитектура бэкенда — Разработка надежных, слабосвязанных API на Python (Flask) по принципам гексагональной архитектуры для обеспечения поддерживаемости и гибкости.",
          "Мультиплатформенная экосистема — Ведущий архитектор единой сети с использованием React.js + Vite (TypeScript) для веб и Flutter для мобильных устройств и носимых гаджетов (смарт-часов).",
          "Голосовая интеграция (Alexa) — Разработка навыка Amazon Alexa для запросов академических записей в реальном времени через обработку естественного языка.",
          "Цифровая идентичность и DevOps — Проектирование периметрального контроля доступа с помощью цифровых учетных данных и внедрение пайплайнов CI/CD для автоматизации тестирования и развертывания.",
        ],
        tags: ["Flask", "React", "Flutter", "Alexa", "CI/CD", "Python"],
      },
      {
        period: "ФЕВ — АПР 2024",
        role: "Инженер ПО",
        highlights: [
          "Оптимизация и эволюционное сопровождение — Исправление критических ошибок в корпоративных платформах на Java (Spring Boot) и PHP (Laravel).",
          "Движки уведомлений и данных — Проектирование системы институциональных оповещений по соглашению об именовании DSD-Core и руководство миграцией и очисткой устаревших баз данных для обеспечения целостности специальных символов.",
        ],
        tags: ["Java", "Spring Boot", "PHP", "Laravel", "Базы данных"],
      },
    ],
  },
  canal: {
    eyebrow: "КАНАЛ И СООБЩЕСТВО",
    titleStart: "СМОТРИ МОЙ",
    titleGold: "КОНТЕНТ",
    sub: "Следи за мной на YouTube, Facebook, Instagram и LinkedIn для еженедельного контента об ИИ, разработке, музыке и технологиях.",
    channels: [
      {
        handle: "Канал WasakaBe",
        description: "Технический контент об ИИ, разработке ПО, архитектуре систем и технологиях в целом. Учебники, аналитика и живые проекты.",
        stats: ["Учебники", "Проекты", "Еженедельно"],
        label: "ПОДПИСАТЬСЯ",
      },
      {
        handle: "WasakaBe Официальный",
        description: "Активное сообщество, где я делюсь эксклюзивным контентом, закулисными кадрами, музыкой и прямым общением с аудиторией.",
        stats: ["Ежедневно", "Сообщество", "Эксклюзив"],
        label: "ЧИТАТЬ",
      },
      {
        handle: "@wasakabeofficial",
        description: "Закулисные кадры, фотографии, превью проектов и образ жизни инженера и мультидисциплинарного создателя.",
        stats: ["Истории", "Закулисье", "Прямые эфиры"],
        label: "ЧИТАТЬ",
      },
      {
        handle: "WasakaBe Official",
        description: "Профессиональная сеть, где я делюсь опытом в ИИ, архитектуре ПО, технологических проектах и профессиональном росте.",
        stats: ["Сеть", "Проекты", "Статьи"],
        label: "ПОДКЛЮЧИТЬСЯ",
      },
    ],
  },
  contact: {
    eyebrow: "КОНТАКТЫ",
    titleStart: "ЕСТЬ",
    titleGold: "ПРОЕКТ?",
    sub: "Я открыт к сотрудничеству, консультациям и новым вызовам. Расскажите о своем проекте, и я свяжусь с вами в ближайшее время.",
    formLabels: {
      name: "Имя",
      email: "Эл. почта",
      subject: "Тема",
      message: "Сообщение",
    },
    placeholders: {
      name: "Ваше имя",
      email: "you@email.com",
      message: "Расскажите о вашем проекте...",
    },
    subjects: [
      "Программный проект",
      "ИИ-консалтинг",
      "Креативное сотрудничество",
      "Наставничество",
      "Другое",
    ],
    directText: "Предпочитаете более прямой контакт? Напишите мне напрямую",
    btnSend: "ОТПРАВИТЬ",
    btnSending: "ОТПРАВКА…",
    feedbackOk: "Сообщение успешно отправлено. Я свяжусь с вами в ближайшее время.",
    feedbackErr: "Произошла ошибка при отправке. Пожалуйста, попробуйте позже.",
    emailErrors: {
      empty: "Email не может быть пустым.",
      tooLong: "Email слишком длинный.",
      invalidFormat: "Неверный формат email. Пример: user@domain.com",
      noTld: "Домен должен иметь действительный TLD (например: .com, .mx, .org).",
      localNotAllowed: "Локальные email не разрешены.",
      invalidTld: "TLD email недействителен.",
    },
    emailWarning: "Не удалось полностью проверить email.",
  },
  footer: {
    tagline: "Инженерия · ИИ · Креативность",
    links: [
      { label: "Главная", href: "#" },
      { label: "Услуги", href: "#services" },
      { label: "Опыт", href: "#experience" },
      { label: "Контакты", href: "#contact" },
      { label: "Условия", href: "/terminos-y-condiciones" },
      { label: "Конфиденциальность", href: "/aviso-de-privacidad" },
    ],
    copyright: "© {year} Wasaka Be. Все права защищены.",
    legal: "Инж. Alan de Jesús Martínez Hernández",
  },
};

const ja: TranslationSet = {
  common: { loading: "読み込み中…" },
  navbar: {
    logoFull: "WASAKABE",
    links: [
      { label: "ホーム", href: "#" },
      { label: "サービス", href: "#services" },
      { label: "経験", href: "#experience" },
      { label: "チャンネル", href: "#canal" },
    ],
    cta: "お問い合わせ",
  },
  hero: {
    badge: "フルスタック · AI · クリエイティブ",
    title: "ハイブリッド",
    titleGold: "インテリジェンス",
    titleWhite: "&",
    titleGold2: "クリエイティブプロダクション",
    desc: "AIエンジニアリングとフルスタック開発が映画芸術や音楽制作と融合するマルチディシプリンなスタジオです。",
    btnPrimary: "プロジェクトを開始",
    btnSecondary: "作品を見る",
    statProjects: "プロジェクト",
    statYears: "年",
  },
  about: {
    eyebrow: "私について",
    headingStart: "アーキテクチャ",
    headingGold: "コードの",
    headingEnd: "裏側",
    pullQuote: '"最高のソフトウェアはただ動くだけでなく、感じがいいものです。"',
    text1: "AI、フルスタック、DevOpsの経験を持つソフトウェアアーキテクト兼マルチディシプリンエンジニア。システム思考と創造的感性を組み合わせたアプローチを取っています。",
    text2: "コードの1行1行の背後にはデザイン上の決定があります。Neuropoint.aiでAIエージェントを構築する場合でも、XTI Like Capitalでモバイルアプリを開発する場合でも、映像作品や音楽を制作する場合でも、同じ原則を適用しています：アーキテクチャが重要です。",
    text3Start: "",
    text3Link: "UTHH",
    text3End: "卒業のソフトウェア開発管理エンジニア。パーソナルブランド ",
    brand: "WasakaBe",
    badgesTech: ["AIエージェント", "フルスタック", "DevOps", "LLMs", "モバイル"],
    badgesCreative: ["映画", "ビートメイキング", "写真", "ディレクション"],
  },
  services: {
    eyebrow: "サービス",
    titleStart: "私が",
    titleGold: "提供できること",
    sub: "ハイレベルなエンジニアリングとクリエイティブプロダクションを組み合わせ、測定可能な結果を提供する4つの分野です。",
    cards: [
      {
        id: "01",
        title: "ソフトウェアエンジニアリング",
        desc: "AI、フルスタック、DevOps、モバイルを用いた複雑なシステムのアーキテクチャと開発。コンセプトからデプロイまで、スケーラブルな製品を構築します。",
        cta: "詳細を見る →",
      },
      {
        id: "02",
        title: "クリエイティブディレクション",
        desc: "ビジュアルおよび映像プロジェクトのクリエイティブディレクション。技術的な視点と芸術的感覚を備えたコンセプト、ナラティブ、実行。",
        cta: "詳細を見る →",
      },
      {
        id: "03",
        title: "映像制作",
        desc: "音楽制作、ビートメイキング、ビデオ編集、ポストプロダクション。ストーリーボードから最終マスターまでプロの基準で対応します。",
        cta: "詳細を見る →",
      },
      {
        id: "04",
        title: "メンターシップ",
        desc: "技術チームや新興プロフェッショナルへのガイダンスとアドバイザリー。キャリア戦略、ソフトウェアアーキテクチャ、AI導入。",
        cta: "詳細を見る →",
      },
    ],
  },
  experience: {
    eyebrow: "経歴",
    titleStart: "私の",
    titleGold: "職歴",
    sub: "ソフトウェアエンジニアリングと人工知能を組み合わせたテクノロジー企業での専門経験。",
    entries: [
      {
        period: "2025年5月 — 現在",
        role: "フルスタックAIエンジニア",
        highlights: [
          "AIエージェントエコシステム — 医療、病院、イベント分野におけるワークフロー自動化と24時間体制サポートのための自律会話エージェント（音声・テキスト）のエンジニアリングと本番展開。",
          "自律インフラ監視 — ZabbixおよびGNS3とAIエージェントの統合によるインテリジェントアラートシステムのアーキテクチャ設計。自律的なインシデント管理のための高精度ルーティングエンジンを含む。",
          "物流・B2B自動化アーキテクチャ — 複雑な通関業務最適化のためのAIプラットフォームのバックエンド設計。WebスクレイピングパイプラインとAIエージェントのオーケストレーションによるLinkedIn自動プロスペクティングとHRプロセスでのインテリジェント候補者選別。",
        ],
        tags: ["AIエージェント", "n8n", "LLMs", "自動化", "Zabbix", "GNS3"],
      },
      {
        period: "2025年1月 — 4月",
        role: "モバイル開発者",
        highlights: [
          "エンドツーエンドモバイルエンジニアリング — React Nativeを使用したアーキテクチャからApp StoreおよびGoogle Playへの公開までの完全な開発サイクルを単独担当。",
          "決済ゲートウェイ — Stripeによる安全で定期的な決済インフラの統合、PCI準拠の下での複雑なトランザクションロジックの管理。",
          '社会的インパクトモジュール — リアルタイムフィードと市民向け都市インシデント報告システムを備えたプライベートネットワークエコシステム（"Connect"）の開発。',
        ],
        tags: ["React Native", "Stripe", "モバイル", "iOS", "Android"],
      },
      {
        period: "2023年9月 — 2024年12月",
        role: "フルスタックソフトウェアエンジニア",
        highlights: [
          "ヘキサゴナルバックエンドアーキテクチャ — ヘキサゴナルアーキテクチャの原則に基づき、Python（Flask）で堅牢で疎結合なAPIを開発し、保守性と柔軟性を確保。",
          "マルチプラットフォームエコシステム — Web向けReact.js + Vite（TypeScript）とモバイルデバイスおよびウェアラブル（スマートウォッチ）向けFlutterを使用した統一ネットワークのアーキテクチャリーダー。",
          "音声統合（Alexa） — 自然言語処理によるリアルタイムの学籍記録照会のためのAmazon Alexaスキル開発。",
          "デジタルアイデンティティとDevOps — デジタル認証情報による境界アクセス制御の設計、テスト自動化とデプロイのためのCI/CDパイプラインの実装。",
        ],
        tags: ["Flask", "React", "Flutter", "Alexa", "CI/CD", "Python"],
      },
      {
        period: "2024年2月 — 4月",
        role: "ソフトウェアエンジニア",
        highlights: [
          "最適化と進化的メンテナンス — Java（Spring Boot）およびPHP（Laravel）ベースのエンタープライズプラットフォームのクリティカルバグ修正。",
          "通知およびデータエンジン — DSD-Core命名規則に基づく機関向けアラートシステムの設計、特殊文字の整合性を確保するためのレガシーデータベースマイグレーションとクリーンアップの主導。",
        ],
        tags: ["Java", "Spring Boot", "PHP", "Laravel", "データベース"],
      },
    ],
  },
  canal: {
    eyebrow: "チャンネルとコミュニティ",
    titleStart: "私の",
    titleGold: "コンテンツを見る",
    sub: "YouTube、Facebook、Instagram、LinkedInで、AI、開発、音楽、テクノロジーに関する毎週のコンテンツをフォローしてください。",
    channels: [
      {
        handle: "WasakaBe チャンネル",
        description: "AI、ソフトウェア開発、システムアーキテクチャ、テクノロジー全般に関する技術コンテンツ。チュートリアル、分析、ライブプロジェクト。",
        stats: ["チュートリアル", "プロジェクト", "毎週"],
        label: "登録",
      },
      {
        handle: "WasakaBe 公式",
        description: "限定コンテンツ、舞台裏、音楽、視聴者との直接交流を共有する活発なコミュニティ。",
        stats: ["毎日のコンテンツ", "コミュニティ", "限定"],
        label: "フォロー",
      },
      {
        handle: "@wasakabeofficial",
        description: "エンジニア兼マルチディシプリンクリエイターとしての舞台裏、写真、プロジェクトプレビュー、ライフスタイル。",
        stats: ["ストーリー", "舞台裏", "ライブ"],
        label: "フォロー",
      },
      {
        handle: "WasakaBe 公式",
        description: "AI、ソフトウェアアーキテクチャ、テクノロジープロジェクト、プロフェッショナルな成長に関する経験を共有するプロフェッショナルネットワーク。",
        stats: ["ネットワーク", "プロジェクト", "記事"],
        label: "接続",
      },
    ],
  },
  contact: {
    eyebrow: "お問い合わせ",
    titleStart: "プロジェクトは",
    titleGold: "ありますか？",
    sub: "コラボレーション、コンサルティング、新しい挑戦に常にオープンです。プロジェクトについてお聞かせください。すぐにご連絡いたします。",
    formLabels: {
      name: "お名前",
      email: "メールアドレス",
      subject: "件名",
      message: "メッセージ",
    },
    placeholders: {
      name: "あなたの名前",
      email: "you@email.com",
      message: "プロジェクトについて教えてください...",
    },
    subjects: [
      "ソフトウェアプロジェクト",
      "AIコンサルティング",
      "クリエイティブコラボレーション",
      "メンターシップ",
      "その他",
    ],
    directText: "もっと直接的に連絡したいですか？こちらに直接メールしてください",
    btnSend: "メッセージを送信",
    btnSending: "送信中…",
    feedbackOk: "メッセージは正常に送信されました。すぐにご連絡いたします。",
    feedbackErr: "送信中にエラーが発生しました。後でもう一度お試しください。",
    emailErrors: {
      empty: "メールアドレスを入力してください。",
      tooLong: "メールアドレスが長すぎます。",
      invalidFormat: "メールアドレスの形式が無効です。例：user@domain.com",
      noTld: "ドメインには有効なTLDが必要です（例：.com, .mx, .org）。",
      localNotAllowed: "ローカルメールは許可されていません。",
      invalidTld: "メールのTLDが無効です。",
    },
    emailWarning: "メールアドレスを完全に確認できませんでした。",
  },
  footer: {
    tagline: "エンジニアリング · AI · クリエイティビティ",
    links: [
      { label: "ホーム", href: "#" },
      { label: "サービス", href: "#services" },
      { label: "経験", href: "#experience" },
      { label: "お問い合わせ", href: "#contact" },
      { label: "利用規約", href: "/terminos-y-condiciones" },
      { label: "プライバシー", href: "/aviso-de-privacidad" },
    ],
    copyright: "© {year} Wasaka Be. 全著作権所有。",
    legal: "エンジニア Alan de Jesús Martínez Hernández",
  },
};

export const translations: Record<LanguageCode, TranslationSet> = {
  es,
  en,
  zh,
  ko,
  ru,
  ja,
};

export const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  es: "Español",
  en: "English",
  zh: "中文",
  ko: "한국어",
  ru: "Русский",
  ja: "日本語",
};

export const LANGUAGE_FLAGS: Record<LanguageCode, string> = {
  es: "🇪🇸",
  en: "🇬🇧",
  zh: "🇨🇳",
  ko: "🇰🇷",
  ru: "🇷🇺",
  ja: "🇯🇵",
};
