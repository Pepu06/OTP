import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'

const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white shadow-lg">
        <img
          src={Logo} // Reemplaza con la ruta a tu imagen
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
    </>
  );
};

export default Header;
