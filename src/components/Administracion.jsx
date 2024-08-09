import { useState } from "react";

const Administracion = () => {
  // Estados separados para cada tabla
  const [torneos, setTorneos] = useState(
    Array(9).fill({ categoria: "Categoria", fecha: "Fecha", club: "Club" })
  );
  const [partidos, setPartidos] = useState(
    Array(9).fill({ categoria: "Categoria", fecha: "Fecha", club: "Club" })
  );
  const [jugadores, setJugadores] = useState(
    Array(9).fill({ categoria: "Categoria", fecha: "Fecha", club: "Club" })
  );

  const [editIndex, setEditIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [editingTable, setEditingTable] = useState("");

  const handleChange = (e, field) => {
    setEditedRow({ ...editedRow, [field]: e.target.value });
  };

  const handleEdit = (index, table) => {
    setEditIndex(index);
    setEditingTable(table);
    setEditedRow(
      table === "torneos"
        ? torneos[index]
        : table === "partidos"
        ? partidos[index]
        : jugadores[index]
    );
  };

  const handleSave = () => {
    const updateTable = (table, setTable) => {
      const updatedRows = table.map((row, index) =>
        index === editIndex ? editedRow : row
      );
      setTable(updatedRows);
    };

    switch (editingTable) {
      case "torneos":
        updateTable(torneos, setTorneos);
        break;
      case "partidos":
        updateTable(partidos, setPartidos);
        break;
      case "jugadores":
        updateTable(jugadores, setJugadores);
        break;
      default:
        break;
    }

    setEditIndex(null);
    setEditedRow({});
    setEditingTable("");
  };

  const handleDelete = (index, rows, setRows) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const renderTable = (rows, setRows, tableName) => (
    <div className="relative overflow-x-auto w-full">
      <h1 className="flex text-pgreen justify-center font-daysone text-4xl mb-3">
        {tableName}
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
                    {editIndex === index && editingTable === tableName ? (
                      <input
                        type="text"
                        value={editedRow.categoria || ""}
                        onChange={(e) => handleChange(e, "categoria")}
                        className="border border-pgrey rounded-lg px-2 py-1 max-w-24"
                      />
                    ) : (
                      row.categoria
                    )}
                  </th>
                  <td className="px-14 py-4">
                    {editIndex === index && editingTable === tableName ? (
                      <input
                        type="text"
                        value={editedRow.fecha || ""}
                        onChange={(e) => handleChange(e, "fecha")}
                        className="border border-pgrey rounded-lg px-2 py-1 max-w-24"
                      />
                    ) : (
                      row.fecha
                    )}
                  </td>
                  <td className="px-14 pr-20 py-4">
                    {editIndex === index && editingTable === tableName ? (
                      <input
                        type="text"
                        value={editedRow.club || ""}
                        onChange={(e) => handleChange(e, "club")}
                        className="border border-pgrey rounded-lg px-2 py-1 max-w-24"
                      />
                    ) : (
                      row.club
                    )}
                  </td>
                  <td className="px-2 py-4 text-right">
                    {editIndex === index && editingTable === tableName ? (
                      <button
                        onClick={handleSave}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Guardar
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(index, tableName)}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Editar
                      </button>
                    )}
                  </td>
                  <td className="px-3 py-4 text-right">
                    <button
                      onClick={() => handleDelete(index, rows, setRows)}
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
  );

  return (
    <div className="flex flex-col p-4">
      <div className="text-5xl text-center text-pblue mt-10 mb-8 flex justify-center">
        <span className="font-poppins font-extrabold">A</span>
        <span className="font-daysone font-normal">dministracion</span>
      </div>
      <div className="flex justify-between">
        <div className="w-[50%] m-1">
          {renderTable(torneos, setTorneos, "Torneos")}
        </div>
        <div className="w-[50%] m-1">
          {renderTable(partidos, setPartidos, "Partidos")}
        </div>
      </div>
      {/* Botones */}
      <div className="flex flex-col items-center mt-8">
        <button className="m-2 w-32 px-5 py-2 bg-pgreen text-white rounded-lg font-medium font-poppins">
          Editar
        </button>
        <button className="m-2 w-32 px-5 py-2 bg-pgreen text-white rounded-lg font-medium font-poppins">
          Agregar
        </button>
      </div>
      <div className="flex justify-center mt-8 w-full">
        <div className="w-full" style={{ maxWidth: "50%" }}>
          {renderTable(jugadores, setJugadores, "Jugadores")}
        </div>
      </div>
    </div>
  );
};

export default Administracion;
