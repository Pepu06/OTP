import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TablaQually = () => {
  const [partidos, setPartidos] = useState([]);
  const [filteredPartidos, setFilteredPartidos] = useState([]);
  const { idTorneo } = useParams(); // Captura 'idTorneo' de la URL

  useEffect(() => {
    // Función para cargar los datos de partidos desde el backend
    const fetchPartidos = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/partidos/${idTorneo}`
        );
        if (!response.ok)
          throw new Error("Error al cargar los datos de partidos");

        const result = await response.json();
        console.log("Datos crudos del backend:", result); // Verifica la estructura de los datos

        // Accede a la propiedad 'data' que contiene el array de partidos
        const data = result.data;

        if (!Array.isArray(data)) {
          throw new Error("La propiedad 'data' no es un array");
        }

        console.log("Datos de partidos:", data); // Verifica los datos de partidos

        // Asegúrate de que idTorneo sea del tipo correcto
        const torneoId = String(idTorneo); // Convertir idTorneo a cadena para la comparación

        // Filtra los partidos por el idTorneo
        const filtered = data.filter(
          (partido) =>
            String(partido.IDTorneo) === torneoId &&
            (partido.Instancia === "Q1" || partido.Instancia === "Q2")
        );

        setPartidos(data);
        setFilteredPartidos(filtered);
        console.log("Partidos procesados:", filtered); // Verifica los datos procesados
      } catch (error) {
        console.error("Error cargando datos de partidos:", error);
      }
    };

    fetchPartidos();
  }, [idTorneo]); // Vuelve a ejecutar cuando idTorneo cambie

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
            <th
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
