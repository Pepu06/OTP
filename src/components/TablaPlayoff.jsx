import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import copa from "../assets/copa.png"; // Asegúrate de ajustar la ruta según tu estructura
import otp from "../assets/otp.png"; // Asegúrate de ajustar la ruta según tu estructura

const TablaPlayoff = () => {
  const { idTorneo } = useParams(); // Obtén el parámetro IDTorneo de la URL
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://otpbackend1-pepu06s-projects.vercel.app/partidos/${idTorneo}`
        );
        if (!response.ok)
          throw new Error("Error al cargar los datos de partidos");

        const result = await response.json();
        console.log("Datos crudos del backend:", result);

        if (!Array.isArray(result.data)) {
          throw new Error("La propiedad 'data' no es un array");
        }

        const filteredData = result.data.filter(
          (partido) => String(partido.IDTorneo) === idTorneo
        );

        console.log("Datos filtrados:", filteredData);

        setData(filteredData);
      } catch (error) {
        console.error("Error cargando datos de partidos:", error);
      }
    };

    fetchData();
  }, [idTorneo]);

  const octavosData = data
    .filter((row) => row.Instancia === "Octavos")
    .slice(0, 8);
  const cuartosData = data
    .filter((row) => row.Instancia === "Cuartos")
    .slice(0, 4);
  const semisData = data
    .filter((row) => row.Instancia === "Semifinal")
    .slice(0, 2);
  const finalData = data.filter((row) => row.Instancia === "Final").slice(0, 1);
  // Asigna los equipos a variables individuales
  const [
    equipo1_1,
    equipo1_2,
    equipo1_3,
    equipo1_4,
    equipo1_5,
    equipo1_6,
    equipo1_7,
    equipo1_8,
  ] = octavosData.map((partido) => partido.Equipo1);
  const [
    equipo2_1,
    equipo2_2,
    equipo2_3,
    equipo2_4,
    equipo2_5,
    equipo2_6,
    equipo2_7,
    equipo2_8,
  ] = octavosData.map((partido) => partido.Equipo2);

  // Asigna los equipos a variables individuales
  const [cuartos1_1, cuartos1_2, cuartos1_3, cuartos1_4] = cuartosData.map(
    (partido) => partido.Equipo1
  );
  const [cuartos2_1, cuartos2_2, cuartos2_3, cuartos2_4] = cuartosData.map(
    (partido) => partido.Equipo2
  );

  // Asigna los equipos a variables individuales
  const [semis1_1, semis1_2] = semisData.map((partido) => partido.Equipo1);
  const [semis2_1, semis2_2] = semisData.map((partido) => partido.Equipo2);

  // Asigna los equipos a variables individuales
  const [final_1] = finalData.map((partido) => partido.Equipo1);
  const [final_2] = finalData.map((partido) => partido.Equipo2);

  return (
    <div className="flex justify-center items-center m-4 relative bg-cover bg-center">
      <div className="overflow-x-auto sm:overflow-x-visible w-full">
        <div className="flex justify-start sm:justify-center items-center m-4 relative bg-cover bg-center">
          <div className="grid grid-cols-4 min-w-[600px]">
            <div className="space-y-10">
              <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                {equipo1_1 ? equipo1_1 : "Nombre del Equipo"}
              </div>
              <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                {equipo2_1 ? equipo2_1 : "Nombre del Equipo"}
              </div>
              <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                {equipo1_2 ? equipo1_2 : "Nombre del Equipo"}
              </div>
              <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                {equipo2_2 ? equipo2_2 : "Nombre del Equipo"}
              </div>
              <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                {equipo1_3 ? equipo1_3 : "Nombre del Equipo"}
              </div>
              <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                {equipo2_3 ? equipo2_3 : "Nombre del Equipo"}
              </div>
              <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                {equipo1_4 ? equipo1_4 : "Nombre del Equipo"}
              </div>
              <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                {equipo2_4 ? equipo2_4 : "Nombre del Equipo"}
              </div>
            </div>
            <div className="space-y-[85px]">
              <div className="mt-6">
                <div className="w-16 h-4 border-t-2 border-r-2 border-pblue"></div>
                <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-sm">
                  {cuartos1_1 ? cuartos1_1 : "Nombre del Equipo"}
                </div>
                <div className="w-16 h-4 border-b-2 border-r-2 border-pblue"></div>
              </div>
              <div>
                <div className="w-16 h-4 border-t-2 border-r-2 border-pblue"></div>
                <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-sm">
                  {cuartos2_1 ? cuartos2_1 : "Nombre del Equipo"}
                </div>
                <div className="w-16 h-4 border-b-2 border-r-2 border-pblue"></div>
              </div>
              <div>
                <div className="w-16 h-4 border-t-2 border-r-2 border-pblue"></div>
                <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-sm">
                  {cuartos1_2 ? cuartos1_2 : "Nombre del Equipo"}
                </div>
                <div className="w-16 h-4 border-b-2 border-r-2 border-pblue"></div>
              </div>
              <div>
                <div className="w-16 h-4 border-t-2 border-r-2 border-pblue"></div>
                <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-sm">
                  {cuartos2_2 ? cuartos2_2 : "Nombre del Equipo"}
                </div>
                <div className="w-16 h-4 border-b-2 border-r-2 border-pblue"></div>
              </div>
            </div>
            <div className="space-y-[155px]">
              <div>
                <div className="mt-14 w-16 h-16 border-t-2 border-r-2 border-plightgreen"></div>
                <div className="bg-plightblue text-white p-2 rounded-lg text-center text-sm">
                  {semis1_1 ? semis1_1 : "Nombre del Equipo"}
                </div>
                <div className="w-16 h-14 border-b-2 border-r-2 border-plightgreen"></div>
              </div>
              <div>
                <div className="w-16 h-16 border-t-2 border-r-2 border-plightgreen"></div>
                <div className="bg-plightblue text-white p-2 rounded-lg text-center text-sm">
                  {semis2_1 ? semis2_1 : "Nombre del Equipo"}
                </div>
                <div className="w-16 h-14 border-b-2 border-r-2 border-plightgreen"></div>
              </div>
            </div>
            <div className="mt-[135px]">
              <div className="w-16 h-[145px] border-t-2 border-r-2 border-plightblue"></div>
              <div className="bg-pgreen text-white p-2 rounded-lg text-center text-sm">
                {final_1 ? final_1 : "Nombre del Equipo"}
              </div>
              <div className="w-16 h-[135px] border-b-2 border-r-2 border-plightblue"></div>
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <div className="font-inter font-bold text-pgrey text-xs">
              CAMPEON
            </div>
            <img src={copa} alt="copa" className=" mb-5" />
            <img src={otp} alt="otp" className=" mt-5" />
          </div>
          <div className="grid grid-cols-4 min-w-[600px]">
            <div className="mt-[135px]">
              <div className="w-16 h-[145px] border-t-2 border-r-2 border-plightblue transform -scale-x-100 translate-x-[90px]"></div>
              <div className="bg-pgreen text-white p-2 rounded-lg text-center text-sm">
                {final_2 ? final_2 : "Nombre del Equipo"}
              </div>
              <div className="w-16 h-[135px] border-b-2 border-r-2 border-plightblue -scale-x-100 translate-x-[90px]"></div>
            </div>
            <div className="space-y-[155px]">
              <div>
                <div className="mt-14 w-16 h-16 border-t-2 border-r-2 border-plightgreen -scale-x-100 translate-x-[90px]"></div>
                <div className="bg-plightblue text-white p-2 rounded-lg text-center text-sm">
                  {semis1_2 ? semis1_1 : "Nombre del Equipo"}
                </div>
                <div className="w-16 h-14 border-b-2 border-r-2 border-plightgreen -scale-x-100 translate-x-[90px]"></div>
              </div>
              <div>
                <div className="w-16 h-16 border-t-2 border-r-2 border-plightgreen -scale-x-100 translate-x-[90px]"></div>
                <div className="bg-plightblue text-white p-2 rounded-lg text-center text-sm">
                  {semis2_2 ? semis2_2 : "Nombre del Equipo"}
                </div>
                <div className="w-16 h-14 border-b-2 border-r-2 border-plightgreen -scale-x-100 translate-x-[90px]"></div>
              </div>
            </div>
            <div className="space-y-[85px]">
              <div className="mt-6">
                <div className="w-16 h-4 border-t-2 border-r-2 border-pblue -scale-x-100 translate-x-[90px]"></div>
                <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-sm">
                  {cuartos1_3 ? cuartos1_3 : "Nombre del Equipo"}
                </div>
                <div className="w-[65px] h-4 border-b-2 border-r-2 border-pblue -scale-x-100 translate-x-[90px]"></div>
              </div>
              <div>
                <div className="w-16 h-4 border-t-2 border-r-2 border-pblue -scale-x-100 translate-x-[90px]"></div>
                <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-sm">
                  {cuartos2_3 ? cuartos2_3 : "Nombre del Equipo"}
                </div>
                <div className="w-16 h-4 border-b-2 border-r-2 border-pblue -scale-x-100 translate-x-[90px]"></div>
              </div>
              <div>
                <div className="w-16 h-4 border-t-2 border-r-2 border-pblue -scale-x-100 translate-x-[90px]"></div>
                <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-sm">
                  {cuartos1_4 ? cuartos1_4 : "Nombre del Equipo"}
                </div>
                <div className="w-16 h-4 border-b-2 border-r-2 border-pblue -scale-x-100 translate-x-[90px]"></div>
              </div>
              <div>
                <div className="w-16 h-4 border-t-2 border-r-2 border-pblue -scale-x-100 translate-x-[90px]"></div>
                <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-sm">
                  {cuartos2_4 ? cuartos2_4 : "Nombre del Equipo"}
                </div>
                <div className="w-16 h-4 border-b-2 border-r-2 border-pblue -scale-x-100 translate-x-[90px]"></div>
              </div>
            </div>
            <div className="space-y-10">
              <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                {equipo1_5 ? equipo1_5 : "Nombre del Equipo"}
              </div>
              <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                {equipo2_5 ? equipo2_5 : "Nombre del Equipo"}
              </div>
              <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                {equipo1_6 ? equipo1_6 : "Nombre del Equipo"}
              </div>
              <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                {equipo2_6 ? equipo2_6 : "Nombre del Equipo"}
              </div>
              <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                {equipo1_7 ? equipo1_7 : "Nombre del Equipo"}
              </div>
              <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                {equipo2_7 ? equipo2_7 : "Nombre del Equipo"}
              </div>
              <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                {equipo1_8 ? equipo1_8 : "Nombre del Equipo"}
              </div>
              <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                {equipo2_8 ? equipo2_8 : "Nombre del Equipo"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaPlayoff;
