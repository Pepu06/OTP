import React from "react";

const Administracion = () => {
  // Array de filas de datos
  const rows = Array(4).fill({
    categoria: "Categoria",
    fecha: "Fecha",
    club: "Club",
  });

  return (
    <div className="flex flex-col p-4">
      <div className="text-5xl text-center text-pblue mt-10 mb-8 flex justify-center">
        <span className="font-poppins font-extrabold">A</span>
        <span className="font-daysone font-normal">dministracion</span>
      </div>
      <div className="flex justify-between">
        {/* Sección Torneos */}
        <div className="relative overflow-x-auto" style={{ maxWidth: "710px" }}>
          <h1 className="flex text-pgreen justify-center font-daysone text-4xl mb-3">
            Torneos
          </h1>
          <div className="flex justify-start mb-3">
            <input
              className="border border-pgrey w-52 placeholder:text-center placeholder:text-pgrey rounded-lg"
              type="text"
              placeholder="Buscar"
            />
          </div>
          <div className="rounded-lg overflow-hidden border">
            <table className="w-full text-base text-left rtl:text-right text-gray-500">
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b text-pgrey hover:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="px-16 py-4 font-medium whitespace-nowrap"
                    >
                      {row.categoria}
                    </th>
                    <td className="px-16 py-4">{row.fecha}</td>
                    <td className="px-16 pr-24 py-4">{row.club}</td>
                    <td className="px-3 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Editar
                      </a>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-red-600 hover:underline"
                      >
                        Borrar
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sección Partidos */}
        <div className="relative overflow-x-auto" style={{ maxWidth: "710px" }}>
          <h1 className="flex text-pgreen justify-center font-daysone text-4xl mb-3">
            Torneos
          </h1>
          <div className="flex justify-start mb-3">
            <input
              className="border border-pgrey w-52 placeholder:text-center placeholder:text-pgrey rounded-lg"
              type="text"
              placeholder="Buscar"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <table className="w-full text-base text-left rtl:text-right text-gray-500">
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b text-pgrey hover:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="px-16 py-4 font-medium whitespace-nowrap"
                    >
                      {row.categoria}
                    </th>
                    <td className="px-16 py-4">{row.fecha}</td>
                    <td className="px-16 pr-24 py-4">{row.club}</td>
                    <td className="px-3 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Editar
                      </a>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-red-600 hover:underline"
                      >
                        Borrar
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-8">
        <button className=" m-2 w-32 px-5 py-2 bg-pgreen text-white rounded-lg font-medium font-poppins">
          Editar
        </button>
        <button className=" m-2 w-32 px-5 py-2 bg-pgreen text-white rounded-lg font-medium font-poppins">
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Administracion;
