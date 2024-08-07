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
                <div className="space-y-36 mt-8">
                    {Array(2).fill("").map((_, index) => (
                        <div key={index} className="bg-pblue text-white p-2 rounded-lg text-center text-sm">
                            Nombre del equipo
                        </div>
                    ))}
                </div>
                <div className="mt-28">
                    <div className="bg-green-500 text-white p-2 rounded text-center text-sm">
                        Nombre del equipo
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center mt-8">
                <div className="bg-yellow-500 text-white p-2 rounded text-center text-sm mb-2">
                    CAMPEON
                </div>
                <div className="bg-blue-500 text-white p-2 rounded-full h-16 w-16 flex items-center justify-center text-sm">
                    OTP
                </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-8">
                <div className="mt-28">
                    <div className="bg-green-500 text-white p-2 rounded text-center text-sm">
                        Nombre del equipo
                    </div>
                </div>
                <div className="space-y-36 mt-8">
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
