import { useState, useEffect } from "react";

const Administracion = () => {
  const [torneos, setTorneos] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [jugadores, setJugadores] = useState([]);

  const [searchTermTorneos, setSearchTermTorneos] = useState("");
  const [searchTermPartidos, setSearchTermPartidos] = useState("");
  const [searchTermJugadores, setSearchTermJugadores] = useState("");

  const [editingRow, setEditingRow] = useState(null);

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

  // Manejar la edición de filas
  const handleEdit = (tableName, rowId) => {
    setEditingRow({ tableName, rowId });
  };

  const handleSave = (tableName) => {
    const rows = { torneos, partidos, jugadores }[tableName];
    const updatedRow = rows.find((row) => row.ID === editingRow.rowId);

    fetch("http://127.0.0.1:5000/update_row", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ table: tableName, row: updatedRow }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setEditingRow(null);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = (tableName, rowId) => {
    fetch(`http://127.0.0.1:5000/delete_row`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        table: tableName,
        id: rowId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (tableName === "torneos") {
          // Si se elimina un torneo, también debes eliminar los partidos
          fetch(`http://127.0.0.1:5000/partidos/${rowId}`)
            .then((response) => response.json())
            .then((data) => {
              setPartidos((prevPartidos) =>
                prevPartidos.filter((row) => row.IDTorneo !== rowId)
              );
            })
            .catch((error) => console.error("Error fetching partidos:", error));
        }

        // Actualizar el estado para la tabla correspondiente
        const setRows = {
          torneos: setTorneos,
          partidos: setPartidos,
          jugadores: setJugadores,
        }[tableName];

        setRows((prevRows) => prevRows.filter((row) => row.ID !== rowId));
      })
      .catch((error) => console.error("Error:", error));
  };

  // Renderizar tabla
  const renderTable = (rows, setRows, tableName, searchTerm) => {
    const columns = {
      torneos: ["ID", "Nombre", "Categoria", "Fecha", "Club"],
      partidos: ["IDTorneo", "Instancia", "Equipo1", "Resultado", "Equipo2"],
      jugadores: ["ID", "Nombre", "Ranking"],
    }[tableName];

    const handleKeyDown = (e, tableName) => {
      if (e.key === "Enter") {
        handleSave(tableName);
      }
    };

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
                  <th className="px-20 py-2 text-center bg-gray-200"></th>
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
                        {editingRow &&
                        editingRow.tableName === tableName &&
                        editingRow.rowId === row.ID ? (
                          <input
                            type="text"
                            value={row[column] || ""}
                            onChange={(e) => {
                              const updatedRows = rows.map((r) =>
                                r.ID === row.ID
                                  ? { ...r, [column]: e.target.value }
                                  : r
                              );
                              setRows(updatedRows);
                            }}
                            onKeyDown={(e) => handleKeyDown(e, tableName)}
                          />
                        ) : (
                          row[column] || ""
                        )}
                      </td>
                    ))}
                    <td className="px-5 text-center py-4">
                      {editingRow &&
                      editingRow.tableName === tableName &&
                      editingRow.rowId === row.ID ? (
                        <>
                          <button
                            className="text-green-600 hover:text-green-800"
                            onClick={() => handleSave(tableName)}
                          >
                            Guardar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => handleEdit(tableName, row.ID)}
                          >
                            Editar
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800 ml-4"
                            onClick={() => handleDelete(tableName, row.ID)}
                          >
                            Eliminar
                          </button>
                        </>
                      )}
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
