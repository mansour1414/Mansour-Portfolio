/* ALL site content lives here. Edit this file only; components never hold text. */
export type L = { ar: string; en: string };
export const same = (s: string): L => ({ ar: s, en: s });

export const site = {
  name: { ar: 'منصور قصقوص', en: 'MANSOUR QASQOUS' } as L,
  title: { ar: 'منصور قصقوص | مطوّر Full-Stack', en: 'Mansour Qasqous | Full-Stack Developer' } as L,
  role: { ar: 'مطوّر Full-Stack', en: 'Full-Stack Developer' } as L,
  tagline: [
    { ar: 'أبني تطبيقات ويب ومنصات SaaS مدعومة بالذكاء الاصطناعي', en: 'Building web apps and SaaS platforms, powered by AI' },
    { ar: 'من السيرفر حتى الواجهة النهائية', en: 'From the server to the final interface' },
  ] as L[],
  ring: { ar: 'مطوّر Full-Stack • SaaS • ذكاء اصطناعي وأتمتة • ', en: 'FULL-STACK DEVELOPER • SAAS • AI & AUTOMATION • ' } as L,
  monogram: { ar: 'م', en: 'M' } as L, // [ناقص] personal photo (optional)
  heroStack: ['React', 'TypeScript', 'Node.js', 'Supabase', 'Tailwind', 'AI Agents'],
  email: 'MANSOURQASQOUS@gmail.com',
  whatsapp: '966563558064',
  github: '', // [ناقص] e.g. https://github.com/USERNAME
  linkedin: '', // [ناقص] e.g. https://www.linkedin.com/in/USERNAME
};

export const nav: { id: string; label: L }[] = [
  { id: 'home', label: { ar: 'الرئيسية', en: 'Home' } },
  { id: 'about', label: { ar: 'عنّي', en: 'About' } },
  { id: 'skills', label: { ar: 'مهاراتي', en: 'Skills' } },
  { id: 'work', label: { ar: 'أعمالي', en: 'Work' } },
  { id: 'services', label: { ar: 'خدماتي', en: 'Services' } },
  { id: 'certificates', label: { ar: 'شهاداتي', en: 'Certificates' } },
  { id: 'contact', label: { ar: 'تواصل', en: 'Contact' } },
];

