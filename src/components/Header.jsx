import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-lg relative">
      <img src={Logo} alt="Logo" className="h-12 sm:ml-10 mt-1" />
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
          to="/ranking"
          className="relative text-gray-600 hover:text-blue-600 cursor-pointer transition-all ease-in-out
             before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-blue-600 before:origin-center 
             before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%]
             after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-blue-600 after:origin-center 
             after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
        >
          RANKINGS
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

      {/* Fondo oscuro */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMenu}
      />

      {/* Barra lateral */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="text-gray-600 hover:text-red-600 absolute top-2 right-2"
          aria-label="Close menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <nav className="flex flex-col p-4 font-inter font-bold mt-10 space-y-10">
          <Link
            to="/"
            onClick={toggleMenu}
            className="relative text-gray-600 hover:text-blue-600 cursor-pointer"
          >
            INICIO
          </Link>
          <Link
            to="/torneos"
            onClick={toggleMenu}
            className="relative text-gray-600 hover:text-blue-600 cursor-pointer"
          >
            TORNEOS
          </Link>
          <Link
            to="/ranking"
            onClick={toggleMenu}
            className="relative text-gray-600 hover:text-blue-600 cursor-pointer"
          >
            RANKINGS
          </Link>
          <Link
            to="/novedades"
            onClick={toggleMenu}
            className="relative text-gray-600 hover:text-blue-600 cursor-pointer"
          >
            NOVEDADES
          </Link>
          <a
            href="https://wa.me/91140962011"
            onClick={toggleMenu}
            className="relative text-gray-600 hover:text-blue-600 cursor-pointer"
          >
            CONTACTO
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
