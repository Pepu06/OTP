import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import * as XLSX from "xlsx";
import { db } from "../firebase/config";

const Administracion = () => {
  const [torneos, setTorneos] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [historicoTorneos, setHistoricoTorneos] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const [searchTermTorneos, setSearchTermTorneos] = useState("");
  const [searchTermPartidos, setSearchTermPartidos] = useState("");
  const [searchTermJugadores, setSearchTermJugadores] = useState("");
  const [searchTermHistoricoTorneos, setSearchTermHistoricoTorneos] =
    useState("");

  const [editingRow, setEditingRow] = useState(null);
  const [addingRow, setAddingRow] = useState(null);

  // Cargar datos iniciales desde Firestore
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setLoadingMessage("Cargando datos...");

      try {
        const torneosRef = collection(db, "torneos");
        const partidosRef = collection(db, "partidos");
        const jugadoresRef = collection(db, "jugadores");
        const historicoTorneosRef = collection(db, "historicoTorneos");

        const [
          torneosSnapshot,
          partidosSnapshot,
          jugadoresSnapshot,
          historicoTorneosSnapshot,
        ] = await Promise.all([
          getDocs(torneosRef),
          getDocs(partidosRef),
          getDocs(jugadoresRef),
          getDocs(historicoTorneosRef),
        ]);

        const torneosData = torneosSnapshot.docs.map((doc) => ({
          ...doc.data(),
          ID: doc.id,
        }));
        const partidosData = partidosSnapshot.docs.map((doc) => ({
          ...doc.data(),
          ID: doc.id,
        }));
        const jugadoresData = jugadoresSnapshot.docs.map((doc) => ({
          ...doc.data(),
          ID: doc.id,
        }));
        const historicoTorneosData = historicoTorneosSnapshot.docs.map(
          (doc) => ({
            ...doc.data(),
            ID: doc.id,
          })
        );

        setTorneos(torneosData);
        setPartidos(partidosData);
        setJugadores(jugadoresData);
        setHistoricoTorneos(historicoTorneosData);
      } catch (error) {
        console.error("Error al cargar los datos iniciales:", error);
      } finally {
        setLoading(false);
        setLoadingMessage("Datos cargados con éxito.");
        setTimeout(() => setLoadingMessage(""), 3000); // Ocultar mensaje después de 3 segundos
      }
    };

    loadInitialData();
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [newRowData, setNewRowData] = useState({
    ID: "",
    Nombre: "",
    Categoria: "",
    Fecha: "",
    Club: "",
    IDTorneo: "",
    Instancia: "",
    Resultado: "",
    Equipo1: "",
    Equipo2: "",
    Ranking: "",
  });

  const getNextId = (rows) => {
    const ids = rows.map((row) => parseInt(row.ID, 10));
    const maxId = Math.max(...ids, 0);
    return (maxId + 1).toString();
  };

  // Función para calcular el ranking basado en la categoría y los puntos
  const calculateRanking = (jugadores, newPlayerPoints, categoria) => {
    // Filtrar jugadores por la categoría dada
    const filteredPlayers = jugadores.filter(
      (player) => player.Categoria === categoria
    );

    // Ordenar jugadores por puntos de mayor a menor
    const sortedPlayers = [...filteredPlayers].sort((a, b) => b.Puntos - a.Puntos);

    // Encontrar el ranking del nuevo jugador
    const rank =
      sortedPlayers.findIndex((player) => player.Puntos < newPlayerPoints) + 1;

    // Si el nuevo jugador tiene menos puntos que todos, su ranking será al final
    return rank === 0 ? sortedPlayers.length + 1 : rank;
  };

  // Modificar handleAddRowSubmit para incluir el cálculo del ranking basado en la categoría
  const handleAddRowSubmit = async (tableName) => {
    try {
      const collectionRef = collection(db, tableName);
      const rows = { torneos, partidos, jugadores, historicoTorneos }[tableName];
      const newId = getNextId(rows);

      const newRowDataWithId = { ...newRowData, ID: newId };

      // Validar campos obligatorios
      const requiredFields = {
        torneos: ["Nombre", "Categoria", "Fecha", "Club"],
        partidos: [
          "IDTorneo",
          "Instancia",
          "Equipo1",
          "Resultado",
          "Equipo2",
          "Cancha",
          "Horario",
        ],
        jugadores: ["Nombre", "Categoria", "Puntos"],
        historicoTorneos: [
          "IDJugador",
          "Tipo",
          "Competicion",
          "Fecha",
          "Pareja",
          "Categoria",
          "Resultado",
        ],
      }[tableName];

      for (let field of requiredFields) {
        if (!newRowDataWithId[field]) {
          alert(`El campo ${field} es obligatorio.`);
          return;
        }
      }

      if (tableName === "jugadores") {
        const additionalFields = [
          "Ranking",
          "CJ",
          "UP",
          "UR",
          "Cuartos",
          "Semis",
          "Finales",
          "PJ",
          "PG",
          "Efectividad",
          "Puntos",
        ];

        additionalFields.forEach((field) => {
          if (!newRowDataWithId[field]) {
            newRowDataWithId[field] = "0";
          }
        });

        // Calcular el ranking del nuevo jugador basado en la categoría y puntos
        const newPlayerPoints = parseInt(newRowDataWithId.Puntos, 10);
        const newRanking = calculateRanking(jugadores, newPlayerPoints, newRowDataWithId.Categoria);
        newRowDataWithId.Ranking = newRanking.toString();

        // Guardar el nuevo jugador en la base de datos
        await setDoc(doc(collectionRef, newId), newRowDataWithId);

        // Recalcular y actualizar rankings para todos los jugadores en la misma categoría
        const updatedPlayers = jugadores
          .filter(player => player.Categoria === newRowDataWithId.Categoria)
          .concat(newRowDataWithId);

        updatedPlayers.sort((a, b) => b.Puntos - a.Puntos);

        await Promise.all(
          updatedPlayers.map((player, index) => {
            const updatedRanking = (index + 1).toString();
            return updateDoc(doc(db, "jugadores", player.ID), {
              Ranking: updatedRanking,
            });
          })
        );

        // Actualizar el estado local con los jugadores actualizados
        setJugadores(updatedPlayers);
      } else {
        await setDoc(doc(collectionRef, newId), newRowDataWithId);
      }

      setShowForm(false);
      setNewRowData({
        ID: "",
        Nombre: "",
        Categoria: "",
        Fecha: "",
        Club: "",
        IDTorneo: "",
        Instancia: "",
        Resultado: "",
        Equipo1: "",
        Equipo2: "",
        Ranking: "",
      });

      await fetchData();
    } catch (error) {
      console.error("Error al agregar la fila:", error);
    }
  };



  const fetchData = async () => {
    setLoading(true);
    setLoadingMessage("Cargando datos...");

    try {
      const torneosRef = collection(db, "torneos");
      const partidosRef = collection(db, "partidos");
      const jugadoresRef = collection(db, "jugadores");
      const historicoTorneosRef = collection(db, "historicoTorneos");

      const [
        torneosSnapshot,
        partidosSnapshot,
        jugadoresSnapshot,
        historicoTorneosSnapshot,
      ] = await Promise.all([
        getDocs(torneosRef),
        getDocs(partidosRef),
        getDocs(jugadoresRef),
        getDocs(historicoTorneosRef),
      ]);

      const torneosData = torneosSnapshot.docs.map((doc) => ({
        ...doc.data(),
        ID: doc.id,
      }));
      const partidosData = partidosSnapshot.docs.map((doc) => ({
        ...doc.data(),
        ID: doc.id,
      }));
      const jugadoresData = jugadoresSnapshot.docs.map((doc) => ({
        ...doc.data(),
        ID: doc.id,
      }));
      const historicoTorneosData = historicoTorneosSnapshot.docs.map((doc) => ({
        ...doc.data(),
        ID: doc.id,
      }));

      setTorneos(torneosData);
      setPartidos(partidosData);
      setJugadores(jugadoresData);
      setHistoricoTorneos(historicoTorneosData);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  // Manejar cambios en la búsqueda
  const handleSearchChange = (e, tableName) => {
    const value = e.target.value;
    const setSearchTerm = {
      torneos: setSearchTermTorneos,
      partidos: setSearchTermPartidos,
      jugadores: setSearchTermJugadores,
      historicoTorneos: setSearchTermHistoricoTorneos,
    }[tableName];
    setSearchTerm(value);
  };

  // Filtrar filas según el término de búsqueda
  const filteredRows = (rows, searchTerm, tableName) => {
    if (!searchTerm) return rows;

    const filters = {
      torneos: (row) =>
        row.ID.toString().includes(searchTerm) ||
        row.Nombre.toLowerCase().includes(searchTerm.toLowerCase()),
      partidos: (row) => row.IDTorneo.toString().includes(searchTerm),
      jugadores: (row) =>
        row.ID.toString().includes(searchTerm) ||
        row.Nombre.toLowerCase().includes(searchTerm.toLowerCase()),
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

  const handleSave = async (tableName) => {
    const rows = { torneos, partidos, jugadores }[tableName];
    const updatedRow = rows.find((row) => row.ID === editingRow.rowId);

    try {
      // Guardar los cambios en la fila editada
      await updateDoc(doc(db, tableName, editingRow.rowId), updatedRow);

      // Si se edita un jugador, recalcular rankings
      if (tableName === "jugadores") {
        const updatedPlayerPoints = parseInt(updatedRow.Puntos, 10);
        const updatedPlayers = jugadores
          .filter(player => player.Categoria === updatedRow.Categoria)
          .map(player =>
            player.ID === updatedRow.ID
              ? { ...player, Puntos: updatedPlayerPoints }
              : player
          );

        updatedPlayers.sort((a, b) => b.Puntos - a.Puntos);

        await Promise.all(
          updatedPlayers.map((player, index) => {
            const updatedRanking = (index + 1).toString();
            return updateDoc(doc(db, "jugadores", player.ID), {
              Ranking: updatedRanking,
            });
          })
        );

        // Actualizar el estado local con los jugadores actualizados
        setJugadores(updatedPlayers);
      }

      // Mostrar mensaje de confirmación
      alert("Datos editados correctamente.");
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      // Limpiar estado de edición
      setEditingRow(null);
      await fetchData(); // Recargar datos después de guardar
    }
  };


  const handleCancel = () => {
    setEditingRow(null);
    setAddingRow(null); // Ocultar formulario de agregar fila
  };

  const handleDelete = async (tableName, rowId) => {
    setLoading(true);
    setLoadingMessage("Eliminando datos...");

    try {
      if (tableName === "torneos") {
        // Eliminar torneo
        await deleteDoc(doc(db, tableName, rowId));

        // Eliminar partidos asociados al torneo
        const partidosRef = collection(db, "partidos");
        const partidosSnapshot = await getDocs(partidosRef);
        const partidosData = partidosSnapshot.docs.map((doc) => ({
          ...doc.data(),
          ID: doc.id,
        }));

        // Filtrar partidos que corresponden al torneo eliminado
        const partidosToDelete = partidosData
          .filter((partido) => partido.IDTorneo == rowId)
          .map((partido) => deleteDoc(doc(partidosRef, partido.ID)));

        // Esperar a que todas las eliminaciones se completen
        await Promise.all(partidosToDelete);

        // Actualizar el estado para la tabla de partidos
        setPartidos(
          partidosData.filter((partido) => partido.IDTorneo !== rowId)
        );
      } else {
        // Eliminar otras entidades (partidos, jugadores)
        await deleteDoc(doc(db, tableName, rowId));

        // Actualizar el estado para la tabla correspondiente
        const setRows = {
          torneos: setTorneos,
          partidos: setPartidos,
          jugadores: setJugadores,
        }[tableName];

        setRows((prevRows) => prevRows.filter((row) => row.ID !== rowId));
      }

      await fetchData(); // Recargar datos después de eliminar

      setLoading(false);
      setLoadingMessage("Datos eliminados con éxito.");
      setTimeout(() => setLoadingMessage(""), 3000); // Ocultar mensaje después de 3 segundos
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  // Manejar la carga del archivo Excel
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setLoadingMessage("Procesando archivo...");

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      console.log("Nombres de las hojas en el archivo:", workbook.SheetNames); // Log para depuración

      for (const sheetName of workbook.SheetNames) {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        console.log(`Procesando hoja: ${sheetName}`); // Log para depuración

        if (
          sheetName === "torneos" ||
          sheetName === "partidos" ||
          sheetName === "jugadores" ||
          sheetName === "historicoTorneos"
        ) {
          const collectionRef = collection(db, sheetName);

          // Borrar colección existente
          const snapshot = await getDocs(collectionRef);
          const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
          await Promise.all(deletePromises);

          // Agregar nuevos datos
          const addPromises = jsonData.map((record) => {
            const docId = String(record.ID);
            return setDoc(doc(collectionRef, docId), record);
          });
          await Promise.all(addPromises);

          console.log(`Datos de la hoja ${sheetName} cargados con éxito.`); // Log para depuración
        } else {
          console.warn(`Hoja ${sheetName} no reconocida.`); // Log para depuración
        }
      }

      await fetchData(); // Recargar datos después de procesar el archivo

      setLoading(false);
      setLoadingMessage("Archivo procesado y datos actualizados en Firebase");
      setTimeout(() => setLoadingMessage(""), 3000); // Ocultar mensaje después de 3 segundos
    };
    reader.readAsArrayBuffer(file);
  };

  const renderForm = (tableName) => {
    const columns = {
      torneos: ["Nombre", "Categoria", "Fecha", "Club"],
      partidos: [
        "IDTorneo",
        "Instancia",
        "Equipo1",
        "Resultado",
        "Equipo2",
        "Cancha",
        "Horario",
      ],
      jugadores: [
        "Nombre",
        "Categoria",
        "CJ",
        "UP",
        "UR",
        "Cuartos",
        "Semis",
        "Finales",
        "PJ",
        "PG",
        "Efectividad",
        "Puntos",
      ],
      historicoTorneos: [
        "IDJugador",
        "Tipo",
        "Competicion",
        "Fecha",
        "Pareja",
        "Categoria",
        "Resultado",
      ],
    }[tableName];

    const handleInputChange = (column, value) => {
      if (value === "") {
        setNewRowData({ ...newRowData, [column]: "0" });
      } else {
        setNewRowData({ ...newRowData, [column]: value });
      }
    };

    const handleFocus = (column, value) => {
      if (value === "0") {
        setNewRowData({ ...newRowData, [column]: "" });
      }
    };

    return (
      <div className="p-4 border border-gray-300 rounded-lg mb-4">
        <h2 className="text-lg font-bold mb-2">Agregar Nueva Fila</h2>
        {columns.map((column) => (
          <div key={column} className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {capitalizeFirstLetter(column)}
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              value={
                newRowData[column] ||
                (tableName === "jugadores" &&
                  !["Nombre", "Categoria"].includes(column)
                  ? ""
                  : "")
              }
              onChange={(e) => handleInputChange(column, e.target.value)}
              onFocus={() => handleFocus(column, newRowData[column])}
              disabled={column === "ID"} // Deshabilitar el campo ID
            />
          </div>
        ))}
        {newRowData.ID && (
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              ID Asignado
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              value={newRowData.ID}
              readOnly
            />
          </div>
        )}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => handleAddRowSubmit(tableName)}
        >
          Guardar
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
          onClick={() => handleCancel()}
        >
          Cancelar
        </button>
      </div>
    );
  };

  const renderTable = (rows, setRows, tableName, searchTerm) => {
    const columns = {
      torneos: ["ID", "Nombre", "Categoria", "Fecha", "Club"],
      partidos: [
        "ID",
        "IDTorneo",
        "Instancia",
        "Equipo1",
        "Resultado",
        "Equipo2",
        "Cancha",
        "Horario",
      ],
      jugadores: [
        "ID",
        "Nombre",
        "Ranking",
        "Categoria",
        "CJ",
        "UP",
        "UR",
        "Cuartos",
        "Semis",
        "Finales",
        "PJ",
        "PG",
        "Efectividad",
        "Puntos",
      ],
      historicoTorneos: [
        "ID",
        "IDJugador",
        "Tipo",
        "Competicion",
        "Fecha",
        "Pareja",
        "Categoria",
        "Resultado",
      ],
    }[tableName];

    const handleKeyDown = (e) => {
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
            value={
              tableName === "torneos"
                ? searchTermTorneos
                : tableName === "partidos"
                  ? searchTermPartidos
                  : tableName === "historicoTorneos"
                    ? searchTermHistoricoTorneos
                    : searchTermJugadores
            }
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
                              // Actualizar el estado de la fila
                              const updatedRows = rows.map((r) =>
                                r.ID === row.ID
                                  ? { ...r, [column]: e.target.value }
                                  : r
                              );
                              setRows(updatedRows);
                            }}
                            onKeyDown={handleKeyDown}
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
          <div className="flex justify-center mt-4">
            <button
              className="m-2 px-5 py-2 bg-pgreen hover:bg-green-700 hover:transition-all text-white rounded-lg font-medium"
              onClick={() => setAddingRow(tableName)}
            >
              Agregar {capitalizeFirstLetter(tableName)}
            </button>
          </div>
          {addingRow === tableName && renderForm(tableName)}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col p-4">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center h-64">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-pblue"></div>
            </div>
            <p className="text-white">{loadingMessage}</p>
          </div>
        </div>
      )}
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
      <div className="flex flex-col sm:flex-row items-center sm:justify-between">
        <div className="w-full sm:w-[50%] m-1">
          {renderTable(
            jugadores,
            setJugadores,
            "jugadores",
            searchTermJugadores
          )}
        </div>
        <div className="w-full sm:w-[50%] sm:mt-0 mt-5 m-1">
          {renderTable(
            historicoTorneos,
            setHistoricoTorneos,
            "historicoTorneos",
            searchTermHistoricoTorneos
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
