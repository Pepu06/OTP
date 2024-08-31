import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import Pelotas from "../assets/pelotas.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const TournamentList = () => {
  const [selectedGender, setSelectedGender] = useState("Todos");
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "torneos"));
        const data = querySnapshot.docs.map((doc) => ({
          ID: doc.id,
          ...doc.data(),
        }));

        const uniqueTournaments = data.reduce((acc, current) => {
          const x = acc.find((item) => item.ID === current.ID);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        setTournaments(uniqueTournaments);
        console.log("Torneos cargados desde Firebase:", uniqueTournaments);
      } catch (error) {
        console.error("Error cargando datos de torneos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const filteredTournaments = tournaments.filter((tournament) => {
    const sanitizedSearchQuery = searchQuery.replace(/[^\w\s]/gi, "");

    const searchRegex = new RegExp(sanitizedSearchQuery, "i");

    const categoryMatches =
      selectedGender === "Todos" ||
      tournament.Categoria.toLowerCase().includes(selectedGender.toLowerCase());

    return (
      categoryMatches &&
      (searchRegex.test(tournament.Nombre) ||
        searchRegex.test(tournament.Fecha) ||
        searchRegex.test(tournament.Club))
    );
  });

  const windowSmall = window.innerWidth < 640;
  const settings = {
    dots: false,
    infinite: selectedGender === "Todos" && searchQuery === "",
    speed: 500,
    slidesToShow: windowSmall ? 3 : 4,
    slidesToScroll: 1,
    autoplay: true,
    swipeToSlide: true,
    draggable: true,
    touchThreshold: 1000,
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
          onClick={() =>
            handleTournamentClick(tournament.Nombre, tournament.ID)
          }
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-pblue"></div>
      </div>
    );
  }

  return (
    <section id="torneos" className="bg-white">
      <div className="flex flex-col sm:flex-row items-center justify-between mt-10 mb-8">
        <div className="w-1/2 mb-5 sm:w-1/5 sm:mb-0"></div>
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
                className={`sm:px-4 sm:py-2 ${
                  selectedGender === gender
                    ? "text-pblue border-blue-600"
                    : "text-pgrey border-transparent"
                } hover:text-pblue hover:transition-all hover:duration-500 focus:outline-none border-b-2`}
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
          onClick={(e) => (e.target.placeholder = "")}
          onBlur={(e) =>
            (e.target.placeholder = "Buscar por Fecha/Lugar/Nombre")
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
          {searchQuery || showAll ? (
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
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center">
          <button onClick={toggleShowAll}>
            <div className="mb-1 py-3 bg-gray-300 text-black rounded-full focus:outline-none flex flex-col items-center">
              <div className="flex justify-center items-center flex-col">
                {showAll ? (
                  <FaArrowAltCircleUp size={24} />
                ) : (
                  <FaArrowAltCircleDown size={24} />
                )}
              </div>
            </div>
            <span className="text-gray-400">
              {showAll ? "Ver menos" : "Ver más"}
            </span>
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <a
          href="https://wa.me/91140962011/?text=Hola! Me gustaría inscribirme en un torneo! 🎾"
          className="px-5 py-2 bg-pgreen hover:bg-green-700 hover:transition-all text-white rounded-lg font-medium font-poppins"
        >
          INSCRIBIRME
        </a>
      </div>
      <img src={Pelotas} alt="pelotas" className="mt-5 w-full" />
    </section>
  );
};

export default TournamentList;
