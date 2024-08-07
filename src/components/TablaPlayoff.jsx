import React from "react";

const TablaPlayoff = () => {
    return (
        <div className="flex justify-center items-center m-4">
            <div className="grid grid-cols-4 gap-2">
                <div className="space-y-8">
                    {Array(4).fill("").map((_, colIndex) => (
                        <div key={colIndex} className="space-y-4">
                            {Array(2).fill("").map((_, rowIndex) => (
                                <div key={rowIndex} className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                                    Nombre del equipo
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="space-y-[85px] mt-6">
                    {Array(4).fill("").map((_, index) => (
                        <div key={index} className="bg-pgreen text-white p-2 rounded-lg text-center text-sm">
                            Nombre del equipo
                        </div>
                    ))}
                </div>
                <div className="space-y-52 mt-20">
                    {Array(2).fill("").map((_, index) => (
                        <div key={index} className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                            Nombre del equipo
                        </div>
                    ))}
                </div>
                <div className="mt-52">
                    <div className="bg-green-500 text-white p-2 rounded-lg text-center text-sm">
                        Nombre del equipo
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center m-4">
                <img src="OTP\src\assets\copa.png" alt="copa" />
                <img src="OTP\src\assets\copa.png" alt="otp" />
            </div>
            <div className="grid grid-cols-4 gap-2">
                <div className="mt-52">
                    <div className="bg-green-500 text-white p-2 rounded-lg text-center text-sm">
                        Nombre del equipo
                    </div>
                </div>
                <div className="space-y-52 mt-20">
                    {Array(2).fill("").map((_, index) => (
                        <div key={index} className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                            Nombre del equipo
                        </div>
                    ))}
                </div>
                <div className="space-y-[85px] mt-6">
                    {Array(4).fill("").map((_, index) => (
                        <div key={index} className="bg-pgreen text-white p-2 rounded-lg text-center text-sm">
                            Nombre del equipo
                        </div>
                    ))}
                </div>
                <div className="space-y-8">
                    {Array(4).fill("").map((_, colIndex) => (
                        <div key={colIndex} className="space-y-4">
                            {Array(2).fill("").map((_, rowIndex) => (
                                <div key={rowIndex} className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                                    Nombre del equipo
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TablaPlayoff;