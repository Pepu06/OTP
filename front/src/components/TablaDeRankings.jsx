import { useState } from "react";

const TablaDeRankings = () => {
  const [rankings, setRankings] = useState(
    Array(10).fill({
      ranking: "RANKING",
      id: "ID",
      nombre: "NOMBRE",
    })
  );

  const renderRankingsTable = () => (
    <div className="relative overflow-x-auto w-full items-center">
      <h1 className="flex text-pblue justify-center font-daysone text-4xl mb-3">
        Rankings
      </h1>

      <div className="flex justify-center mt-8">
        <div className="rounded-lg overflow-hidden w-[800px]">
          <div className="flex justify-start mb-3">
            <input
              className="border border-pgrey w-52 placeholder:text-center placeholder:text-pgrey rounded-lg"
              type="text"
              placeholder="Buscar"
            />
          </div>
          <div
            className="overflow-y-auto rounded-lg border"
            style={{ maxHeight: "300px" }}
          >
            <table className="w-full text-base text-gray-500">
              <tbody>
                {rankings.map((row, index) => (
                  <tr
                    key={index}
                    className="bg-white flex border-b text-pgrey hover:bg-gray-100"
                  >
                    <td className="flex-1 px-4 py-4">{row.ranking}</td>
                    <td className="flex-1 px-4 py-4 text-left">{row.nombre}</td>
                  </tr>
                ))}
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
