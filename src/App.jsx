import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import TournamentList from "./components/TournamentList";
import ContactSection from "./components/ContactSection";
import Perfil from "./components/Perfil";
import Torneo from "./components/Torneo";
import FinalTorneo from "./components/FinalTorneo";
import TablaQually from "./components/TablaQually";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
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
                <Header />
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
                <Header />
                <Torneo />
                <FinalTorneo />
                <ContactSection />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
