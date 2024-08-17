import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Crear un ref para el contenedor del menú

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para manejar clics fuera del menú
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  // Usar useEffect para agregar y limpiar el event listener
  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMenuOpen]);

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-lg relative">
      <img
        src={Logo} // Reemplaza con la ruta a tu imagen
        alt="Logo"
        className="h-12 sm:ml-10 mt-1" // Ajusta el tamaño según sea necesario
      />
      <nav className="hidden sm:flex space-x-5 font-inter font-bold">
        <Link
          to="/"
          className="relative text-gray-600 hover:text-blue-600 cursor-pointer transition-all ease-in-out
             before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-blue-600 before:origin-center 
             before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%]
             after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-blue-600 after:origin-center 
             after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
        >
          INICIO
        </Link>

        <Link
          to="/torneos"
          className="relative text-gray-600 hover:text-blue-600 cursor-pointer transition-all ease-in-out
             before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-blue-600 before:origin-center 
             before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%]
             after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-blue-600 after:origin-center 
             after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
        >
          TORNEOS
        </Link>
        <Link
          to="/novedades"
          className="relative text-gray-600 hover:text-blue-600 cursor-pointer transition-all ease-in-out
             before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-blue-600 before:origin-center 
             before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%]
             after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-blue-600 after:origin-center 
             after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
        >
          NOVEDADES
        </Link>
        <a
          href="https://wa.me/91140962011"
          className="relative text-gray-600 hover:text-blue-600 cursor-pointer transition-all ease-in-out
             before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-blue-600 before:origin-center 
             before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%]
             after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-blue-600 after:origin-center 
             after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
        >
          CONTACTO
        </a>
      </nav>
      <button
        className="sm:hidden flex items-center px-3 py-2 rounded hover:scale-110"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed top-16 right-0 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
        >
          <nav className="flex flex-col p-4 space-y-2 font-inter font-bold">
            <Link
              to="/"
              className="relative text-gray-600 hover:text-blue-600 cursor-pointer transition-all ease-in-out
             before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-blue-600 before:origin-center 
             before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%]
             after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-blue-600 after:origin-center 
             after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
              onClick={toggleMenu}
            >
              INICIO
            </Link>
            <Link
              to="/torneos"
              className="relative text-gray-600 hover:text-blue-600 cursor-pointer transition-all ease-in-out
             before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-blue-600 before:origin-center 
             before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%]
             after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-blue-600 after:origin-center 
             after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
              onClick={toggleMenu}
            >
              TORNEOS
            </Link>
            <Link
              to="/novedades"
              className="relative text-gray-600 hover:text-blue-600 cursor-pointer transition-all ease-in-out
             before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-blue-600 before:origin-center 
             before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%]
             after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-blue-600 after:origin-center 
             after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
              onClick={toggleMenu}
            >
              NOVEDADES
            </Link>
            <a
              href="https://wa.me/91140962011"
              className="relative text-gray-600 hover:text-blue-600 cursor-pointer transition-all ease-in-out
             before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-blue-600 before:origin-center 
             before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%]
             after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-blue-600 after:origin-center 
             after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
              onClick={toggleMenu}
            >
              CONTACTO
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
