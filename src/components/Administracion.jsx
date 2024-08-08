import React, {useState} from "react";

const Administracion = () => {
  // Estado para filas de datos
  const [rows, setRows] = useState(
    Array(9).fill({
      categoria: "Categoria",
      fecha: "Fecha",
      club: "Club",
    })
  );

  // Estado para manejar la edición
  const [editIndex, setEditIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});

  // Maneja el cambio en el input de búsqueda
  const handleChange = (e, field) => {
    setEditedRow({ ...editedRow, [field]: e.target.value });
  };

  // Maneja la activación del modo edición
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedRow(rows[index]);
  };

  // Maneja la confirmación de la edición
  const handleSave = () => {
    const updatedRows = rows.map((row, index) =>
      index === editIndex ? editedRow : row
    );
    setRows(updatedRows);
    setEditIndex(null);
    setEditedRow({});
  };

  // Maneja la eliminación de una fila
  const handleDelete = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <div className="flex flex-col p-4">
      <div className="text-5xl text-center text-pblue mt-10 mb-8 flex justify-center">
        <span className="font-poppins font-extrabold">A</span>
        <span className="font-daysone font-normal">dministracion</span>
      </div>
      <div className="flex justify-between">
        {/* Sección Torneos */}
        <div className="relative overflow-x-auto" style={{ maxWidth: "50%" }}>
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
            <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
              <table className="w-full text-base text-left rtl:text-right text-gray-500">
                <tbody>
                  {rows.map((row, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b text-pgrey hover:bg-gray-100"
                    >
                      <th
                        scope="row"
                        className="px-14 py-4 font-medium whitespace-nowrap"
                      >
                        {row.categoria}
                      </th>
                      <td className="px-14 py-4">{row.fecha}</td>
                      <td className="px-14 pr-20 py-4">{row.club}</td>
                      <td className="px-2 py-4 text-right">
                        <a
                          href="#"
                          className="font-medium text-blue-600 hover:underline"
                        >
                          Editar
                        </a>
                      </td>
                      <td className="px-3 py-4 text-right">
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

        {/* Sección Partidos */}
        <div className="relative overflow-x-auto" style={{ maxWidth: "50%" }}>
          <h1 className="flex text-pgreen justify-center font-daysone text-4xl mb-3">
            Partidos
          </h1>
          <div className="flex justify-start mb-3">
            <input
              className="border border-pgrey w-52 placeholder:text-center placeholder:text-pgrey rounded-lg"
              type="text"
              placeholder="Buscar"
            />
          </div>
          <div className="rounded-lg border overflow-hidden">
            <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
              <table className="w-full text-base text-left rtl:text-right text-gray-500">
                <tbody>
                  {rows.map((row, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b text-pgrey hover:bg-gray-100"
                    >
                      <th
                        scope="row"
                        className="px-14 py-4 font-medium whitespace-nowrap"
                      >
                        {row.categoria}
                      </th>
                      <td className="px-14 py-4">{row.fecha}</td>
                      <td className="px-14 pr-20 py-4">{row.club}</td>
                      <td className="px-2 py-4 text-right">
                        <a
                          href="#"
                          className="font-medium text-blue-600 hover:underline"
                        >
                          Editar
                        </a>
                      </td>
                      <td className="px-3 py-4 text-right">
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
      </div>
      {/* Botones */}
      <div className="flex flex-col items-center mt-8">
        <button className=" m-2 w-32 px-5 py-2 bg-pgreen text-white rounded-lg font-medium font-poppins">
          Editar
        </button>
        <button className=" m-2 w-32 px-5 py-2 bg-pgreen text-white rounded-lg font-medium font-poppins">
          Agregar
        </button>
      </div>
      {/* Seccion Torneos */}
      <div className="flex flex-col justify-center items-center mx-auto my-auto" style={{ maxWidth: "50%" }}>
          <h1 className="flex text-pgreen justify-center font-daysone text-4xl mb-3">Jugadores</h1>
          <div className="w-full mb-3">
            <input
              className="border border-pgrey w-52 placeholder:text-center placeholder:text-pgrey rounded-lg"
              type="text"
              placeholder="Buscar"
            />
          </div>
          <div className="rounded-lg border overflow-hidden w-full">
            <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
              <table className="w-full text-base text-left rtl:text-right text-gray-500">
                <tbody>
                  {rows.map((row, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b text-pgrey hover:bg-gray-100"
                    >
                      <th
                        scope="row"
                        className="px-14 py-4 font-medium whitespace-nowrap"
                      >
                        {editIndex === index ? (
                          <input
                            type="text"
                            value={editedRow.categoria || ""}
                            onChange={(e) => handleChange(e, 'categoria')}
                            className="border border-pgrey rounded-lg px-2 py-1 max-w-24"
                          />
                        ) : (
                          row.categoria
                        )}
                      </th>
                      <td className="px-14 py-4">
                        {editIndex === index ? (
                          <input
                            type="text"
                            value={editedRow.fecha || ""}
                            onChange={(e) => handleChange(e, 'fecha')}
                            className="border border-pgrey rounded-lg px-2 py-1 max-w-24"
                          />
                        ) : (
                          row.fecha
                        )}
                      </td>
                      <td className="px-14 pr-20 py-4">
                        {editIndex === index ? (
                          <input
                            type="text"
                            value={editedRow.club || ""}
                            onChange={(e) => handleChange(e, 'club')}
                            className="border border-pgrey rounded-lg px-2 py-1 max-w-24"
                          />
                        ) : (
                          row.club
                        )}
                      </td>
                      <td className="px-2 py-4 text-right">
                        {editIndex === index ? (
                          <button
                            onClick={handleSave}
                            className="font-medium text-blue-600 hover:underline"
                          >
                            Guardar
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(index)}
                            className="font-medium text-blue-600 hover:underline"
                          >
                            Editar
                          </button>
                        )}
                      </td>
                      <td className="px-3 py-4 text-right">
                        <button
                          onClick={() => handleDelete(index)}
                          className="font-medium text-red-600 hover:underline"
                        >
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>


    </div>
  );
};

export default Administracion;
