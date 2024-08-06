import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white shadow-lg">
        <img
          src="logo.png" // Reemplaza con la ruta a tu imagen
          alt="Logo"
          className="h-12 ml-10 mt-1" // Ajusta el tamaño según sea necesario
        />
        <nav className="flex space-x-5 font-inter font-bold">
          <Link to="/" className="text-gray-600 hover:text-blue-600">
            INICIO
          </Link>
          <Link to="/" className="text-gray-600 hover:text-blue-600">
            TORNEOS
          </Link>
          <Link to="/novedades" className="text-gray-600 hover:text-blue-600">
            NOVEDADES
          </Link>
          <Link to="/contacto" className="text-gray-600 hover:text-blue-600">
            CONTACTO
          </Link>
        </nav>
      </header>
      <div className="overflow-hidden relative h-20">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-11/12 h-8 bg-white rounded-full "></div>
      </div>
    </>
  );
};

export default Header;
