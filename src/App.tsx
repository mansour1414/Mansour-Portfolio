import { lazy, Suspense, useEffect } from 'react';
import { Contact } from './Contact';
import { site } from './data';
import { Footer, Nav, ToTop } from './Layout';
import { About, Certificates, Hero, Services, Skills, Works } from './Sections';
import { AppProvider, useApp } from './store';

// Admin page is a separate chunk: visitors of the public site never download it.
const Admin = lazy(() => import('./admin/Admin'));
const isAdminRoute = () => window.location.pathname.replace(/\/+$/, '') === '/admin';

function Page() {
  const { t } = useApp();
  useEffect(() => { document.title = t(site.title); }, [t]);
  useEffect(() => {
    // Scroll-reveal: elements are all rendered once, so observe them a single time.
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <>
      <div className="ambient" /><div className="grain" />
      <Nav />
      <main>
        <Hero /><About /><Skills /><Works /><Services /><Certificates /><Contact />
      </main>
      <Footer /><ToTop />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      {isAdminRoute() ? <Suspense fallback={null}><Admin /></Suspense> : <Page />}
    </AppProvider>
  );
}
