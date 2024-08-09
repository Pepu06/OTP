import copa from "../assets/copa.png"; // Asegúrate de ajustar la ruta según tu estructura
import otp from "../assets/otp.png"; // Asegúrate de ajustar la ruta según tu estructura

const TablaPlayoff = () => {
  return (
    <div className="flex justify-center items-center m-4 relative bg-cover bg-center">
      <div className="flex justify-center items-center m-4 relative bg-cover bg-center">
        <div className="grid grid-cols-4">
          <div className="space-y-10">
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del equipo
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del equipo
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del equipo
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del equipo
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del equipo
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del equipo
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del equipo
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del equipo
            </div>
          </div>
          <div className="space-y-[85px]">
            <div className="mt-6">
              <div className="w-16 h-4 border-t-2 border-r-2 border-gray-500"></div>
              <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                Nombre del equipo
              </div>
              <div className="w-16 h-4 border-b-2 border-r-2 border-gray-500"></div>
            </div>
            <div className="">
              <div className=" w-16 h-4 border-t-2 border-r-2 border-gray-500"></div>
              <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                Nombre del equipo
              </div>
              <div className="w-16 h-4 border-b-2 border-r-2 border-gray-500"></div>
            </div>
            <div className="">
              <div className="w-16 h-4 border-t-2 border-r-2 border-gray-500"></div>
              <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                Nombre del equipo
              </div>
              <div className="w-16 h-4 border-b-2 border-r-2 border-gray-500"></div>
            </div>
            <div className="">
              <div className="w-16 h-4 border-t-2 border-r-2 border-gray-500"></div>
              <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                Nombre del equipo
              </div>
              <div className="w-16 h-4 border-b-2 border-r-2 border-gray-500"></div>
            </div>
          </div>
          <div className="space-y-[155px]">
            <div>
              <div className="mt-14 w-16 h-16 border-t-2 border-r-2 border-gray-500"></div>
              <div className="bg-plightblue text-white p-2 rounded-lg text-center text-[1.02vw]">
                Nombre del equipo
              </div>
              <div className="w-16 h-14 border-b-2 border-r-2 border-gray-500"></div>
            </div>
            <div>
              <div className="w-16 h-16 border-t-2 border-r-2 border-gray-500"></div>
              <div className="bg-plightblue text-white p-2 rounded-lg text-center text-[1.02vw]">
                Nombre del equipo
              </div>
              <div className="w-16 h-14 border-b-2 border-r-2 border-gray-500"></div>
            </div>
          </div>
          <div className="mt-[135px]">
            <div className="w-16 h-[145px] border-t-2 border-r-2 border-gray-500"></div>
            <div className="bg-pgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del equipo
            </div>
            <div className="w-16 h-[135px] border-b-2 border-r-2 border-gray-500"></div>
          </div>
        </div>
        <div className="flex flex-col items-center m-4">
          <div className="font-inter font-bold text-pgrey text-xs">CAMPEON</div>
          <img src={copa} alt="copa" className=" mb-5" />
          <img src={otp} alt="otp" className=" mt-5" />
        </div>
        <div className="grid grid-cols-4">
          <div className="mt-[135px]">
          <div className="w-16 h-[145px] border-t-2 border-r-2 border-gray-500 transform -scale-x-100 translate-x-[83px]"></div>
            <div className="bg-pgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del equipo
            </div>
            <div className="w-16 h-[135px] border-b-2 border-r-2 border-gray-500 -scale-x-100 translate-x-[83px]"></div>
          </div>
          <div className="space-y-[155px]">
            <div>
              <div className="mt-14 w-16 h-16 border-t-2 border-r-2 border-gray-500 -scale-x-100 translate-x-[83px]"></div>
              <div className="bg-plightblue text-white p-2 rounded-lg text-center text-[1.02vw]">
                Nombre del equipo
              </div>
              <div className="w-16 h-14 border-b-2 border-r-2 border-gray-500 -scale-x-100 translate-x-[83px]"></div>
            </div>
            <div>
              <div className="w-16 h-16 border-t-2 border-r-2 border-gray-500 -scale-x-100 translate-x-[83px]"></div>
              <div className="bg-plightblue text-white p-2 rounded-lg text-center text-[1.02vw]">
                Nombre del equipo
              </div>
              <div className="w-16 h-14 border-b-2 border-r-2 border-gray-500 -scale-x-100 translate-x-[83px]"></div>
            </div>
          </div>
          <div className="space-y-[85px]">
            <div className="mt-6">
              <div className="w-16 h-4 border-t-2 border-r-2 border-gray-500 -scale-x-100 translate-x-[83px]"></div>
              <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                Nombre del equipo
              </div>
              <div className="w-16 h-4 border-b-2 border-r-2 border-gray-500 -scale-x-100 translate-x-[83px]"></div>
            </div>
            <div className="">
              <div className=" w-16 h-4 border-t-2 border-r-2 border-gray-500 -scale-x-100 translate-x-[83px]"></div>
              <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                Nombre del equipo
              </div>
              <div className="w-16 h-4 border-b-2 border-r-2 border-gray-500 -scale-x-100 translate-x-[83px]"></div>
            </div>
            <div className="">
              <div className="w-16 h-4 border-t-2 border-r-2 border-gray-500 -scale-x-100 translate-x-[83px]"></div>
              <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                Nombre del equipo
              </div>
              <div className="w-16 h-4 border-b-2 border-r-2 border-gray-500 -scale-x-100 translate-x-[83px]"></div>
            </div>
            <div className="">
              <div className="w-16 h-4 border-t-2 border-r-2 border-gray-500 -scale-x-100 translate-x-[83px]"></div>
              <div className="bg-plightgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                Nombre del equipo
              </div>
              <div className="w-16 h-4 border-b-2 border-r-2 border-gray-500 -scale-x-100 translate-x-[83px]"></div>
            </div>
          </div>
          <div className="space-y-10">
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del equipo
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del equipo
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del equipo
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del equipo
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del equipo
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del equipo
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del equipo
            </div>
            <div className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
              Nombre del equipo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaPlayoff;