export const about = {
  p1: {
    ar: ['أنا ', 'منصور قصقوص', '، مطوّر Full-Stack من القطيف في المنطقة الشرقية بالمملكة العربية السعودية. أبني منصات ويب ومنتجات SaaS متكاملة من السيرفر حتى الواجهة النهائية، وأدمج الذكاء الاصطناعي والأتمتة (AI Agents وn8n) فيها.'],
    en: ["I'm ", 'Mansour Qasqous', ', a Full-Stack developer from Qatif, Eastern Province, Saudi Arabia. I build complete web platforms and SaaS products from the server to the final interface, and integrate AI and automation (AI Agents, n8n) into them.'],
  } as Record<'ar' | 'en', [string, string, string]>,
  p2: { ar: 'ومن مهاراتي الإضافية تحليل وتداول الأسواق المالية (الأسهم السعودية والأمريكية).', en: 'An additional skill of mine is financial market analysis and trading (Saudi and US stocks).' } as L,
  info: [
    { k: { ar: 'الموقع', en: 'Location' }, h: { ar: 'القطيف، المنطقة الشرقية', en: 'Qatif, Eastern Province' }, p: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' } },
    { k: { ar: 'التخصص', en: 'Focus' }, h: same('Full-Stack'), p: same('React · TypeScript · Node.js · Supabase') },
    { k: same('AI'), h: same('AI Agents & Automation'), p: same('Prompt Engineering · n8n · DeepSeek') },
  ] as { k: L; h: L; p: L }[],
};

export const skills = [
  { title: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
  { title: 'Backend & Database', items: ['Node.js', 'Express', 'Supabase', 'PostgreSQL'] },
  { title: 'Tools & Deployment', items: ['VS Code', 'Git', 'GitHub', 'Vercel', 'Google AI Studio'] },
  { title: 'AI & Automation', items: ['AI Agents', 'Prompt Engineering', 'n8n', 'Hermes', 'DeepSeek'] },
];
export const skillsExtra: L = { ar: 'تحليل وتداول الأسواق المالية (الأسهم السعودية والأمريكية)', en: 'Financial markets analysis & trading (Saudi and US stocks)' };

export const projects: { name: string; icon: string; desc: L; tech: string[]; url?: string }[] = [
  {
    name: 'EasyPDF', icon: 'doc', tech: ['React', 'TypeScript', 'Node.js', 'Supabase', 'Tailwind CSS'],
    desc: { ar: 'منصة وتطبيق ويب متكامل لتعديل وإدارة الملفات والمستندات.', en: 'An integrated web platform and app for editing and managing files and documents.' },
    url: '', // [ناقص] project link
  },
  {
    name: 'Yugen Forge', icon: 'sparkle', tech: ['React', 'Node.js', 'Supabase', 'AI APIs'],
    desc: { ar: 'منصة SaaS تفاعلية لتوليد وتطوير المحتوى والأدوات المدعومة بالذكاء الاصطناعي.', en: 'An interactive SaaS platform for generating and developing content and AI-powered tools.' },
    url: '', // [ناقص] project link
  },
];

export const services: { icon: string; title: L; desc: L }[] = [
  { icon: 'code', title: { ar: 'تطوير تطبيقات الويب وSaaS', en: 'Web & SaaS App Development' }, desc: { ar: 'بناء منصات كاملة من السيرفر حتى الواجهة النهائية بأحدث التقنيات.', en: 'Building complete platforms from the server to the final interface using modern technologies.' } },
  { icon: 'phone', title: { ar: 'تطوير وتحسين تطبيقات الهاتف', en: 'Mobile App Development & Improvement' }, desc: { ar: 'تطوير وتحسين تطبيقات الهاتف.', en: 'Developing and improving mobile applications.' } },
  { icon: 'gear', title: { ar: 'أتمتة العمليات والذكاء الاصطناعي', en: 'Process Automation & AI' }, desc: { ar: 'بناء وتطوير AI Agents وسلاسل أتمتة مهام ذكية.', en: 'Building and developing AI Agents and smart task-automation workflows.' } },
  { icon: 'palette', title: { ar: 'تصميم وبناء واجهات حديثة', en: 'Modern Interface Design & Build' }, desc: { ar: 'واجهات سريعة ومتجاوبة.', en: 'Fast, responsive interfaces.' } },
  { icon: 'chart', title: { ar: 'تحسين محركات البحث (SEO)', en: 'Search Engine Optimization (SEO)' }, desc: { ar: 'تحسين ظهور موقعك في محركات البحث.', en: 'Improving how your website performs in search engines.' } },
  { icon: 'pen', title: { ar: 'الجرافيك والديزاين', en: 'Graphics & Design' }, desc: { ar: 'تصميم جرافيكي وديزاين لمشاريعك.', en: 'Graphic design and visuals for your projects.' } },
];

/* [ناقص] certificates.pdf was not available. Add entries exactly as written in the PDF:
   { name: 'CERTIFICATE NAME', issuer: 'ISSUER', year: 'YEAR' } */
export const certificates: { name: string; issuer: string; year: string }[] = [];

export const ui = {
  letsTalk: { ar: 'لنتحدث', en: "Let's Talk" } as L,
  buildTogether: { ar: 'لنبنِ معًا', en: "Let's Build Together" } as L,
  explore: { ar: 'استكشف الأعمال', en: 'Explore Projects' } as L,
  sections: {
    about: { ar: 'عنّي', en: 'ABOUT ME' } as L,
    skills: { ar: 'مهاراتي', en: 'SKILLS' } as L,
    work: { ar: 'أعمال مميزة', en: 'FEATURED WORKS' } as L,
    services: { ar: 'خدماتي', en: 'SERVICES' } as L,
    certificates: { ar: 'شهاداتي', en: 'CERTIFICATES' } as L,
    contact: { ar: 'لنعمل معًا', en: "LET'S WORK TOGETHER" } as L,
  },
  additional: { ar: 'إضافي', en: 'Additional' } as L,
  stats: {
    projects: { ar: 'مشاريع مميزة', en: 'Featured Projects' } as L,
    services: { ar: 'خدمات', en: 'Services' } as L,
    tech: { ar: 'تقنية وأداة', en: 'Technologies & Tools' } as L,
  },
  contact: {
    heading: { ar: 'لديك مشروع في بالك؟', en: 'Have a project in mind?' } as L,
    text: { ar: 'أخبرني عن فكرتك — تطبيق ويب، منصة SaaS، أتمتة أو AI Agent — وسأتواصل معك.', en: "Tell me about your idea — a web app, a SaaS platform, an automation or an AI agent — and I'll get back to you." } as L,
    whatsapp: { ar: 'واتساب', en: 'WhatsApp' } as L,
    name: { ar: 'الاسم', en: 'Name' } as L,
    email: { ar: 'البريد الإلكتروني', en: 'Email' } as L,
    subject: { ar: 'الموضوع', en: 'Subject' } as L,
    message: { ar: 'الرسالة', en: 'Message' } as L,
    send: { ar: 'إرسال الرسالة', en: 'Send Message' } as L,
    sending: { ar: 'جارٍ الإرسال...', en: 'Sending...' } as L,
    sent: { ar: '✓ تم الإرسال', en: '✓ Sent' } as L,
    waOpened: { ar: '✓ فُتح واتساب', en: '✓ WhatsApp opened' } as L,
    error: { ar: 'تعذّر الإرسال، حاول مجددًا أو راسلني عبر واتساب', en: 'Could not send. Try again or message me on WhatsApp' } as L,
    waName: { ar: 'الاسم: ', en: 'Name: ' } as L,
    waEmail: { ar: 'البريد: ', en: 'Email: ' } as L,
    waSubject: { ar: 'الموضوع: ', en: 'Subject: ' } as L,
  },
  rights: { ar: 'جميع الحقوق محفوظة.', en: 'All rights reserved.' } as L,
};
