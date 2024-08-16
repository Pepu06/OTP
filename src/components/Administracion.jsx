import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import * as XLSX from "xlsx";
import { db } from "../firebase/config";

const Administracion = () => {
  const [torneos, setTorneos] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [jugadores, setJugadores] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const [searchTermTorneos, setSearchTermTorneos] = useState("");
  const [searchTermPartidos, setSearchTermPartidos] = useState("");
  const [searchTermJugadores, setSearchTermJugadores] = useState("");

  const [editingRow, setEditingRow] = useState(null);

  // Cargar datos iniciales desde Firestore
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setLoadingMessage("Cargando datos...");

      try {
        const torneosRef = collection(db, "torneos");
        const partidosRef = collection(db, "partidos");
        const jugadoresRef = collection(db, "jugadores");

        const [torneosSnapshot, partidosSnapshot, jugadoresSnapshot] =
          await Promise.all([
            getDocs(torneosRef),
            getDocs(partidosRef),
            getDocs(jugadoresRef),
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

        setTorneos(torneosData);
        setPartidos(partidosData);
        setJugadores(jugadoresData);
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

  const fetchData = async () => {
    setLoading(true);
    setLoadingMessage("Cargando datos...");

    try {
      const torneosRef = collection(db, "torneos");
      const partidosRef = collection(db, "partidos");
      const jugadoresRef = collection(db, "jugadores");

      const [torneosSnapshot, partidosSnapshot, jugadoresSnapshot] =
        await Promise.all([
          getDocs(torneosRef),
          getDocs(partidosRef),
          getDocs(jugadoresRef),
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

      setTorneos(torneosData);
      setPartidos(partidosData);
      setJugadores(jugadoresData);
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
      await updateDoc(doc(db, tableName, editingRow.rowId), updatedRow);
      setEditingRow(null);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
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
          sheetName === "jugadores"
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
                              // Actualizar el estado de la fila
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
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="flex flex-col items-center">
            <div className="loader"></div>{" "}
            {/* Estilo para el círculo de carga */}
            <p className="text-white mt-4">{loadingMessage}</p>
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
