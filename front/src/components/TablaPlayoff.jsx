import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { useParams } from 'react-router-dom';
import copa from "../assets/copa.png"; // Asegúrate de ajustar la ruta según tu estructura
import otp from "../assets/otp.png"; // Asegúrate de ajustar la ruta según tu estructura

const fetchData = (setData) => {
  Papa.parse('/partidos.csv', {
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
  const filteredData = data.filter(row => row.IDTorneo === idTorneo);
  const octavosData = filteredData.filter(row => row.Instancia === "Octavos").slice(0, 8);
  const cuartosData = filteredData.filter(row => row.Instancia === "Cuartos").slice(0, 4);
  const semisData = filteredData.filter(row => row.Instancia === "Semifinal").slice(0, 2);
  const finalData = filteredData.filter(row => row.Instancia === "Final").slice(0, 1);

  // Asigna los equipos a variables individuales
  const [equipo1_1, equipo1_2, equipo1_3, equipo1_4, equipo1_5, equipo1_6, equipo1_7, equipo1_8] =
    octavosData.map(partido => partido.Equipo1);
  const [equipo2_1, equipo2_2, equipo2_3, equipo2_4, equipo2_5, equipo2_6, equipo2_7, equipo2_8] =
    octavosData.map(partido => partido.Equipo2);

  // Asigna los equipos a variables individuales
  const [cuartos1_1, cuartos1_2, cuartos1_3, cuartos1_4] =
    cuartosData.map(partido => partido.Equipo1);
  const [cuartos2_1, cuartos2_2, cuartos2_3, cuartos2_4] =
    cuartosData.map(partido => partido.Equipo2);

  // Asigna los equipos a variables individuales
  const [semis1_1, semis1_2] =
    semisData.map(partido => partido.Equipo1);
  const [semis2_1, semis2_2] =
    semisData.map(partido => partido.Equipo2);

  // Asigna los equipos a variables individuales
  const [final_1] =
    finalData.map(partido => partido.Equipo1);
  const [final_2] =
    finalData.map(partido => partido.Equipo2);


  return (
    <div className="flex justify-center items-center m-4 relative bg-cover bg-center">
      <div className="flex justify-center items-center m-4 relative bg-cover bg-center">
        <div className="grid grid-cols-4">
          <div className="space-y-10">
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              {equipo1_1}
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              {equipo2_1}
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              {equipo1_2}
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              {equipo2_2}
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              {equipo1_3}
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              {equipo2_3}
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              {equipo1_4}
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              {equipo2_4}
            </div>
          </div>
          <div className="space-y-[85px]">
            <div className="mt-6">
              <div className="w-16 h-4 border-t-2 border-r-2 border-pblue"></div>
              <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                {cuartos1_1}
              </div>
              <div className="w-16 h-4 border-b-2 border-r-2 border-pblue"></div>
            </div>
            <div>
              <div className="w-16 h-4 border-t-2 border-r-2 border-pblue"></div>
              <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                {cuartos2_1}
              </div>
              <div className="w-16 h-4 border-b-2 border-r-2 border-pblue"></div>
            </div>
            <div>
              <div className="w-16 h-4 border-t-2 border-r-2 border-pblue"></div>
              <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                {cuartos1_2}
              </div>
              <div className="w-16 h-4 border-b-2 border-r-2 border-pblue"></div>
            </div>
            <div>
              <div className="w-16 h-4 border-t-2 border-r-2 border-pblue"></div>
              <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                {cuartos2_2}
              </div>
              <div className="w-16 h-4 border-b-2 border-r-2 border-pblue"></div>
            </div>
          </div>
          <div className="space-y-[155px]">
            <div>
              <div className="mt-14 w-16 h-16 border-t-2 border-r-2 border-plightgreen"></div>
              <div className="bg-plightblue text-white p-2 rounded-lg text-center text-[1.02vw]">
                {semis1_1}
              </div>
              <div className="w-16 h-14 border-b-2 border-r-2 border-plightgreen"></div>
            </div>
            <div>
              <div className="w-16 h-16 border-t-2 border-r-2 border-plightgreen"></div>
              <div className="bg-plightblue text-white p-2 rounded-lg text-center text-[1.02vw]">
                Nombre del Equipo 
                {/* {semis2_1} */}
              </div>
              <div className="w-16 h-14 border-b-2 border-r-2 border-plightgreen"></div>
            </div>
          </div>
          <div className="mt-[135px]">
            <div className="w-16 h-[145px] border-t-2 border-r-2 border-plightblue"></div>
            <div className="bg-pgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
              {final_1}
            </div>
            <div className="w-16 h-[135px] border-b-2 border-r-2 border-plightblue"></div>
          </div>
        </div>
        <div className="flex flex-col items-center m-4">
          <div className="font-inter font-bold text-pgrey text-xs">CAMPEON</div>
          <img src={copa} alt="copa" className=" mb-5" />
          <img src={otp} alt="otp" className=" mt-5" />
        </div>
        <div className="grid grid-cols-4">
          <div className="mt-[135px]">
            <div className="w-16 h-[145px] border-t-2 border-r-2 border-plightblue transform -scale-x-100 translate-x-[83px]"></div>
            <div className="bg-pgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del Equipo
              {/* {final_2} */}
            </div>
            <div className="w-16 h-[135px] border-b-2 border-r-2 border-plightblue -scale-x-100 translate-x-[83px]"></div>
          </div>
          <div className="space-y-[155px]">
            <div>
              <div className="mt-14 w-16 h-16 border-t-2 border-r-2 border-plightgreen -scale-x-100 translate-x-[83px]"></div>
              <div className="bg-plightblue text-white p-2 rounded-lg text-center text-[1.02vw]">
                {semis1_2}
              </div>
              <div className="w-16 h-14 border-b-2 border-r-2 border-plightgreen -scale-x-100 translate-x-[83px]"></div>
            </div>
            <div>
              <div className="w-16 h-16 border-t-2 border-r-2 border-plightgreen -scale-x-100 translate-x-[83px]"></div>
              <div className="bg-plightblue text-white p-2 rounded-lg text-center text-[1.02vw]">
                {semis2_2}
              </div>
              <div className="w-16 h-14 border-b-2 border-r-2 border-plightgreen -scale-x-100 translate-x-[83px]"></div>
            </div>
          </div>
          <div className="space-y-[85px]">
            <div className="mt-6">
              <div className="w-16 h-4 border-t-2 border-r-2 border-pblue -scale-x-100 translate-x-[83px]"></div>
              <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                {cuartos1_3}
              </div>
              <div className="w-[65px] h-4 border-b-2 border-r-2 border-pblue -scale-x-100 translate-x-[83px]"></div>
            </div>
            <div>
              <div className="w-16 h-4 border-t-2 border-r-2 border-pblue -scale-x-100 translate-x-[83px]"></div>
              <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                {cuartos2_3}
              </div>
              <div className="w-16 h-4 border-b-2 border-r-2 border-pblue -scale-x-100 translate-x-[83px]"></div>
            </div>
            <div>
              <div className="w-16 h-4 border-t-2 border-r-2 border-pblue -scale-x-100 translate-x-[83px]"></div>
              <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                {cuartos1_4}
              </div>
              <div className="w-16 h-4 border-b-2 border-r-2 border-pblue -scale-x-100 translate-x-[83px]"></div>
            </div>
            <div>
              <div className="w-16 h-4 border-t-2 border-r-2 border-pblue -scale-x-100 translate-x-[83px]"></div>
              <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                {cuartos2_4}
              </div>
              <div className="w-16 h-4 border-b-2 border-r-2 border-pblue -scale-x-100 translate-x-[83px]"></div>
            </div>
          </div>
          <div className="space-y-10">
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              {equipo1_5}
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              {equipo2_5}
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              {equipo1_6}
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              {equipo2_6}
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              {equipo1_7}
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              {equipo2_7}
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              {equipo1_7}
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              {equipo2_7}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaPlayoff;
