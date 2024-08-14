import { useState, useEffect } from "react";
import Select from "react-select";

const Perfil = () => {
  const [jugadores, setJugadores] = useState([]);
  const [selectedJugador, setSelectedJugador] = useState(null);

  useEffect(() => {
    // Cargar los jugadores desde la API del backend
    const cargarJugadores = async () => {
      try {
        const response = await fetch("https://otpbackend1-31q78xpq6-pepu06s-projects.vercel.app/api/process", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }); // Cambia la URL según sea necesario
        if (!response.ok) {
          console.log(response)
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        const jugadoresData = result.data ? result.data.jugadores : [];

        // Convertir los datos en el formato adecuado para Select
        const formattedJugadores = jugadoresData.map((jugador) => ({
          value: jugador.ID,
          label: `${jugador.Nombre} (ID: ${jugador.ID})`,
          ID: jugador.ID,
          Nombre: jugador.Nombre,
        }));

        setJugadores(formattedJugadores);
      } catch (error) {
        console.error("Error al cargar los jugadores:", error);
      }
    };

    cargarJugadores();
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedJugador(selectedOption);
  };

  return (
    <section id="torneos" className="bg-white ml-2 mt-1">
      <div className="flex justify-center mb-2">
        <Select
          options={jugadores}
          onChange={handleChange}
          placeholder="Busca por Nombre/ID"
          className="w-full text-center"
          isSearchable
        />
      </div>
      <div className="flex justify-center sm:justify-start mt-2">
        <a
          href={`/perfil/${selectedJugador ? selectedJugador.value : ""}`}
          className="px-3 py-1 sm:px-5 sm:py-2 bg-pgreen text-white rounded-lg font-medium text-sm font-poppins"
          disabled={!selectedJugador}
        >
          BUSCAR PERFIL
        </a>
      </div>
    </section>
  );
};

export default Perfil;
