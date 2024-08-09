import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Perfil = () => {
  return (
    <section id="torneos" className=" bg-white">
      <h2 className=" text-4xl font-normal text-center text-pblue mb-8 font-daysone">
        ¡Busca tu perfil!
      </h2>
      {/* Centrar el placeholder del input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Buscar por Nombre/Id"
          className="border rounded-full p-2 w-1/2 text-center placeholder-pgrey"
          onClick={(placeholder) => (placeholder.target.placeholder = "")} // Limpiar placeholder al hacer click
          onBlur={(placeholder) =>
            (placeholder.target.placeholder = "Buscar por Fecha/Lugar/Nombre")
          } // Restaurar placeholder al salir del input
          style={{ textAlign: "center" }} // Estilo adicional para asegurar que el placeholder esté centrado
        />
      </div>

      <div className="flex justify-center mt-4">
        <a href="/perfil" className="px-5 py-2 bg-pgreen text-white rounded-lg font-medium font-poppins">
          VER PERFIL
        </a>
      </div>
      <img src="pelotas.png" alt="pelotas" className="mt-5 w-full"/>
    </section>
  );
};

export default Perfil;
