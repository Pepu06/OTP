import React from "react";

const TablaPlayoff = () => {
    return (
        <div className="flex justify-center items-center mt-10">
            <div className="grid grid-cols-4 gap-4">
                <div className=" col-end-auto space-y-20">
                    {Array(4).fill("").map((_, index) => (
                        <div className="col-span-1 space-y-10">
                            {Array(2).fill("").map((_, index) => (
                                <div key={index} className="bg-pblue text-white p-2 rounded-lg text-center">
                                    Nombre del equipo
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="col-span-1 space-y-40">
                    {Array(4).fill("").map((_, index) => (
                        <div key={index} className="bg-pgreen text-white p-2 rounded-lg text-center">
                            Nombre del equipo
                        </div>
                    ))}
                </div>
                <div className="col-span-1 space-y-16">
                    <div className="bg-green-500 text-white p-2 rounded text-center">
                        Nombre del equipo
                    </div>
                    <div className="bg-green-500 text-white p-2 rounded text-center">
                        Nombre del equipo
                    </div>
                </div>
                <div className="col-span-1 space-y-32">
                    <div className="bg-green-500 text-white p-2 rounded text-center">
                        Nombre del equipo
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center mt-16">
                <div className="bg-yellow-500 text-white p-2 rounded text-center mb-4">
                    CAMPEON
                </div>
                <div className="bg-blue-500 text-white p-2 rounded-full h-24 w-24 flex items-center justify-center">
                    OTP
                </div>
            </div>
        </div>
    );
};

export default TablaPlayoff;
