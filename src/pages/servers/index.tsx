"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { IPreparedServer } from "../api/servers"
import Nav from "../../components/navbar/Nav"


const Servers = () => {

    const [servers, setServers] = useState<undefined | IPreparedServer[]>(undefined)

    useEffect(() => {
        axios.get("/api/servers")
            .then((res) => {
                setServers(res.data)
            })
    }, [])


    return <div className="relative min-h-screen bg-img-bg-main bg-cover bg-no-repeat">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10">
            <Nav />
            <div className="flex flex-col items-center">
                <h1 className="font-water text-white text-center text-7xl mt-20 tracking-wider">Serveurs</h1>
                <div>
                    {servers?.map((serverData, key) => <div key={key} className=" mx-auto mt-40 bg-white w-1/2 h-60 bg-opacity-10 flex flex-col justify-center text-white rounded-md p-4">

                        <div className=" flex justify-between">
                            <h3 className="font-krona text-2xl w-4/5">{serverData.name}</h3>
                            <div className="flex justify-center align-center">
                                <div className="rounded-full w-4 h-4 m-1 bg-red-500">
                                </div>
                                <p>{serverData.count} Joueurs</p>
                            </div>
                        </div>

                        <div className="flex">
                            <p className="mr-1">Mods notable: </p>
                            <div>
                                {serverData.mods?.map((mod: any, k) => <span key={k} className="border bg-white bg-opacity-10 p-1 rounded-full text-xs m-1">
                                    {mod}
                                </span>)}
                            </div>
                        </div>
                        <p className="text-center font-krona text-2xl mt-6">
                            {serverData && serverData.short}
                        </p>

                        <div>
                            <a></a>
                        </div>
                    </div>)}
                </div>

            </div>
        </div>
    </div>
}

export default Servers