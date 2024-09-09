import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { FaFilter } from "react-icons/fa";

const TablaDeRankings = () => {
  const [rankings, setRankings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [loading, setLoading] = useState(true);
  const [isCategoryListVisible, setIsCategoryListVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "jugadores"));
        const data = querySnapshot.docs.map((doc) => doc.data());

        const playerRankings = data
          .map((row) => ({
            ranking: parseInt(row.Ranking, 10),
            nombre: row.Nombre,
            categoria: row.Categoria,
            ID: row.ID,
            puntos: row.Puntos,
          }))
          .filter((row) => !isNaN(row.ranking) && row.nombre);

        const uniqueCategories = Array.from(
          new Set(playerRankings.map((row) => row.categoria))
        );

        playerRankings.sort((b, a) => b.ranking - a.ranking);

        setRankings(playerRankings);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error(
          "Error cargando datos de jugadores desde Firestore:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRankings = rankings.filter((row) => {
    const matchesCategory =
      selectedCategory === "Todas" ||
      row.categoria.toLowerCase() === selectedCategory.toLowerCase();

    return (
      matchesCategory &&
      row.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-pblue"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-8 w-full">
      <div className="w-full max-w-screen-lg mb-5" style={{ width: "80%" }}>
        <div className="relative overflow-x-auto w-full items-center">
          <h1 className="flex text-pblue justify-center font-daysone text-4xl mb-3">
            Rankings
          </h1>

          <div className="flex flex-col sm:flex-row justify-between mt-8">
            <div className="flex items-center sm:translate-y-0 translate-y-2 mb-3 sm:mb-0">
              <input
                className="border border-pgrey w-40 placeholder:text-center placeholder:text-sm placeholder:text-pgrey rounded-lg px-3 text-center"
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "Buscar")}
              />
            </div>

            <div className="hidden sm:flex items-center">
              <select
                className="border border-pgrey w-52 rounded-lg px-3 text-center text-pgrey"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="Todas">Todas las Categorías</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative sm:hidden">
              <div className="flex flex-col items-end mb-1">
                <FaFilter
                  className="text-xl cursor-pointer text-pgrey absolute right-[3px] -top-8 transform mr-3"
                  onClick={() =>
                    setIsCategoryListVisible(!isCategoryListVisible)
                  }
                />
                <span className="absolute -translate-y-4 -translate-x-[6px] text-sm text-pgrey">Filtrar</span>
              </div>
              {isCategoryListVisible && (
                <div className="absolute right-0 top-full mt-2 w-52 border border-pgrey rounded-lg bg-white z-10 shadow-lg">
                  <div className="flex flex-col">
                    <button
                      className="p-2 text-left hover:bg-gray-200"
                      onClick={() => {
                        setSelectedCategory("Todas");
                        setIsCategoryListVisible(false);
                      }}
                    >
                      Todas las Categorías
                    </button>
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        className="p-2 text-left hover:bg-gray-200"
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsCategoryListVisible(false);
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className="overflow-y-auto rounded-lg border sm:mt-2"
            style={{ maxHeight: "500px" }}
          >
            <table className="w-full text-base text-gray-500">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Ranking</th>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-center">Nombre</th>
                  <th className="px-4 py-2 text-right">Categoria</th>
                  <th className="px-4 py-2 text-right">Puntos</th>
                </tr>
              </thead>
              <tbody>
                {filteredRankings.length > 0 ? (
                  filteredRankings.map((row, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b text-pgrey hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        (window.location.href = `/perfil/${row.ID}`)
                      }
                    >
                      <td className="px-4 py-2 text-black">{row.ranking}°</td>
                      <td className="px-4 py-2">{row.ID}</td>
                      <td className="px-4 py-2 text-center text-black">{row.nombre}</td>
                      <td className="px-4 py-2 text-right">{row.categoria}</td>
                      <td className="px-4 py-2 text-right">{row.puntos}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-2 text-center">
                      No hay resultados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaDeRankings;
