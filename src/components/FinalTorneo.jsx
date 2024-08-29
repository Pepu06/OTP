import paletaizq from "../assets/paletaizq.png";
import paletader from "../assets/paletader.png";

const FinalTorneo = () => {
  return (
    <div className=" relative flex items-center justify-between px-4 py-8 bg-white z-10 mt-10">
      {/* Primera imagen */}
      <img
        src={paletaizq}
        alt="PaletaI"
        className="w-auto sm:pt-20 h-[80px] sm:h-[350px] object-cover absolute left-0 top-1/2 transform -translate-y-1/5 sm:-translate-y-1/2 z-20"
      />

      {/* Contenedor para el texto */}
      <div className="flex-grow text-center font-daysone font-normal relative z-30">
        <h1 className="text-xl text-pgrey">
          ¿Este no es tu torneo?
          <br />
          Encontrá el tuyo
          <a href="/" className="text-pgreen">
            {" "}
            acá
          </a>
        </h1>
      </div>

      {/* Segunda imagen */}
      <img
        src={paletader}
        alt="PaletaD"
        className="w-auto sm:pt-20 h-[80px] sm:h-[350px] object-cover absolute right-0 top-1/2 transform -translate-y-1/5 sm:-translate-y-1/2 z-20"
      />
    </div>
  );
};

export default FinalTorneo;
