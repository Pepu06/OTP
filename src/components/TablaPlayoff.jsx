import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import copa from "../assets/copa.png"; // Ajusta la ruta según tu estructura
import otp from "../assets/otp.png"; // Ajusta la ruta según tu estructura
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const TablaPlayoff = () => {
  const { idTorneo } = useParams(); // Obtén el parámetro IDTorneo de la URL
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Empieza a cargar
      try {
        const querySnapshot = await getDocs(collection(db, "partidos"));
        const data = querySnapshot.docs.map((doc) => doc.data());

        const filtered = data.filter(
          (partido) =>
            partido.IDTorneo == idTorneo &&
            (partido.Instancia === "Dieciseisavos" ||
              partido.Instancia === "Octavos" ||
              partido.Instancia === "Cuartos" ||
              partido.Instancia === "Semifinal" ||
              partido.Instancia === "Final")
        );

        console.log("Datos filtrados de Firestore:", filtered);

        if (!Array.isArray(filtered)) {
          throw new Error("La consulta no retornó un array");
        }

        setData(filtered);
      } catch (error) {
        console.error(
          "Error cargando datos de partidos desde Firestore:",
          error
        );
      } finally {
        setLoading(false); // Termina de cargar
      }
    };

    fetchData();
  }, [idTorneo]);

  // Si estamos cargando, muestra un indicador de carga
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-pblue"></div>
      </div>
    );
  }

  // Asigna los equipos a variables individuales
  const dieciseisavosData = data
    .filter((row) => row.Instancia === "Dieciseisavos")
    .slice(0, 16);
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

  const existeDieciseisavos = dieciseisavosData.length > 0;

  const [
    dieciseisavos1_1,
    dieciseisavos1_2,
    dieciseisavos1_3,
    dieciseisavos1_4,
    dieciseisavos1_5,
    dieciseisavos1_6,
    dieciseisavos1_7,
    dieciseisavos1_8,
    dieciseisavos1_9,
    dieciseisavos1_10,
    dieciseisavos1_11,
    dieciseisavos1_12,
    dieciseisavos1_13,
    dieciseisavos1_14,
    dieciseisavos1_15,
    dieciseisavos1_16,
  ] = dieciseisavosData.map((partido) => partido.Equipo1);

  const [
    dieciseisavos2_1,
    dieciseisavos2_2,
    dieciseisavos2_3,
    dieciseisavos2_4,
    dieciseisavos2_5,
    dieciseisavos2_6,
    dieciseisavos2_7,
    dieciseisavos2_8,
    dieciseisavos2_9,
    dieciseisavos2_10,
    dieciseisavos2_11,
    dieciseisavos2_12,
    dieciseisavos2_13,
    dieciseisavos2_14,
    dieciseisavos2_15,
    dieciseisavos2_16,
  ] = dieciseisavosData.map((partido) => partido.Equipo2);

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

  const [cuartos1_1, cuartos1_2, cuartos1_3, cuartos1_4] = cuartosData.map(
    (partido) => partido.Equipo1
  );
  const [cuartos2_1, cuartos2_2, cuartos2_3, cuartos2_4] = cuartosData.map(
    (partido) => partido.Equipo2
  );

  const [semis1_1, semis1_2] = semisData.map((partido) => partido.Equipo1);
  const [semis2_1, semis2_2] = semisData.map((partido) => partido.Equipo2);

  const [final_1] = finalData.map((partido) => partido.Equipo1);
  const [final_2] = finalData.map((partido) => partido.Equipo2);

  return (
    <div className="flex justify-center items-center m-4 relative bg-cover bg-center">
      <div className="overflow-x-auto sm:overflow-x-visible w-full">
        <div className="flex justify-start sm:justify-center items-center m-4 relative bg-cover bg-center">
          <div
            className={`grid ${existeDieciseisavos
              ? "grid-cols-5"
              : octavosData.length > 0
                ? "grid-cols-4"
                : cuartosData.length > 0
                  ? "grid-cols-3"
                  : semisData.length > 0
                    ? "grid-cols-2"
                    : "grid-cols-1"
              } min-w-[600px]`}
          >
            {dieciseisavosData.length > 0 && (
              <div className="space-y-2">
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos1_1 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos2_1 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos1_2 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos2_2 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos1_3 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos2_3 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos1_4 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos2_4 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos1_5 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos2_5 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos1_6 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos2_6 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos1_7 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos2_7 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos1_8 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos2_8 || "Equipo"}
                  </div>
                </div>
              </div>
            )}
            {octavosData.length > 0 && (
              <div className="space-y-[36px] mt-3">
                <div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-t-2 border-r-2 w-16 h-2"}`}></div>
                  )}
                  <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                    {equipo1_1 ? equipo1_1 : "Equipo"}
                  </div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-b-2 border-r-2 w-16 h-2"}`}></div>
                  )}
                </div>
                <div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-t-2 border-r-2 w-16 h-2"}`}></div>

                  )}
                  <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                    {equipo2_1 ? equipo2_1 : "Equipo"}
                  </div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-b-2 border-r-2 w-16 h-2"}`}></div>
                  )}
                </div>

                <div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-t-2 border-r-2 w-16 h-2"}`}></div>

                  )}
                  <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                    {equipo1_2 ? equipo1_2 : "Equipo"}
                  </div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-b-2 border-r-2 w-16 h-2"}`}></div>
                  )}
                </div>

                <div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-t-2 border-r-2 w-16 h-2"}`}></div>

                  )}
                  <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                    {equipo2_2 ? equipo2_2 : "Equipo"}
                  </div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-b-2 border-r-2 w-16 h-2"}`}></div>
                  )}
                </div>

                <div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-t-2 border-r-2 w-16 h-2"}`}></div>

                  )}
                  <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                    {equipo1_3 ? equipo1_3 : "Equipo"}
                  </div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-b-2 border-r-2 w-16 h-2"}`}></div>
                  )}
                </div>

                <div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-t-2 border-r-2 w-16 h-2"}`}></div>

                  )}
                  <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                    {equipo2_3 ? equipo2_3 : "Equipo"}
                  </div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-b-2 border-r-2 w-16 h-2"}`}></div>
                  )}
                </div>

                <div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-t-2 border-r-2 w-16 h-2"}`}></div>

                  )}
                  <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                    {equipo1_4 ? equipo1_4 : "Equipo"}
                  </div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-b-2 border-r-2 w-16 h-2"}`}></div>
                  )}
                </div>

                <div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-t-2 border-r-2 w-16 h-2"}`}></div>

                  )}
                  <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                    {equipo2_4 ? equipo2_4 : "Equipo"}
                  </div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-b-2 border-r-2 w-16 h-2"}`}></div>
                  )}
                </div>
              </div>
            )}
            {cuartosData.length > 0 && (
              <div className="space-y-[90px] mt-6">
                <div className="mt-6">
                  {semisData.length > 0 && (
                    <div className={`${cuartosData.length > 0 && octavosData == 0 ? "w-16 h-6 border-t-2 border-r-2 border-white" : "w-16 h-6 border-t-2 border-r-2 border-pblue"}`}></div>
                  )}
                  <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-sm">
                    {cuartos1_1 ? cuartos1_1 : "Equipo"}
                  </div>
                  {semisData.length > 0 && (
                    <div className={`${cuartosData.length > 0 && octavosData == 0 ? "w-16 h-6 border-t-2 border-r-2 border-white" : "w-16 h-6 border-b-2 border-r-2 border-pblue"}`}></div>
                  )}
                </div>
                <div>
                  {semisData.length > 0 && (
                    <div className={`${cuartosData.length > 0 && octavosData == 0 ? "w-16 h-6 border-t-2 border-r-2 border-white" : "w-16 h-6 border-t-2 border-r-2 border-pblue"}`}></div>
                  )}
                  <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-sm">
                    {cuartos2_1 ? cuartos2_1 : "Equipo"}
                  </div>
                  {semisData.length > 0 && (
                    <div className={`${cuartosData.length > 0 && octavosData == 0 ? "w-16 h-6 border-t-2 border-r-2 border-white" : "w-16 h-6 border-b-2 border-r-2 border-pblue"}`}></div>
                  )}
                </div>
                <div>
                  {semisData.length > 0 && (
                    <div className={`${cuartosData.length > 0 && octavosData == 0 ? "w-16 h-6 border-t-2 border-r-2 border-white" : "w-16 h-6 border-t-2 border-r-2 border-pblue"}`}></div>
                  )}
                  <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-sm">
                    {cuartos1_2 ? cuartos1_2 : "Equipo"}
                  </div>
                  {semisData.length > 0 && (
                    <div className={`${cuartosData.length > 0 && octavosData == 0 ? "w-16 h-6 border-t-2 border-r-2 border-white" : "w-16 h-6 border-b-2 border-r-2 border-pblue"}`}></div>
                  )}
                </div>
                <div>
                  {semisData.length > 0 && (
                    <div className={`${cuartosData.length > 0 && octavosData == 0 ? "w-16 h-6 border-t-2 border-r-2 border-white" : "w-16 h-6 border-t-2 border-r-2 border-pblue"}`}></div>
                  )}
                  <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-sm">
                    {cuartos2_2 ? cuartos2_2 : "Equipo"}
                  </div>
                  {semisData.length > 0 && (
                    <div className={`${cuartosData.length > 0 && octavosData == 0 ? "w-16 h-6 border-t-2 border-r-2 border-white" : "w-16 h-6 border-b-2 border-r-2 border-pblue"}`}></div>
                  )}
                </div>
              </div>
            )}
            {semisData.length > 0 && (
              <div className="space-y-[180px] mt-10">
                <div>
                  {finalData.length > 0 && (
                    <div className={`${semisData.length > 0 && cuartosData == 0 ? "mt-14 w-16 h-16 border-t-2 border-r-2 border-white" : "mt-14 w-16 h-16 border-t-2 border-r-2 border-plightgreen"}`}></div>
                  )}
                  <div className="bg-plightblue text-white p-2 rounded-lg text-center text-sm">
                    {semis1_1 ? semis1_1 : "Equipo"}
                  </div>
                  {finalData.length > 0 && (
                    <div className={`${semisData.length > 0 && cuartosData == 0 ? "w-16 h-16 border-t-2 border-r-2 border-white" : "w-16 h-16 border-b-2 border-r-2 border-plightgreen"}`}></div>
                  )}
                </div>
                <div>
                  {finalData.length > 0 && (
                    <div className={`${semisData.length > 0 && cuartosData == 0 ? "mt-14 w-16 h-16 border-t-2 border-r-2 border-white" : "mt-14 w-16 h-16 border-t-2 border-r-2 border-plightgreen"}`}></div>
                  )}
                  <div className="bg-plightblue text-white p-2 rounded-lg text-center text-sm">
                    {semis2_1 ? semis2_1 : "Equipo"}
                  </div>
                  {finalData.length > 0 && (
                    <div className={`${semisData.length > 0 && cuartosData == 0 ? "w-16 h-16 border-t-2 border-r-2 border-white" : "w-16 h-16 border-b-2 border-r-2 border-plightgreen"}`}></div>
                  )}
                </div>
              </div>
            )}
            {finalData.length > 0 && (
              <div className="mt-[180px]">
                <div className={`${finalData.length > 0 && semisData == 0 ? "w-16 h-[145px] border-t-2 border-r-2 border-white" : "w-16 h-[145px] border-t-2 border-r-2 border-plightblue"}`}></div>
                <div className="bg-pgreen text-white p-2 rounded-lg text-center text-sm">
                  {final_1 ? final_1 : "Equipo"}
                </div>
                <div className={`${finalData.length > 0 && semisData == 0 ? "w-16 h-[160px] border-b-2 border-r-2 border-white" : "w-16 h-[160px] border-b-2 border-r-2 border-plightblue"}`}></div>
              </div>
            )}

          </div>
          <div className="flex flex-col items-center m-4">
            <div className="font-inter font-bold text-pgrey text-xs">
              CAMPEON
            </div>
            <img src={copa} alt="copa" className=" mb-5" />
            <img src={otp} alt="otp" className=" mt-5" />
          </div>
          <div
            className={`grid ${existeDieciseisavos
              ? "grid-cols-5"
              : octavosData.length > 0
                ? "grid-cols-4"
                : cuartosData.length > 0
                  ? "grid-cols-3"
                  : semisData.length > 0
                    ? "grid-cols-2"
                    : "grid-cols-1"
              } min-w-[600px]`}
          >
            {finalData.length > 0 && (
              <div className="mt-[180px]">
                <div className={`${finalData.length > 0 && semisData == 0 ? "w-16 h-[145px] border-t-2 border-r-2 border-white" : `w-16 h-[145px] border-t-2 border-r-2 border-plightblue -scale-x-100 translate-x-[80px]`}`}></div>
                <div className="bg-pgreen text-white p-2 rounded-lg text-center text-sm">
                  {final_2 ? final_2 : "Equipo"}
                </div>
                <div className={`${finalData.length > 0 && semisData == 0 ? "w-16 h-[160px] border-b-2 border-r-2 border-white" : "w-16 h-[160px] border-b-2 border-r-2 border-plightblue -scale-x-100 translate-x-[80px]"}`}></div>
              </div>
            )}
            {semisData.length > 0 && (
              <div className="space-y-[180px] mt-10">
                <div>
                  {finalData.length > 0 && (
                    <div className={`${semisData.length > 0 && cuartosData == 0 ? "mt-14 w-16 h-16 border-t-2 border-r-2 border-white" : "mt-14 w-16 h-16 border-t-2 border-r-2 border-plightgreen -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                  <div className="bg-plightblue text-white p-2 rounded-lg text-center text-sm">
                    {semis1_1 ? semis1_1 : "Equipo"}
                  </div>
                  {finalData.length > 0 && (
                    <div className={`${semisData.length > 0 && cuartosData == 0 ? "w-16 h-16 border-t-2 border-r-2 border-white" : "w-16 h-16 border-b-2 border-r-2 border-plightgreen -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                </div>
                <div>
                  {finalData.length > 0 && (
                    <div className={`${semisData.length > 0 && cuartosData == 0 ? "mt-14 w-16 h-16 border-t-2 border-r-2 border-white" : "mt-14 w-16 h-16 border-t-2 border-r-2 border-plightgreen -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                  <div className="bg-plightblue text-white p-2 rounded-lg text-center text-sm z-20">
                    {semis2_1 ? semis2_1 : "Equipo"}
                  </div>
                  {finalData.length > 0 && (
                    <div className={`${semisData.length > 0 && cuartosData == 0 ? "w-16 h-16 border-t-2 border-r-2 border-white" : "w-16 h-16 border-b-2 border-r-2 border-plightgreen -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                </div>
              </div>
            )}
            {cuartosData.length > 0 && (
              <div className="space-y-[90px] mt-6">
                <div className="mt-6">
                  {semisData.length > 0 && (
                    <div className={`${cuartosData.length > 0 && octavosData == 0 ? "w-16 h-6 border-t-2 border-r-2 border-white" : "w-16 h-6 border-t-2 border-r-2 border-pblue -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                  <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-sm">
                    {cuartos1_1 ? cuartos1_1 : "Equipo"}
                  </div>
                  {semisData.length > 0 && (
                    <div className={`${cuartosData.length > 0 && octavosData == 0 ? "w-16 h-6 border-t-2 border-r-2 border-white" : "w-16 h-6 border-b-2 border-r-2 border-pblue -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                </div>
                <div>
                  {semisData.length > 0 && (
                    <div className={`${cuartosData.length > 0 && octavosData == 0 ? "w-16 h-6 border-t-2 border-r-2 border-white" : "w-16 h-6 border-t-2 border-r-2 border-pblue -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                  <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-sm">
                    {cuartos2_1 ? cuartos2_1 : "Equipo"}
                  </div>
                  {semisData.length > 0 && (
                    <div className={`${cuartosData.length > 0 && octavosData == 0 ? "w-16 h-6 border-t-2 border-r-2 border-white" : "w-16 h-6 border-b-2 border-r-2 border-pblue -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                </div>
                <div>
                  {semisData.length > 0 && (
                    <div className={`${cuartosData.length > 0 && octavosData == 0 ? "w-16 h-6 border-t-2 border-r-2 border-white" : "w-16 h-6 border-t-2 border-r-2 border-pblue -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                  <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-sm">
                    {cuartos1_2 ? cuartos1_2 : "Equipo"}
                  </div>
                  {semisData.length > 0 && (
                    <div className={`${cuartosData.length > 0 && octavosData == 0 ? "w-16 h-6 border-t-2 border-r-2 border-white" : "w-16 h-6 border-b-2 border-r-2 border-pblue -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                </div>
                <div>
                  {semisData.length > 0 && (
                    <div className={`${cuartosData.length > 0 && octavosData == 0 ? "w-16 h-6 border-t-2 border-r-2 border-white" : "w-16 h-6 border-t-2 border-r-2 border-pblue -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                  <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-sm">
                    {cuartos2_2 ? cuartos2_2 : "Equipo"}
                  </div>
                  {semisData.length > 0 && (
                    <div className={`${cuartosData.length > 0 && octavosData == 0 ? "w-16 h-6 border-t-2 border-r-2 border-white" : "w-16 h-6 border-b-2 border-r-2 border-pblue -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                </div>
              </div>
            )}
            {octavosData.length > 0 && (
              <div className="space-y-[36px] mt-3">
                <div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-t-2 border-r-2 w-16 h-2 -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                  <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                    {equipo1_1 ? equipo1_1 : "Equipo"}
                  </div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-b-2 border-r-2 w-16 h-2 -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                </div>
                <div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-t-2 border-r-2 w-16 h-2 -scale-x-100 translate-x-[57px]"}`}></div>

                  )}
                  <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                    {equipo2_1 ? equipo2_1 : "Equipo"}
                  </div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-b-2 border-r-2 w-16 h-2 -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                </div>

                <div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-t-2 border-r-2 w-16 h-2 -scale-x-100 translate-x-[57px]"}`}></div>

                  )}
                  <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                    {equipo1_2 ? equipo1_2 : "Equipo"}
                  </div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-b-2 border-r-2 w-16 h-2 -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                </div>

                <div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-t-2 border-r-2 w-16 h-2 -scale-x-100 translate-x-[57px]"}`}></div>

                  )}
                  <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                    {equipo2_2 ? equipo2_2 : "Equipo"}
                  </div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-b-2 border-r-2 w-16 h-2 -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                </div>

                <div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-t-2 border-r-2 w-16 h-2 -scale-x-100 translate-x-[57px]"}`}></div>

                  )}
                  <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                    {equipo1_3 ? equipo1_3 : "Equipo"}
                  </div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-b-2 border-r-2 w-16 h-2 -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                </div>

                <div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-t-2 border-r-2 w-16 h-2 -scale-x-100 translate-x-[57px]"}`}></div>

                  )}
                  <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                    {equipo2_3 ? equipo2_3 : "Equipo"}
                  </div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-b-2 border-r-2 w-16 h-2 -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                </div>

                <div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-t-2 border-r-2 w-16 h-2 -scale-x-100 translate-x-[57px]"}`}></div>

                  )}
                  <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                    {equipo1_4 ? equipo1_4 : "Equipo"}
                  </div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-b-2 border-r-2 w-16 h-2 -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                </div>

                <div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-t-2 border-r-2 w-16 h-2 -scale-x-100 translate-x-[57px]"}`}></div>

                  )}
                  <div className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                    {equipo2_4 ? equipo2_4 : "Equipo"}
                  </div>
                  {cuartosData.length > 0 && (
                    <div className={`${octavosData.length > 0 && dieciseisavosData == 0 ? "border-r-2 border-t-2 w-16 h-2 border-white " : "border-green-300 border-b-2 border-r-2 w-16 h-2 -scale-x-100 translate-x-[57px]"}`}></div>
                  )}
                </div>
              </div>
            )}
            {dieciseisavosData.length > 0 && (
              <div className="space-y-2">
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos1_1 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos2_1 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos1_2 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos2_2 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos1_3 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos2_3 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos1_4 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos2_4 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos1_5 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos2_5 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos1_6 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos2_6 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos1_7 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos2_7 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos1_8 || "Equipo"}
                  </div>
                </div>
                <div>
                  <div className="bg-green-400 text-white p-2 rounded-lg text-center text-sm">
                    {dieciseisavos2_8 || "Equipo"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaPlayoff;
