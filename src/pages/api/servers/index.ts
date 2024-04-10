import { NextApiRequest, NextApiResponse } from "next";

import { GameDig } from "gamedig"

import axios from "axios";
import { connectDB } from "../../../db/init";
import ServerModel, { IServer } from "../../../db/server/schema";

export interface IPreparedServer {
    count: number,
    name: String,
    short: String,
    mods: String[] | undefined
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ message: string } | IPreparedServer[] | IServer>) {

    await connectDB()
    const serverData: IServer = {
        ip: req.body.ip,
        port: req.body.port,
        rcon_port: req.body.rcon_port,
        rcon_password: req.body.rcon_password,
        top_server_token: req.body.top_server_token,
        mods: req.body.mods
    }
    switch (req.method) {
        case "POST":

            const doServerExist = await ServerModel.findOne({
                ip: serverData.ip
            })
            if (doServerExist) {
                res.status(409).json({
                    message: "already_exists"
                })
                break;
            }

            if (!serverData.ip || !serverData.port || !serverData.rcon_port || !serverData.rcon_password) {
                res.status(422).json({ message: "missing_data" })
                break;
            }

            const server = await new ServerModel(serverData);

            await server.save()
            res.status(200).json(serverData)
            break;

        case "GET":
            const servers: IServer[] = await ServerModel.find();


            const preparedServers: IPreparedServer[] = await Promise.all(servers.map(async (server) => {
                const serverData = await GameDig.query({
                    type: "projectzomboid",
                    host: server.ip as string, // J'ai modifié pour utiliser server.ip
                    port: server.port // et server.port pour qu'ils correspondent à chaque serveur dans la boucle
                });
                

                const topServerData = await axios.get(`https://api.top-serveurs.net/v1/servers/BF6ONDP5TH1S`)

                return {
                    name: serverData.name,
                    count: serverData.numplayers,
                    short: topServerData.data.server.short_description,
                    mods: server.mods
                };
            }));



            console.log(preparedServers);


            res.status(200).json(preparedServers)
            break;

        default:
            res.status(404).send({ message: "not_found" })
    }




}