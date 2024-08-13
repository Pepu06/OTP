import { useState, useEffect } from "react";
import Papa from "papaparse";
import { useParams } from "react-router-dom";

const TablaQually = () => {
  const [partidos, setPartidos] = useState([]);
  const [filteredPartidos, setFilteredPartidos] = useState([]);
  const { idTorneo } = useParams(); // Captura 'idTorneo' de la URL

  useEffect(() => {
    // Lee el archivo partidos.csv y actualiza el estado
    Papa.parse("/partidos.csv", {
      download: true,
      header: true,
      complete: (result) => {
        // Filtra los partidos por el idTorneo
        const allPartidos = result.data;
        const filtered = allPartidos.filter(
          (partido) => partido.IDTorneo === idTorneo && (partido.Instancia === "Q1" || partido.Instancia === "Q2")
        );
        setPartidos(allPartidos);
        setFilteredPartidos(filtered);
      },
    });
  }, [idTorneo]); // Vuelve a ejecutar cuando idTorneo cambie

  return (
    <div
      className="relative overflow-x-auto max-h-96 shadow-md sm:rounded-lg mx-auto"
      style={{ maxWidth: "975px" }}
    >
      <table className=" mx-2 sm:mx-0 text-sm w-full sm:text-base text-left rtl:text-right text-gray-500">
        <thead className="text-white font-daysone bg-gray-50 text-center">
          <tr>
            <th scope="col" className="border-1 border-gray-100 px-6 py-3 bg-pgreen font-light">
              Instancia
            </th>
            <th scope="col" className="border-2 border-gray-100 px-6 py-3 bg-pblue font-light">
              Pareja 1
            </th>
            <th scope="col" className="border-2 border-gray-100 px-6 py-3 bg-verdeclaro font-light">
              Resultado
            </th>
            <th scope="col" className="border-2 border-gray-100 px-6 py-3 bg-pblue font-light">
              Pareja 2
            </th>
            <th scope="col" className="border-2 border-gray-100 px-6 py-3 bg-pgreen font-light">
              Cancha
            </th>
            <th scope="col" className="border-2 border-gray-100 px-6 py-3 bg-pgreen font-light">
              Horario
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredPartidos.map((partido, index) => (
            <tr key={index}>
              <td className="px-6 py-4 text-center border-2 border-gray-100">
                {partido.Instancia}
              </td>
              <td className="px-6 py-4 text-center border-2 border-gray-100">
                {partido.Equipo1}
              </td>
              <td className="px-6 py-4 text-center border-2 border-gray-100">
                {partido.Resultado}
              </td>
              <td className="px-6 py-4 text-center border-2 border-gray-100">
                {partido.Equipo2}
              </td>
              <td className="px-6 py-4 text-center border-2 border-gray-100">
                {partido.Cancha}
              </td>
              <td className="px-6 py-4 text-center border-2 border-gray-100">
                {partido.Horario}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaQually;
