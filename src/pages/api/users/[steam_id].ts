import { connectDB } from "../../../db/init";
import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../../../db/user/schema";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await connectDB()
    

    switch (req.method) {
        case "GET":
            const user = await UserModel.findOne({
                steam_id: req.query.steam_id
            })

            if (!user) {
                res.status(404).json("user_not_found")
                break;
            }

            res.status(200).json({
                id: user.steam_id,
                steam_id: user.steam_id,
                username: user.username
            })
            
            break;

            case "PUT":
                const isUser = await UserModel.find({
                    steam_id: req.query.steam_id
                })
                if (isUser) {
                    await UserModel.findOneAndUpdate({
                        steam_id: req.query.steam_id
                    }, {
                        username: req.body.username,
                        steam_id: req.body.steam_id,
                        balance: req.body.balance
                    })
                    res.status(200).json(req.body)
                }

                res.status(404).json("user_not_found")
                
    
        default:
            res.status(404).json("route_not_found")
            break;
    }
}