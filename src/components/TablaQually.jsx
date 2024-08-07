const TablaQually = () => {
  return (
    <div
      className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto"
      style={{ maxWidth: "975px" }}
    >
      <table className="w-full text-base text-left rtl:text-right text-gray-500">
        <thead className="text-white font-daysone bg-gray-50 text-center">
    -2      <tr>
            <th scope="col" className="px-6 py-3 bg-pgreen font-light">
              Instancia
            </th>
            <th scope="col" className="px-6 py-3 bg-pblue font-light">
              Pareja 1
            </th>
            <th scope="col" className="px-6 py-3 bg-verdeclaro font-light">
              Games P1
            </th>
            <th scope="col" className="px-6 py-3 bg-pblue font-light">
              Pareja 2
            </th>
            <th scope="col" className="px-6 py-3 bg-verdeclaro font-light">
              Games P2
            </th>
            <th scope="col" className="px-6 py-3 bg-pgreen font-light">
              Cancha
            </th>
            <th scope="col" className="px-6 py-3 bg-pgreen font-light">
              Horario
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-4 text-center border-2 border-gray-100">Q1</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">
              Juan Alberto y Pedro Lopez
            </td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">6</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">Lucas arboleda y Damian</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">3</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">1</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">10:00</td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-center border-2 border-gray-100">Q2</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">
              Juan Alberto y Pedro Lopez
            </td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">6</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">Lucas arboleda y Damian</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">1</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">2</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">10:00</td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-center border-2 border-gray-100">Q1</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">
              Juan Alberto y Pedro Lopez
            </td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">6</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">Lucas arboleda y Damian</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">3</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">1</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">10:00</td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-center border-2 border-gray-100">Q2</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">
              Juan Alberto y Pedro Lopez
            </td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">6</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">Lucas arboleda y Damian</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">1</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">2</td>
            <td className="px-6 py-4 text-center border-2 border-gray-100">10:00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablaQually;
