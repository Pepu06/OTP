import copa from '../assets/copa.png';  // Asegúrate de ajustar la ruta según tu estructura
import otp from '../assets/otp.png';  // Asegúrate de ajustar la ruta según tu estructura
import tabla from '../assets/Playoff.png';  // Asegúrate de ajustar la ruta según tu estructura

const TablaPlayoff = () => {
    return (
        <div className='flex justify-center items-center m-4 relative bg-cover bg-center'>
            <div
                className="flex justify-center items-center m-4 relative bg-cover bg-center"
                style={{ backgroundImage: `url(${tabla})`, backgroundSize: '71vw', backgroundRepeat: 'no-repeat' }}
            >
                <div className="grid grid-cols-4 gap-2">
                    <div className="space-y-8">
                        {Array(4).fill("").map((_, colIndex) => (
                            <div key={colIndex} className="space-y-4">
                                {Array(2).fill("").map((_, rowIndex) => (
                                    <div key={rowIndex} className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
                                        Nombre del equipo
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="space-y-[85px] mt-6">
                        {Array(4).fill("").map((_, index) => (
                            <div key={index} className="bg-plightgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                                Nombre del equipo
                            </div>
                        ))}
                    </div>
                    <div className="space-y-[205px] mt-[85px]">
                        {Array(2).fill("").map((_, index) => (
                            <div key={index} className="bg-plightblue text-white p-2 rounded-lg text-center text-[1.02vw]">
                                Nombre del equipo
                            </div>
                        ))}
                    </div>
                    <div className="mt-52">
                        <div className="bg-pgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                            Nombre del equipo
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center m-4">
                    <div className='font-inter font-bold text-pgrey text-xs'>CAMPEON</div>
                    <img src={copa} alt="copa" className=" mb-5" />
                    <img src={otp} alt="otp" className=" mt-5" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                    <div className="mt-52">
                        <div className="bg-pgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                            Nombre del equipo
                        </div>
                    </div>
                    <div className="space-y-[205px] mt-[85px]">
                        {Array(2).fill("").map((_, index) => (
                            <div key={index} className="bg-plightblue text-white p-2 rounded-lg text-center text-[1.02vw]">
                                Nombre del equipo
                            </div>
                        ))}
                    </div>
                    <div className="space-y-[85px] mt-6">
                        {Array(4).fill("").map((_, index) => (
                            <div key={index} className="bg-plightgreen text-white p-2 rounded-lg text-center text-[1.02vw]">
                                Nombre del equipo
                            </div>
                        ))}
                    </div>
                    <div className="space-y-8">
                        {Array(4).fill("").map((_, colIndex) => (
                            <div key={colIndex} className="space-y-4">
                                {Array(2).fill("").map((_, rowIndex) => (
                                    <div key={rowIndex} className="bg-pblue text-white p-2 rounded-lg text-center text-[1.02vw]">
                                        Nombre del equipo
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TablaPlayoff;
