import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config"; // Asegúrate de que la ruta es correcta

const TablaDeRankings = () => {
  const [rankings, setRankings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Empieza a cargar
      try {
        const querySnapshot = await getDocs(collection(db, "jugadores"));
        const data = querySnapshot.docs.map((doc) => doc.data());

        console.log("Datos crudos de Firestore:", data); // Verifica la estructura de los datos
        const playerRankings = data
          .map((row) => ({
            ranking: parseInt(row.Ranking, 10), // Convierte a número
            nombre: row.Nombre, // Asegúrate de que el nombre del campo coincida con tu base de datos
          }))
          .filter((row) => !isNaN(row.ranking) && row.nombre); // Filtra valores inválidos

        // Ordenar los rankings de mayor a menor
        playerRankings.sort((a, b) => b.ranking - a.ranking);

        setRankings(playerRankings);
        console.log("Rankings procesados:", playerRankings); // Verifica los datos procesados
      } catch (error) {
        console.error(
          "Error cargando datos de jugadores desde Firestore:",
          error
        );
      } finally {
        setLoading(false); // Termina de cargar
      }
    };

    fetchData();
  }, []);

  // Filtrar los rankings según el término de búsqueda
  const filteredRankings = rankings.filter((row) =>
    row.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Indicador de carga
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-pblue"></div>
      </div>
    );
  }

  const renderRankingsTable = () => (
    <div className="relative overflow-x-auto w-full items-center">
      <h1 className="flex text-pblue justify-center font-daysone text-4xl mb-3">
        Rankings
      </h1>

      <div className="flex justify-center mt-8">
        <div className="rounded-lg overflow-hidden w-[800px]">
          <div className="flex justify-start mb-3">
            <input
              className="border border-pgrey w-52 placeholder:text-center placeholder:text-sm placeholder:text-pgrey rounded-lg px-3 text-center"
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Buscar")}
            />
          </div>
          <div
            className="overflow-y-auto rounded-lg border"
            style={{ maxHeight: "300px" }}
          >
            <table className="w-full text-base text-gray-500">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Ranking</th>
                  <th className="px-4 py-2 text-left">Nombre</th>
                </tr>
              </thead>
              <tbody>
                {filteredRankings.length > 0 ? (
                  filteredRankings.map((row, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b text-pgrey hover:bg-gray-100"
                    >
                      <td className="px-4 py-2">{row.ranking}</td>
                      <td className="px-4 py-2 text-left">{row.nombre}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="px-4 py-2 text-center">
                      No hay resultados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Nueva tabla de Rankings */}
      <div className="flex justify-center mt-8 w-full">
        <div className="w-full" style={{ maxWidth: "70%" }}>
          {renderRankingsTable()}
        </div>
      </div>
    </div>
  );
};

export default TablaDeRankings;
