import { useState } from "react";
import * as XLSX from "xlsx";

const Administracion = () => {
  // Estados separados para cada tabla
  const [torneos, setTorneos] = useState(
    Array(9).fill({ categoria: "Categoria", fecha: "Fecha", club: "Club" })
  );
  const [partidos, setPartidos] = useState(
    Array(9).fill({
      instancia: "Instancia",
      equipo1: "Nombre del Equipo 1",
      resultado: "Resultado",
      equipo2: "Nombre del Equipo 2",
    })
  );
  const [jugadores, setJugadores] = useState(
    Array(9).fill({ id: "ID", nombre: "Nombre", ranking: "Ranking" })
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
      case "Torneos":
        updateTable(torneos, setTorneos);
        break;
      case "Partidos":
        updateTable(partidos, setPartidos);
        break;
      case "Jugadores":
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        console.log(`Datos leídos de la hoja ${sheetName}:`, jsonData);

        if (sheetName.toLowerCase() === "torneos") {
          setTorneos(jsonData);
        } else if (sheetName.toLowerCase() === "partidos") {
          setPartidos(jsonData);
        } else if (sheetName.toLowerCase() === "jugadores") {
          setJugadores(jsonData);
        }
      });
    };

    reader.readAsArrayBuffer(file);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const renderTable = (rows, setRows, tableName) => {
    console.log("Datos para " + tableName + ":", rows); // Verificar datos

    const columns = {
      torneos: ["Categoria", "Fecha", "Club"],
      partidos: ["Instancia", "Equipo1", "Resultado", "Equipo2"],
      jugadores: ["ID", "Nombre", "Ranking"],
    }[tableName];

    return (
      <div className="relative overflow-x-auto w-full">
        <h1 className="flex text-pgreen justify-center font-daysone text-4xl mb-3">
          {capitalizeFirstLetter(tableName)}
        </h1>
        <div className="flex justify-start mb-3">
          <input
            className="border text-center border-pgrey w-52 placeholder:text-center placeholder:text-pgrey rounded-lg"
            type="text"
            placeholder="Buscar"
            onClick={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Buscar")}
          />
        </div>
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
            <table className="w-full text-base text-left rtl:text-right text-gray-500">
              <thead>
                <tr>
                  {columns.map((col, idx) => (
                    <th key={idx} className="px-5 py-2 text-left bg-gray-200">
                      {capitalizeFirstLetter(col)}
                    </th>
                  ))}
                  <th className="px-2 py-2 text-right bg-gray-200">Editar</th>
                  <th className="px-3 py-2 text-right bg-gray-200">Borrar</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b text-pgrey hover:bg-gray-100"
                  >
                    {columns.map((column, i) => (
                      <td key={i} className="px-5 py-4">
                        {editIndex === index && editingTable === tableName ? (
                          <input
                            type="text"
                            value={editedRow[column] || ""}
                            onChange={(e) => handleChange(e, column)}
                            className="border border-pgrey rounded-lg px-2 py-1 max-w-24"
                          />
                        ) : (
                          row[column]
                        )}
                      </td>
                    ))}
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
  };

  return (
    <div className="flex flex-col p-4">
      <div className="text-5xl text-center text-pblue mt-10 mb-8 flex justify-center">
        <span className="font-poppins font-extrabold">A</span>
        <span className="font-daysone font-normal">dministracion</span>
      </div>
      <input
        type="file"
        accept=".xlsx, .xls"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

      <div className="flex justify-between">
        <div className="w-[50%] m-1">
          {renderTable(torneos, setTorneos, "torneos")}
        </div>
        <div className="w-[50%] m-1">
          {renderTable(partidos, setPartidos, "partidos")}
        </div>
      </div>

      <div className="flex justify-center mt-8 w-full">
        <div className="w-full" style={{ maxWidth: "50%" }}>
          {renderTable(jugadores, setJugadores, "jugadores")}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="m-2 w-auto px-5 py-2 bg-pgreen hover:bg-green-600 text-white rounded-lg font-medium font-poppins"
          onClick={() => document.getElementById("fileInput").click()}
        >
          Cargar Archivo
        </button>
      </div>
    </div>
  );
};

export default Administracion;
