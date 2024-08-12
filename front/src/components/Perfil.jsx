import { useState, useEffect } from "react";
import Select from "react-select";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Perfil = () => {
  const [jugadores, setJugadores] = useState([]);
  const [selectedJugador, setSelectedJugador] = useState(null);

  useEffect(() => {
    // Cargar los jugadores desde el CSV
    const cargarJugadores = async () => {
      const response = await fetch("/jugadores.csv");
      const text = await response.text();
      const lines = text.split("\n");

      const result = lines
        .slice(1)
        .map((line) => {
          const columns = line.split(",");

          // Verificar que la línea tenga al menos 2 columnas (ID y Nombre)
          if (columns.length >= 2) {
            const ID = columns[0].trim();
            const Nombre = columns[1].trim();

            // Mostrar ID y Nombre en la consola
            console.log(`ID: ${ID}, Nombre: ${Nombre}`);

            return {
              value: ID,
              label: `${Nombre} (ID: ${ID})`,
              ID: ID,
              Nombre: Nombre,
            };
          }

          return null; // Retornar null si la línea no tiene suficientes columnas
        })
        .filter(Boolean); // Filtrar los valores nulos

      setJugadores(result);
    };

    cargarJugadores();
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedJugador(selectedOption);
  };

  return (
    <section id="torneos" className="bg-white ml-2 mt-1">
      {/* <h2 className="text-2xl font-normal text-center text-pblue mb-2 font-daysone">
        ¡Busca tu perfil!
      </h2> */}
      <div className="flex justify-center mb-2">
        <Select
          options={jugadores}
          onChange={handleChange}
          placeholder="Busca por Nombre/ID"
          className="w-full text-center"
          isSearchable
        />
      </div>
      <div className="flex justify-start mt-2">
        <a
          href={`/perfil/${selectedJugador ? selectedJugador.value : ""}`}
          className="px-5 py-2 bg-pgreen text-white rounded-lg font-medium text-sm font-poppins"
          disabled={!selectedJugador}
        >
          BUSCAR PERFIL
        </a>
      </div>
    </section>
  );
};

export default Perfil;
