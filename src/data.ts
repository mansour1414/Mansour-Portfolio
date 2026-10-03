/* ALL site content lives here. Edit this file only; components never hold text. */
export type L = { ar: string; en: string };
export const same = (s: string): L => ({ ar: s, en: s });

export const site = {
  name: { ar: 'منصور قصقوص', en: 'MANSOUR QASQOUS' } as L,
  title: { ar: 'منصور قصقوص | مطوّر Full-Stack', en: 'Mansour Qasqous | Full-Stack Developer' } as L,
  role: { ar: 'مطوّر Full-Stack', en: 'Full-Stack Developer' } as L,
  tagline: [
    { ar: 'أحوّل الأفكار إلى منتجات رقمية عملية وسريعة وقابلة للتوسع', en: 'I turn ideas into practical, fast, and scalable digital products' },
    { ar: 'من التخطيط والبنية التقنية إلى تجربة المستخدم والإطلاق', en: 'From technical planning and architecture to user experience and launch' },
  ] as L[],
  ring: { ar: 'FULL-STACK • WEB • SAAS • AUTOMATION • ', en: 'FULL-STACK • WEB • SAAS • AUTOMATION • ' } as L,
  monogram: { ar: 'م', en: 'M' } as L, // fallback when `photo` is empty
  photo: '/profile.jpg', // file in /public
  heroStack: ['React', 'TypeScript', 'Node.js', 'Supabase', 'Vite', 'Automation'],
  email: 'MANSOURQASQOUS@gmail.com',
  whatsapp: '966563558064',
  github: 'https://github.com/mansour1414',
  linkedin: '', // [ناقص] e.g. https://www.linkedin.com/in/USERNAME
};

export const nav: { id: string; label: L }[] = [
  { id: 'home', label: { ar: 'الرئيسية', en: 'Home' } },
  { id: 'about', label: { ar: 'نبذة عني', en: 'About' } },
  { id: 'skills', label: { ar: 'المهارات', en: 'Skills' } },
  { id: 'work', label: { ar: 'المشاريع', en: 'Projects' } },
  { id: 'services', label: { ar: 'الخدمات', en: 'Services' } },
  { id: 'certificates', label: { ar: 'الشهادات', en: 'Certificates' } },
  { id: 'contact', label: { ar: 'تواصل معي', en: 'Contact' } },
];

