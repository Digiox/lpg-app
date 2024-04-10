import { NextRequest, NextResponse } from "next/server";

import { NextApiRequest, NextApiResponse } from "next";

import ServerModel, { IServer } from "../../../db/server/schema";
import { connectDB } from "../../../db/init";

export interface IPreparedServer {
    count: number,
    name: String,
    short: String,
    mods: String[] | undefined
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ message: string } | IPreparedServer[] | IServer>) {

    await connectDB()

    switch (req.method) {
        case "DELETE":

            await ServerModel.deleteOne({
                _id: req.query.id
            })

            res.status(201).json({ message: "deleted" })
            break
        default:
            break;
    }
}