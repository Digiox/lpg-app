import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../db/init";
import { NextApiRequest, NextApiResponse } from "next";

import {GameDig} from "gamedig"
import UserModel, { IUser } from "../../../db/user/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await connectDB()
    if (req.method === "POST") {
        
        const userData: IUser = {
            username: req.body.username,
            steam_id: req.body.steam_id
        }

        if (!userData.username || !userData.steam_id) {
            return res.status(422).json({
                message: "missing_data"
            })
        }

        const userExists = await UserModel.findOne({
            steam_id: userData.steam_id
        })

        if (userExists) {
            res.status(400).json("already_exist")
        }

        console.log(userData);
        

        const user = new UserModel({
            username: userData.username,
            steam_id: userData.steam_id,
            balance: 10
        })

        const userSaved = await user.save()
        console.log("USER SAVED: ", userSaved);
        

        return res.status(200).json(userData)
    }else if(req.method === "GET") {
        const users = await UserModel.find()
        res.setHeader('X-Total-Count', users.length.toString());
        res.status(200).json(users.map((user: IUser) => {
            return {
                id: user.steam_id,
                username: user.username,
                steam_id: user.steam_id,
                balance: user.balance
            }
        }))
    }
    
    else {
        return res.status(404).json({
            message: "not_found"
        })
    }
}