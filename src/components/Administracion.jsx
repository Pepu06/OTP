import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  query,
  where,
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
  const [categoryOptions] = useState([
    "C9",
    "C8",
    "C7",
    "C6",
    "C5",
    "D7",
    "D6",
    "D5",
    "D4",
  ]);
  const requiredFields = {
    torneos: ["Nombre", "Categoria", "Fecha", "Club"],
    partidos: [
      "IDTorneo",
      "Instancia",
      "Pareja1",
      "GamesP1",
      "GamesP2",
      "Pareja2",
      "Cancha",
    ],
    jugadores: ["Nombre", "Categoria", "Puntos"],
    historicoTorneos: ["IDJugador", "Nombre", "Fecha", "Pareja", "Categoria"],
  };

  const [editingRow, setEditingRow] = useState(null);
  const [addingRow, setAddingRow] = useState(null);

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
        setTimeout(() => setLoadingMessage(""), 3000);
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
    GamesP1: "",
    GamesP2: "",
    Resultado: "",
    Pareja1: "",
    Pareja2: "",
    Ranking: "",
  });

  const getNextId = (rows) => {
    if (!Array.isArray(rows)) {
      throw new Error("Expected rows to be an array");
    }

    // Filtrar IDs válidos y convertirlos a números
    const ids = rows.map((row) => {
      const id = parseInt(row.ID, 10);
      return isNaN(id) ? 0 : id;
    });

    // Encontrar el máximo ID y retornar el siguiente
    const maxId = Math.max(...ids, 0);
    return (maxId + 1).toString();
  };

  const calculateRanking = (jugadores, newPlayerPoints, categoria) => {
    const filteredPlayers = jugadores.filter(
      (player) => player.Categoria === categoria
    );

    const sortedPlayers = [...filteredPlayers].sort(
      (a, b) => b.Puntos - a.Puntos
    );

    const rank =
      sortedPlayers.findIndex((player) => player.Puntos < newPlayerPoints) + 1;

    return rank === 0 ? sortedPlayers.length + 1 : rank;
  };

  const handleAddRowSubmit = async (tableName) => {
    try {
      const collectionRef = collection(db, tableName);
      const rows = { torneos, partidos, jugadores, historicoTorneos }[
        tableName
      ];
      const newId = getNextId(rows);

      const newRowDataWithId = { ...newRowData, ID: newId };

      const requiredFields = {
        torneos: ["Nombre", "Categoria", "Fecha", "Club"],
        partidos: [
          "IDTorneo",
          "Instancia",
          "Pareja1",
          "GamesP1",
          "GamesP2",
          "Pareja2",
          "Cancha",
        ],
        jugadores: ["Nombre", "Categoria", "Puntos"],
        historicoTorneos: [
          "IDJugador",
          "Nombre",
          "Fecha",
          "Pareja",
          "Categoria",
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

        const newPlayerPoints = parseInt(newRowDataWithId.Puntos, 10);
        const newRanking = calculateRanking(
          jugadores,
          newPlayerPoints,
          newRowDataWithId.Categoria
        );
        newRowDataWithId.Ranking = newRanking.toString();

        await setDoc(doc(collectionRef, newId), newRowDataWithId);

        const updatedPlayers = jugadores
          .filter((player) => player.Categoria === newRowDataWithId.Categoria)
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
        GamesP1: "",
        GamesP2: "",
        Resultado: "",
        Pareja1: "",
        Pareja2: "",
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
      historicoTorneos: (row) =>
        row.ID.toString().includes(searchTerm) ||
        row.Nombre.toLowerCase().includes(searchTerm.toLowerCase()),
    };

    return rows.filter(filters[tableName]);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleEdit = (tableName, rowId) => {
    setEditingRow({ tableName, rowId });
  };

  const handleSave = async (tableName) => {
    const rows = { torneos, partidos, jugadores }[tableName];
    const updatedRow = rows.find((row) => row.ID === editingRow.rowId);

    try {
      await updateDoc(doc(db, tableName, editingRow.rowId), updatedRow);

      if (tableName === "jugadores") {
        const updatedPlayerPoints = parseInt(updatedRow.Puntos, 10);
        const updatedPlayers = jugadores
          .filter((player) => player.Categoria === updatedRow.Categoria)
          .map((player) =>
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

        setJugadores(updatedPlayers);
      }

      alert("Datos editados correctamente.");
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      setEditingRow(null);
      await fetchData();
    }
  };

  const handleCancel = () => {
    setEditingRow(null);
    setAddingRow(null);
  };

  const handleDelete = async (tableName, rowId) => {
    setLoading(true);
    setLoadingMessage("Eliminando datos...");

    try {
      if (tableName === "torneos") {
        await deleteDoc(doc(db, tableName, rowId));

        const partidosRef = collection(db, "partidos");
        const partidosSnapshot = await getDocs(partidosRef);
        const partidosData = partidosSnapshot.docs.map((doc) => ({
          ...doc.data(),
          ID: doc.id,
        }));

        const partidosToDelete = partidosData
          .filter((partido) => partido.IDTorneo == rowId)
          .map((partido) => deleteDoc(doc(partidosRef, partido.ID)));

        await Promise.all(partidosToDelete);

        setPartidos(
          partidosData.filter((partido) => partido.IDTorneo !== rowId)
        );

        // Verificar si existen jugadores asociados a los partidos eliminados
        const jugadoresRef = collection(db, "jugadores");
        const jugadoresSnapshot = await getDocs(jugadoresRef);
        const jugadoresData = jugadoresSnapshot.docs.map((doc) => ({
          ...doc.data(),
          ID: doc.id,
        }));

        // Obtener jugadores de los partidos eliminados
        const jugadoresEnPartidosEliminados = partidosData.flatMap(
          (partido) => {
            const Pareja1Jugadores = partido.Pareja1
              ? partido.Pareja1.split("-").map((jugador) => jugador.trim())
              : [];
            const Pareja2Jugadores = partido.Pareja2
              ? partido.Pareja2.split("-").map((jugador) => jugador.trim())
              : [];
            return [...Pareja1Jugadores, ...Pareja2Jugadores];
          }
        );

        // Filtrar los jugadores que existen en la base de datos
        const jugadoresExistentes = jugadoresEnPartidosEliminados.filter(
          (jugador) =>
            jugadoresData.some((jugadorDoc) => jugadorDoc.Nombre === jugador)
        );

        // Si hay jugadores relacionados, actualizarlos
        if (jugadoresExistentes.length > 0) {
          await actualizarJugadores();
        }
      } else {
        await deleteDoc(doc(db, tableName, rowId));

        const setRows = {
          torneos: setTorneos,
          partidos: setPartidos,
          jugadores: setJugadores,
          historicoTorneos: setHistoricoTorneos,
        }[tableName];

        setRows((prevRows) => prevRows.filter((row) => row.ID !== rowId));
      }

      await fetchData();

      setLoading(false);
      setLoadingMessage("Datos eliminados con éxito.");
      setTimeout(() => setLoadingMessage(""), 3000);
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const extractCategoryAndDateFromFileName = (fileName) => {
    const [category, date] = fileName.split(" ");
    return { date: date + ".", category };
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setLoadingMessage("Procesando archivo...");

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      console.log("Nombres de las hojas en el archivo:", workbook.SheetNames);

      const fileName = file.name.split(".")[0];
      const { date, category } = extractCategoryAndDateFromFileName(fileName);

      const torneosRef = collection(db, "torneos");
      const q = query(torneosRef, where("Nombre", "==", fileName));
      const snapshot = await getDocs(q);

      let torneoId;

      if (snapshot.empty) {
        const torneosSnapshot = await getDocs(torneosRef);
        const torneosData = torneosSnapshot.docs.map((doc) => doc.data());
        const newId = getNextId(torneosData);

        const newTorneo = {
          ID: newId,
          Nombre: fileName,
          Club: "-",
          Fecha: date,
          Categoria: category,
        };

        await setDoc(doc(torneosRef, newId), newTorneo);
        console.log("Torneo creado con éxito:", newTorneo);
        torneoId = newId;
      } else {
        torneoId = snapshot.docs[0].id;
      }

      for (const sheetName of workbook.SheetNames) {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        if (sheetName.toLowerCase().includes("partidos")) {
          const partidosRef = collection(db, "partidos");

          for (const record of jsonData) {
            const partidosSnapshot = await getDocs(partidosRef);
            const partidosData = partidosSnapshot.docs.map((doc) => doc.data());
            let nextPartidoId = getNextId(partidosData);

            const cleanField = (field) => {
              const parejaIndex = field.indexOf("Pareja");
              const gamesIndex = field.indexOf("Games");
              if (parejaIndex !== -1 && parejaIndex + 6 < field.length) {
              return field.slice(0, parejaIndex + 6) + field.slice(parejaIndex + 7);
              }
              if (gamesIndex !== -1 && gamesIndex + 5 < field.length) {
              return field.slice(0, gamesIndex + 5) + field.slice(gamesIndex + 6);
              }
              return field;
            };

            const cleanedRecord = Object.keys(record).reduce((acc, key) => {
              acc[cleanField(key)] = record[key];
              return acc;
            }, {});

            const newPartido = {
              ID: nextPartidoId.toString(),
              IDTorneo: torneoId,
              Pareja1: cleanedRecord.Pareja1,
              Pareja2: cleanedRecord.Pareja2,
              GamesP1: cleanedRecord.GamesP1 || 0,
              GamesP2: cleanedRecord.GamesP2 || 0,
              Instancia: cleanedRecord.Instancia,
              Cancha: cleanedRecord.Cancha || "-",
            };

            await setDoc(
              doc(partidosRef, nextPartidoId.toString()),
              newPartido
            );
            console.log("Partido creado con éxito:", newPartido);
            nextPartidoId = (parseInt(nextPartidoId, 10) + 1).toString();

            // Si la instancia es "Final", detener la lectura
            if (record.Instancia === "Final") {
              console.log(
                "Instancia Final encontrada. Deteniendo la lectura del archivo."
              );
              break; // Detener el bucle si se encuentra la instancia "Final"
            }
          }

          console.log("Todos los partidos procesados con éxito.");
        }
      }

      // El resto de tu código permanece igual...
      for (const sheetName of workbook.SheetNames) {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (sheetName === "partidos") {
          const jugadoresRef = collection(db, "jugadores");
          const historicoTorneosRef = collection(db, "historicoTorneos");
          const jugadoresSnapshot = await getDocs(jugadoresRef);
          const jugadoresData = jugadoresSnapshot.docs.map((doc) => doc.data());
          let nextPlayerId = getNextId(jugadoresData);
          const historicoSnapshot = await getDocs(historicoTorneosRef);
          const historicoTorneosData = historicoSnapshot.docs.map((doc) =>
            doc.data()
          );
          let nextHistoricoTorneoId = getNextId(historicoTorneosData);
          const processedPlayers = new Set();

          const addPlayerPromises = jsonData.flatMap((record) => {
            const equipos = [record.Pareja1, record.Pareja2].map((equipo) =>
              equipo ? equipo.replace(/\s+y\s+/g, "-") : ""
            );

            return equipos.flatMap((equipo) => {
              const jugadores = equipo
                .split(/[-]/)
                .map((jugador) => jugador.trim());

              return jugadores.map(async (jugador, index) => {
                if (processedPlayers.has(jugador)) {
                  return;
                }

                processedPlayers.add(jugador);

                const jugadorQuery = query(
                  jugadoresRef,
                  where("Nombre", "==", jugador)
                );
                const jugadorSnapshot = await getDocs(jugadorQuery);
                let jugadorId;

                if (!jugadorSnapshot.empty) {
                  jugadorId = jugadorSnapshot.docs[0].id;
                } else {
                  jugadorId = nextPlayerId.toString();
                  nextPlayerId = (parseInt(nextPlayerId, 10) + 1).toString();

                  const newJugador = {
                    ID: jugadorId,
                    Nombre: jugador,
                    Categoria: category,
                    CJ: "-",
                    Cuartos: "-",
                    Efectividad: "-",
                    Ranking: 0,
                    Finales: "-",
                    PG: "-",
                    PJ: "-",
                    Puntos: 0,
                    Semis: "-",
                    UP: "-",
                    UR: "-",
                  };

                  await setDoc(doc(jugadoresRef, jugadorId), newJugador);
                  console.log("Jugador creado con éxito:", newJugador);
                }

                // Verificar si el histórico ya existe
                const historicoQuery = query(
                  historicoTorneosRef,
                  where("IDJugador", "==", jugadorId),
                  where("Nombre", "==", fileName)
                );
                const historicoSnapshot = await getDocs(historicoQuery);

                if (historicoSnapshot.empty) {
                  nextHistoricoTorneoId = (
                    parseInt(nextHistoricoTorneoId, 10) + 1
                  ).toString();
                  const pareja =
                    jugadores.length > 1
                      ? jugadores[(index + 1) % jugadores.length]
                      : "-";

                  const nuevoHistoricoTorneo = {
                    ID: nextHistoricoTorneoId,
                    IDJugador: jugadorId,
                    Nombre: fileName,
                    Fecha: date,
                    Pareja: pareja,
                    Categoria: category,
                  };
                  await setDoc(
                    doc(historicoTorneosRef, nextHistoricoTorneoId.toString()),
                    nuevoHistoricoTorneo
                  );
                  console.log(
                    "Historial del torneo creado con éxito:",
                    nuevoHistoricoTorneo
                  );
                } else {
                  console.log(
                    "Historial del torneo ya existente para el jugador:",
                    jugador
                  );
                }
              });
            });
          });

          await Promise.all(addPlayerPromises);
          console.log(
            "Todos los jugadores y sus historiales de torneos procesados con éxito."
          );
        }
      }

      await actualizarJugadores();
      await calcularRankingPorCategoria();

      await fetchData();
      setLoading(false);
      setLoadingMessage("Archivo procesado y datos actualizados en Firebase");
      setTimeout(() => setLoadingMessage(""), 3000);
    };
    reader.readAsArrayBuffer(file);
  };

  const calcularRankingPorCategoria = async () => {
    const jugadoresRef = collection(db, "jugadores");

    // Obtener todos los jugadores
    const jugadoresSnapshot = await getDocs(jugadoresRef);
    const jugadores = jugadoresSnapshot.docs.map((doc) => ({
      id: doc.id,
      nombre: doc.data().Nombre,
      categoria: doc.data().Categoria,
      puntos: doc.data().Puntos,
    }));

    // Agrupar jugadores por categoría
    const categorias = jugadores.reduce((acc, jugador) => {
      const categoria = jugador.categoria;
      if (!acc[categoria]) {
        acc[categoria] = [];
      }
      acc[categoria].push(jugador);
      return acc;
    }, {});

    // Recorrer cada categoría y calcular el ranking
    for (const [categoria, jugadoresEnCategoria] of Object.entries(
      categorias
    )) {
      // Ordenar los jugadores por puntos de mayor a menor
      jugadoresEnCategoria.sort((a, b) => b.puntos - a.puntos);

      // Asignar ranking basado en la posición
      for (let i = 0; i < jugadoresEnCategoria.length; i++) {
        const jugador = jugadoresEnCategoria[i];
        const ranking = i + 1;

        // Actualizar el ranking del jugador en la base de datos
        await updateDoc(doc(jugadoresRef, jugador.id), {
          Ranking: ranking,
        });

        console.log(
          `Jugador: ${jugador.nombre}, Categoría: ${categoria}, Ranking: ${ranking}, Puntos: ${jugador.puntos}`
        );
      }
    }
  };

  const actualizarJugadores = async () => {
    const jugadoresRef = collection(db, "jugadores");
    const partidosRef = collection(db, "partidos");
    const torneosRef = collection(db, "torneos");

    // Reiniciar todos los jugadores a 0
    const jugadoresSnapshot = await getDocs(jugadoresRef);
    const resetPromises = jugadoresSnapshot.docs.map((doc) =>
      updateDoc(doc.ref, {
        CJ: 0,
        PJ: 0,
        Finales: 0,
        Semis: 0,
        Cuartos: 0,
        Octavos: 0,
        Dieciseisavos: 0,
        Qually: 0,
        UP: "",
        UR: "",
        PG: 0,
        Puntos: 0,
        Efectividad: 0,
      })
    );
    await Promise.all(resetPromises);

    // Obtener todos los jugadores
    const jugadores = jugadoresSnapshot.docs.map((doc) => ({
      id: doc.id,
      nombre: doc.data().Nombre,
      categoria: doc.data().Categoria,
      puntos: doc.data().Puntos, // Inicializar con puntos actuales del jugador
    }));

    // Obtener todos los partidos
    const partidosSnapshot = await getDocs(partidosRef);
    const partidos = partidosSnapshot.docs.map((doc) => ({
      id: doc.id,
      equipos: [doc.data().Pareja1, doc.data().Pareja2],
      idTorneo: doc.data().IDTorneo,
      instancia: doc.data().Instancia,
      GamesP1: doc.data().GamesP1,
      GamesP2: doc.data().GamesP2,
    }));

    // Obtener todos los torneos para asociar las fechas y nombres
    const torneosSnapshot = await getDocs(torneosRef);
    const torneosMap = new Map(
      torneosSnapshot.docs.map((doc) => [doc.id, doc.data().Nombre])
    );
    const torneosFechasMap = new Map(
      torneosSnapshot.docs.map((doc) => [doc.id, doc.data().Fecha])
    );

    // Crear un objeto para almacenar los datos del jugador
    const jugadoresDatos = jugadores.reduce((acc, jugador) => {
      acc[jugador.id] = {
        torneos: new Map(),
        partidos: new Set(),
        instancias: new Map(),
        conteoInstancias: {
          Final: 0,
          Semifinal: 0,
          Cuartos: 0,
          Octavos: 0,
          Dieciseisavos: 0,
          Qually: 0,
        },
        ultimoPartidoId: null,
        parejaUltimoTorneo: null,
        instanciaUltimoTorneo: null,
        partidosGanados: 0,
        puntos: jugador.puntos, // Inicializar con puntos actuales del jugador
      };
      return acc;
    }, {});

    // Función para calcular puntos según la instancia
    const calcularPuntosPorInstancia = (instancia) => {
      if (instancia.includes("16avos")) return 2;
      if (instancia.includes("Octavos")) return 3;
      if (instancia.includes("Cuartos")) return 4;
      if (instancia.includes("Semifinal")) return 5;
      if (instancia.includes("Final")) return 6;
      if (instancia === "Q1" || instancia === "Q2") return 1;
      return 0;
    };

    // Recorrer los partidos y almacenar los datos
    partidos.forEach((partido) => {
      const {
        id: partidoId,
        idTorneo,
        instancia,
        equipos,
        GamesP1,
        GamesP2,
      } = partido;
      const torneoNombre = torneosMap.get(idTorneo);
      const torneoFecha = torneosFechasMap.get(idTorneo);

      equipos.forEach((equipo) => {
        const jugadoresEnEquipo = equipo
          .split(/[-]/)
          .map((nombre) => nombre.trim());
        jugadoresEnEquipo.forEach((nombre) => {
          for (const jugador of jugadores) {
            if (jugador.nombre === nombre) {
              // Actualizar datos del jugador
              jugadoresDatos[jugador.id].torneos.set(idTorneo, torneoNombre);
              jugadoresDatos[jugador.id].partidos.add(partidoId);
              jugadoresDatos[jugador.id].instancias.set(partidoId, instancia);

              // Contar la instancia
              if (instancia.includes("Final")) {
                jugadoresDatos[jugador.id].conteoInstancias.Final++;
              } else if (instancia.includes("Semifinal")) {
                jugadoresDatos[jugador.id].conteoInstancias.Semifinal++;
              } else if (instancia.includes("Cuartos")) {
                jugadoresDatos[jugador.id].conteoInstancias.Cuartos++;
              } else if (instancia.includes("Octavos")) {
                jugadoresDatos[jugador.id].conteoInstancias.Octavos++;
              } else if (instancia.includes("16avos")) {
                jugadoresDatos[jugador.id].conteoInstancias.Dieciseisavos++;
              } else if (instancia.includes("Qually")) {
                jugadoresDatos[jugador.id].conteoInstancias.Qually++;
              }

              // Determinar el último torneo (fecha más reciente) y el último partido dentro del torneo
              const torneoActualFecha = new Date(torneoFecha);
              if (
                !jugadoresDatos[jugador.id].ultimoTorneoFecha ||
                torneoActualFecha >
                  new Date(jugadoresDatos[jugador.id].ultimoTorneoFecha)
              ) {
                jugadoresDatos[jugador.id].ultimoTorneoFecha = torneoFecha;
                // Limpiar el último partido dentro del torneo
                jugadoresDatos[jugador.id].ultimoPartidoId = null;
              }

              if (
                jugadoresDatos[jugador.id].ultimoTorneoFecha === torneoFecha &&
                (!jugadoresDatos[jugador.id].ultimoPartidoId ||
                  partidoId > jugadoresDatos[jugador.id].ultimoPartidoId)
              ) {
                jugadoresDatos[jugador.id].ultimoPartidoId = partidoId;
                jugadoresDatos[jugador.id].instanciaUltimoTorneo = instancia;
              }

              // Contar partidos ganados y asignar puntos
              const puntosPorPartido = parseInt(
                calcularPuntosPorInstancia(instancia)
              );
              if (equipo === equipos[0]) {
                // Si el jugador está en Pareja1
                if (GamesP1 > GamesP2) {
                  jugadoresDatos[jugador.id].partidosGanados++;
                  jugadoresDatos[jugador.id].puntos += puntosPorPartido;
                }
              } else {
                // Si el jugador está en Pareja2
                if (GamesP2 > GamesP1) {
                  jugadoresDatos[jugador.id].partidosGanados++;
                  jugadoresDatos[jugador.id].puntos += puntosPorPartido;
                }
              }
            }
          }
        });
      });
    });

    // Obtener los datos de los partidos para encontrar la pareja y la instancia
    const partidosMap = new Map(partidos.map((p) => [p.id, p]));

    // Actualizar la colección de jugadores con los datos
    const updatePromises = Object.entries(jugadoresDatos).map(
      async ([jugadorId, datos]) => {
        const uniqueTorneosCount = datos.torneos.size; // Contar torneos únicos
        const uniquePartidosCount = datos.partidos.size; // Contar partidos únicos

        // Calcular efectividad
        const totalPartidosJugados = uniquePartidosCount;
        const efectividad =
          totalPartidosJugados > 0
            ? (datos.partidosGanados / totalPartidosJugados) * 100
            : 0;

        // Obtener el último partido y su información
        const ultimoPartido = partidosMap.get(datos.ultimoPartidoId);
        let pareja = null;
        if (ultimoPartido) {
          const { equipos, instancia } = ultimoPartido;
          const [Pareja1, Pareja2] = equipos;

          if (
            Pareja1.includes(jugadores.find((j) => j.id === jugadorId).nombre)
          ) {
            pareja = Pareja1;
          } else {
            pareja = Pareja2;
          }

          datos.parejaUltimoTorneo = pareja;
          datos.instanciaUltimoTorneo = instancia;
        }

        // Actualizar el documento del jugador
        await updateDoc(doc(jugadoresRef, jugadorId), {
          CJ: uniqueTorneosCount,
          PJ: uniquePartidosCount,
          Finales: datos.conteoInstancias.Final,
          Semis: datos.conteoInstancias.Semifinal,
          Cuartos: datos.conteoInstancias.Cuartos,
          Octavos: datos.conteoInstancias.Octavos,
          Dieciseisavos: datos.conteoInstancias.Dieciseisavos,
          Qually: datos.conteoInstancias.Qually,
          UP: datos.parejaUltimoTorneo,
          UR: datos.instanciaUltimoTorneo,
          PG: datos.partidosGanados,
          Puntos: datos.puntos, // Actualizar puntos con base en partidos ganados y el tipo de instancia
          Efectividad: efectividad, // Agregar efectividad al documento
        });
      }
    );

    await Promise.all(updatePromises);
  };

  const renderForm = (tableName) => {
    const columns = {
      torneos: ["Nombre", "Categoria", "Fecha", "Club"],
      partidos: [
        "IDTorneo",
        "Instancia",
        "Pareja1",
        "GamesP1",
        "GamesP2",
        "Pareja2",
        "Cancha",
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
      historicoTorneos: ["IDJugador", "Nombre", "Fecha", "Pareja", "Categoria"],
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
              {requiredFields[tableName].includes(column) && (
                <span className="text-red-500">*</span>
              )}
            </label>
            {column === "Categoria" && tableName === "jugadores" ? (
              <select
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                value={newRowData[column] || ""}
                onChange={(e) => handleInputChange(column, e.target.value)}
              >
                <option value="">Seleccione una categoría</option>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
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
                disabled={column === "ID"}
              />
            )}
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
          className="bg-pgreen hover:bg-green-700 hover:transition-all text-white px-4 py-2 rounded-lg"
          onClick={() => handleAddRowSubmit(tableName)}
        >
          Guardar
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 hover:transition-all text-white px-4 py-2 rounded-lg ml-2"
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
        "Pareja1",
        "GamesP1",
        "GamesP2",
        "Pareja2",
        "Cancha",
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
        "Nombre",
        "Fecha",
        "Pareja",
        "Categoria",
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
                            className="border-2 border-pgreen rounded-sm max-w-24"
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
          <div className="flex justify-center my-2">
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
      <hr className="border-t border-gray-400 w-full my-4" />
      <div className="flex flex-col items-center">
        <div className="w-full m-1">
          {renderTable(torneos, setTorneos, "torneos", searchTermTorneos)}
        </div>
      </div>
      <hr className="border-t border-gray-400 w-full my-4" />
      <div className="flex flex-col items-center">
        <div className="w-full sm:mt-0 mt-5 m-1">
          {renderTable(partidos, setPartidos, "partidos", searchTermPartidos)}
        </div>
      </div>
      <hr className="border-t border-gray-400 w-full my-4" />
      <div className="flex flex-col items-center">
        <div className="w-full m-1">
          {renderTable(
            jugadores,
            setJugadores,
            "jugadores",
            searchTermJugadores
          )}
        </div>
      </div>
      <hr className="border-t border-gray-400 w-full my-4" />
      <div className="flex flex-col items-center">
        <div className="w-full sm:mt-0 mt-5 m-1">
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
          className="m-2 w-auto px-5 py-2 bg-green-700 hover:bg-green-950 hover:transition-all text-white rounded-lg font-extrabold font-poppins"
          onClick={() => document.getElementById("fileInput").click()}
        >
          CARGAR ARCHIVO
        </button>
      </div>
    </div>
  );
};

export default Administracion;