export const about = {
  p1: {
    ar: ['أنا ', 'منصور قصقوص', '، مطوّر Full-Stack من المنطقة الشرقية في المملكة العربية السعودية. أعمل على بناء مواقع وتطبيقات ويب ومنصات رقمية متكاملة، مع اهتمام خاص بجودة الواجهة، تنظيم البنية التقنية، الأداء، وسهولة الاستخدام.'],
    en: ["I'm ", 'Mansour Qasqous', ', a Full-Stack developer based in the Eastern Province of Saudi Arabia. I build complete websites, web applications, and digital platforms with a strong focus on interface quality, clean architecture, performance, and usability.'],
  } as Record<'ar' | 'en', [string, string, string]>,
  p2: {
    ar: 'أستخدم الأتمتة وأدوات الذكاء الاصطناعي عندما تضيف قيمة حقيقية للمشروع، وأهتم بتحويل المتطلبات إلى حلول واضحة قابلة للتطوير والصيانة.',
    en: 'I use automation and AI tools when they add real value to a project, with a focus on turning requirements into clear, maintainable, and scalable solutions.',
  } as L,
  info: [
    { k: { ar: 'الموقع', en: 'Location' }, h: { ar: 'المنطقة الشرقية', en: 'Eastern Province' }, p: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' } },
    { k: { ar: 'التخصص', en: 'Focus' }, h: same('Full-Stack Development'), p: same('React · TypeScript · Node.js · Supabase') },
    { k: { ar: 'مجالات إضافية', en: 'Additional Focus' }, h: { ar: 'الأتمتة والذكاء الاصطناعي', en: 'Automation & AI' }, p: same('AI Agents · n8n · API Integrations') },
  ] as { k: L; h: L; p: L }[],
};

export const skills = [
  { title: 'Frontend', items: ['React', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS'] },
  { title: 'Backend & Database', items: ['Node.js', 'Supabase', 'PostgreSQL', 'REST APIs'] },
  { title: 'Tools & Deployment', items: ['Vite', 'Git', 'GitHub', 'Vercel', 'VS Code'] },
  { title: 'AI & Automation', items: ['AI Agents', 'Prompt Engineering', 'n8n', 'API Integrations'] },
];
export const skillsExtra: L = {
  ar: 'تحليل الأسواق المالية ومتابعة الأسهم السعودية والأمريكية',
  en: 'Financial market analysis and tracking Saudi and US equities',
};

export const projects: { name: string; icon: string; desc: L; tech: string[]; url?: string }[] = [
  {
    name: 'EasyPDF', icon: 'doc', tech: ['React', 'TypeScript', 'Node.js', 'Supabase', 'Tailwind CSS'],
    desc: {
      ar: 'تطبيق ويب لتبسيط التعامل مع ملفات PDF والصور من خلال أدوات واضحة وسريعة لإدارة المستندات وتنفيذ المهام اليومية بكفاءة.',
      en: 'A web application that simplifies working with PDFs and images through clear, fast tools for document management and everyday file tasks.',
    },
    url: '', // [ناقص] project link
  },
  {
    name: 'Yugen Forge', icon: 'sparkle', tech: ['React', 'TypeScript', 'Node.js', 'Supabase'],
    desc: {
      ar: 'موقع وهوية رقمية لشركة تقنية تقدم تطوير المواقع والأنظمة والمنتجات الرقمية، وتصميم UI/UX، والتحسين والاستشارات التقنية.',
      en: 'A digital presence for a technology company providing web and software development, digital products, UI/UX design, optimization, and technical consulting.',
    },
    url: '', // [ناقص] project link
  },
];

export const services: { icon: string; title: L; desc: L }[] = [
  {
    icon: 'code',
    title: { ar: 'تطوير المواقع وتطبيقات الويب', en: 'Web & Application Development' },
    desc: {
      ar: 'بناء مواقع وتطبيقات ويب حديثة وسريعة ومتجاوبة، من الفكرة وحتى النسخة الجاهزة للنشر.',
      en: 'Building modern, fast, responsive websites and web applications from concept to production-ready delivery.',
    },
  },
  {
    icon: 'phone',
    title: { ar: 'تجارب متجاوبة لجميع الأجهزة', en: 'Responsive Digital Experiences' },
    desc: {
      ar: 'تجارب استخدام مصممة لتعمل بسلاسة على الجوال والتابلت وسطح المكتب مع اهتمام بالتفاصيل وسهولة الاستخدام.',
      en: 'User experiences designed to work smoothly across mobile, tablet, and desktop with careful attention to usability and detail.',
    },
  },
  {
    icon: 'gear',
    title: { ar: 'الأتمتة والتكاملات الذكية', en: 'Automation & Smart Integrations' },
    desc: {
      ar: 'ربط الخدمات وبناء مسارات عمل تقلل المهام اليدوية باستخدام APIs وn8n وأدوات الذكاء الاصطناعي عند الحاجة.',
      en: 'Connecting services and building workflows that reduce manual work using APIs, n8n, and AI tools where they create real value.',
    },
  },
  {
    icon: 'palette',
    title: { ar: 'تصميم وتطوير واجهات UI/UX', en: 'UI/UX Design & Implementation' },
    desc: {
      ar: 'تصميم واجهات واضحة وعصرية ثم تحويلها إلى تجربة فعلية متجاوبة ومتسقة مع هوية المشروع.',
      en: 'Designing clear, modern interfaces and turning them into responsive experiences aligned with the product identity.',
    },
  },
  {
    icon: 'chart',
    title: { ar: 'تحسين الأداء وSEO', en: 'Performance & SEO Optimization' },
    desc: {
      ar: 'تحسين سرعة الموقع وبنيته وتجربة الاستخدام والعناصر الأساسية التي تساعد على الظهور بشكل أفضل في محركات البحث.',
      en: 'Improving speed, structure, user experience, and core technical elements that support stronger search visibility.',
    },
  },
  {
    icon: 'pen',
    title: { ar: 'تحسين المنتجات والهوية الرقمية', en: 'Product & Digital Identity Improvement' },
    desc: {
      ar: 'مراجعة المواقع والمنتجات الرقمية القائمة وتحسين المحتوى والواجهة والتجربة البصرية لتظهر بصورة أكثر احترافية.',
      en: 'Reviewing existing websites and digital products to improve content, interface quality, and overall visual experience.',
    },
  },
];

/* Certificates. Never put national ID numbers here. Drive links must be shared as "Anyone with the link". */
export const certificates: { name: L; issuer: L; date: L; url: string; id?: string; note?: L }[] = [
  {
    name: same('Google Ads Search Certification (2026)'),
    issuer: same('Google Skillshop'),
    date: { ar: '30 سبتمبر 2026', en: 'Sep 30, 2026' },
    note: { ar: 'صالحة حتى 30 سبتمبر 2027', en: 'Valid until Sep 30, 2027' },
    id: '195609026',
    url: 'https://www.credential.net/be12d1cb-5921-4f62-aae2-37a77bf6b8f0',
  },
  {
    name: same('Coding Foundations'),
    issuer: same('Sololearn'),
    date: { ar: '29 سبتمبر 2026', en: 'Sep 29, 2026' },
    id: 'CC-8G9OS3GF',
    url: 'https://drive.google.com/file/d/1m0vx_vejWrWnyh5JPk64d7xvLV_icybg/view?usp=drivesdk',
  },
  {
    name: { ar: 'الأمن السيبراني: ما بين التحديات والفرص', en: 'Cybersecurity: Challenges and Opportunities' },
    issuer: { ar: 'دروب – صندوق تنمية الموارد البشرية', en: 'Doroob – Human Resources Development Fund' },
    date: { ar: '30 سبتمبر 2026', en: 'Sep 30, 2026' },
    note: { ar: 'ساعتان تدريبيتان', en: '2 training hours' },
    url: 'https://drive.google.com/file/d/1pjgDVpjnBBrD-X1nmOp7NB2zaS32E-o5/view?usp=drivesdk',
  },
  {
    name: { ar: 'تعلم الآلة', en: 'Machine Learning' },
    issuer: { ar: 'دروب – صندوق تنمية الموارد البشرية', en: 'Doroob – Human Resources Development Fund' },
    date: { ar: '30 سبتمبر 2026', en: 'Sep 30, 2026' },
    note: { ar: '3 ساعات تدريبية', en: '3 training hours' },
    url: 'https://drive.google.com/file/d/1Ighx3cAwppX2NP8KRqsz1-iVMcR-CD_1/view?usp=drivesdk',
  },
];

export const ui = {
  letsTalk: { ar: 'تواصل معي', en: 'Get in Touch' } as L,
  buildTogether: { ar: 'ابدأ مشروعك معي', en: 'Start a Project' } as L,
  explore: { ar: 'استعرض المشاريع', en: 'View Projects' } as L,
  sections: {
    about: { ar: 'نبذة عني', en: 'ABOUT ME' } as L,
    skills: { ar: 'المهارات والتقنيات', en: 'SKILLS & TECHNOLOGIES' } as L,
    work: { ar: 'مشاريع مختارة', en: 'SELECTED PROJECTS' } as L,
    services: { ar: 'ما الذي أقدمه', en: 'WHAT I DO' } as L,
    certificates: { ar: 'الشهادات', en: 'CERTIFICATIONS' } as L,
    contact: { ar: 'لنبدأ مشروعك القادم', en: "LET'S BUILD SOMETHING" } as L,
  },
  additional: { ar: 'اهتمامات إضافية', en: 'Additional Expertise' } as L,
  viewCert: { ar: 'عرض الشهادة', en: 'View Credential' } as L,
  admin: { ar: 'الإدارة', en: 'Admin' } as L,
  stats: {
    projects: { ar: 'مشاريع مختارة', en: 'Selected Projects' } as L,
    services: { ar: 'خدمات متخصصة', en: 'Core Services' } as L,
    tech: { ar: 'تقنية وأداة', en: 'Technologies & Tools' } as L,
  },
  contact: {
    heading: { ar: 'هل لديك فكرة أو مشروع؟', en: 'Have an idea or project?' } as L,
    text: {
      ar: 'أرسل لي تفاصيل مشروعك أو التحدي الذي تريد حله، وسأراجع الفكرة وأتواصل معك لمناقشة أفضل طريقة للتنفيذ.',
      en: 'Send me the details of your project or the problem you want to solve, and I’ll review it and get back to you to discuss the best approach.',
    } as L,
    whatsapp: { ar: 'تواصل عبر واتساب', en: 'Chat on WhatsApp' } as L,
    name: { ar: 'الاسم', en: 'Name' } as L,
    email: { ar: 'البريد الإلكتروني', en: 'Email address' } as L,
    subject: { ar: 'موضوع الرسالة', en: 'Subject' } as L,
    message: { ar: 'اكتب تفاصيل مشروعك أو رسالتك هنا', en: 'Tell me about your project or message' } as L,
    chooseHint: {
      ar: 'اختر طريقة التواصل المناسبة لك. سيتم حفظ نسخة من الرسالة في لوحة الإدارة.',
      en: 'Choose your preferred contact method. A copy of your message will be saved to the dashboard.',
    } as L,
    viaEmail: { ar: 'إرسال عبر البريد', en: 'Send by Email' } as L,
    viaWa: { ar: 'إرسال عبر واتساب', en: 'Send via WhatsApp' } as L,
    sending: { ar: 'جارٍ حفظ الرسالة...', en: 'Saving message...' } as L,
    doneEmail: {
      ar: '✓ تم حفظ رسالتك وفتح تطبيق البريد لإكمال الإرسال.',
      en: '✓ Your message was saved and your email app was opened to complete sending.',
    } as L,
    doneWa: {
      ar: '✓ تم حفظ رسالتك وفتح واتساب لإكمال الإرسال.',
      en: '✓ Your message was saved and WhatsApp was opened to complete sending.',
    } as L,
    partial: {
      ar: 'تم فتح وسيلة التواصل، لكن تعذّر حفظ نسخة من الرسالة في لوحة الإدارة.',
      en: 'Your contact app was opened, but a copy of the message could not be saved to the dashboard.',
    } as L,
    mailSubject: { ar: 'رسالة جديدة من موقع منصور قصقوص', en: 'New message from Mansour Qasqous Portfolio' } as L,
    waName: { ar: 'الاسم: ', en: 'Name: ' } as L,
    waEmail: { ar: 'البريد الإلكتروني: ', en: 'Email: ' } as L,
    waSubject: { ar: 'الموضوع: ', en: 'Subject: ' } as L,
  },
  rights: { ar: 'جميع الحقوق محفوظة.', en: 'All rights reserved.' } as L,
};
