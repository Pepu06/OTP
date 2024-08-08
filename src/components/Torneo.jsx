import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

const Torneo = () => {
  const { id, option } = useParams(); // Captura 'option' de la URL
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('Qualify');

  useEffect(() => {
    // Sincroniza el estado con la URL cuando el componente se monta
    let cur = window.location.href.split("/")[window.location.href.split("/").length-1]
    if(cur == "playoff")
      setSelectedOption("PlayOff")
    if (option === 'qualify') {
      setSelectedOption('Qualify');
    } else if (option === 'playoff') {
      setSelectedOption('PlayOff');
    }
  }, [option, id, navigate]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    navigate(`/torneo/${id}/${option.toLowerCase()}`); // Redirigir a la ruta correspondiente
  };

  return (
    <section id="torneos" className="bg-white">
      <h2 className="text-5xl mt-10 font-daysone font-normal text-center text-pblue mb-8">
        Torneo {id} - 2024
      </h2>
      <div className="flex justify-center">
        <div className="flex py-1 mb-8 space-x-4 font-daysone font-normal">
          <button
            onClick={() => handleOptionClick('Qualify')}
            className={`px-4 py-2 rounded-lg ${selectedOption === 'Qualify' ? 'bg-green-500 text-white' : 'text-pgrey'} focus:outline-none`}
          >
            Qualify
          </button>
          <button
            onClick={() => handleOptionClick('PlayOff')}
            className={`px-4 py-2 rounded-lg ${selectedOption === 'PlayOff' ? 'bg-green-500 text-white' : 'text-pgrey'} focus:outline-none`}
          >
            PlayOff
          </button>
        </div>
      </div>
    </section>
  );
};

export default Torneo;
