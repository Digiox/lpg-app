
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../../db/init";
import CartModel from "../../../../db/cart/schema";




export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await connectDB()


    switch (req.method) {
        case "GET":
            var cart = await CartModel.findOne({
                steam_id: req.query.steam_id
            })

            if (!cart) {
                cart = new CartModel({
                    steam_id: req.query.steam_id,
                    items: []
                })
                await cart.save()
            }

            res.status(200).json(cart)
            break;
        case "PUT":

            var cart = await CartModel.findOne({
                steam_id: req.query.steam_id
            })

            if (!cart) {
                cart = new CartModel({
                    steam_id: req.query.steam_id,
                    items: [req.body.item_id]
                })
                await cart.save()
                res.status(201).json("success")
                break;
            } else {
                await CartModel.updateOne(
                    { steam_id: req.query.steam_id },
                    { $push: { items: req.body.item_id } }
                );

                res.status(201).json("success")
                break;
            }



        default:
            res.status(404).json("route_not_found")
            break;
    }
}