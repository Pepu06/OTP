import { useState, useEffect } from "react";
import Select from "react-select";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const Perfil = () => {
  const [jugadores, setJugadores] = useState([]);
  const [selectedJugador, setSelectedJugador] = useState(null);

  useEffect(() => {
    const cargarJugadores = async () => {
      try {
        const jugadoresRef = collection(db, "jugadores");
        const querySnapshot = await getDocs(jugadoresRef);

        const jugadoresData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            value: data.ID,
            label: `${data.Nombre} (ID: ${data.ID})`,
            ID: data.ID,
            Nombre: data.Nombre,
          };
        });

        setJugadores(jugadoresData);
      } catch (error) {
        console.error("Error al cargar los jugadores:", error);
      }
    };

    cargarJugadores();
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedJugador(selectedOption);
  };

  return (
    <section id="torneos" className="bg-white ml-2 mt-1 mb-5">
      <div className="flex justify-center mb-2">
        <Select
          options={jugadores}
          onChange={handleChange}
          placeholder="Busca tu perfil por Nombre/ID"
          className="text-center"
          isSearchable
        />
      </div>
      <div className="flex justify-center sm:justify-center mt-2">
        <a
          href={`/perfil/${selectedJugador ? selectedJugador.value : ""}`}
          className="px-3 py-1 sm:px-5 sm:py-2 bg-pgreen text-white rounded-lg font-medium text-sm font-poppins"
          disabled={!selectedJugador}
        >
          BUSCAR PERFIL
        </a>
      </div>
    </section>
  );
};

export default Perfil;
