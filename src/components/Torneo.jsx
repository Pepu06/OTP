import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

const Torneo = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook de navegación
  const [selectedOption, setSelectedOption] = useState('Qualify');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    // Redirigir a la ruta correspondiente
    navigate(`/torneos/${id}/${option.toLowerCase()}`);
  };

  return (
    <section id="torneos" className="mb-8 bg-white">
      <h2 className="text-5xl font-daysone font-normal text-center text-pblue mb-8">
        Torneos
      </h2>
      <div className="flex justify-center">
        <div className="flex py-1 mb-8 space-x-4 font-daysone font-normal">
          <button
            onClick={() => handleOptionClick('Qualify')}
            className={`px-4 py-2 rounded-lg ${selectedOption === 'Qualify' ? 'bg-green-500 text-white' : 'text-gray-600'} focus:outline-none`}
          >
            Qualify
          </button>
          <button
            onClick={() => handleOptionClick('PlayOff')}
            className={`px-4 py-2 rounded-lg ${selectedOption === 'PlayOff' ? 'bg-green-500 text-white' : 'text-gray-600'} focus:outline-none`}
          >
            PlayOff
          </button>
        </div>
      </div>
    </section>
  );
};

export default Torneo;
