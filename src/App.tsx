import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import ResumePage from './pages/ResumePage';
import ContactPage from './pages/ContactPage';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import GridBackground from './components/GridBackground';

const PRELOADER_SESSION_KEY = 'portfolio-preloader-shown';

export default function App() {
  const [isLoading, setIsLoading] = useState(
    () => sessionStorage.getItem(PRELOADER_SESSION_KEY) !== 'true'
  );
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (isLoading) {
      sessionStorage.setItem(PRELOADER_SESSION_KEY, 'true');
    }
  }, [isLoading]);

  return (
    <>
      <GridBackground />
      <CustomCursor />
      {isLoading ? (
        <Preloader onComplete={() => setIsLoading(false)} />
      ) : (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      )}
    </>
  );
}
