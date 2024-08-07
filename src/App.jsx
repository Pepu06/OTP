import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import Header from "./components/Header";
import TournamentList from "./components/TournamentList";
import ContactSection from "./components/ContactSection";
import Perfil from "./components/Perfil";
import Torneo from "./components/Torneo";
import FinalTorneo from "./components/FinalTorneo";
import TablaQually from "./components/TablaQually";
import TablaPlayoff from "./components/TablaPlayoff";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <MainContent />
    </Router>
  );
};

const MainContent = () => {
  const location = useLocation();

  return (
    <div>
      <Header />
      <AnimatePresence>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-grow"
        >
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <>
                  <TournamentList />
                  <Perfil />
                  <ContactSection />
                </>
              }
            />
            <Route
              path="/torneo/:id/qualify"
              element={
                <>
                  <Torneo />
                  <TablaQually />
                  <FinalTorneo />
                  <ContactSection />
                </>
              }
            />
            <Route
              path="/torneo/:id/playoff"
              element={
                <>
                  <Torneo />
                  <TablaPlayoff />
                  <FinalTorneo />
                  <ContactSection />
                </>
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
