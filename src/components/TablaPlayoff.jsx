import { useState, useEffect } from "react";
import Papa from "papaparse";
import { useParams } from "react-router-dom";
import copa from "../assets/copa.png"; // Asegúrate de ajustar la ruta según tu estructura
import otp from "../assets/otp.png"; // Asegúrate de ajustar la ruta según tu estructura

const fetchData = (setData) => {
  Papa.parse("/partidos.csv", {
    download: true,
    header: true,
    complete: (results) => {
      setData(results.data);
    },
  });
};

const TablaPlayoff = () => {
  const { idTorneo } = useParams(); // Obtén el parámetro IDTorneo de la URL
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(setData);
  }, []);

  useEffect(() => {
    console.log("ID Torneo:", idTorneo);
    console.log("Datos Cargados:", data);
  }, [idTorneo, data]);

  // Filtra los datos basados en el IDTorneo
  const filteredData = data.filter((row) => row.IDTorneo === idTorneo);
  const octavosData = filteredData
    .filter((row) => row.Instancia === "Octavos")
    .slice(0, 8);
  const cuartosData = filteredData
    .filter((row) => row.Instancia === "Cuartos")
    .slice(0, 4);
  const semisData = filteredData
    .filter((row) => row.Instancia === "Semifinal")
    .slice(0, 2);
  const finalData = filteredData
    .filter((row) => row.Instancia === "Final")
    .slice(0, 1);

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
      <div className="flex justify-center items-center m-4 relative bg-cover bg-center">
        <div className="grid grid-cols-4 max-w-[210px] sm:max-w-none">
          {/* Octavos */}
          <div className="space-y-4 sm:space-y-10">
            <div className="bg-pblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
              {equipo1_1 ? equipo1_1 : "Nombre del Equipo"}
            </div>
            <div className="bg-pblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
              {equipo2_1 ? equipo2_1 : "Nombre del Equipo"}
            </div>
            <div className="bg-pblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
              {equipo1_2 ? equipo1_2 : "Nombre del Equipo"}
            </div>
            <div className="bg-pblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
              {equipo2_2 ? equipo2_2 : "Nombre del Equipo"}
            </div>
            <div className="bg-pblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
              {equipo1_3 ? equipo1_3 : "Nombre del Equipo"}
            </div>
            <div className="bg-pblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
              {equipo2_3 ? equipo2_3 : "Nombre del Equipo"}
            </div>
            <div className="bg-pblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
              {equipo1_4 ? equipo1_4 : "Nombre del Equipo"}
            </div>
            <div className="bg-pblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
              {equipo2_4 ? equipo2_4 : "Nombre del Equipo"}
            </div>
          </div>
          {/* Cuartos */}
          <div className="space-y-[26px] ml-[13px] sm:space-y-[85px] sm:ml-0">
            <div className="mt-1 sm:mt-6">
              <div className="w-10 h-3 sm:w-16 sm:h-4 border-t-2 border-r-2 border-pblue"></div>
              <div className="bg-plightgreen text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
                {cuartos1_1 ? cuartos1_1 : "Nombre del Equipo"}
              </div>
              <div className="w-10 h-3 sm:w-16 sm:h-4 border-b-2 border-r-2 border-pblue"></div>
            </div>
            <div>
              <div className="w-10 h-3 sm:w-16 sm:h-4 border-t-2 border-r-2 border-pblue"></div>
              <div className="bg-plightgreen text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
                {cuartos2_1 ? cuartos2_1 : "Nombre del Equipo"}
              </div>
              <div className="w-10 h-3 sm:w-16 sm:h-4 border-b-2 border-r-2 border-pblue"></div>
            </div>
            <div>
              <div className="w-10 h-3 sm:w-16 sm:h-4 border-t-2 border-r-2 border-pblue"></div>
              <div className="bg-plightgreen text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
                {cuartos1_2 ? cuartos1_2 : "Nombre del Equipo"}
              </div>
              <div className="w-10 h-3 sm:w-16 sm:h-4 border-b-2 border-r-2 border-pblue"></div>
            </div>
            <div>
              <div className="w-10 h-3 sm:w-16 sm:h-4 border-t-2 border-r-2 border-pblue"></div>
              <div className="bg-plightgreen text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
                {cuartos2_2 ? cuartos2_2 : "Nombre del Equipo"}
              </div>
              <div className="w-10 h-3 sm:w-16 sm:h-4 border-b-2 border-r-2 border-pblue"></div>
            </div>
          </div>
          {/* Semis */}
          <div className="space-y-[70px] ml-6 sm:space-y-[145px] sm:ml-0">
            <div>
              <div className="mt-[25px] w-10 h-6 sm:mt-14 sm:w-16 sm:h-16 border-t-2 border-r-2 border-plightgreen"></div>
              <div className="bg-plightblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
                {semis1_1 ? semis1_1 : "Nombre del Equipo"}
              </div>
              <div className="w-10 h-6 sm:w-16 sm:h-16 border-b-2 border-r-2 border-plightgreen"></div>
            </div>
            <div>
              <div className="w-10 h-6 sm:w-16 sm:h-16 border-t-2 border-r-2 border-plightgreen"></div>
              <div className="bg-plightblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
                {semis2_1 ? semis2_1 : "Nombre del Equipo"}
              </div>
              <div className="w-10 h-6 sm:w-16 sm:h-16 border-b-2 border-r-2 border-plightgreen"></div>
            </div>
          </div>
          {/* Final */}
          <div className="mt-[60px] ml-9 sm:mt-[135px] sm:ml-0">
            <div className="w-10 h-14 sm:w-16 sm:h-[145px] border-t-2 border-r-2 border-plightblue"></div>
            <div className="bg-pgreen text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
              {final_1 ? final_1 : "Nombre del Equipo"}
            </div>
            <div className="w-10 h-[60px] sm:w-16 sm:h-[135px] border-b-2 border-r-2 border-plightblue"></div>
          </div>
        </div>
        {/* Logos */}
        <div className="flex flex-col items-center">
          <div className="hidden sm:flex font-inter font-bold text-pgrey text-xs">CAMPEON</div>
          <img src={copa} alt="copa" className=" mb-5" />
          <img src={otp} alt="otp" className=" mt-5" />
        </div>
        <div className="grid grid-cols-4">
          {/* Final */}
          <div className="mt-[60px] ml-9 sm:mt-[135px] sm:ml-0">
            <div className="w-8 h-14 sm:w-[78px] sm:h-[145px] border-t-2 border-r-2 border-plightblue transform -scale-x-100 translate-x-8 sm:translate-x-[83px]"></div>
            <div className="bg-pgreen text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
              {final_2 ? final_2 : "Nombre del Equipo"}
            </div>
            <div className="w-8 h-[60px] sm:w-[78px] sm:h-[135px] border-b-2 border-r-2 border-plightblue -scale-x-100 translate-x-8 sm:translate-x-[83px]"></div>
          </div>
          {/* Semis */}
          <div className="space-y-[70px] ml-6 sm:space-y-[155px] sm:ml-0">
            <div>
              <div className="mt-[25px] w-8 h-6 sm:mt-14 sm:w-[78px] sm:h-16 border-t-2 border-r-2 border-plightgreen -scale-x-100 translate-x-8 sm:translate-x-[83px]"></div>
              <div className="bg-plightblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
                {semis1_2 ? semis1_2 : "Nombre del Equipo"}
              </div>
              <div className="w-8 h-6 sm:w-[78px] sm:h-14 border-b-2 border-r-2 border-plightgreen -scale-x-100 translate-x-8 sm:translate-x-[83px]"></div>
            </div>
            <div>
              <div className="w-8 h-6 sm:w-[78px] sm:h-16 border-t-2 border-r-2 border-plightgreen -scale-x-100 translate-x-8 sm:translate-x-[83px]"></div>
              <div className="bg-plightblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
                {semis2_2 ? semis2_2 : "Nombre del Equipo"}
              </div>
              <div className="w-8 h-6 sm:w-[78px] sm:h-14 border-b-2 border-r-2 border-plightgreen -scale-x-100 translate-x-8 sm:translate-x-[83px]"></div>
            </div>
          </div>
          {/* Cuartos */}
          <div className="space-y-[26px] ml-[13px] sm:space-y-[85px] sm:ml-0">
            <div className="mt-1 sm:mt-6">
              <div className="w-8 h-3 sm:w-[78px] sm:h-4 border-t-2 border-r-2 border-pblue -scale-x-100 translate-x-8 sm:translate-x-[83px]"></div>
              <div className="bg-plightgreen text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
                {cuartos1_3 ? cuartos1_3 : "Nombre del Equipo"}
              </div>
              <div className="w-8 h-3 sm:w-[78px] sm:h-4 border-b-2 border-r-2 border-pblue -scale-x-100 translate-x-8 sm:translate-x-[83px]"></div>
            </div>
            <div>
              <div className="w-8 h-3 sm:w-[78px] sm:h-4 border-t-2 border-r-2 border-pblue -scale-x-100 translate-x-8 sm:translate-x-[83px]"></div>
              <div className="bg-plightgreen text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
                {cuartos2_3 ? cuartos2_3 : "Nombre del Equipo"}
              </div>
              <div className="w-8 h-3 sm:w-[78px] sm:h-4 border-b-2 border-r-2 border-pblue -scale-x-100 translate-x-8 sm:translate-x-[83px]"></div>
            </div>
            <div>
              <div className="w-8 h-3 sm:w-[78px] sm:h-4 border-t-2 border-r-2 border-pblue -scale-x-100 translate-x-8 sm:translate-x-[83px]"></div>
              <div className="bg-plightgreen text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
                {cuartos1_4 ? cuartos1_4 : "Nombre del Equipo"}
              </div>
              <div className="w-8 h-3 sm:w-[78px] sm:h-4 border-b-2 border-r-2 border-pblue -scale-x-100 translate-x-8 sm:translate-x-[83px]"></div>
            </div>
            <div>
              <div className="w-8 h-3 sm:w-[78px] sm:h-4 border-t-2 border-r-2 border-pblue -scale-x-100 translate-x-8 sm:translate-x-[83px]"></div>
              <div className="bg-plightgreen text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
                {cuartos2_4 ? cuartos2_4 : "Nombre del Equipo"}
              </div>
              <div className="w-8 h-3 sm:w-[78px] sm:h-4 border-b-2 border-r-2 border-pblue -scale-x-100 translate-x-8 sm:translate-x-[83px]"></div>
            </div>
          </div>
          {/* Octavos */}
          <div className="space-y-4 sm:space-y-10">
            <div className="bg-pblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
              {equipo1_5 ? equipo1_5 : "Nombre del Equipo"}
            </div>
            <div className="bg-pblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
              {equipo2_5 ? equipo2_5 : "Nombre del Equipo"}
            </div>
            <div className="bg-pblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
              {equipo1_6 ? equipo1_6 : "Nombre del Equipo"}
            </div>
            <div className="bg-pblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
              {equipo2_6 ? equipo2_6 : "Nombre del Equipo"}
            </div>
            <div className="bg-pblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
              {equipo1_7 ? equipo1_7 : "Nombre del Equipo"}
            </div>
            <div className="bg-pblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
              {equipo2_7 ? equipo2_7 : "Nombre del Equipo"}
            </div>
            <div className="bg-pblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
              {equipo1_8 ? equipo1_8 : "Nombre del Equipo"}
            </div>
            <div className="bg-pblue text-white p-1 sm:p-2 rounded-lg text-center text-[1.1vw] sm:text-[1.02vw] w-20 sm:w-40">
              {equipo2_8 ? equipo2_8 : "Nombre del Equipo"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaPlayoff;
