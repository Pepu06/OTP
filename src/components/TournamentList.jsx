import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import Papa from "papaparse"; // Importa papaparse
import Perfil from "./Perfil"
import Pelotas from "../assets/pelotas.png"

const TournamentList = () => {
  const [selectedGender, setSelectedGender] = useState("Todos");
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tournaments, setTournaments] = useState([]); // Estado para torneos
  const navigate = useNavigate();

  // Función para cargar los datos del CSV
  useEffect(() => {
    Papa.parse("/torneos.csv", {
      // Cambia la ruta al archivo CSV
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        // Asegúrate de que `result.data` sea un array de objetos con las claves correctas
        setTournaments(result.data);
      },
      error: (error) => {
        console.error("Error al cargar el archivo CSV:", error);
      },
    });
  }, []);

  const filteredTournaments = tournaments.filter(
    (tournament) =>
      (selectedGender === "Todos" || tournament.Categoria === selectedGender) &&
      tournament.Nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const windowSmall = window.innerWidth < 640; // Define the 'windowSmall' variable based on the window width
  const settings = {
    dots: true,
    infinite: selectedGender === "Todos",
    speed: 500,
    slidesToShow: windowSmall ? 3 : Math.min(filteredTournaments.length, 4),
    slidesToScroll: 2,
    autoplay: true,
    swipeToSlide: true,
    draggable: true,
  };

  const handleTournamentClick = (name, ID) => {
    navigate(`/torneo/${name}/${ID}/qualify`);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const renderTournamentItem = (tournament) => (
    <div
      key={tournament.ID}
      className="flex flex-col items-center text-center p-2 transition-transform transform hover:scale-105"
    >
      <div className="flex flex-col items-center">
        <button
          className="bg-gray-200 h-24 w-24 mb-2 rounded-full flex items-center justify-center text-pgrey text-xl font-bold focus:outline-none"
          onClick={() => handleTournamentClick(tournament.Nombre, tournament.ID)}
          aria-label={`Ver torneo ${tournament.Nombre}`}
        >
          <span className="text-2xl">🏆</span>
        </button>
        <div className="text-center font-medium">
          <span className="font-bold mb-1">{tournament.Nombre}</span>
          <br />
          <span className="text-pgrey mb-1">{tournament.Club}</span>
          <br />
          <span className="text-pgrey">{tournament.Categoria}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section id="torneos" className="bg-white">
      <div className="flex flex-col sm:flex-row items-center justify-between mt-5 mb-8">
        {/* Contenedor para Perfil alineado a la izquierda */}
        <div className="w-1/2 mb-5 sm:w-1/5 sm:mb-0">
          <Perfil />
        </div>
        {/* Contenedor para Torneos centrado */}
        <div className="flex-1">
          <h2 className="text-5xl font-daysone font-normal text-center text-pblue">
            Torneos
          </h2>
        </div>
        
        <div className="w-1/5"></div>
      </div>
      <div className="flex justify-center">
        <div className="w-max border-t border-b py-1 mb-8">
          <div className="flex space-x-4 font-inter font-bold">
            {["Todos", "Masculino", "Mixto", "Femenino"].map((gender) => (
              <button
                key={gender}
                className={`sm:px-4 sm:py-2 ${selectedGender === gender
                  ? "text-pblue border-blue-600"
                  : "text-pgrey border-transparent"
                  } hover:text-pblue focus:outline-none border-b-2`}
                onClick={() => setSelectedGender(gender)}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Buscar por Fecha/Lugar/Nombre"
          className="border rounded-full p-2 mx-5 sm:mx-0 w-full sm:w-1/2 text-center placeholder-pgrey placeholder:text-sm sm:placeholder:text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={(placeholder) => (placeholder.target.placeholder = "")}
          onBlur={(placeholder) =>
            (placeholder.target.placeholder = "Buscar por Fecha/Lugar/Nombre")
          }
        />
      </div>
      <motion.div
        className="flex justify-center mb-8"
        key={showAll ? "table" : "carousel"}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.7 }}
      >
        <div className="w-full max-w-4xl">
          {showAll ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredTournaments.map((tournament) =>
                renderTournamentItem(tournament)
              )}
            </div>
          ) : (
            <Slider {...settings}>
              {filteredTournaments.map((tournament) =>
                renderTournamentItem(tournament)
              )}
            </Slider>
          )}
        </div>
      </motion.div>
      <div className="flex justify-center mb-8">
        <button
          onClick={toggleShowAll}
          className="mb-4 px-3 py-3 bg-gray-300 text-black rounded-full focus:outline-none"
        >
          {showAll ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <button className="px-5 py-2 bg-pgreen text-white rounded-lg font-medium font-poppins">
          INSCRIBIRME
        </button>
      </div>
      <img src={Pelotas} alt="pelotas" className="mt-5 w-full" />
    </section>
  );
};

export default TournamentList;
