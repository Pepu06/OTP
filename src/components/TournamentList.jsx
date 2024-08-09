import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { motion } from 'framer-motion';
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";

const TournamentList = () => {
  const [selectedGender, setSelectedGender] = useState('Todos');
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const tournaments = [
    { name: "Torneo Invierno", location: "Madrid", category: "Masculino" },
    { name: "Torneo Primavera", location: "Barcelona", category: "Femenino" },
    { name: "Copa Verano", location: "Valencia", category: "Mixto" },
    { name: "Torneo Otoño", location: "Sevilla", category: "Masculino" },
    { name: "Campeonato Ciudad", location: "Bilbao", category: "Femenino" },
    { name: "Copa Regional", location: "Granada", category: "Mixto" },
  ];

  const filteredTournaments = tournaments.filter(tournament => 
    (selectedGender === 'Todos' || tournament.category === selectedGender) &&
    tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(filteredTournaments.length, 4),
    slidesToScroll: 1,
    autoplay: false,
    swipeToSlide: true,
    draggable: true,
  };

  const handleTournamentClick = (name) => {
    navigate(`/torneo/${name}/qualify`);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const renderTournamentItem = (tournament) => (
    <div key={tournament.name} className="flex flex-col items-center text-center p-2 transition-transform transform hover:scale-105">
      <div className="flex flex-col items-center">
        <button
          className="bg-gray-200 h-24 w-24 mb-2 rounded-full flex items-center justify-center text-pgrey text-xl font-bold focus:outline-none"
          onClick={() => handleTournamentClick(tournament.name)}
          aria-label={`Ver torneo ${tournament.name}`}
        >
          <span className="text-2xl">🏆</span>
        </button>
        <div className="text-center font-medium">
          <span className="font-bold mb-1">{tournament.name}</span><br/>
          <span className="text-pgrey mb-1">{tournament.location}</span><br/>
          <span className="text-pgrey">{tournament.category}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section id="torneos" className="mb-8 bg-white">
      <h2 className="text-5xl font-daysone font-normal text-center text-pblue mt-10 mb-8">Torneos</h2>
      <div className="flex justify-center">
        <div className="w-max border-t border-b py-1 mb-8">
          <div className="flex space-x-4 font-inter font-bold">
            {['Todos', 'Masculino', 'Mixto', 'Femenino'].map(gender => (
              <button
                key={gender}
                className={`px-4 py-2 ${selectedGender === gender ? 'text-pblue border-blue-600' : 'text-pgrey border-transparent'} hover:text-pblue focus:outline-none border-b-2`}
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
          className="border rounded-full p-2 w-1/2 text-center placeholder-pgrey"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onClick={placeholder => placeholder.target.placeholder = ''} 
          onBlur={placeholder => placeholder.target.placeholder = 'Buscar por Fecha/Lugar/Nombre'} 
        />
      </div>
      <motion.div
        className="flex justify-center mb-8"
        key={showAll ? 'table' : 'carousel'}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.7 }}
      >
        <div className="w-full max-w-4xl">
          {showAll ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredTournaments.map(tournament => renderTournamentItem(tournament))}
            </div>
          ) : (
            <Slider {...settings}>
              {filteredTournaments.map(tournament => renderTournamentItem(tournament))}
            </Slider>
          )}
        </div>
      </motion.div>
      <div className="flex justify-center mb-8">
        <button onClick={toggleShowAll} className="mb-4 px-3 py-3 bg-gray-300 text-black rounded-full focus:outline-none">
          {showAll ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <button className="px-5 py-2 bg-pgreen text-white rounded-lg font-medium font-poppins">INSCRIBIRME</button>
      </div>
    </section>
  );
};

export default TournamentList;
