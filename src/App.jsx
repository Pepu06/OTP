import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
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
import PerfilJugador from "./components/PerfilJugador";
import Administracion from "./components/Administracion";
import AdminContactSection from "./components/AdminContactSection";
import TablaDeRankings from "./components/TablaDeRankings";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute"; // Importar el ProtectedRoute

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

  return (
    <Router>
      <ScrollToTop />
      <MainContent
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </Router>
  );
};

const MainContent = ({ isAuthenticated, setIsAuthenticated }) => {
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
                  <ContactSection />
                </>
              }
            />
            <Route
              path="/ranking"
              element={
                <>
                  <TablaDeRankings />
                  <ContactSection />
                </>
              }
            />
            <Route
              path="/torneos"
              element={
                <>
                  <TournamentList />
                  <ContactSection />
                </>
              }
            />
            <Route
              path="/admotp"
              element={
                <>
                  <TournamentList />
                  <AdminContactSection />
                </>
              }
            />
            <Route
              path="/torneo/:id/:idTorneo/qualify"
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
              path="/torneo/:id/:idTorneo/playoff"
              element={
                <>
                  <Torneo />
                  <TablaPlayoff />
                  <FinalTorneo />
                  <ContactSection />
                </>
              }
            />
            <Route
              path="/perfil/:jugadorId"
              element={
                <>
                  <PerfilJugador />
                  <ContactSection />
                </>
              }
            />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/adm"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <>
                    <Administracion />
                    <ContactSection />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
