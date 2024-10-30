import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const TablaQually = () => {
  const [partidos, setPartidos] = useState([]);
  const [filteredPartidos, setFilteredPartidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { idTorneo } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartidos = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "partidos"));
        const data = querySnapshot.docs.map((doc) => doc.data());

        const filtered = data.filter((partido) => {
          const instanciaLower = partido.Instancia.toLowerCase();
          return (
            partido.IDTorneo == idTorneo &&
            (instanciaLower.includes("q1") ||
              instanciaLower.includes("q2") ||
              instanciaLower.includes("16avos") ||
              instanciaLower.includes("dieciseisavos") ||
              instanciaLower.includes("octavos") ||
              instanciaLower.includes("cuartos") ||
              instanciaLower.includes("semi") ||
              instanciaLower.includes("semis") ||
              instanciaLower.includes("final"))
          );
        });

        const order = [
          "q1",
          "q2",
          "16avos",
          "octavos",
          "cuartos",
          "semis",
          "final",
        ];
        const sortedFiltered = filtered.sort((a, b) => {
          const aIndex = order.findIndex((instancia) =>
            a.Instancia.toLowerCase().includes(instancia)
          );
          const bIndex = order.findIndex((instancia) =>
            b.Instancia.toLowerCase().includes(instancia)
          );
          return aIndex - bIndex;
        });

        setPartidos(data);
        setFilteredPartidos(sortedFiltered);
        console.log("Partidos filtrados:", sortedFiltered);
      } catch (error) {
        console.error(
          "Error cargando datos de partidos desde Firebase:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartidos();
  }, [idTorneo]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-pblue"></div>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-x-auto max-h-96 shadow-md sm:rounded-lg mx-auto"
      style={{ maxWidth: "975px" }}
    >
      <table className="mx-2 sm:mx-0 text-sm w-full sm:text-base text-left rtl:text-right text-gray-500">
        <thead className="text-white font-daysone bg-gray-50 text-center">
          <tr>
            <th
              scope="col"
              className="border-1 border-gray-100 px-6 py-3 bg-pgreen font-light"
            >
              Instancia
            </th>
            <th
              scope="col"
              className="border-2 border-gray-100 px-6 py-3 bg-pblue font-light"
            >
              Pareja 1
            </th>
            <th
              scope="col"
              className="border-2 border-gray-100 px-6 py-3 bg-verdeclaro font-light"
            >
              Resultado
            </th>
            <th
              scope="col"
              className="border-2 border-gray-100 px-6 py-3 bg-pblue font-light"
            >
              Pareja 2
            </th>
            {/* <th
                scope="col"
                className="border-2 border-gray-100 px-6 py-3 bg-pgreen font-light"
              >
                Cancha
              </th>
              <th
                scope="col"
                className="border-2 border-gray-100 px-6 py-3 bg-pgreen font-light"
              >
                Horario
              </th> */}
          </tr>
        </thead>
        <tbody>
          {filteredPartidos.map((partido, index) => (
            <tr key={index}>
              <td className="px-6 py-4 text-center border-2 border-gray-100">
                {partido.Instancia}
              </td>
              <td className="px-6 py-4 text-center border-2 border-gray-100">
                {partido.Pareja1}
              </td>
              <td className="px-6 py-4 text-center border-2 border-gray-100">
                {partido.GamesP1} - {partido.GamesP2}
              </td>
              <td className="px-6 py-4 text-center border-2 border-gray-100">
                {partido.Pareja2}
              </td>
              {/* <td className="px-6 py-4 text-center border-2 border-gray-100">
                  {partido.Cancha}
                </td>
                <td className="px-6 py-4 text-center border-2 border-gray-100">
                  {partido.Horario}
                </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaQually;
