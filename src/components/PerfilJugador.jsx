import TablaDeRankings from "./TablaDeRankings";

const PerfilJugador = () => {
  const scrollToTable = () => {
    const element = document.getElementById("Tabla");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative p-4">
      {/* Contenedor del perfil */}
      <div className="absolute h-[409px] top-16 left-0 w-1/5 ml-16 mr-16 bg-white p-4 rounded-lg shadow-md z-20">
        <div className="text-center">
          <div className="bg-green-200 rounded-full w-40 h-40 mx-auto mb-4 mt-1"></div>
          <div className="w-50 h-24 bg-[#D9D9D9] flex flex-col items-center justify-center text-center text-[#373B3A] mb-1">
            <h2 className="text-xs font-inter font-semibold">Categoria</h2>
            <p className="text-3xl font-inter font-bold">Masculino</p>
          </div>
          <div className="w-50 h-24 bg-[#D9D9D9] flex flex-col items-center justify-center text-center text-[#373B3A]">
            <h2 className="text-xs font-inter font-semibold">Ranking</h2>
            <p className="text-3xl font-inter font-bold">20000</p>
          </div>
        </div>
      </div>

      {/* Contenedor azul */}
      <div className="bg-pdarkblue text-white flex justify-between items-end py-8 px-4 z-10">
        <p className="ml-96 font-inter font-bold text-2xl">5° Matias Garcia</p>
        <button
          onClick={scrollToTable}
          className="bg-white text-black mr-5 px-4 py-2 rounded-lg"
        >
          Tabla de Rankings
        </button>
      </div>

      {/* Main Content */}
      <div className="">
        <div className="flex ml-96">
          {/* Estadísticas y Recorrido */}
          <div className="flex-grow p-4">
            <div className="flex space-x-8">
              {/* Estadísticas */}
              <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">ESTADÍSTICAS</h2>
                <ul>
                  <li className="flex justify-between border-b py-2">
                    <span>Competiciones jugadas</span> <span>4</span>
                  </li>
                  <li className="flex justify-between border-b py-2">
                    <span>Última pareja</span> <span>Rodrigo</span>
                  </li>
                  <li className="flex justify-between border-b py-2">
                    <span>Último resultado</span> <span>Cuartos de final</span>
                  </li>
                  <li className="flex justify-between border-b py-2">
                    <span>Cuartos de final</span> <span>2</span>
                  </li>
                  <li className="flex justify-between border-b py-2">
                    <span>Semifinales</span> <span>1</span>
                  </li>
                  <li className="flex justify-between border-b py-2">
                    <span>Finales</span> <span>0</span>
                  </li>
                </ul>
              </div>

              {/* Recorrido */}
              <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">RECORRIDO</h2>
                <ul>
                  <li className="flex justify-between border-b py-2">
                    <span>Partidos jugados</span> <span>14</span>
                  </li>
                  <li className="flex justify-between border-b py-2">
                    <span>Partidos Ganados</span> <span>8</span>
                  </li>
                  <li className="flex justify-between border-b py-2">
                    <span>Efectividad</span> <span>57%</span>
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
              <tr>
                <td className="border-t p-2">Torneo</td>
                <td className="border-t p-2">
                  TORNEO ANIVERSARIO PADEL LOS VILLARES
                </td>
                <td className="border-t p-2">16/11/2023</td>
                <td className="border-t p-2">Rodrigo</td>
                <td className="border-t p-2">6° Masculina</td>
                <td className="border-t p-2">Cuartos de final</td>
              </tr>
              <tr>
                <td className="border-t p-2">Torneo</td>
                <td className="border-t p-2">ANDES PADEL CLUB</td>
                <td className="border-t p-2">30/08/2023</td>
                <td className="border-t p-2">Rodrigo</td>
                <td className="border-t p-2">5° Masculina</td>
                <td className="border-t p-2">Finalista</td>
              </tr>
              <tr>
                <td className="border-t p-2">Torneo</td>
                <td className="border-t p-2">TORNEO ANIVERSARIO</td>
                <td className="border-t p-2">23/03/2023</td>
                <td className="border-t p-2">Nell Thomas</td>
                <td className="border-t p-2">6° Masculina</td>
                <td className="border-t p-2">Semifinal</td>
              </tr>
              <tr>
                <td className="border-t p-2">Torneo</td>
                <td className="border-t p-2">Torneo Club Padel San Esteban</td>
                <td className="border-t p-2">08/02/2023</td>
                <td className="border-t p-2">Nell</td>
                <td className="border-t p-2">5° Masculina</td>
                <td className="border-t p-2">Terceros</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="Tabla" className="flex flex-col p-4">
        <TablaDeRankings />
      </div>
    </div>
  );
};

export default PerfilJugador;
