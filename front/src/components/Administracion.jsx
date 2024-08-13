import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";

const Administracion = () => {
  const [torneos, setTorneos] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [jugadores, setJugadores] = useState([]);

  const [searchTermTorneos, setSearchTermTorneos] = useState("");
  const [searchTermPartidos, setSearchTermPartidos] = useState("");
  const [searchTermJugadores, setSearchTermJugadores] = useState("");

  const [editIndex, setEditIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [editingTable, setEditingTable] = useState("");

  // Cargar datos iniciales desde los archivos CSV al montar el componente
  useEffect(() => {
    const loadCSVData = async () => {
      try {
        // Cargar torneos.csv
        const torneosData = await fetchCSVData("/torneos.csv");
        console.log("Torneos Data:", torneosData);
        setTorneos(torneosData);

        // Cargar partidos.csv
        const partidosData = await fetchCSVData("/partidos.csv");
        console.log("Partidos Data:", partidosData);
        setPartidos(partidosData);

        // Cargar jugadores.csv
        const jugadoresData = await fetchCSVData("/jugadores.csv");
        console.log("Jugadores Data:", jugadoresData);
        setJugadores(jugadoresData);
      } catch (error) {
        console.error("Error al cargar los datos iniciales:", error);
      }
    };

    loadCSVData();
  }, []);

  const fetchCSVData = (fileName) => {
    return new Promise((resolve, reject) => {
      fetch(fileName)
        .then((response) => response.text())
        .then((text) => {
          Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            transformHeader: (header) => header.trim(),
            transform: (value) => (value ? value.trim() : value),
            complete: (result) => resolve(result.data),
            error: (error) => reject(error),
          });
        })
        .catch((error) => reject(error));
    });
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
        index === editIndex ? { ...row, ...editedRow } : row
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

  const handleDelete = (index, table, setTable) => {
    const updatedRows = table.filter((_, i) => i !== index);
    setTable(updatedRows);
  };

  const handleSearchChange = (e, tableName) => {
    const value = e.target.value;
    switch (tableName) {
      case "torneos":
        setSearchTermTorneos(value);
        break;
      case "partidos":
        setSearchTermPartidos(value);
        break;
      case "jugadores":
        setSearchTermJugadores(value);
        break;
      default:
        break;
    }
  };

  const filteredRows = (rows, searchTerm, tableName) => {
    if (!searchTerm) return rows;

    switch (tableName) {
      case "torneos":
        return rows.filter(
          (row) =>
            row.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (row.ID || "").toString().includes(searchTerm)
        );
      case "partidos":
        return rows.filter((row) =>
          (row.IDTorneo || "").toString().includes(searchTerm)
        );
      case "jugadores":
        return rows.filter(
          (row) =>
            (row.ID || "").toString().includes(searchTerm) ||
            (row.Nombre || "").toLowerCase().includes(searchTerm.toLowerCase())
        );
      default:
        return rows;
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const renderTable = (rows, setRows, tableName, searchTerm) => {
    const columns = {
      torneos: ["ID", "Nombre", "Categoria", "Fecha", "Club"],
      partidos: ["IDTorneo", "Instancia", "Equipo1", "Resultado", "Equipo2"],
      jugadores: ["ID", "Nombre", "Ranking"],
    }[tableName];

    return (
      <div className="relative overflow-x-auto w-full">
        <h1 className="flex text-pgreen justify-center font-daysone text-4xl mb-3">
          {capitalizeFirstLetter(tableName)}
        </h1>
        <div className="flex justify-start mb-3">
          <input
            className="border text-center border-pgrey w-52 placeholder:text-center placeholder:text-sm placeholder:text-pgrey rounded-lg"
            type="text"
            placeholder={
              tableName === "torneos"
                ? "Buscar por ID/Nombre"
                : tableName === "partidos"
                ? "Buscar por IDTorneo"
                : "Buscar por ID/Nombre"
            }
            value={searchTerm}
            onChange={(e) => handleSearchChange(e, tableName)}
            onClick={(e) => (e.target.placeholder = "")}
            onBlur={(e) =>
              (e.target.placeholder = `Buscar ${capitalizeFirstLetter(
                tableName
              )}`)
            }
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
                {filteredRows(rows, searchTerm, tableName).map((row, index) => (
                  <tr
                    key={index}
                    className={`bg-white border-b text-pgrey ${
                      tableName === "partidos"
                        ? "hover:bg-gray-100"
                        : "hover:bg-gray-100"
                    }`}
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
                          row[column] || ""
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
                        onClick={() => handleDelete(index, tableName, setRows)}
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

      <div className="flex flex-col sm:flex-row items-center sm:justify-between">
        <div className="w-full sm:w-[50%] m-1">
          {renderTable(
            torneos,
            setTorneos,
            "torneos",
            searchTermTorneos,
            setSearchTermTorneos
          )}
        </div>
        <div className="w-full sm:w-[50%] sm:mt-0 mt-5 m-1">
          {renderTable(
            partidos,
            setPartidos,
            "partidos",
            searchTermPartidos,
            setSearchTermPartidos
          )}
        </div>
      </div>

      <div className="flex justify-center mt-8 w-full">
        <div className="w-full sm:max-w-[50%]">
          {renderTable(
            jugadores,
            setJugadores,
            "jugadores",
            searchTermJugadores,
            setSearchTermJugadores
          )}
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
