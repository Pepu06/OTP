import { useState, useEffect } from "react";

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

  // Cargar datos iniciales desde el backend
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/process");
        const result = await response.json();
        const { data: sheetsData } = result;

        if (sheetsData) {
          setTorneos(sheetsData.torneos || []);
          setPartidos(sheetsData.partidos || []);
          setJugadores(sheetsData.jugadores || []);
        } else {
          console.error("Error: sheetsData is undefined");
        }
      } catch (error) {
        console.error("Error al cargar los datos iniciales:", error);
      }
    };

    loadInitialData();
  }, []);

  // Manejar la carga de archivos
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(() => fetch("http://127.0.0.1:5000/process"))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const { data: sheetsData } = data;
        if (sheetsData) {
          setTorneos(sheetsData.torneos || []);
          setPartidos(sheetsData.partidos || []);
          setJugadores(sheetsData.jugadores || []);
        } else {
          console.error("Error: sheetsData is undefined");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // Manejar cambios en las ediciones
  const handleChange = (e, field) => {
    setEditedRow((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Manejar edición
  const handleEdit = (index, table) => {
    setEditIndex(index);
    setEditingTable(table);
    const rowData = {
      torneos: torneos[index],
      partidos: partidos[index],
      jugadores: jugadores[index],
    }[table];
    setEditedRow(rowData || {});
  };

  // Guardar cambios
  const handleSave = () => {
    const updatedRows = (rows) =>
      rows.map((row, index) =>
        index === editIndex ? { ...row, ...editedRow } : row
      );

    const updatedTable = (rows, setRows) => {
      const updatedRowsData = updatedRows(rows);
      setRows(updatedRowsData);

      fetch("http://127.0.0.1:5000/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table: editingTable,
          rows: updatedRowsData,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error("Error updating data:", data.error);
          } else {
            console.log("Data updated successfully");
          }
        })
        .catch((error) => console.error("Error:", error));

      setEditIndex(null);
      setEditedRow({});
      setEditingTable("");
    };

    const tableActions = {
      torneos: () => updatedTable(torneos, setTorneos),
      partidos: () => updatedTable(partidos, setPartidos),
      jugadores: () => updatedTable(jugadores, setJugadores),
    };

    tableActions[editingTable]?.();
  };

  const handleDelete = (index, tableName) => {
    const tableData = {
      torneos: torneos,
      partidos: partidos,
      jugadores: jugadores,
    }[tableName];

    const updatedRows = tableData.filter((_, i) => i !== index);
    const setTable = {
      torneos: setTorneos,
      partidos: setPartidos,
      jugadores: setJugadores,
    }[tableName];

    setTable(updatedRows);

    fetch("http://127.0.0.1:5000/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        table: tableName,
        index: index,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error deleting data:", data.error);
        } else {
          console.log("Data deleted successfully");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // Manejar cambios en la búsqueda
  const handleSearchChange = (e, tableName) => {
    const value = e.target.value;
    const setSearchTerm = {
      torneos: setSearchTermTorneos,
      partidos: setSearchTermPartidos,
      jugadores: setSearchTermJugadores,
    }[tableName];
    setSearchTerm(value);
  };

  // Filtrar filas según el término de búsqueda
  const filteredRows = (rows, searchTerm, tableName) => {
    if (!searchTerm) return rows;

    const filters = {
      torneos: (row) =>
        row.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (row.ID || "").toString().includes(searchTerm),
      partidos: (row) => (row.IDTorneo || "").toString().includes(searchTerm),
      jugadores: (row) =>
        (row.ID || "").toString().includes(searchTerm) ||
        (row.Nombre || "").toLowerCase().includes(searchTerm.toLowerCase()),
    };

    return rows.filter(filters[tableName]);
  };

  // Capitalizar la primera letra
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  // Renderizar tabla
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
                {filteredRows(rows, searchTerm, tableName).map((row) => (
                  <tr
                    key={row.ID}
                    className={`bg-white border-b text-pgrey hover:bg-gray-100`}
                  >
                    {columns.map((column, i) => (
                      <td key={i} className="px-5 py-4">
                        {editIndex === row.ID && editingTable === tableName ? (
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
                      {editIndex === row.ID && editingTable === tableName ? (
                        <button
                          onClick={handleSave}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          Guardar
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(row.ID, tableName)}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          Editar
                        </button>
                      )}
                    </td>
                    <td className="px-3 py-4 text-right">
                      <button
                        onClick={() => handleDelete(row.ID, tableName)}
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
          {renderTable(torneos, setTorneos, "torneos", searchTermTorneos)}
        </div>
        <div className="w-full sm:w-[50%] sm:mt-0 mt-5 m-1">
          {renderTable(partidos, setPartidos, "partidos", searchTermPartidos)}
        </div>
      </div>
      <div className="flex justify-center mt-8 w-full">
        <div className="w-full sm:max-w-[50%]">
          {renderTable(
            jugadores,
            setJugadores,
            "jugadores",
            searchTermJugadores
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
