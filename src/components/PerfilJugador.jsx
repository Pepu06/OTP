import { useEffect, useState } from "react";
import Papa from "papaparse"; // Asegúrate de instalar la librería con `npm install papaparse`
import { useParams } from "react-router-dom"; // Para acceder a los parámetros de la URL
import TablaDeRankings from "./TablaDeRankings";

const PerfilJugador = () => {
  const { jugadorId } = useParams(); // Obtén el ID del jugador de los parámetros de la URL
  const [jugador, setJugador] = useState(null);
  const [historicoTorneos, setHistoricoTorneos] = useState([]);

  const scrollToTable = () => {
    const element = document.getElementById("Tabla");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!jugadorId) return;

    console.log("Cargando datos para el ID del jugador:", jugadorId);

    // Cargar datos del jugador
    fetch("/jugadores.csv")
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar jugadores.csv");
        return response.text();
      })
      .then((text) => {
        Papa.parse(text, {
          header: true,
          complete: (result) => {
            console.log("Datos de jugadores:", result.data);
            const jugadorData = result.data.find((row) => row.ID === jugadorId);
            console.log("Datos del jugador encontrado:", jugadorData);
            setJugador(jugadorData);
          },
        });
      })
      .catch((error) =>
        console.error("Error cargando datos del jugador:", error)
      );

    // Cargar histórico de torneos
    fetch("/historicoTorneos.csv")
      .then((response) => {
        if (!response.ok)
          throw new Error("Error al cargar historicoTorneos.csv");
        return response.text();
      })
      .then((text) => {
        Papa.parse(text, {
          header: true,
          complete: (result) => {
            console.log("Datos históricos de torneos:", result.data);
            const historicoData = result.data.filter(
              (row) => row.IDJugador === jugadorId
            );
            console.log("Datos del histórico de torneos:", historicoData);
            setHistoricoTorneos(historicoData);
          },
        });
      })
      .catch((error) =>
        console.error("Error cargando histórico de torneos:", error)
      );
  }, [jugadorId]);

  return (
    <div className="relative p-4">
      {/* Contenedor del perfil */}
      <div className="absolute h-[409px] sm:top-16 top-[105px] left-0 right-0 mx-auto w-3/5 sm:w-1/5 sm:left-0 sm:ml-16 sm:mr-16 bg-white p-4 rounded-lg shadow-md z-20">
        <div className="text-center">
          <div className="bg-green-200 rounded-full w-40 h-40 mx-auto mb-4 mt-1"></div>
          <div className="w-50 h-24 bg-[#D9D9D9] flex flex-col items-center justify-center text-center text-[#373B3A] mb-1">
            <h2 className="text-xs font-inter font-semibold">Categoría</h2>
            <p className="text-3xl font-inter font-bold">{jugador.Categoria}</p>
          </div>
          <div className="w-50 h-24 bg-[#D9D9D9] flex flex-col items-center justify-center text-center text-[#373B3A]">
            <h2 className="text-xs font-inter font-semibold">Ranking</h2>
            <p className="text-3xl font-inter font-bold">{jugador.Ranking}</p>
          </div>
        </div>
      </div>

      {/* Contenedor azul */}
      <div className="bg-pdarkblue text-white flex justify-between items-end py-8 px-4 z-10">
        <p className="ml-4 sm:ml-96 font-inter font-bold text-xl sm:text-2xl">
          {jugador.Ranking}° {jugador.Nombre}
        </p>
        <button
          onClick={scrollToTable}
          className="bg-white text-black mr-5 px-4 py-2 rounded-lg"
        >
          Tabla de Rankings
        </button>
      </div>

      {/* Main Content */}
      <div className="flex mt-[380px] sm:mt-0 flex-col sm:flex-row sm:ml-96">
        {/* Estadísticas y Recorrido */}
        <div className="flex-grow p-4">
          <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-8">
            {/* Estadísticas */}
            <div className="flex-1 bg-white p-4 rounded-lg shadow-md mb-4 sm:mb-0">
              <h2 className="text-lg font-bold mb-4">ESTADÍSTICAS</h2>
              <ul>
                <li className="flex justify-between border-b py-2">
                  <span>Competiciones jugadas</span> <span>{jugador.CJ}</span>
                </li>
                <li className="flex justify-between border-b py-2">
                  <span>Última pareja</span> <span>{jugador.UP}</span>
                </li>
                <li className="flex justify-between border-b py-2">
                  <span>Último resultado</span> <span>{jugador.UR}</span>
                </li>
                <li className="flex justify-between border-b py-2">
                  <span>Cuartos de final</span> <span>{jugador.Cuartos}</span>
                </li>
                <li className="flex justify-between border-b py-2">
                  <span>Semifinales</span> <span>{jugador.Semis}</span>
                </li>
                <li className="flex justify-between border-b py-2">
                  <span>Finales</span> <span>{jugador.Finales}</span>
                </li>
              </ul>
            </div>

            {/* Recorrido */}
            <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-4">RECORRIDO</h2>
              <ul>
                <li className="flex justify-between border-b py-2">
                  <span>Partidos jugados</span> <span>{jugador.PJ}</span>
                </li>
                <li className="flex justify-between border-b py-2">
                  <span>Partidos Ganados</span> <span>{jugador.PG}</span>
                </li>
                <li className="flex justify-between border-b py-2">
                  <span>Efectividad</span> <span>{jugador.Efectividad}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Histórico de Torneos */}
      <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">HISTÓRICO DE TORNEOS</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left p-2">Tipo</th>
              <th className="text-left p-2">Competición</th>
              <th className="text-left p-2">Fecha</th>
              <th className="text-left p-2">Pareja</th>
              <th className="text-left p-2">Categoría</th>
              <th className="text-left p-2">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {historicoTorneos.map((torneo, index) => (
              <tr key={index}>
                <td className="border-t p-2">{torneo.Tipo}</td>
                <td className="border-t p-2">{torneo.Competicion}</td>
                <td className="border-t p-2">{torneo.Fecha}</td>
                <td className="border-t p-2">{torneo.Pareja}</td>
                <td className="border-t p-2">{torneo.Categoria}</td>
                <td className="border-t p-2">{torneo.Resultado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id="Tabla" className="flex flex-col p-4">
        <TablaDeRankings />
      </div>
    </div>
  );
};

export default PerfilJugador;
