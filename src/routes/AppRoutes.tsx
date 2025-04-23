import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import WelcomePage from '@/pages/WelcomePage';
import QuestionPage from '@/pages/QuestionPage';
import ResultPage from '@/pages/ResultPage';

export default function AppRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </AnimatePresence>
  );
}