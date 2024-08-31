import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [usernamePlaceholder, setUsernamePlaceholder] = useState("Usuario");
  const [passwordPlaceholder, setPasswordPlaceholder] = useState("Contraseña");

  const [validUsername, setValidUsername] = useState("");
  const [validPasswordHash, setValidPasswordHash] = useState("");

  useEffect(() => {
    const fetchCredentials = async () => {
      const docRef = doc(db, "usuariosAdm", "administrador");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setValidUsername(data.Usuario);
        setValidPasswordHash(data.Contrasena);
      } else {
        console.log("No se encontró el documento");
      }
    };

    fetchCredentials();
  }, []);

  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const hashedPassword = await hashPassword(password);

    if (username === validUsername && hashedPassword === validPasswordHash) {
      setIsAuthenticated(true);
      setErrorMessage("");
      navigate("/adm");
    } else {
      setErrorMessage("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-3xl font-bold mb-4 text-center">
            Iniciar Sesión
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder={usernamePlaceholder}
              onFocus={() => setUsernamePlaceholder("")}
              onBlur={() => setUsernamePlaceholder("Usuario")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder={passwordPlaceholder}
              onFocus={() => setPasswordPlaceholder("")}
              onBlur={() => setPasswordPlaceholder("Contraseña")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-xs italic mb-3">{errorMessage}</p>
          )}
          <div className="flex items-center justify-center">
            <button
              className="bg-pgreen hover:bg-green-700 hover:transition-all text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
