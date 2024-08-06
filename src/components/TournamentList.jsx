import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const TournamentList = () => {
  const [selectedGender, setSelectedGender] = useState('Masculino');
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate(); // Hook de navegación

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    swipeToSlide: true,
    draggable: true,
  };

  const handleTournamentClick = (index) => {
    navigate(`/torneo/${index}/qualify`); // Redirigir a la página del torneo
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section id="torneos" className="mb-8 bg-white">
      <h2 className="text-5xl font-daysone font-normal text-center text-pblue mb-8">Torneos</h2>
      <div className="flex justify-center">
        <div className="w-max border-t border-b py-1 mb-8">
          <div className="flex space-x-4 font-inter font-bold">
            {['Masculino', 'Mixto', 'Femenino'].map(gender => (
              <button
                key={gender}
                className={`px-4 py-2 ${selectedGender === gender ? 'text-pblue border-blue-600' : 'text-gray-600 border-transparent'} hover:text-pblue focus:outline-none border-b-2`}
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
          className="border rounded-full p-2 w-1/2 text-center placeholder-gray-500"
          onClick={placeholder => placeholder.target.placeholder = ''} 
          onBlur={placeholder => placeholder.target.placeholder = 'Buscar por Fecha/Lugar/Nombre'} 
          style={{ textAlign: 'center' }}
        />
      </div>
      <div className="flex justify-center mb-8 transition-all duration-1000 ease-in-out">
        <div className="w-full max-w-4xl">
          {showAll ? (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map(index => (
                <div key={index} className="flex flex-col items-center text-center p-2 border rounded-lg transition-transform transform hover:scale-105">
                  <div className="flex flex-col items-center">
                    <button
                      className="bg-gray-200 h-24 w-24 mb-2 rounded-full flex items-center justify-center text-gray-600 text-xl font-bold focus:outline-none"
                      style={{ backgroundColor: 'lightgray' }}
                      onClick={() => handleTournamentClick(index)}
                    >
                      <span className="text-2xl">🏆</span>
                    </button>
                    <div className="text-center font-medium">
                      <span className="font-bold mb-1">Nombre torneo {index}</span><br/>
                      <span className="text-gray-600 mb-1">Localidad</span><br/>
                      <span className="text-gray-600">Categoría</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Slider {...settings}>
              {[1, 2, 3, 4, 5, 6].map(index => (
                <div key={index} className="flex flex-col items-center text-center p-2 transition-transform transform hover:scale-105">
                  <div className="flex flex-col items-center">
                    <button
                      className="bg-gray-200 h-24 w-24 mb-2 rounded-full flex items-center justify-center text-gray-600 text-xl font-bold focus:outline-none"
                      style={{ backgroundColor: 'lightgray' }}
                      onClick={() => handleTournamentClick(index)}
                    >
                      <span className="text-2xl">🏆</span>
                    </button>
                    <div className="text-center font-medium">
                      <span className="font-bold mb-1">Nombre torneo {index}</span><br/>
                      <span className="text-gray-600 mb-1">Localidad</span><br/>
                      <span className="text-gray-600">Categoría</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <button onClick={toggleShowAll} className="mb-4 px-5 py-2 bg-gray-300 text-black rounded-full focus:outline-none">
          {showAll ? '⬆️' : '⬇️'}
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <button className="px-5 py-2 bg-pgreen text-white rounded-lg font-medium font-poppins">INSCRIBIRME</button>
      </div>
    </section>
  );
}

export default TournamentList;
